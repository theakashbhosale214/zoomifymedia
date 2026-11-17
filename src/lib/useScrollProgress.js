import { useEffect } from "react";
import { useMotionValue, useMotionValueEvent, useScroll } from "motion/react";

/**
 * Like useScroll(...).scrollYProgress, but returned as a plain MotionValue.
 *
 * Why: Motion hands scroll-linked opacity off to a native ScrollTimeline when
 * it can. With a `target` + `offset` that timeline measures against the whole
 * document instead of the target's range, so opacity runs ~3× slower than the
 * scroll on long pages (transforms are unaffected). Mirroring the value into a
 * fresh MotionValue keeps every derived value on the JS path, measured correctly.
 */
export function useScrollProgress(options) {
  const { scrollYProgress } = useScroll(options);
  const progress = useMotionValue(0);
  useMotionValueEvent(scrollYProgress, "change", (v) => progress.set(v));
  useEffect(() => {
    progress.set(scrollYProgress.get());
  }, [progress, scrollYProgress]);
  return progress;
}
