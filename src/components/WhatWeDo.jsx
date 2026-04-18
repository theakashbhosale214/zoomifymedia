import Section from "./Section";
import Card from "./Card";
import ElectricBorder from "./ElectricBorder";
import { content } from "../data/content";

export default function WhatWeDo() {
  return (
    <Section id="whatwedo" className="bg-light">
      <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center text-gray-900">
        What We Do
      </h2>
      <p className="text-center text-gray-500 mb-12 max-w-2xl mx-auto">
        We craft digital experiences that drive real business growth.
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-16">
        {content.servicesHighlight.map((item, i) => (
          <ElectricBorder key={i} color="#9333ea" speed={0.8} chaos={0.1} borderRadius={16}>
            <Card title={item.title} desc={item.desc} icon={item.icon} />
          </ElectricBorder>
        ))}
      </div>
    </Section>
  );
}
