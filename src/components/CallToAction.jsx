import { content } from "../data/content";
import { Magnetic, SplitText } from "./Motion";
import LogoMark from "./LogoMark";

export default function CallToAction() {
  return (
    <section data-theme="light" className="relative bg-lavender px-3 pb-3 sm:px-5 sm:pb-5">
      <div className="relative mx-auto overflow-hidden rounded-[2rem] bg-peach px-5 py-20 text-night sm:px-8 md:rounded-[2.75rem] md:px-12 md:py-28">
        {/* sunset rings */}
        <div aria-hidden="true" className="pointer-events-none absolute -bottom-[45%] left-1/2 aspect-square w-[130%] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.45)_0%,rgba(255,255,255,0)_60%)]" />
        <LogoMark
          a="currentColor"
          b="currentColor"
          c="currentColor"
          className="pointer-events-none absolute -right-[6%] -top-[12%] h-[85%] w-auto text-night opacity-[0.06]"
        />

        <div className="relative mx-auto max-w-[1240px]">
          <p className="eyebrow text-night/70">The next chapter · Yours</p>
          <div className="mt-8 grid items-end gap-12 lg:grid-cols-12">
            <SplitText
              text="Your brand. Your story. *Let's tell it.*"
              emClass="accent text-night"
              className="font-display text-[clamp(2.8rem,8vw,8rem)] font-medium leading-[0.92] tracking-[-0.05em] lg:col-span-9"
            />
            <div className="flex items-center gap-6 lg:col-span-3 lg:flex-col lg:items-end">
              <Magnetic>
                <a
                  href="#contact"
                  className="group relative grid h-36 w-36 place-items-center overflow-hidden rounded-full bg-night text-center text-lavender md:h-44 md:w-44"
                >
                  <span className="absolute inset-0 scale-0 rounded-full bg-lavender transition-transform duration-700 ease-expo group-hover:scale-100" />
                  <span className="relative text-[15px] font-semibold leading-tight transition-colors duration-500 group-hover:text-night">
                    Start a<br />project ↗
                  </span>
                </a>
              </Magnetic>
              <a
                href={`https://wa.me/${content.contact.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="eyebrow leading-relaxed text-night underline decoration-night/30 underline-offset-4 transition-colors hover:decoration-night lg:text-right"
              >
                or WhatsApp us
                <br />
                {content.contact.whatsappDisplay}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
