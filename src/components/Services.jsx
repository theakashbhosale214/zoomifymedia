import { useState } from "react";
import Section from "./Section";
import { content } from "../data/content";

export default function Services() {
  const [expanded, setExpanded] = useState(null);

  return (
    <Section id="services" className="bg-light">
      <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center text-gray-900">
        Our Services
      </h2>
      <p className="text-center text-gray-500 mb-12 max-w-2xl mx-auto">
        Full-spectrum digital marketing solutions tailored for your brand.
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {content.services.map((service, i) => (
          <div
            key={i}
            className={`p-6 border-2 rounded-2xl cursor-pointer transition-all duration-300 ${
              expanded === i
                ? "border-primary bg-primary text-white shadow-lg scale-[1.02]"
                : "border-gray-200 bg-white hover:border-primary hover:shadow-md"
            }`}
            onClick={() => setExpanded(expanded === i ? null : i)}
          >
            <h3
              className={`text-lg font-bold mb-2 ${
                expanded === i ? "text-white" : "text-gray-900"
              }`}
            >
              {service.title}
            </h3>
            <p
              className={`text-sm leading-relaxed transition-all duration-300 ${
                expanded === i
                  ? "text-purple-100 max-h-40 opacity-100"
                  : "text-gray-500 max-h-0 opacity-0 overflow-hidden"
              }`}
            >
              {service.desc}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}
