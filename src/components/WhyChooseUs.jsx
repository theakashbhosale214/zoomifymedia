import Section from "./Section";
import { content } from "../data/content";

const ICONS = ["🎯", "🧠", "💎", "⚡", "🚀"];
const ACCENTS = [
  "from-orange-500 to-amber-400",
  "from-purple-500 to-pink-400",
  "from-cyan-500 to-blue-400",
  "from-emerald-500 to-green-400",
  "from-rose-500 to-orange-400",
];

export default function WhyChooseUs() {
  return (
    <Section id="whychooseus" dark className="overflow-hidden">
      {/* Heading */}
      <div className="text-center mb-14">
        <span className="inline-block px-4 py-1 mb-4 text-xs font-bold tracking-widest text-orange-400 uppercase bg-orange-500/10 border border-orange-500/20 rounded-full">
          Why Us
        </span>
        <h2 className="text-3xl md:text-5xl font-black text-white leading-tight">
          Why Choose{" "}
          <span
            className="inline-block"
            style={{
              background: "linear-gradient(90deg,#f97316,#fb923c,#fbbf24)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Zoomify Media
          </span>
          ?
        </h2>
        <p className="mt-4 text-gray-400 max-w-xl mx-auto">
          We combine creativity with strategy to deliver measurable results for your brand.
        </p>
      </div>

      {/* Cards grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {content.whyChooseUs.map((item, i) => (
          <div
            key={i}
            className="group relative p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-orange-500/40 hover:bg-white/10 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
          >
            {/* Subtle bg glow */}
            <div
              className={`absolute -top-8 -right-8 w-28 h-28 rounded-full bg-gradient-to-br ${ACCENTS[i % ACCENTS.length]} opacity-10 group-hover:opacity-20 blur-2xl transition-opacity duration-300`}
            />

            {/* Number badge */}
            <div
              className={`inline-flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br ${ACCENTS[i % ACCENTS.length]} text-white font-black text-lg mb-4 shadow-lg`}
            >
              {ICONS[i % ICONS.length]}
            </div>

            {/* Step number */}
            <div className="absolute top-5 right-5 text-5xl font-black text-white/5 group-hover:text-white/10 transition-colors leading-none select-none">
              {String(i + 1).padStart(2, "0")}
            </div>

            <p className="relative text-white font-semibold text-lg leading-snug">
              {item.text}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}
