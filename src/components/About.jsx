import Section from "./Section";
import { content } from "../data/content";
import CountUp from "./CountUp";

export default function About() {
  return (
    <Section id="about">
      <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-gray-900">
        {content.about.title}
      </h2>

      <div className="max-w-3xl mx-auto space-y-4">
        {content.about.text.split("\n\n").map((paragraph, i) => (
          <p key={i} className="text-center text-gray-600 text-lg leading-relaxed">
            {paragraph}
          </p>
        ))}
      </div>

      <div className="flex flex-wrap justify-center gap-16 mt-12">
        <div className="text-center">
          <p className="text-5xl font-black text-orange-500">
            <CountUp from={0} to={200} duration={2} />+
          </p>
          <p className="text-sm text-gray-500 mt-2">Brand Collaborations</p>
        </div>
        <div className="text-center">
          <p className="text-5xl font-black text-orange-500">
            <CountUp from={0} to={2000} separator="," duration={2.5} />+
          </p>
          <p className="text-sm text-gray-500 mt-2">Projects Done</p>
        </div>
      </div>
    </Section>
  );
}
