import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import { content } from "../data/content";
import { formatIST, useNow } from "../lib/useNow";
import LogoMark from "./LogoMark";

function LocalTime() {
  const now = useNow();
  return <span className="tabular-nums">{formatIST(now, false)} IST</span>;
}

export default function Footer() {
  const c = content.contact;
  const year = new Date().getFullYear();

  return (
    <footer data-theme="dark" className="relative overflow-hidden bg-night px-5 pt-20 text-lavender sm:px-8 md:px-12 md:pt-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-[radial-gradient(60%_60%_at_50%_100%,rgba(255,162,127,0.16),transparent_70%)]"
      />
      <div className="relative mx-auto max-w-[1240px]">
        <div className="grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-12">
          <div className="col-span-2 md:col-span-5">
            <LogoMark className="h-10 w-auto text-lavender" />
            <p className="mt-6 max-w-sm font-display text-[1.6rem] font-medium leading-snug tracking-[-0.025em]">
              Every brand has a story. <span className="accent text-peach">We make people stop for it.</span>
            </p>
          </div>

          <nav aria-label="Footer" className="col-span-1 md:col-span-2 md:col-start-7">
            <p className="eyebrow !text-[10px] text-lavender/40">Navigate</p>
            <ul className="mt-5 space-y-2.5">
              {[...content.nav, { label: "Contact", href: "#contact" }].map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="text-lavender/75 transition-colors hover:text-peach">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="order-last col-span-2 md:order-none md:col-span-3">
            <p className="eyebrow !text-[10px] text-lavender/40">Say hello</p>
            <ul className="mt-5 space-y-2.5 text-lavender/75">
              <li>
                <a href={`mailto:${c.email}`} className="transition-colors hover:text-peach">
                  {c.email}
                </a>
              </li>
              {c.phones.map((p) => (
                <li key={p}>
                  <a href={`tel:${p.replace(/\s/g, "")}`} className="transition-colors hover:text-peach">
                    {p}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-1 md:col-span-1">
            <p className="eyebrow !text-[10px] text-lavender/40">Follow</p>
            <div className="mt-5 flex gap-2">
              <a
                href={c.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="grid h-11 w-11 place-items-center rounded-full border border-white/15 transition-colors hover:border-peach hover:bg-peach hover:text-night"
              >
                <FaInstagram />
              </a>
              <a
                href={`https://wa.me/${c.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="grid h-11 w-11 place-items-center rounded-full border border-white/15 transition-colors hover:border-peach hover:bg-peach hover:text-night"
              >
                <FaWhatsapp />
              </a>
            </div>
          </div>
        </div>

        <div className="eyebrow mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6 !text-[10px] text-lavender/45 md:mt-24">
          <span>© {year} Zoomify Media. All rights reserved.</span>
          <span className="flex items-center gap-2">
            <span className="live-dot" /> India · <LocalTime />
          </span>
          <a href="#home" className="text-lavender/70 transition-colors hover:text-peach">
            Replay the story ↑
          </a>
        </div>
      </div>

      <p
        aria-hidden="true"
        className="pointer-events-none relative -mx-5 mt-10 select-none whitespace-nowrap pb-[0.04em] text-center font-display text-[16.5vw] font-semibold leading-[0.8] tracking-[-0.06em] text-lavender sm:-mx-8 md:-mx-12 md:mt-14"
      >
        zoomify<span className="accent font-normal text-peach">media</span>
      </p>
    </footer>
  );
}
