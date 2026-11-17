import { useRef } from "react";
import { motion, useReducedMotion, useTransform } from "motion/react";
import { useScrollProgress } from "../lib/useScrollProgress";
import { useMediaQuery } from "../lib/useMediaQuery";
import { FaPlay } from "react-icons/fa";
import { content } from "../data/content";
import { SELECT_SERVICE_EVENT } from "../lib/events";
import SectionLabel from "./SectionLabel";
import LogoMark from "./LogoMark";
import { Reveal, SplitText } from "./Motion";

const THEMES = [
  { card: "bg-peach text-night", panel: "bg-night/8", chip: "border-night/20 text-night/70", btn: "bg-night text-peach" },
  { card: "bg-powder text-night", panel: "bg-night/8", chip: "border-night/20 text-night/70", btn: "bg-night text-powder" },
  { card: "bg-night text-lavender", panel: "bg-white/6", chip: "border-white/15 text-lavender/70", btn: "bg-peach text-night" },
  { card: "bg-paper text-ink ring-1 ring-ink/8", panel: "bg-lavender", chip: "border-ink/15 text-ink/65", btn: "bg-ink text-lavender" },
  { card: "bg-dusk text-lavender", panel: "bg-white/6", chip: "border-white/15 text-lavender/70", btn: "bg-peach text-night" },
];

/* ── Illustrations, drawn in code ───────────────────────────────── */
function ArtReels() {
  const frames = [
    { rot: "-rotate-6", bg: "bg-[linear-gradient(180deg,#262b4a,#f2a083)]", y: "translate-y-4" },
    { rot: "rotate-0", bg: "bg-night", y: "-translate-y-2" },
    { rot: "rotate-6", bg: "bg-[linear-gradient(180deg,#b3cbee,#fdfcff)]", y: "translate-y-6" },
  ];
  return (
    <div className="flex h-full items-center justify-center gap-[4%] px-[8%]">
      {frames.map((f, i) => (
        <div key={i} className={`relative aspect-[9/16] w-[28%] overflow-hidden rounded-[14%/8%] shadow-xl ${f.bg} ${f.rot} ${f.y}`}>
          <span className="absolute inset-x-[10%] top-[6%] flex gap-[4%]">
            {[0, 1, 2].map((b) => (
              <span key={b} className={`h-[2px] flex-1 rounded-full ${b <= i ? "bg-white/90" : "bg-white/35"}`} />
            ))}
          </span>
          <span className="absolute left-1/2 top-1/2 grid aspect-square w-[34%] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-night">
            <FaPlay className="ml-[8%] w-[34%]" />
          </span>
          {i === 1 && (
            <span className="absolute inset-x-[10%] bottom-[8%] font-display text-[clamp(0.6rem,1.2vw,0.95rem)] font-semibold leading-tight text-lavender">
              Hook in <span className="accent text-peach">1s.</span>
            </span>
          )}
        </div>
      ))}
    </div>
  );
}

function ArtCalendar() {
  const filled = { 1: "bg-peach", 3: "bg-night", 4: "bg-powder-deep", 8: "bg-peach", 10: "bg-night", 12: "bg-powder-deep", 15: "bg-peach", 17: "bg-night", 19: "bg-powder-deep", 22: "bg-peach", 24: "bg-night", 26: "bg-powder-deep" };
  return (
    <div className="flex h-full flex-col p-[6%]">
      <div className="flex items-center justify-between">
        <span className="font-display text-[clamp(0.9rem,1.6vw,1.25rem)] font-semibold">Content calendar</span>
        <span className="eyebrow rounded-full bg-night px-2.5 py-1 !text-[9px] text-powder">Scheduled</span>
      </div>
      <div className="mt-[5%] grid flex-1 grid-cols-7 grid-rows-[auto_repeat(4,1fr)] gap-[3%]">
        {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
          <span key={i} className="eyebrow text-center !text-[9px] opacity-60">{d}</span>
        ))}
        {Array.from({ length: 28 }, (_, i) => (
          <span key={i} className="relative rounded-[22%] bg-white/55">
            {filled[i] && <span className={`absolute inset-[18%] rounded-[30%] ${filled[i]}`} />}
          </span>
        ))}
      </div>
    </div>
  );
}

function ArtChart() {
  const bars = [28, 36, 33, 48, 52, 61, 70, 84];
  return (
    <div className="flex h-full flex-col p-[6%]">
      <div className="flex items-center justify-between">
        <span className="font-display text-[clamp(0.9rem,1.6vw,1.25rem)] font-semibold">Campaign performance</span>
        <span className="eyebrow rounded-full bg-peach px-2.5 py-1 !text-[9px] text-night">Leads ↑</span>
      </div>
      <div className="relative mt-[6%] flex flex-1 items-end gap-[3%]">
        {bars.map((h, i) => (
          <span
            key={i}
            className={`flex-1 rounded-t-[30%] ${i === bars.length - 1 ? "bg-peach" : "bg-powder/70"}`}
            style={{ height: `${h}%` }}
          />
        ))}
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" aria-hidden="true">
          <path d="M2 78 C 20 70, 30 72, 44 58 S 70 40, 98 12" fill="none" stroke="var(--color-peach)" strokeWidth="2" vectorEffect="non-scaling-stroke" strokeDasharray="4 4" />
        </svg>
      </div>
      <div className="mt-[4%] flex justify-between font-mono text-[9px] uppercase tracking-[0.14em] opacity-50">
        <span>Week 1</span>
        <span>Week 8</span>
      </div>
    </div>
  );
}

function ArtBrand() {
  return (
    <div className="relative flex h-full items-center justify-center">
      <svg viewBox="0 0 200 150" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <g fill="none" stroke="var(--color-powder-deep)" strokeOpacity="0.45" strokeWidth="0.6">
          <circle cx="100" cy="75" r="56" />
          <circle cx="100" cy="75" r="36" strokeDasharray="2 3" />
          <line x1="0" y1="75" x2="200" y2="75" />
          <line x1="100" y1="0" x2="100" y2="150" />
          <line x1="30" y1="5" x2="170" y2="145" />
          <line x1="170" y1="5" x2="30" y2="145" />
        </g>
      </svg>
      <LogoMark className="relative h-[46%] w-auto text-ink" />
      <div className="absolute bottom-[8%] left-1/2 flex -translate-x-1/2 gap-2">
        {["bg-night", "bg-peach", "bg-powder", "bg-lavender-2", "bg-ember"].map((c) => (
          <span key={c} className={`h-5 w-5 rounded-full ring-2 ring-paper ${c}`} />
        ))}
      </div>
    </div>
  );
}

function ArtCamera() {
  return (
    <div className="relative h-full overflow-hidden bg-[radial-gradient(70%_70%_at_50%_60%,#3a3f66,#161a2f)]">
      <div className="absolute left-1/2 top-[58%] aspect-square w-[34%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_40%_35%,#fff4e4,#ffa27f_55%,transparent_72%)] opacity-80" />
      <div className="absolute inset-[7%] font-mono text-[10px] uppercase tracking-[0.12em] text-lavender">
        {["left-0 top-0 border-l-2 border-t-2", "right-0 top-0 border-r-2 border-t-2", "bottom-0 left-0 border-b-2 border-l-2", "bottom-0 right-0 border-b-2 border-r-2"].map((c) => (
          <span key={c} className={`absolute h-6 w-6 border-lavender ${c}`} />
        ))}
        <span className="absolute left-4 top-3 flex items-center gap-1.5">
          <span className="rec-dot h-2 w-2 rounded-full bg-[#ff4d4d]" /> Rec
        </span>
        <span className="absolute right-4 top-3">4K · 24</span>
        <span className="absolute bottom-3 left-4">f/1.8 · 1/50</span>
        <span className="absolute bottom-3 right-4">ISO 400</span>
        <span className="absolute left-1/2 top-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2 border border-peach" />
      </div>
    </div>
  );
}

const ART = { reels: ArtReels, calendar: ArtCalendar, chart: ArtChart, brand: ArtBrand, camera: ArtCamera };

/* ── Card ───────────────────────────────────────────────────────── */
function ServiceCard({ service, index, total, progress, stack }) {
  const t = THEMES[index % THEMES.length];
  const Art = ART[service.art];
  const scale = useTransform(progress, [index / total, 1], [1, stack ? 1 - (total - index - 1) * 0.035 : 1]);
  const pick = () => window.dispatchEvent(new CustomEvent(SELECT_SERVICE_EVENT, { detail: service.title }));

  return (
    <li className="service-card mb-4 last:mb-0 md:mb-[8vh]" style={{ "--i": index }}>
      <motion.article
        style={{ scale }}
        className={`grid origin-top gap-8 overflow-hidden rounded-[2rem] p-6 sm:p-8 md:min-h-[min(68vh,600px)] md:grid-cols-2 md:gap-10 md:p-10 ${t.card}`}
      >
        <div className="flex flex-col">
          <div className="flex items-center justify-between">
            <span className="eyebrow opacity-70">Service 0{index + 1}</span>
            <span className="eyebrow opacity-50">0{index + 1} / 0{total}</span>
          </div>
          <h3 className="mt-8 font-display text-[clamp(2.2rem,4.6vw,4.4rem)] font-medium leading-[0.98] tracking-[-0.04em] md:mt-auto">
            {service.title}
          </h3>
          <p className="mt-4 max-w-md text-[16px] leading-relaxed opacity-80">{service.desc}</p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {service.tags.map((tag) => (
              <li key={tag} className={`eyebrow rounded-full border px-3 py-1.5 !text-[10px] ${t.chip}`}>
                {tag}
              </li>
            ))}
          </ul>
          <a
            href="#contact"
            onClick={pick}
            className={`group mt-8 inline-flex w-fit items-center gap-3 rounded-full py-2 pl-5 pr-2 text-[14px] font-semibold ${t.btn}`}
          >
            Enquire about this
            <span className="grid h-8 w-8 place-items-center rounded-full bg-current/15 transition-transform duration-500 ease-expo group-hover:rotate-45">
              <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M3 11L11 3M11 3H4.5M11 3V9.5" stroke="currentColor" strokeWidth="1.8" />
              </svg>
            </span>
          </a>
        </div>
        <div aria-hidden="true" className={`relative min-h-[15rem] overflow-hidden rounded-[1.4rem] ${t.panel}`}>
          <Art />
        </div>
      </motion.article>
    </li>
  );
}

export default function Services() {
  const listRef = useRef(null);
  const reduce = useReducedMotion();
  const tablet = useMediaQuery("(min-width: 768px)");
  const scrollYProgress = useScrollProgress({ target: listRef, offset: ["start start", "end end"] });
  const services = content.services;

  return (
    <section
      id="services"
      tabIndex={-1}
      data-theme="light"
      className="relative bg-lavender px-5 pb-24 sm:px-8 md:px-12 md:pb-36"
    >
      <div className="mx-auto max-w-[1240px]">
        <div className="grid items-end gap-8 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <Reveal>
              <SectionLabel index="02" label="Services" />
            </Reveal>
            <SplitText
              text="Five ways we grow your *brand.*"
              className="mt-8 font-display text-[clamp(2.5rem,6.4vw,6.25rem)] font-medium leading-[0.95] tracking-[-0.045em]"
            />
          </div>
          <Reveal className="lg:col-span-4">
            <p className="max-w-sm text-[16px] leading-relaxed text-ink/70">
              Full-spectrum digital marketing, tailored to your brand. Pick one, or let us run the whole show.
            </p>
          </Reveal>
        </div>

        <ul ref={listRef} className="mt-14 md:mt-20">
          {services.map((s, i) => (
            <ServiceCard
              key={s.title}
              service={s}
              index={i}
              total={services.length}
              progress={scrollYProgress}
              stack={tablet && !reduce}
            />
          ))}
        </ul>
      </div>
    </section>
  );
}
