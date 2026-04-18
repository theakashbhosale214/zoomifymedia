import Section from "./Section";
import { content } from "../data/content";

export default function Portfolio() {
  return (
    <Section id="portfolio">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-2 text-gray-900">
        Our Collaborations
      </h2>
      <p className="text-center text-gray-500 mb-12">Growing Together</p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
        {content.portfolio.map((item, i) => (
          <div
            key={i}
            className="group relative bg-gray-100 h-44 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-200"
          >
            {item.image ? (
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <div className="flex items-center justify-center h-full">
                <span className="text-gray-400 font-bold text-lg opacity-60 group-hover:opacity-100 transition-opacity">
                  {item.name}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </Section>
  );
}
