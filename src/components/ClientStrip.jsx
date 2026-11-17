import { content } from "../data/content";

const LOGOS = content.clients.filter((c) => !c.dark);

/** Slow logo marquee that eases the page out of the dark story. */
export default function ClientStrip() {
  return (
    <section data-theme="light" aria-label="Some of our clients" className="relative border-b border-ink/8 bg-lavender">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-4 px-5 py-7 sm:px-8 md:flex-row md:items-center md:gap-10 md:px-12 md:py-9">
        <p className="eyebrow shrink-0 text-mist">
          Trusted by <span className="text-ember">200+</span> brands
        </p>
        <div className="relative min-w-0 flex-1 overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)]">
          <div className="marquee bg-lavender" style={{ "--marquee-dur": "50s" }}>
            {[0, 1].map((copy) => (
              <ul key={copy} aria-hidden={copy === 1} className="flex shrink-0 items-center gap-14 pr-14">
                {LOGOS.map((c) => (
                  <li key={c.name} className="shrink-0">
                    <img
                      src={c.logo}
                      alt={copy === 0 ? c.name : ""}
                      loading="lazy"
                      decoding="async"
                      className="h-10 w-auto max-w-[8.5rem] object-contain opacity-60 mix-blend-multiply grayscale transition duration-500 hover:opacity-100 hover:grayscale-0 md:h-12"
                    />
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
