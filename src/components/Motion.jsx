import { Fragment, useRef } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";
import { parseEmphasis, stripEmphasis } from "../lib/text";
import { useScrollProgress } from "../lib/useScrollProgress";

const EASE = [0.16, 1, 0.3, 1];

/** Fades + lifts its children into view once. */
export function Reveal({ children, className = "", delay = 0, y = 28, as = "div" }) {
  const M = motion[as];
  return (
    <M
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 1, ease: EASE, delay }}
    >
      {children}
    </M>
  );
}

/** Heading whose words rise out of a mask when it scrolls into view. Supports *emphasis*. */
export function SplitText({
  text,
  as: Tag = "h2",
  className = "",
  emClass = "accent text-ember",
  delay = 0,
  stagger = 0.045,
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -12% 0px" });
  const reduce = useReducedMotion();
  const tokens = parseEmphasis(text);

  return (
    <Tag ref={ref} className={className}>
      <span className="sr-only">{stripEmphasis(text)}</span>
      <span aria-hidden="true">
        {tokens.map((t, i) => (
          <Fragment key={i}>
            <span className="inline-block overflow-hidden pr-[0.06em] pb-[0.12em] -mb-[0.12em] align-bottom">
              <motion.span
                className={`inline-block ${t.em ? emClass : ""}`}
                initial={reduce ? false : { y: "112%" }}
                animate={inView ? { y: "0%" } : undefined}
                transition={{ duration: 1.05, ease: EASE, delay: delay + i * stagger }}
              >
                {t.word}
              </motion.span>
            </span>{" "}
          </Fragment>
        ))}
      </span>
    </Tag>
  );
}

function ScrollWord({ progress, range, emClass, children }) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  return (
    <motion.span style={{ opacity }} className={emClass}>
      {children}
    </motion.span>
  );
}

/** Paragraph that "inks in" word by word as you scroll through it. */
export function ScrollWords({ text, className = "", emClass = "accent text-ember" }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const scrollYProgress = useScrollProgress({ target: ref, offset: ["start 0.88", "end 0.55"] });
  const tokens = parseEmphasis(text);
  const n = tokens.length;

  return (
    <p ref={ref} className={className}>
      <span className="sr-only">{stripEmphasis(text)}</span>
      <span aria-hidden="true">
        {tokens.map((t, i) =>
          reduce ? (
            <Fragment key={i}>
              <span className={t.em ? emClass : undefined}>{t.word}</span>{" "}
            </Fragment>
          ) : (
            <Fragment key={i}>
              <ScrollWord progress={scrollYProgress} range={[i / n, (i + 1.5) / n]} emClass={t.em ? emClass : undefined}>
                {t.word}
              </ScrollWord>{" "}
            </Fragment>
          )
        )}
      </span>
    </p>
  );
}

/** Gently pulls its child toward the cursor (mouse only). */
export function Magnetic({ children, strength = 0.32, className = "" }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.5 });

  const onMove = (e) => {
    if (e.pointerType !== "mouse") return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x: sx, y: sy }}
      onPointerMove={onMove}
      onPointerLeave={reset}
    >
      {children}
    </motion.div>
  );
}
