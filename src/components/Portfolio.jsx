import Section from "./Section";
import LogoLoop from "./LogoLoop";
import { content } from "../data/content";

export default function Portfolio() {
  const logoItems = content.portfolio.map(item => ({ src: item.image, alt: item.name }));
  const midpoint = Math.ceil(logoItems.length / 2);
  const row1 = logoItems.slice(0, midpoint);
  const row2 = logoItems.slice(midpoint);

  return (
    <Section id="portfolio">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-2 text-gray-900">
        Our Collaborations
      </h2>
      <p className="text-center text-gray-500 mb-10">Growing Together with 200+ Brands</p>

      {/* Scrolling logo strips */}
      <div className="mb-12 space-y-6 overflow-hidden">
        <div style={{ height: '80px', position: 'relative', overflow: 'hidden' }}>
          <LogoLoop logos={row1} speed={60} direction="left" logoHeight={64} gap={40} pauseOnHover fadeOut fadeOutColor="#ffffff" scaleOnHover />
        </div>
        {row2.length > 0 && (
          <div style={{ height: '80px', position: 'relative', overflow: 'hidden' }}>
            <LogoLoop logos={row2} speed={60} direction="right" logoHeight={64} gap={40} pauseOnHover fadeOut fadeOutColor="#ffffff" scaleOnHover />
          </div>
        )}
      </div>

    </Section>
  );
}
