import Section from "./Section";
import { content } from "../data/content";

export default function Services() {
  return (
    <Section id="services" className="bg-light">
      <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center text-gray-900">
        Our Services
      </h2>
      <p className="text-center text-gray-500 mb-12 max-w-2xl mx-auto">
        Full-spectrum digital marketing solutions tailored for your brand.
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {content.services.map((service, i) => (
          <div
            key={i}
            className="group p-8 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-orange-200 hover:-translate-y-1 transition-all duration-300"
          >
            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
              {service.icon}
            </div>
            <h3 className="text-lg font-bold mb-3 text-gray-900">
              {service.title}
            </h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              {service.desc}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}
