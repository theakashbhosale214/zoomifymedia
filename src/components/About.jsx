import Section from "./Section";
import { content } from "../data/content";

export default function About() {
  return (
    <Section id="about">
      <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-gray-900">
        {content.about.title}
      </h2>

      <p className="text-center max-w-3xl mx-auto text-gray-600 text-lg leading-relaxed">
        {content.about.text}
      </p>

      <div className="flex justify-center gap-12 mt-12">
        <div className="text-center">
          <p className="text-4xl font-black text-primary">100+</p>
          <p className="text-sm text-gray-500 mt-1">Brands Served</p>
        </div>
        <div className="text-center">
          <p className="text-4xl font-black text-primary">500+</p>
          <p className="text-sm text-gray-500 mt-1">Projects Done</p>
        </div>
        <div className="text-center">
          <p className="text-4xl font-black text-primary">50M+</p>
          <p className="text-sm text-gray-500 mt-1">Reach Generated</p>
        </div>
      </div>
    </Section>
  );
}
