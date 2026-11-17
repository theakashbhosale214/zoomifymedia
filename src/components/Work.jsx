import { useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { content } from "../data/content";
import SectionLabel from "./SectionLabel";
import { Reveal, SplitText } from "./Motion";

const ALL = "All";
const EASE = [0.16, 1, 0.3, 1];

export default function Work() {
  const [filter, setFilter] = useState(ALL);
  const filters = [ALL, ...content.industries];
  const clients = filter === ALL ? content.clients : content.clients.filter((c) => c.industry === filter);
  const count = (f) => (f === ALL ? content.clients.length : content.clients.filter((c) => c.industry === f).length);

  return (
    <section
      id="work"
      tabIndex={-1}
      data-theme="light"
      className="relative bg-lavender-2 px-5 py-24 sm:px-8 md:px-12 md:py-36"
    >
      <div className="mx-auto max-w-[1240px]">
        <div className="grid items-end gap-8 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <Reveal>
              <SectionLabel index="03" label="Selected clients" />
            </Reveal>
            <SplitText
              text="Growing together with *200+* brands."
              className="mt-8 font-display text-[clamp(2.5rem,6.4vw,6.25rem)] font-medium leading-[0.95] tracking-[-0.045em]"
            />
          </div>
          <Reveal className="lg:col-span-4">
            <p className="max-w-sm text-[16px] leading-relaxed text-ink/70">
              From real estate and interiors to cafés, weddings, finance and farming. A few of the brands we create
              for, grow with and go live for.
            </p>
          </Reveal>
        </div>

        {/* filters */}
        <LayoutGroup>
          <Reveal className="mt-12 md:mt-16">
            <div role="group" aria-label="Filter clients by industry" className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-2 sm:mx-0 sm:flex-wrap sm:px-0">
              {filters.map((f) => {
                const active = f === filter;
                return (
                  <button
                    key={f}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setFilter(f)}
                    className={`relative shrink-0 rounded-full px-4 py-2.5 text-[14px] transition-colors duration-300 ${
                      active ? "text-lavender" : "text-ink/70 hover:text-ink"
                    }`}
                  >
                    {active && (
                      <motion.span
                        layoutId="work-filter"
                        className="absolute inset-0 rounded-full bg-night"
                        transition={{ type: "spring", stiffness: 420, damping: 36 }}
                      />
                    )}
                    {!active && <span className="absolute inset-0 rounded-full border border-ink/12" />}
                    <span className="relative">
                      {f} <span className={`font-mono text-[11px] ${active ? "text-peach" : "text-mist"}`}>{count(f)}</span>
                    </span>
                  </button>
                );
              })}
            </div>
          </Reveal>

          {/* grid */}
          <motion.ul layout className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            <AnimatePresence mode="popLayout">
              {clients.map((c) => (
                <motion.li
                  key={c.name}
                  layout
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  transition={{ duration: 0.5, ease: EASE }}
                >
                  <figure className="client-tile group flex h-full flex-col overflow-hidden rounded-[1.5rem] bg-paper p-2.5 ring-1 ring-ink/5 transition-shadow duration-500 hover:shadow-[0_30px_60px_-30px_rgb(18_20_42/0.35)]">
                    <div
                      className={`relative grid aspect-[4/3] place-items-center overflow-hidden rounded-[1.1rem] ${
                        c.dark ? "bg-black" : "bg-white"
                      }`}
                    >
                      <img
                        src={c.logo}
                        alt={c.name}
                        loading="lazy"
                        decoding="async"
                        className={`absolute inset-[16%] h-[68%] w-[68%] object-contain ${c.dark ? "" : "client-logo"}`}
                      />
                    </div>
                    <figcaption className="px-2 pb-1.5 pt-3.5">
                      <span className="block truncate font-display text-[15px] font-medium tracking-[-0.01em] md:text-base">
                        {c.name}
                      </span>
                      <span className="eyebrow mt-0.5 flex items-center gap-1.5 truncate !text-[9.5px] text-mist">
                        <span className="h-1 w-1 shrink-0 rounded-full bg-peach transition-transform duration-500 group-hover:scale-150" />
                        {c.note}
                      </span>
                    </figcaption>
                  </figure>
                </motion.li>
              ))}

              <motion.li
                key="cta"
                layout
                className="col-span-2 sm:col-span-1 lg:col-span-2"
                transition={{ duration: 0.5, ease: EASE }}
              >
                <a
                  href="#contact"
                  className="group relative flex h-full min-h-[12rem] flex-col justify-between overflow-hidden rounded-[1.5rem] bg-night p-6 text-lavender"
                >
                  <span className="eyebrow text-lavender/60">Your brand?</span>
                  <span className="relative">
                    <span className="block font-display text-[1.9rem] font-medium leading-[1] tracking-[-0.03em]">
                      You could be <span className="accent text-peach">next.</span>
                    </span>
                    <span className="mt-4 inline-flex items-center gap-2 text-[14px] font-semibold text-peach">
                      Start a project
                      <span className="transition-transform duration-500 ease-expo group-hover:translate-x-1">→</span>
                    </span>
                  </span>
                  <span
                    aria-hidden="true"
                    className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-peach/20 blur-2xl transition-transform duration-700 ease-expo group-hover:scale-150"
                  />
                </a>
              </motion.li>
            </AnimatePresence>
          </motion.ul>
        </LayoutGroup>
      </div>
    </section>
  );
}
