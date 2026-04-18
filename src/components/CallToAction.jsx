import Button from "./Button";

export default function CallToAction() {
  return (
    <section className="relative py-24 px-6 bg-gradient-to-br from-orange-500 via-orange-600 to-primary overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
          Ready to Grow Your Brand?
        </h2>
        <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
          Let&apos;s create powerful content and marketing strategies that drive real results for your business.
        </p>
        <Button href="#contact" variant="primary">
          Let&apos;s Work Together
        </Button>
      </div>
    </section>
  );
}
