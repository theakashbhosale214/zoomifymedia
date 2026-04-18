import Section from "./Section";
import { content } from "../data/content";
import { FaCheckCircle } from "react-icons/fa";

export default function WhyChooseUs() {
  return (
    <Section id="whychooseus" className="bg-light">
      <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center text-gray-900">
        Why Choose <span className="text-primary">Zoomify Media</span>?
      </h2>
      <p className="text-center text-gray-500 mb-12 max-w-2xl mx-auto">
        We combine creativity with strategy to deliver measurable results for your brand.
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {content.whyChooseUs.map((item, i) => (
          <div
            key={i}
            className="flex items-start gap-4 p-6 bg-white rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100"
          >
            <FaCheckCircle className="text-orange-500 text-xl flex-shrink-0 mt-1" />
            <p className="text-gray-800 font-semibold text-lg">{item.text}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
