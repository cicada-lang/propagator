import assert from "assert"
import { test } from "node:test"
import {
  BeliefSystem,
  beliefSystemEqual,
  beliefSystemQuery,
} from "../belief-system/index.ts"
import { Belief, beliefEqual, bringIn, kickOut } from "../belief/index.ts"
import { Cell, patch } from "../cell/index.ts"
import { theContradiction } from "../contradiction/index.ts"
import { Interval, intervalAlmostEqual, isInterval } from "../interval/index.ts"
import { isNothing } from "../nothing/index.ts"
import { run } from "../scheduler/index.ts"
import { fallDuration, similarTriangles } from "./barometer.ts"

test("examples / barometer-belief-system", async () => {
  // If we put belief systems in our cells, we can revisit the
  // building-height problem, and see how dependencies and worldviews
  // let us change our mind about which of our experiments to believe,
  // and compute the consequences of one or another subset of our
  // measurements:

  const [barometerShadow, barometerHeight, buildingShadow, buildingHeight] =
    similarTriangles()
  patch(
    buildingShadow,
    BeliefSystem([Belief(Interval(54.9, 55.1), ["shadows"])]),
  )
  patch(
    barometerHeight,
    BeliefSystem([Belief(Interval(0.3, 0.32), ["shadows"])]),
  )
  patch(
    barometerShadow,
    BeliefSystem([Belief(Interval(0.36, 0.37), ["shadows"])]),
  )

  await run()

  assert(
    beliefSystemEqual(
      buildingHeight.content,
      BeliefSystem([Belief(Interval(44.51, 48.97), ["shadows"])]),
      {
        valueEqual: (x, y) => intervalAlmostEqual(x, y, 0.01),
      },
    ),
  )

  // Nothing much changes while there is only one source of
  // information. Where we had a belief, we now have a belief system
  // with one belief in it.

  // The answer changes more dramatically when we add a second experiment:

  const fallTime = Cell()
  fallDuration(fallTime, buildingHeight)
  patch(fallTime, BeliefSystem([Belief(Interval(2.9, 3.1), ["fall-time"])]))

  await run()

  assert(
    beliefSystemEqual(
      buildingHeight.content,
      BeliefSystem([
        Belief(Interval(44.51, 48.97), ["shadows"]),
        Belief(Interval(41.16, 47.24), ["fall-time"]),
        Belief(Interval(44.51, 47.24), ["shadows", "fall-time"]),
      ]),
      {
        valueEqual: (x, y) => intervalAlmostEqual(x, y, 0.01),
      },
    ),
  )

  // Now the belief system remembers the deductions made in the first
  // (shadows) experiment, as well as the consequences of both
  // experiments together.

  // TODO Unlike the follow notes, my implementation does include
  // fall-time.  I do not know why yet.

  // The consequences of the fall-time experiment alone are not
  // computed yet, because we chose to build our system not to compute
  // them. The reasoning behind this design decision was that, in my
  // experience, it was not a good idea to compute all the
  // consequences of all the premises all the time; rather we just
  // compute the strongest [most information] consequence of all the
  // premises in the current worldview taken together. The current
  // worldview at this point believes both shadows and fall-time,
  // because we made believing everything the default, and that
  // default has not yet been overridden.

  // In this particular system, we chose to make the worldview
  // implicit and global.  That works fine on a uniprocessor, but a
  // more distributed propagator network might be better served by a
  // more local notion of worldview, and by propagating changes
  // thereto explicitly rather than letting them instantly affect the
  // entire network.
  //
  // - It would probably be a good idea for waves of worldview changes
  //   to travel through the network “faster” than other changes, to
  //   minimize work spent on computing in worldviews that are no
  //   longer interesting.

  // With an implicit global worldview, one can query a belief system,
  // without additional input, to get the most informative value
  // supported by premises in the current worldview:

  assert(
    beliefEqual(
      beliefSystemQuery(buildingHeight.content) as Belief<any>,
      Belief(Interval(44.51, 47.24), ["shadows", "fall-time"]),
      {
        valueEqual: (x, y) => intervalAlmostEqual(x, y, 0.01),
      },
    ),
  )

  // As we will see later, tms-query is the lens through which (most)
  // propagators view belief systems -- this is what allows the
  // network to work on just one worldview at a time, without having
  // to work out all the myriad variations of what to believe and what
  // not to believe until requested.

  // The following test that, the `buildingHeight.content`
  // will not change after `beliefSystemQuery`.

  await run()

  assert(
    beliefSystemEqual(
      buildingHeight.content,
      BeliefSystem([
        Belief(Interval(44.51, 48.97), ["shadows"]),
        Belief(Interval(41.16, 47.24), ["fall-time"]),
        Belief(Interval(44.51, 47.24), ["shadows", "fall-time"]),
      ]),
      {
        valueEqual: (x, y) => intervalAlmostEqual(x, y, 0.01),
      },
    ),
  )

  // The answer above should remind the reader of the situation that
  // obtained in `barometer-belief.test.ts`. We have again computed
  // the best estimate of the height of our building from measuring
  // various shadows and then dropping a barometer off the roof.  The
  // new and powerful development is that we also provide a means to
  // manipu- late which premises are in the current worldview. For our
  // next example, removing the fall-time premise causes the belief
  // system query to fall back to the less-informative inference that
  // can be made using only the shadows experiment:

  kickOut("fall-time")

  await run()

  assert(
    beliefEqual(
      beliefSystemQuery(buildingHeight.content) as Belief<any>,
      Belief(Interval(44.51, 48.97), ["shadows"]),
      {
        valueEqual: (x, y) => intervalAlmostEqual(x, y, 0.01),
      },
    ),
  )

  // If we also remove the shadows premise, our poor system no longer
  // has anything to believe at all! Therefore, belief system query
  // dutifully reports that nothing can be concluded about the height
  // of the building from the currently believed premises:

  kickOut("shadows")

  await run()

  assert(isNothing(beliefSystemQuery(buildingHeight.content) as Belief<any>))

  // The following test that, the `buildingHeight.content`
  // will not change even after calling `kickOut`.

  assert(
    beliefSystemEqual(
      buildingHeight.content,
      BeliefSystem([
        Belief(Interval(44.51, 48.97), ["shadows"]),
        Belief(Interval(41.16, 47.24), ["fall-time"]),
        Belief(Interval(44.51, 47.24), ["shadows", "fall-time"]),
      ]),
      {
        valueEqual: (x, y) => intervalAlmostEqual(x, y, 0.01),
      },
    ),
  )

  // We can also ask the system for the best answer it can give if we
  // trust the fall-time experiment but not the shadows experiment:

  bringIn("fall-time")

  await run()

  assert(
    beliefEqual(
      beliefSystemQuery(buildingHeight.content) as Belief<any>,
      Belief(Interval(41.16, 47.24), ["fall-time"]),
      {
        valueEqual: (x, y) => intervalAlmostEqual(x, y, 0.01),
      },
    ),
  )

  // The consequences of fall-time without shadows are new: this is
  // the first time we put the network into exactly that
  // worldview. This is therefore a new deduction, and the full belief
  // system remembers it:

  assert(
    beliefSystemEqual(
      buildingHeight.content,
      BeliefSystem([
        Belief(Interval(44.51, 48.97), ["shadows"]),
        Belief(Interval(41.16, 47.24), ["fall-time"]),
        Belief(Interval(44.51, 47.24), ["shadows", "fall-time"]),
      ]),
      {
        valueEqual: (x, y) => intervalAlmostEqual(x, y, 0.01),
      },
    ),
  )

  // Now, if we give the superintendent a barometer, we can add her
  // input to the totality of our knowledge about this building

  patch(buildingHeight, Belief(45, ["superintendent"]))

  await run()

  // and observe that it is stored faithfully along with all the rest,

  assert(
    beliefSystemEqual(
      buildingHeight.content,
      BeliefSystem<Interval | number>([
        Belief(Interval(44.51, 48.97), ["shadows"]),
        Belief(Interval(41.16, 47.24), ["fall-time"]),
        Belief(Interval(44.51, 47.24), ["shadows", "fall-time"]),
        Belief(45, ["superintendent"]),
      ]),
      {
        valueEqual: (x, y) => {
          if (isInterval(x) && isInterval(y)) {
            return intervalAlmostEqual(x, y, 0.01)
          } else {
            return x === y
          }
        },
      },
    ),
  )

  // though indeed if we trust it,
  // it provides the best estimate we have:

  assert(
    beliefEqual(
      beliefSystemQuery(buildingHeight.content) as Belief<any>,
      Belief(45, ["superintendent"]),
    ),
  )

  // (and restoring our faith in the shadows experiment has no effect
  // on the accuracy of this answer).

  bringIn("shadows")

  await run()

  assert(
    beliefEqual(
      beliefSystemQuery(buildingHeight.content) as Belief<any>,
      Belief(45, ["superintendent"]),
    ),
  )

  // On this simple example, we have illustrated a very powerful
  // mechanism. Our network can believe various different pieces of
  // information, and by keeping track of the reasons why it believes
  // them, the network can keep them separate from each other, and
  // keep straight the different consequences of its different
  // beliefs. By manipulating the worldview -- the set of premises the
  // network believes at any one time -- we can ask it to compute what
  // it can supposing one set of beliefs or another, as we like.

  // # The justified-intervals anomaly revisited

  // If we briefly turn our attention to the height of the barometers
  // we have been dropping and giving away, we notice that as before,
  // in addition to the originally supplied measurements, the system
  // has made a variety of deductions about it, based on reasoning
  // backwards from our estimates of the height of the building and
  // the other measurements in the shadows experiment.

  assert(
    beliefSystemEqual(
      barometerHeight.content,
      BeliefSystem([
        Belief(Interval(0.3, 0.32), ["shadows"]),
        Belief(Interval(0.3, 0.31), ["shadows", "fall-time"]),
        Belief(Interval(0.3, 0.3), ["shadows", "fall-time", "superintendent"]),
        Belief(Interval(0.29, 0.3), ["shadows", "superintendent"]),
      ]),
      {
        valueEqual: (x, y) => intervalAlmostEqual(x, y, 0.01),
      },
    ),
  )

  // If we should ask for the best estimate of the height of the
  // barometer, we observe the same problem we noticed in the previous
  // section, namely that the system produces a spurious dependency on
  // the fall-time experiment, whose findings are actually redundant
  // for answering this question.

  assert(
    beliefEqual(
      beliefSystemQuery(barometerHeight.content) as Belief<any>,
      Belief(Interval(0.3, 0.3), ["shadows", "fall-time", "superintendent"]),
      {
        valueEqual: (x, y) => intervalAlmostEqual(x, y, 0.01),
      },
    ),
  )

  // We can verify the irrelevance of the fall-time measurements by
  // disbelieving them and observing that the answer remains the same,
  // but with more accurate dependencies.

  kickOut("fall-time")

  await run()

  assert(
    beliefEqual(
      beliefSystemQuery(barometerHeight.content) as Belief<any>,
      Belief(Interval(0.3, 0.3), ["shadows", "superintendent"]),
      {
        valueEqual: (x, y) => intervalAlmostEqual(x, y, 0.01),
      },
    ),
  )

  // What is more, having been asked to make that deduction, the truth
  // maintenance system remembers it, and produces the better answer
  // thereafter, even if we subsequently restore our faith in the
  // fall-time experiment,

  bringIn("fall-time")

  await run()

  assert(
    beliefEqual(
      beliefSystemQuery(barometerHeight.content) as Belief<any>,
      Belief(Interval(0.3, 0.3), ["shadows", "superintendent"]),
      {
        valueEqual: (x, y) => intervalAlmostEqual(x, y, 0.01),
      },
    ),
  )

  // and takes the opportunity to dispose of prior deductions that are
  // obsoleted by this new realization.

  assert(
    beliefSystemEqual(
      barometerHeight.content,
      BeliefSystem([
        Belief(Interval(0.3, 0.32), ["shadows"]),
        Belief(Interval(0.3, 0.31), ["shadows", "fall-time"]),
        Belief(Interval(0.3, 0.3), ["shadows", "superintendent"]),
      ]),
      {
        valueEqual: (x, y) => intervalAlmostEqual(x, y, 0.01),
      },
    ),
  )

  // We have been fortunate so far in having all our measurements
  // agree with each other, so that all worldviews we could possibly
  // hold were, in fact, internally consistent. But what if we had
  // mutually contradictory data?
  //
  // [Suppose we compute the building's height by measuring the
  // pressure of the barometer twice.]  Should this new information
  // contradict our previous store of knowledge, we would like to
  // know; and since the system maintains dependency information, it
  // can even tell us which premises lead to trouble.

  patch(buildingHeight, Belief(Interval(46, 50), ["pressure"]))

  await run()

  // Indeed, if we ask after the height of the building under this
  // regime of contradictory information, we will be informed of the
  // absence of a good answer,

  assert(
    beliefEqual(
      beliefSystemQuery(buildingHeight.content) as Belief<any>,
      Belief(theContradiction, ["pressure", "superintendent"]),
    ),
  )

  // but it is appropriate for the system not to propagate
  // consequences deducible in an inconsistent worldview, so the
  // barometer-height remains unchanged:

  assert(
    beliefEqual(
      beliefSystemQuery(barometerHeight.content) as Belief<any>,
      Belief(Interval(0.3, 0.3), ["shadows", "superintendent"]),
      {
        valueEqual: (x, y) => intervalAlmostEqual(x, y, 0.01),
      },
    ),
  )

  // It is up to us as the users of the system to choose which
  // worldview to explore.  We can ascertain the consequences of
  // disregarding the superintendent’s assertions,

  kickOut("superintendent")

  await run()

  // both on our understanding of the height of the building

  // TODO In the paper, the reasons for the following belief are:
  // ["fall-time", "pressure"]

  assert(
    beliefEqual(
      beliefSystemQuery(buildingHeight.content) as Belief<any>,
      Belief(Interval(46, 47.24), ["shadows", "pressure", "fall-time"]),
      {
        valueEqual: (x, y) => intervalAlmostEqual(x, y, 0.01),
      },
    ),
  )

  // and on that of the barometer.

  assert(
    beliefEqual(
      beliefSystemQuery(barometerHeight.content) as Belief<any>,
      Belief(Interval(0.3, 0.31), ["shadows", "pressure", "fall-time"]),
      {
        valueEqual: (x, y) => intervalAlmostEqual(x, y, 0.01),
      },
    ),
  )

  // Doing so does not cost us previously learned data, so we are free
  // to change world-views at will, reasoning as we like in one
  // consistent worldview or another.

  bringIn("superintendent")
  kickOut("pressure")

  await run()

  assert(
    beliefEqual(
      beliefSystemQuery(buildingHeight.content) as Belief<any>,
      Belief(45, ["superintendent"]),
      {
        valueEqual: (x, y) => x === y,
      },
    ),
  )

  assert(
    beliefEqual(
      beliefSystemQuery(barometerHeight.content) as Belief<any>,
      Belief(Interval(0.3, 0.3), ["shadows", "superintendent"]),
      {
        valueEqual: (x, y) => intervalAlmostEqual(x, y, 0.01),
      },
    ),
  )

  // As promised, contradictory beliefs are not traumatic. The deep
  // reason contradiction handling works so well is that
  // the-contradiction is just another partial information state, and
  // our truth maintenance machinery operates on partial information
  // by design.

  // TODO 为了实现下面的效果，scheme 实现中用到了 call/cc，
  // 在 JS 的实现中我做不到 stop computing things immediately。

  // On the other hand, contradictions are not quite like the other
  // kinds of partial information, because we chose to make them have
  // a global effect: we wanted our system to stop computing things in
  // a given worldview immediately, as soon as it discovered that
  // worldview to be contradictory anywhere. We must therefore do some
  // work to treat contradictions a little specially. This work is a
  // consequence of our particular choice of making the worldview
  // global.
})
