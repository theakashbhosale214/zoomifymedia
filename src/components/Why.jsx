import { FaBolt, FaBullseye, FaCamera, FaChartLine, FaLightbulb } from "react-icons/fa";
import { content } from "../data/content";
import SectionLabel from "./SectionLabel";
import { Reveal, SplitText } from "./Motion";

const ICONS = [FaBullseye, FaLightbulb, FaCamera, FaBolt, FaChartLine];

/* Bento layout: the last point ("growth, not just content") is the hero tile. */
const TILE = [
  "bg-paper text-ink ring-1 ring-ink/6 lg:col-span-2",
  "bg-powder text-night",
  "bg-paper text-ink ring-1 ring-ink/6",
  "bg-peach text-night lg:col-span-4",
  "bg-night text-lavender sm:col-span-2 lg:col-span-2 lg:row-span-2 lg:col-start-3 lg:row-start-1",
];

export default function Why() {
  const items = content.whyChooseUs;

  return (
    <section data-theme="light" className="relative bg-lavender px-5 py-24 sm:px-8 md:px-12 md:py-36">
      <div className="mx-auto max-w-[1240px]">
        <div className="grid items-end gap-8 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <Reveal>
              <SectionLabel index="05" label="Why Zoomify" />
            </Reveal>
            <SplitText
              text="Creative instinct. *Strategic* discipline."
              className="mt-8 font-display text-[clamp(2.5rem,6.4vw,6.25rem)] font-medium leading-[0.95] tracking-[-0.045em]"
            />
          </div>
          <Reveal className="lg:col-span-4">
            <p className="max-w-sm text-[16px] leading-relaxed text-ink/70">
              We combine creativity with strategy to deliver measurable results for your brand.
            </p>
          </Reveal>
        </div>

        <ul className="mt-14 grid auto-rows-[minmax(13rem,auto)] gap-3 sm:grid-cols-2 md:mt-20 lg:grid-cols-4">
          {items.map((item, i) => {
            const Icon = ICONS[i % ICONS.length];
            const hero = i === items.length - 1;
            return (
              <Reveal
                as="li"
                key={item.title}
                delay={(i % 3) * 0.07}
                className={`relative flex flex-col justify-between overflow-hidden rounded-[1.75rem] p-7 md:p-8 ${TILE[i]}`}
              >
                <span
                  className={`grid h-11 w-11 place-items-center rounded-full ${
                    hero ? "bg-peach text-night" : "bg-current/10"
                  }`}
                >
                  <Icon className={hero ? "" : "opacity-80"} />
                </span>
                <div className={hero ? "mt-16" : "mt-10"}>
                  <h3
                    className={`font-display font-medium tracking-[-0.03em] ${
                      hero ? "text-[clamp(2.2rem,4vw,3.75rem)] leading-[0.98]" : "text-[1.6rem] leading-[1.05]"
                    }`}
                  >
                    {hero ? (
                      <>
                        Growth, <span className="accent text-peach">not just</span> content.
                      </>
                    ) : (
                      item.title
                    )}
                  </h3>
                  <p className={`mt-3 max-w-sm text-[15px] leading-relaxed ${hero ? "text-lavender/65" : "opacity-70"}`}>
                    {item.text}
                  </p>
                </div>
                {hero && (
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 300 160"
                    preserveAspectRatio="none"
                    className="pointer-events-none absolute inset-x-0 top-6 h-2/5 w-full opacity-70"
                  >
                    <path
                      d="M0 150 C 50 140, 80 120, 120 122 S 200 70, 240 60 S 280 24, 300 12"
                      fill="none"
                      stroke="var(--color-peach)"
                      strokeWidth="2"
                      vectorEffect="non-scaling-stroke"
                    />
                    <circle cx="300" cy="12" r="4" fill="var(--color-peach)" />
                  </svg>
                )}
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
