import { useId, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { content } from "../data/content";
import SectionLabel from "./SectionLabel";
import { Reveal, SplitText } from "./Motion";

const EASE = [0.16, 1, 0.3, 1];

function Item({ item, index, open, onToggle }) {
  const id = useId();
  return (
    <li className="border-b border-ink/10">
      <h3>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={`${id}-panel`}
          id={`${id}-btn`}
          onClick={onToggle}
          className="group flex w-full items-center gap-5 py-6 text-left md:py-7"
        >
          <span className="eyebrow w-8 shrink-0 text-ember">0{index + 1}</span>
          <span className="flex-1 font-display text-[clamp(1.25rem,2.2vw,1.75rem)] font-medium leading-tight tracking-[-0.025em] transition-colors group-hover:text-ember">
            {item.q}
          </span>
          <span
            aria-hidden="true"
            className={`relative grid h-10 w-10 shrink-0 place-items-center rounded-full transition-colors duration-300 ${
              open ? "bg-night text-peach" : "bg-paper text-ink ring-1 ring-ink/10"
            }`}
          >
            <span className="absolute h-[1.5px] w-3.5 bg-current" />
            <span
              className={`absolute h-3.5 w-[1.5px] bg-current transition-transform duration-500 ease-expo ${open ? "rotate-90 scale-y-0" : ""}`}
            />
          </span>
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={`${id}-panel`}
            role="region"
            aria-labelledby={`${id}-btn`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="overflow-hidden"
          >
            <p className="max-w-2xl pb-7 pl-[3.25rem] text-[16px] leading-relaxed text-ink/70">{item.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}

export default function Faq() {
  const [open, setOpen] = useState(0);

  return (
    <section
      id="faq"
      tabIndex={-1}
      data-theme="light"
      className="relative bg-lavender px-5 pb-24 sm:px-8 md:px-12 md:pb-36"
    >
      <div className="mx-auto grid max-w-[1240px] gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <Reveal>
              <SectionLabel index="06" label="FAQ" />
            </Reveal>
            <SplitText
              text="Questions, *answered.*"
              className="mt-8 font-display text-[clamp(2.5rem,5vw,4.5rem)] font-medium leading-[0.96] tracking-[-0.045em]"
            />
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-xs text-[16px] leading-relaxed text-ink/70">
                Something else on your mind?{" "}
                <a href="#contact" className="font-medium text-ink underline decoration-peach decoration-2 underline-offset-4">
                  Ask us directly.
                </a>
              </p>
            </Reveal>
          </div>
        </div>
        <Reveal className="lg:col-span-8">
          <ul className="border-t border-ink/10">
            {content.faq.map((item, i) => (
              <Item key={item.q} item={item} index={i} open={open === i} onToggle={() => setOpen(open === i ? -1 : i)} />
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
