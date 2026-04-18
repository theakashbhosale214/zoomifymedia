import { content } from "../data/content";
import Button from "./Button";
import Aurora from "./Aurora";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-center items-center text-center overflow-hidden bg-gradient-to-br from-primary via-purple-700 to-purple-900"
    >
      {/* Aurora background */}
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        <Aurora
          colorStops={["#A29BFE", "#6C5CE7", "#5227FF"]}
          blend={0.6}
          amplitude={1.2}
          speed={0.8}
        />
      </div>

      <div className="relative z-10 px-6 max-w-4xl">
        <h1 className="text-5xl md:text-7xl font-black text-white mb-4 tracking-tight">
          {content.hero.title}
        </h1>
        <p className="text-xl md:text-2xl text-purple-200 font-medium mb-6">
          {content.hero.subtitle}
        </p>

        <div className="flex flex-wrap justify-center gap-2 mb-10 text-purple-100">
          {content.hero.description.map((item, i) => (
            <span
              key={i}
              className="bg-white/10 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm"
            >
              {item}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          {content.hero.ctas.map((cta, i) => (
            <Button
              key={i}
              href={cta.href}
              variant={i === 0 ? "primary" : "outline"}
            >
              {cta.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 w-full">
        <svg viewBox="0 0 1440 120" className="w-full">
          <path
            fill="#ffffff"
            d="M0,64L48,58.7C96,53,192,43,288,48C384,53,480,75,576,80C672,85,768,75,864,64C960,53,1056,43,1152,48C1248,53,1344,75,1392,85.3L1440,96L1440,120L0,120Z"
          />
        </svg>
      </div>
    </section>
  );
}
