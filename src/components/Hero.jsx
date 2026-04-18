import { content } from "../data/content";
import Button from "./Button";
import Aurora from "./Aurora";
import TrueFocus from "./TrueFocus";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-center items-center text-center overflow-hidden bg-gradient-to-br from-gray-950 via-gray-900 to-black"
    >
      {/* Aurora background */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <Aurora
          colorStops={["#FF6B35", "#6C5CE7", "#FF6B35"]}
          blend={0.6}
          amplitude={1.2}
          speed={0.8}
        />
      </div>

      <div className="relative z-10 px-6 max-w-5xl">
        {/* TrueFocus animated headline */}
        <div className="mb-6">
          <TrueFocus
            sentence="Grow Your Brand"
            manualMode={false}
            blurAmount={4}
            borderColor="#FF6B35"
            glowColor="rgba(255, 107, 53, 0.6)"
            animationDuration={0.5}
            pauseBetweenAnimations={1.2}
          />
        </div>

        <h2 className="text-2xl md:text-3xl font-bold text-orange-400 mb-4">
          High-Converting Content & Marketing
        </h2>

        <p className="text-lg md:text-xl text-gray-300 font-medium mb-10 max-w-3xl mx-auto leading-relaxed">
          {content.hero.subtitle}
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          {content.hero.ctas.map((cta, i) => (
            <Button
              key={i}
              href={cta.href}
              variant={i === 0 ? "solid" : "outline"}
              className={i === 0 ? "!bg-orange-500 hover:!bg-orange-600 !text-white !shadow-orange-500/30 !shadow-lg text-base !px-8 !py-4" : "!border-orange-400 !text-orange-400 hover:!bg-orange-500 hover:!text-white text-base !px-8 !py-4"}
            >
              {cta.label}
            </Button>
          ))}
        </div>

        <p className="mt-8 text-sm text-gray-500 italic">
          &quot;From Content to Conversion – We Build Brands That Sell&quot;
        </p>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 w-full">
        <svg viewBox="0 0 1440 120" className="w-full">
          <path
            fill="#F8F9FF"
            d="M0,64L48,58.7C96,53,192,43,288,48C384,53,480,75,576,80C672,85,768,75,864,64C960,53,1056,43,1152,48C1248,53,1344,75,1392,85.3L1440,96L1440,120L0,120Z"
          />
        </svg>
      </div>
    </section>
  );
}
