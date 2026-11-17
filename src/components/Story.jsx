import { Fragment, useRef, useState } from "react";
import {
  easeInOut,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useTransform,
} from "motion/react";
import { useScrollProgress } from "../lib/useScrollProgress";
import { FaHeart, FaRegBookmark, FaRegComment, FaRegPaperPlane, FaMusic, FaUserPlus, FaEnvelope, FaShare } from "react-icons/fa";
import { content } from "../data/content";
import { parseEmphasis } from "../lib/text";
import { useMediaQuery } from "../lib/useMediaQuery";

/*
  THE STORY HERO
  ──────────────
  A pinned, scroll-driven "film" in five chapters. One frame carries the story:

    01 Unseen  — a crowd of grey posts; we zoom into one of them (the brand)
    02 Story   — a camera viewfinder finds the moment: a sunrise
    03 Craft   — an edit timeline cuts between shots, colour sliders move
    04 Reach   — the frame becomes a phone; the post goes live, likes and leads arrive
    05 Growth  — a growth line sweeps the screen behind the closing headline + CTAs

  Everything is a transform of one scroll value `p` (0 → 1), so it runs on the
  compositor. Reduced-motion visitors get the final chapter as a static hero.
  The frame's contents are sized in em, with the frame's font-size tied to its
  width, so the whole film scales with the screen.
*/

const CH = [
  [0, 0.17],
  [0.17, 0.37],
  [0.37, 0.57],
  [0.57, 0.77],
  [0.77, 1],
];
const FRAME_EM = { fontSize: "calc(var(--fw) * 0.05)" };

/** 0 → 1 → 1 → 0 across [a, b]. */
function useBand(p, a, b, edge = 0.035) {
  return useTransform(p, [a, a + edge, b - edge, b], [0, 1, 1, 0]);
}

function Emph({ text, emClass = "accent text-peach" }) {
  return parseEmphasis(text).map((t, i) => (
    <Fragment key={i}>
      {t.em ? <span className={emClass}>{t.word}</span> : t.word}{" "}
    </Fragment>
  ));
}

/* ── Chapter 01: the crowded, grey feed ─────────────────────────── */
function GhostContent({ brand = false }) {
  return (
    <>
      <div className="flex items-center gap-[0.6em]">
        <span className="skeleton h-[1.9em] w-[1.9em] shrink-0 rounded-full" />
        <span className="flex-1 space-y-[0.35em]">
          <span className="skeleton block h-[0.45em] w-[70%] rounded-full" />
          <span className="skeleton block h-[0.45em] w-[40%] rounded-full" />
        </span>
      </div>
      <div className="skeleton relative mt-[0.9em] flex-1 rounded-[1em]">
        {brand && (
          <span className="whisper absolute left-1/2 top-1/2 h-[0.9em] w-[0.9em] -translate-x-1/2 -translate-y-1/2 rounded-full bg-peach" />
        )}
      </div>
      <div className="mt-[0.9em] space-y-[0.4em]">
        <span className="skeleton block h-[0.45em] w-[85%] rounded-full" />
        <span className="skeleton block h-[0.45em] w-[55%] rounded-full" />
      </div>
    </>
  );
}

function GreyFeed({ p }) {
  const opacity = useTransform(p, [0.1, 0.2], [1, 0]);
  return (
    <motion.div
      aria-hidden="true"
      className="feed-grid absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2"
      style={{ opacity }}
    >
      {Array.from({ length: 35 }, (_, i) =>
        i === 17 ? (
          <div key={i} />
        ) : (
          <div
            key={i}
            className="flex flex-col rounded-[1.7em] bg-night-2 p-[1.2em] ring-1 ring-white/5"
            style={{ ...FRAME_EM, opacity: 0.35 + ((i * 37) % 45) / 100 }}
          >
            <GhostContent />
          </div>
        )
      )}
    </motion.div>
  );
}

/* ── The frame and its shots ────────────────────────────────────── */
function ShotSunrise({ p }) {
  const opacity = useTransform(p, [0.449, 0.451], [1, 0]);
  const sunTop = useTransform(p, [0.17, 0.36], ["66%", "30%"]);
  const dark = useTransform(p, [0.18, 0.34], [0.78, 0]);
  return (
    <motion.div className="absolute inset-0" style={{ opacity }}>
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#141833_0%,#2d2f58_36%,#7a6389_60%,#f2a083_84%,#ffd0ab_100%)]" />
      <motion.div
        className="absolute left-1/2 aspect-square w-[42%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_50%_38%,#fff4e4,#ffbb97_58%,#ff9f7a)] shadow-[0_0_4em_1.4em_rgba(255,170,130,0.45)]"
        style={{ top: sunTop }}
      />
      <svg className="absolute inset-x-0 bottom-0 h-[40%] w-full" viewBox="0 0 90 60" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0 24 C 15 14, 25 19, 38 12 S 62 6, 74 15 S 86 17, 90 12 L90 60 L0 60Z" fill="#4f72ae" fillOpacity="0.85" />
        <path d="M0 37 C 12 29, 26 35, 40 29 S 66 25, 90 33 L90 60 L0 60Z" fill="#262b4a" />
        <path d="M0 50 C 20 43, 40 50, 60 44 S 80 46, 90 43 L90 60 L0 60Z" fill="#0d1020" />
      </svg>
      <motion.div className="absolute inset-0 bg-night" style={{ opacity: dark }} />
    </motion.div>
  );
}

function ShotProduct({ p }) {
  const opacity = useTransform(p, [0.449, 0.451, 0.519, 0.521], [0, 1, 1, 0]);
  return (
    <motion.div
      className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_28%,#e4ecfa,#b3cbee_55%,#8eaee0)]"
      style={{ opacity }}
    >
      <p className="eyebrow absolute left-[1.3em] top-[4.4em] !text-[0.6em] text-night/70">New drop</p>
      <span className="absolute left-1/2 top-[79%] h-[0.9em] w-[46%] -translate-x-1/2 rounded-[50%] bg-night/25 blur-[0.35em]" />
      <svg
        viewBox="0 0 100 180"
        className="absolute left-1/2 top-[47%] w-[44%] -translate-x-1/2 -translate-y-1/2"
        aria-hidden="true"
      >
        <rect x="38" y="4" width="24" height="26" rx="5" fill="#12142a" />
        <rect x="34" y="27" width="32" height="11" rx="3" fill="#262b4a" />
        <rect x="14" y="36" width="72" height="138" rx="20" fill="#fdfcff" />
        <rect x="18" y="44" width="14" height="120" rx="7" fill="#ffffff" />
        <rect x="24" y="86" width="52" height="48" rx="6" fill="#ffa27f" />
        <text x="50" y="108" textAnchor="middle" fontSize="11" fontWeight="700" fontFamily="Bricolage Grotesque, sans-serif" fill="#12142a">GLOW</text>
        <text x="50" y="122" textAnchor="middle" fontSize="5.5" letterSpacing="1.5" fontFamily="DM Mono, monospace" fill="#12142a">SERUM</text>
      </svg>
      <p className="absolute inset-x-[1.3em] bottom-[2.2em] font-display text-[1.5em] font-semibold leading-[1] tracking-[-0.03em] text-night">
        Meet your new <span className="accent font-normal">favourite.</span>
      </p>
    </motion.div>
  );
}

function ShotLive({ p }) {
  const opacity = useTransform(p, [0.519, 0.521], [0, 1]);
  return (
    <motion.div className="absolute inset-0 bg-peach" style={{ opacity }}>
      <div className="absolute inset-0 bg-[radial-gradient(90%_60%_at_85%_8%,rgba(255,255,255,0.5),transparent_60%)]" />
      <span className="absolute right-[1.2em] top-[24%] rotate-12 rounded-full bg-night px-[0.8em] py-[0.35em] font-mono text-[0.6em] uppercase tracking-[0.14em] text-peach">
        ✦ New
      </span>
      <p className="absolute inset-x-[1.1em] top-[30%] font-display text-[3.6em] font-bold leading-[0.84] tracking-[-0.05em] text-night">
        Now
        <br />
        live<span className="text-lavender">.</span>
      </p>
      <p className="absolute inset-x-[1.2em] top-[64%] max-w-[9em] text-[0.8em] leading-snug text-night/75">
        Your story, out in the world.
      </p>
    </motion.div>
  );
}

function Viewfinder({ p }) {
  const opacity = useBand(p, 0.19, 0.57, 0.04);
  const fy = useTransform(p, [0.22, 0.33], ["52%", "33%"]);
  const timecode = useTransform(p, (v) => {
    const t = Math.min(Math.max((v - 0.17) / 0.4, 0), 1);
    const f = Math.floor(t * 15 * 24);
    return `00:00:${String(Math.floor(f / 24)).padStart(2, "0")}:${String(f % 24).padStart(2, "0")}`;
  });
  const corner = "absolute h-[1.5em] w-[1.5em] border-white";
  return (
    <motion.div className="pointer-events-none absolute inset-0 font-mono text-white" style={{ opacity }}>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,transparent_33.2%,rgba(255,255,255,0.18)_33.3%,transparent_33.4%,transparent_66.5%,rgba(255,255,255,0.18)_66.6%,transparent_66.7%),linear-gradient(to_bottom,transparent_33.2%,rgba(255,255,255,0.18)_33.3%,transparent_33.4%,transparent_66.5%,rgba(255,255,255,0.18)_66.6%,transparent_66.7%)]" />
      <span className={`${corner} left-[0.8em] top-[0.8em] border-l-2 border-t-2`} />
      <span className={`${corner} right-[0.8em] top-[0.8em] border-r-2 border-t-2`} />
      <span className={`${corner} bottom-[0.8em] left-[0.8em] border-b-2 border-l-2`} />
      <span className={`${corner} bottom-[0.8em] right-[0.8em] border-b-2 border-r-2`} />
      <div className="absolute inset-x-[1.4em] top-[1.35em] flex items-center justify-between text-[0.58em] tracking-[0.12em]">
        <span className="flex items-center gap-[0.5em]">
          <span className="rec-dot h-[0.75em] w-[0.75em] rounded-full bg-[#ff4d4d]" /> REC
        </span>
        <span>4K · 24FPS</span>
      </div>
      <div className="absolute inset-x-[1.4em] bottom-[1.35em] flex items-center justify-between text-[0.58em] tracking-[0.12em]">
        <motion.span className="tabular-nums">{timecode}</motion.span>
        <span>ISO 400</span>
      </div>
      <motion.span
        className="absolute left-1/2 h-[3.4em] w-[3.4em] -translate-x-1/2 -translate-y-1/2 border border-peach"
        style={{ top: fy }}
      >
        <span className="absolute left-1/2 top-1/2 h-[0.5em] w-px -translate-x-1/2 -translate-y-1/2 bg-peach" />
        <span className="absolute left-1/2 top-1/2 h-px w-[0.5em] -translate-x-1/2 -translate-y-1/2 bg-peach" />
      </motion.span>
    </motion.div>
  );
}

function PhoneChrome({ p }) {
  const opacity = useTransform(p, [0.6, 0.66], [0, 1]);
  const hearts = useBand(p, 0.6, 0.79, 0.03);
  return (
    <motion.div className="pointer-events-none absolute inset-0 text-night" style={{ opacity }}>
      <div className="absolute inset-x-[1em] top-[2.4em] flex gap-[0.3em]">
        {[1, 1, 0.4].map((o, i) => (
          <span key={i} className="h-[0.14em] flex-1 rounded-full bg-night/25">
            <span className="block h-full rounded-full bg-night" style={{ width: `${o * 100}%` }} />
          </span>
        ))}
      </div>
      <div className="absolute inset-x-[1em] top-[3.2em] flex items-center gap-[0.55em]">
        <span className="grid h-[1.9em] w-[1.9em] place-items-center rounded-full bg-night font-display text-[0.8em] font-bold text-peach">
          Y
        </span>
        <span className="text-[0.72em] font-semibold">your.brand</span>
        <span className="ml-auto rounded-full border border-night/40 px-[0.7em] py-[0.2em] text-[0.6em] font-semibold">Follow</span>
      </div>

      <div className="absolute bottom-[5.2em] right-[0.9em] flex flex-col items-center gap-[1em] text-[1.05em]">
        <span className="relative">
          <FaHeart className="text-ember" />
          <motion.span className="absolute inset-0" style={{ opacity: hearts }}>
            {[
              ["-0.6em", "0s"],
              ["0.5em", "0.45s"],
              ["-0.2em", "0.9s"],
              ["0.7em", "1.35s"],
              ["-0.8em", "1.8s"],
              ["0.2em", "2.2s"],
            ].map(([hx, d], i) => (
              <FaHeart
                key={i}
                className={`heart-up ${i % 2 ? "text-night" : "text-ember"}`}
                style={{ "--hx": hx, animationDelay: d }}
              />
            ))}
          </motion.span>
        </span>
        <FaRegComment />
        <FaRegPaperPlane />
        <FaRegBookmark />
      </div>

      <div className="absolute bottom-[1.3em] left-[1em] right-[3.6em]">
        <p className="text-[0.72em] font-semibold">your.brand</p>
        <p className="mt-[0.15em] text-[0.66em] leading-snug text-night/80">Now live ✦ link in bio</p>
        <p className="mt-[0.4em] flex items-center gap-[0.4em] text-[0.58em] text-night/70">
          <FaMusic /> Original audio · your.brand
        </p>
      </div>
    </motion.div>
  );
}

function Frame({ p }) {
  const skin = useTransform(p, [0, 0.13, 0.21], [1, 1, 0]);
  const flash = useTransform(p, [0.44, 0.45, 0.47, 0.51, 0.52, 0.54], [0, 0.85, 0, 0, 0.85, 0]);
  const bezel = useTransform(p, [0.58, 0.64], [0, 1]);

  return (
    <div className="story-frame absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2" style={FRAME_EM}>
      <motion.div
        aria-hidden="true"
        className="absolute -inset-[0.6em] rounded-[2.3em] bg-night-2 shadow-[0_50px_120px_-30px_rgba(0,0,0,0.85)] ring-1 ring-white/12"
        style={{ opacity: bezel }}
      />
      <div className="absolute inset-0 overflow-hidden rounded-[1.7em] bg-night">
        <ShotSunrise p={p} />
        <ShotProduct p={p} />
        <ShotLive p={p} />
        <motion.div className="absolute inset-0 flex flex-col bg-night-2 p-[1.2em]" style={{ opacity: skin }}>
          <GhostContent brand />
        </motion.div>
        <motion.div className="absolute inset-0 bg-white" style={{ opacity: flash }} />
        <Viewfinder p={p} />
        <PhoneChrome p={p} />
      </div>
      <motion.span
        aria-hidden="true"
        className="absolute left-1/2 top-[0.7em] h-[1.05em] w-[4.6em] -translate-x-1/2 rounded-full bg-black"
        style={{ opacity: bezel }}
      />
    </div>
  );
}

/* ── Chapter 03 tools: timeline + grade panel ───────────────────── */
const WAVE = Array.from({ length: 56 }, (_, i) => 25 + Math.round(Math.abs(Math.sin(i * 1.7) * 55 + Math.sin(i * 0.45) * 20)));

function Timeline({ p }) {
  const opacity = useBand(p, 0.37, 0.58, 0.04);
  const y = useTransform(p, [0.37, 0.42], [28, 0]);
  const head = useTransform(p, [0.38, 0.57], ["0%", "100%"]);
  return (
    <motion.div
      aria-hidden="true"
      className="absolute left-0 -translate-x-1/2 rounded-[1em] border border-white/10 bg-night-2/90 p-[0.8em] shadow-[0_30px_60px_-20px_rgba(0,0,0,0.7)] backdrop-blur-md"
      style={{
        ...FRAME_EM,
        opacity,
        y,
        top: "calc(var(--fh) * 0.5 - 1.4em)",
        width: "calc(var(--fw) * var(--tl, 1.25))",
      }}
    >
      <div className="flex items-center justify-between font-mono text-[0.55em] uppercase tracking-[0.14em] text-lavender/60">
        <span>Timeline · Brand film</span>
        <span className="text-peach">● Editing</span>
      </div>
      <div className="relative mt-[0.65em] space-y-[0.35em] font-mono text-[0.5em] text-lavender/50">
        <div className="flex items-center gap-[0.8em]">
          <span className="w-[2.2em]">V1</span>
          <div className="flex h-[3em] flex-1 gap-[2px] text-night">
            <span className="flex w-[37%] items-center rounded-[0.6em] bg-[linear-gradient(90deg,#2d2f58,#f2a083)] px-[0.7em] text-lavender">Sunrise</span>
            <span className="flex w-[37%] items-center rounded-[0.6em] bg-powder px-[0.7em]">Product</span>
            <span className="flex flex-1 items-center rounded-[0.6em] bg-peach px-[0.7em]">Live</span>
          </div>
        </div>
        <div className="flex items-center gap-[0.8em]">
          <span className="w-[2.2em]">T1</span>
          <div className="relative h-[2em] flex-1">
            <span className="absolute inset-y-0 left-[4%] flex w-[26%] items-center rounded-[0.6em] bg-lavender/85 px-[0.7em] text-night">Hook</span>
            <span className="absolute inset-y-0 left-[76%] flex w-[24%] items-center rounded-[0.6em] bg-lavender/85 px-[0.7em] text-night">CTA</span>
          </div>
        </div>
        <div className="flex items-center gap-[0.8em]">
          <span className="w-[2.2em]">A1</span>
          <div className="flex h-[2.4em] flex-1 items-center gap-[1px]">
            {WAVE.map((h, i) => (
              <span key={i} className="flex-1 rounded-full bg-powder/55" style={{ height: `${h}%` }} />
            ))}
          </div>
        </div>
        <div className="pointer-events-none absolute inset-y-[-0.6em] left-[3em] right-0">
          <motion.span className="absolute inset-y-0 w-[2px] -translate-x-1/2 bg-peach" style={{ left: head }}>
            <span className="absolute -top-[0.4em] left-1/2 h-[1em] w-[1em] -translate-x-1/2 rotate-45 rounded-[0.2em] bg-peach" />
          </motion.span>
        </div>
      </div>
    </motion.div>
  );
}

function GradeSlider({ p, label, from, to }) {
  const left = useTransform(p, [0.39, 0.56], [from, to]);
  return (
    <div>
      <div className="flex justify-between text-[0.55em] uppercase tracking-[0.12em] text-lavender/55">
        <span>{label}</span>
      </div>
      <div className="relative mt-[0.4em] h-[0.18em] rounded-full bg-white/15">
        <motion.span className="absolute top-1/2 h-[0.8em] w-[0.8em] -translate-x-1/2 -translate-y-1/2 rounded-full bg-lavender ring-2 ring-peach" style={{ left }} />
      </div>
    </div>
  );
}

function GradePanel({ p }) {
  const opacity = useBand(p, 0.39, 0.57, 0.04);
  const x = useTransform(p, [0.39, 0.44], [-20, 0]);
  return (
    <motion.div
      aria-hidden="true"
      className="absolute hidden -translate-x-full space-y-[0.9em] rounded-[1em] border border-white/10 bg-night-2/85 p-[1em] font-mono backdrop-blur-md lg:block"
      style={{
        ...FRAME_EM,
        opacity,
        x,
        width: "9em",
        left: "calc(var(--fw) * -0.5 - 1em)",
        top: "calc(var(--fh) * -0.34)",
      }}
    >
      <p className="text-[0.55em] uppercase tracking-[0.14em] text-peach">Colour grade</p>
      <GradeSlider p={p} label="Exposure" from="30%" to="62%" />
      <GradeSlider p={p} label="Warmth" from="45%" to="82%" />
      <GradeSlider p={p} label="Contrast" from="55%" to="38%" />
    </motion.div>
  );
}

/* ── Chapter 04: notifications around the phone ─────────────────── */
const TOASTS = [
  { icon: FaHeart, text: "Your reel is getting love", tint: "bg-ember", side: "left", y: -0.3, mobile: true },
  { icon: FaShare, text: "Shared to stories", tint: "bg-powder-deep", side: "right", y: -0.12 },
  { icon: FaEnvelope, text: "New enquiry received", tint: "bg-peach text-night", side: "left", y: 0.12, mobile: true },
  { icon: FaUserPlus, text: "New followers", tint: "bg-lavender text-night", side: "right", y: 0.28 },
];

function Toast({ p, toast, index, desktop }) {
  const start = 0.62 + index * 0.025;
  const opacity = useTransform(p, [start, start + 0.03, 0.765, 0.79], [0, 1, 1, 0]);
  const x = useTransform(p, [start, start + 0.04], [toast.side === "left" ? -24 : 24, 0]);
  if (!desktop && !toast.mobile) return null;

  const Icon = toast.icon;
  const left = desktop
    ? toast.side === "left"
      ? "calc(var(--fw) * -0.5 - 14px)"
      : "calc(var(--fw) * 0.5 + 14px)"
    : index === 0
      ? "calc(-50vw + 16px)"
      : "calc(50vw - 16px)";
  const shift = desktop ? (toast.side === "left" ? "-translate-x-full" : "") : index === 0 ? "" : "-translate-x-full";

  return (
    <motion.div
      aria-hidden="true"
      className={`absolute flex items-center gap-[0.6em] whitespace-nowrap rounded-full border border-white/10 bg-night-2/90 py-[0.45em] pl-[0.45em] pr-[1em] text-lavender shadow-[0_20px_40px_-15px_rgba(0,0,0,0.7)] backdrop-blur-md ${shift}`}
      style={{
        fontSize: "clamp(11px, calc(var(--fw) * 0.042), 15px)",
        opacity,
        x,
        left,
        top: `calc(var(--fh) * ${desktop ? toast.y : index === 0 ? -0.44 : 0.3})`,
      }}
    >
      <span className={`grid h-[2em] w-[2em] place-items-center rounded-full ${toast.tint}`}>
        <Icon className="h-[0.85em] w-[0.85em]" />
      </span>
      <span className="font-medium">{toast.text}</span>
    </motion.div>
  );
}

/* ── Chapter 05: the growth line ────────────────────────────────── */
function GrowthChart({ p }) {
  const opacity = useTransform(p, [0.76, 0.8], [0, 1]);
  const draw = useTransform(p, [0.78, 0.95], [0, 1]);
  const fill = useTransform(p, [0.84, 0.97], [0, 1]);
  const line = "M0 840 C 180 820, 300 760, 430 770 S 640 640, 780 650 S 1000 470, 1120 430 S 1330 220, 1440 150";
  // On phones the chart sits in the top half, behind the phone, so it never crosses the copy.
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-[52%] opacity-55 lg:h-full lg:opacity-100">
    <motion.svg
      viewBox="0 0 1440 900"
      preserveAspectRatio="none"
      className="h-full w-full"
      style={{ opacity }}
    >
      <defs>
        <linearGradient id="story-area" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#b3cbee" stopOpacity="0.16" />
          <stop offset="100%" stopColor="#b3cbee" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[225, 450, 675].map((y) => (
        <line key={y} x1="0" x2="1440" y1={y} y2={y} stroke="#ffffff" strokeOpacity="0.05" vectorEffect="non-scaling-stroke" />
      ))}
      <motion.path d={`${line} L1440 900 L0 900Z`} fill="url(#story-area)" style={{ opacity: fill }} />
      <motion.path
        d={line}
        fill="none"
        stroke="#ffa27f"
        strokeWidth="2.5"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        style={{ pathLength: draw }}
      />
    </motion.svg>
    </div>
  );
}

/* ── Text beats ─────────────────────────────────────────────────── */
function Beat({ p, index, label, line }) {
  const [a, b] = CH[index];
  const first = index === 0;
  const opacity = useTransform(p, first ? [0, b - 0.035, b] : [a, a + 0.035, b - 0.035, b], first ? [1, 1, 0] : [0, 1, 1, 0]);
  const y = useTransform(p, first ? [0, b - 0.04, b] : [a, a + 0.05, b - 0.04, b], first ? [0, 0, -30] : [36, 0, 0, -30]);

  return (
    <motion.div className="[grid-area:1/1] self-end lg:self-center" style={{ opacity, y }}>
      <motion.div
        initial={first ? { opacity: 0, y: 24 } : false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
      >
        <p className="eyebrow flex items-center gap-3 text-lavender/55">
          <span className="text-peach">0{index + 1}</span>
          <span className="h-px w-8 bg-lavender/25" />
          {label}
        </p>
        <h2 className="mt-5 max-w-[14ch] font-display text-[clamp(2rem,7.6vw,3.2rem)] font-medium leading-[1.02] tracking-[-0.035em] lg:text-[clamp(2.6rem,4.3vw,4.9rem)]">
          <Emph text={line} />
        </h2>
      </motion.div>
    </motion.div>
  );
}

function FinalBeat({ p, desktop }) {
  const opacity = useTransform(p, [0.77, 0.82], [0, 1]);
  const y = useTransform(p, [0.77, 0.84], [40, 0]);
  const pointerEvents = useTransform(p, (v) => (v > 0.79 ? "auto" : "none"));
  const s = content.story;
  const last = s.chapters[4];

  return (
    <motion.div className="[grid-area:1/1] self-end lg:self-center" style={{ opacity, y, pointerEvents }}>
      <p className="eyebrow flex items-center gap-3 text-lavender/55">
        <span className="live-dot" />
        {s.eyebrow}
      </p>
      <h1 className="mt-5 max-w-[12ch] font-display text-[clamp(2.3rem,9vw,3.6rem)] font-medium leading-[0.98] tracking-[-0.04em] lg:text-[clamp(3rem,5.2vw,6rem)]">
        <Emph text={last.line} />
      </h1>
      <p className="mt-5 max-w-md text-[15px] leading-relaxed text-lavender/65 lg:mt-7 lg:text-base">{s.subtitle}</p>
      <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 lg:mt-9">
        <a
          href="#contact"
          className="group inline-flex items-center gap-3 rounded-full bg-peach py-2 pl-6 pr-2 text-[15px] font-semibold text-night transition-colors duration-300 hover:bg-lavender"
        >
          Start a project
          <span className="grid h-10 w-10 place-items-center rounded-full bg-night text-peach transition-transform duration-500 ease-expo group-hover:rotate-45">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M3 11L11 3M11 3H4.5M11 3V9.5" stroke="currentColor" strokeWidth="1.6" />
            </svg>
          </span>
        </a>
        <a href="#work" className="text-[15px] font-medium text-lavender underline decoration-lavender/30 underline-offset-[6px] transition-colors hover:decoration-peach">
          Explore our work
        </a>
      </div>
      {desktop && (
        <dl className="mt-12 flex gap-12 border-t border-white/10 pt-6">
          {content.stats.slice(0, 2).map((st) => (
            <div key={st.label} className="flex flex-col-reverse">
              <dt className="eyebrow mt-1 text-lavender/50">{st.label}</dt>
              <dd className="font-display text-4xl font-medium tracking-[-0.03em]">
                {st.value.toLocaleString("en-IN")}
                <span className="text-peach">{st.suffix}</span>
              </dd>
            </div>
          ))}
        </dl>
      )}
    </motion.div>
  );
}

/* ── Progress rail ──────────────────────────────────────────────── */
function Segment({ p, index }) {
  const [a, b] = CH[index];
  const scaleX = useTransform(p, [a, b], [0, 1]);
  return (
    <span className="relative h-[2px] flex-1 overflow-hidden rounded-full bg-white/15">
      <motion.span className="absolute inset-0 origin-left bg-peach" style={{ scaleX }} />
    </span>
  );
}

const chapterAt = (v) => {
  const i = CH.findIndex(([a, b]) => v >= a && v < b);
  return i === -1 ? 4 : i;
};

function Rail({ p }) {
  const [active, setActive] = useState(() => chapterAt(p.get()));
  useMotionValueEvent(p, "change", (v) => setActive(chapterAt(v)));
  const cue = useTransform(p, [0, 0.03], [1, 0]);
  const chapters = content.story.chapters;

  return (
    <div className="absolute inset-x-0 bottom-0 z-20 px-5 pb-5 sm:px-8 md:px-12 md:pb-7">
      <motion.div
        aria-hidden="true"
        className="mb-6 flex flex-col items-center gap-2 text-lavender/50"
        style={{ opacity: cue }}
      >
        <span className="eyebrow">Scroll to play the story</span>
        <span className="relative h-8 w-px overflow-hidden bg-white/15">
          <span className="scroll-cue absolute inset-0 bg-peach" />
        </span>
      </motion.div>

      <div className="flex items-center gap-5 md:gap-8">
        <a href="#about" className="eyebrow shrink-0 text-lavender/60 transition-colors hover:text-peach">
          Skip the story ↓
        </a>
        <div className="flex flex-1 flex-col gap-2">
          <div className="flex gap-1.5">
            {chapters.map((c, i) => (
              <Segment key={c.label} p={p} index={i} />
            ))}
          </div>
          <div className="hidden gap-1.5 md:flex">
            {chapters.map((c, i) => (
              <span
                key={c.label}
                className={`eyebrow flex-1 !text-[10px] transition-colors duration-500 ${
                  i === active ? "text-lavender" : "text-lavender/35"
                }`}
              >
                0{i + 1} {c.label}
              </span>
            ))}
          </div>
        </div>
        <span className="eyebrow shrink-0 text-lavender/70 md:hidden" aria-live="polite">
          0{active + 1} {chapters[active].label}
        </span>
      </div>
    </div>
  );
}

/* ── The section ────────────────────────────────────────────────── */
export default function Story() {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const desktop = useMediaQuery("(min-width: 1024px)");
  const scrollProgress = useScrollProgress({ target: ref, offset: ["start start", "end end"] });
  const still = useMotionValue(1);
  const p = reduce ? still : scrollProgress;

  const zoom = useTransform(p, [0.06, 0.23], [0.3, 1], { ease: easeInOut });
  const endScale = useTransform(p, [0.77, 0.9], [1, desktop ? 0.86 : 0.6]);
  const endX = useTransform(p, [0.77, 0.9], ["0vw", desktop ? "3vw" : "0vw"]);
  const endY = useTransform(p, [0.77, 0.9], ["0vh", desktop ? "0vh" : "-11vh"]);
  const warm = useTransform(p, [0.17, 0.3, 0.55, 0.62], [0, 1, 1, 0]);
  const cool = useTransform(p, [0.57, 0.72], [0, 1]);

  return (
    <section
      id="home"
      ref={ref}
      tabIndex={-1}
      data-theme="dark"
      aria-label="The Zoomify story"
      className={`relative bg-night text-lavender ${reduce ? "h-[100svh]" : "h-[560vh]"}`}
    >
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        {/* backdrop */}
        <div className="absolute inset-0 bg-[radial-gradient(70%_45%_at_50%_36%,#1b2042_0%,#0d1020_72%)] lg:bg-[radial-gradient(55%_60%_at_68%_48%,#1b2042_0%,#0d1020_72%)]" />
        <motion.div
          className="absolute inset-0 bg-[radial-gradient(45%_30%_at_50%_38%,rgba(255,162,127,0.22),transparent_70%)] lg:bg-[radial-gradient(32%_42%_at_68%_48%,rgba(255,162,127,0.22),transparent_70%)]"
          style={{ opacity: warm }}
        />
        <motion.div
          className="absolute inset-0 bg-[radial-gradient(55%_35%_at_50%_36%,rgba(179,203,238,0.16),transparent_70%)] lg:bg-[radial-gradient(40%_50%_at_68%_45%,rgba(179,203,238,0.16),transparent_70%)]"
          style={{ opacity: cool }}
        />
        <GrowthChart p={p} />

        {/* stage */}
        <div className="story-stage absolute inset-0 [--tl:1.25] lg:[--tl:1.6]">
          <motion.div
            className="absolute left-1/2 top-[40%] lg:left-[68%] lg:top-[47%]"
            style={{ scale: endScale, x: endX, y: endY }}
          >
            <motion.div className="absolute left-0 top-0" style={{ scale: zoom }}>
              <GreyFeed p={p} />
              <Frame p={p} />
            </motion.div>
            <Timeline p={p} />
            <GradePanel p={p} />
            {TOASTS.map((t, i) => (
              <Toast key={t.text} p={p} toast={t} index={i} desktop={desktop} />
            ))}
          </motion.div>
        </div>

        {/* words */}
        <div className="pointer-events-none absolute inset-0 z-10 grid px-5 pb-[17svh] pt-28 sm:px-8 md:px-12 lg:w-[44%] lg:pb-24 lg:pt-28">
          {content.story.chapters.slice(0, 4).map((c, i) => (
            <Beat key={c.label} p={p} index={i} label={c.label} line={c.line} />
          ))}
          <FinalBeat p={p} desktop={desktop} />
        </div>

        {!reduce && <Rail p={p} />}
      </div>
    </section>
  );
}
