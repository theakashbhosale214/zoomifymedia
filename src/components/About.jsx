import { content } from "../data/content";
import SectionLabel from "./SectionLabel";
import CountUp from "./CountUp";
import { Reveal, ScrollWords } from "./Motion";

const STAT_STYLES = [
  "bg-night text-lavender",
  "bg-peach text-night",
  "bg-powder text-night",
];

export default function About() {
  return (
    <section
      id="about"
      tabIndex={-1}
      data-theme="light"
      className="relative overflow-hidden bg-lavender px-5 py-24 sm:px-8 md:px-12 md:py-36"
    >
      <div className="mx-auto max-w-[1240px]">
        <Reveal>
          <SectionLabel index="01" label="The studio" />
        </Reveal>

        <ScrollWords
          text={content.about.statement}
          className="mt-10 max-w-[22ch] font-display text-[clamp(2rem,5vw,4.75rem)] font-medium leading-[1.04] tracking-[-0.04em] md:mt-14"
        />

        <div className="mt-16 grid gap-12 md:mt-24 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="max-w-md text-[16px] leading-relaxed text-ink/70">{content.about.body}</p>
            </Reveal>
            <ul className="mt-10 border-t border-ink/10">
              {content.about.pillars.map((pl, i) => (
                <Reveal as="li" key={pl.title} delay={i * 0.06} y={18} className="flex gap-5 border-b border-ink/10 py-5">
                  <span className="eyebrow pt-1 text-ember">0{i + 1}</span>
                  <div>
                    <h3 className="font-display text-xl font-medium tracking-[-0.02em]">{pl.title}</h3>
                    <p className="mt-1 text-[15px] leading-relaxed text-mist">{pl.text}</p>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>

          <dl className="grid gap-3 sm:grid-cols-2 lg:col-span-7 lg:grid-rows-2">
            {content.stats.map((s, i) => (
              <Reveal
                key={s.label}
                delay={i * 0.08}
                className={`relative flex min-h-[13rem] flex-col justify-between overflow-hidden rounded-[1.75rem] p-7 md:p-8 ${STAT_STYLES[i]} ${
                  i === 0 ? "sm:row-span-2 sm:min-h-full" : ""
                }`}
              >
                <dt className="eyebrow opacity-70">{s.label}</dt>
                <dd className="mt-10 font-display text-[clamp(3.5rem,8vw,6.5rem)] font-medium leading-[0.9] tracking-[-0.05em]">
                  <CountUp to={s.value} />
                  <span className={i === 0 ? "text-peach" : ""}>{s.suffix}</span>
                </dd>
                {i === 0 && (
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 300 120"
                    preserveAspectRatio="none"
                    className="absolute inset-x-0 top-1/3 h-1/3 w-full opacity-60"
                  >
                    <path
                      d="M0 110 C 60 100, 90 80, 140 82 S 220 40, 300 14"
                      fill="none"
                      stroke="var(--color-peach)"
                      strokeWidth="2"
                      vectorEffect="non-scaling-stroke"
                    />
                  </svg>
                )}
              </Reveal>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
