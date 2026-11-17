import { useRef } from "react";
import { motion, useTransform } from "motion/react";
import { useScrollProgress } from "../lib/useScrollProgress";
import { content } from "../data/content";
import SectionLabel from "./SectionLabel";
import { Reveal, SplitText } from "./Motion";

function Step({ step, index, total, progress }) {
  const at = index / (total - 1);
  const on = useTransform(progress, [Math.max(at - 0.08, 0), at], [0, 1]);
  const dotBg = useTransform(on, [0, 1], ["rgba(255,255,255,0.08)", "rgba(255,162,127,1)"]);
  const dotColor = useTransform(on, [0, 1], ["rgba(243,241,249,0.6)", "rgba(13,16,32,1)"]);
  const textOpacity = useTransform(on, [0, 1], [0.35, 1]);

  return (
    <li className="relative grid grid-cols-[3rem_1fr] gap-5 pb-14 last:pb-0 md:grid-cols-[4rem_1fr] md:gap-8 md:pb-20">
      <motion.span
        className="relative z-10 grid h-12 w-12 place-items-center rounded-full font-mono text-[12px] ring-1 ring-white/10 md:h-16 md:w-16 md:text-[13px]"
        style={{ backgroundColor: dotBg, color: dotColor }}
      >
        0{index + 1}
      </motion.span>
      <motion.div style={{ opacity: textOpacity }} className="pt-1.5 md:pt-3">
        <h3 className="font-display text-[clamp(1.8rem,3.4vw,3rem)] font-medium leading-none tracking-[-0.035em]">
          {step.title}
        </h3>
        <p className="mt-3 max-w-md text-[16px] leading-relaxed text-lavender/65">{step.text}</p>
      </motion.div>
    </li>
  );
}

export default function Process() {
  const listRef = useRef(null);
  const scrollYProgress = useScrollProgress({ target: listRef, offset: ["start 0.7", "end 0.55"] });
  const fill = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const steps = content.process;

  return (
    <section
      id="process"
      tabIndex={-1}
      data-theme="dark"
      className="relative overflow-hidden bg-night px-5 py-24 text-lavender sm:px-8 md:px-12 md:py-36"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(40%_35%_at_85%_10%,rgba(179,203,238,0.12),transparent_70%),radial-gradient(35%_35%_at_5%_90%,rgba(255,162,127,0.10),transparent_70%)]"
      />
      <div className="relative mx-auto grid max-w-[1240px] gap-16 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <Reveal>
              <SectionLabel index="04" label="How we work" tone="dark" />
            </Reveal>
            <SplitText
              text="From brief to *growth,* in five steps."
              emClass="accent text-peach"
              className="mt-8 font-display text-[clamp(2.5rem,5.4vw,5.25rem)] font-medium leading-[0.96] tracking-[-0.045em]"
            />
            <Reveal delay={0.1}>
              <p className="mt-8 max-w-sm text-[16px] leading-relaxed text-lavender/60">
                A clear, repeatable process, so you always know what's happening and why. No black boxes, no
                guesswork.
              </p>
            </Reveal>
          </div>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <ol ref={listRef} className="relative">
            {/* track + fill */}
            <span aria-hidden="true" className="absolute bottom-6 left-6 top-6 w-px bg-white/10 md:left-8" />
            <motion.span
              aria-hidden="true"
              className="absolute bottom-6 left-6 top-6 w-px origin-top bg-peach md:left-8"
              style={{ scaleY: fill }}
            />
            {steps.map((s, i) => (
              <Step key={s.title} step={s} index={i} total={steps.length} progress={scrollYProgress} />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
