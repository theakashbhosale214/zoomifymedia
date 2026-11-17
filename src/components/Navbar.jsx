import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import { content } from "../data/content";
import { getLenis, scrollToHash } from "../lib/smoothScroll";
import LogoMark from "./LogoMark";

const EASE = [0.16, 1, 0.3, 1];

/** Which theme ("dark" | "light") is the section currently under the nav? */
function themeAt(y) {
  for (const el of document.querySelectorAll("[data-theme]")) {
    const r = el.getBoundingClientRect();
    if (r.top <= y && r.bottom > y) return el.dataset.theme;
  }
  return "light";
}

function MobileMenu({ onClose }) {
  const closeRef = useRef(null);

  useEffect(() => {
    closeRef.current?.focus();
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const go = (e, href) => {
    e.preventDefault();
    onClose();
    setTimeout(() => scrollToHash(href), 60);
  };

  return (
    <motion.div
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      className="fixed inset-0 z-[60] flex flex-col bg-night px-5 pb-8 pt-5 text-lavender sm:px-8"
      initial={{ clipPath: "inset(0 0 100% 0 round 0 0 2rem 2rem)" }}
      animate={{ clipPath: "inset(0 0 0% 0 round 0 0 0rem 0rem)" }}
      exit={{ clipPath: "inset(0 0 100% 0 round 0 0 2rem 2rem)" }}
      transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
    >
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-2.5">
          <LogoMark className="h-7 w-auto text-lavender" />
          <span className="font-display text-lg font-semibold tracking-[-0.02em]">Zoomify Media</span>
        </span>
        <button
          ref={closeRef}
          onClick={onClose}
          className="eyebrow rounded-full border border-white/15 px-4 py-2.5 text-lavender"
        >
          Close
        </button>
      </div>

      <nav aria-label="Mobile" className="mt-auto">
        <ul>
          {[...content.nav, { label: "Contact", href: "#contact" }].map((item, i) => (
            <li key={item.href} className="overflow-hidden border-b border-white/10">
              <motion.a
                href={item.href}
                data-menu-link
                onClick={(e) => go(e, item.href)}
                className="flex items-baseline justify-between py-3.5"
                initial={{ y: "100%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 0.8, ease: EASE, delay: 0.2 + i * 0.05 }}
              >
                <span className="font-display text-[2.5rem] font-medium leading-none tracking-[-0.04em]">{item.label}</span>
                <span className="eyebrow text-peach">0{i + 1}</span>
              </motion.a>
            </li>
          ))}
        </ul>
      </nav>

      <motion.div
        className="mt-10 grid grid-cols-2 gap-6 text-sm text-lavender/70"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.55, duration: 0.6 }}
      >
        <div className="space-y-1">
          <p className="eyebrow !text-[10px] text-lavender/40">Say hello</p>
          <a href={`mailto:${content.contact.email}`} className="block text-[13px]">
            {content.contact.email}
          </a>
          <a href={`tel:${content.contact.phones[0].replace(/\s/g, "")}`} className="block">
            {content.contact.phones[0]}
          </a>
        </div>
        <div className="space-y-1">
          <p className="eyebrow !text-[10px] text-lavender/40">Follow</p>
          <a href={content.contact.instagramUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
            <FaInstagram /> Instagram
          </a>
          <a href={`https://wa.me/${content.contact.whatsapp}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
            <FaWhatsapp /> WhatsApp
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Navbar() {
  const [theme, setTheme] = useState("dark");
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const menuBtnRef = useRef(null);
  const wasOpen = useRef(false);
  const { scrollY } = useScroll();
  const closeMenu = useCallback(() => setOpen(false), []);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(y > prev && y > 200);
    setTheme(themeAt(40));
  });

  useEffect(() => {
    const lenis = getLenis();
    if (open) {
      if (lenis) lenis.stop();
      else document.body.style.overflow = "hidden";
    } else {
      if (lenis) lenis.start();
      else document.body.style.overflow = "";
      if (wasOpen.current) menuBtnRef.current?.focus();
    }
    wasOpen.current = open;
  }, [open]);

  const dark = theme === "dark";

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 md:pt-4"
        animate={{ y: hidden && !open ? "-130%" : "0%" }}
        transition={{ duration: 0.55, ease: EASE }}
      >
        <div
          className={`mx-auto flex max-w-[1240px] items-center justify-between gap-4 rounded-full border py-2 pl-4 pr-2 backdrop-blur-xl transition-colors duration-500 md:pl-5 ${
            dark ? "border-white/10 bg-night/55 text-lavender" : "border-ink/10 bg-paper/75 text-ink shadow-[0_10px_30px_-18px_rgb(18_20_42/0.35)]"
          }`}
        >
          <a href="#home" aria-label="Zoomify Media, back to top" className="flex items-center gap-2.5">
            <LogoMark className="h-6 w-auto" />
            <span className="font-display text-[1.05rem] font-semibold tracking-[-0.02em]">
              Zoomify<span className={dark ? "text-lavender/55" : "text-mist"}> Media</span>
            </span>
          </a>

          <nav aria-label="Primary" className="hidden md:block">
            <ul className="flex items-center gap-1">
              {content.nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className={`rounded-full px-3.5 py-2 text-[13.5px] transition-colors duration-300 lg:px-4 ${
                      dark ? "text-lavender/75 hover:bg-white/10 hover:text-lavender" : "text-ink/70 hover:bg-ink/5 hover:text-ink"
                    }`}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <a
              href="#contact"
              className="group hidden items-center gap-2 whitespace-nowrap rounded-full bg-peach py-2.5 pl-5 pr-4 text-[13.5px] font-semibold text-night transition-colors duration-300 hover:bg-ember hover:text-lavender sm:inline-flex"
            >
              Start a project
              <span aria-hidden="true" className="transition-transform duration-500 ease-expo group-hover:translate-x-0.5">→</span>
            </a>
            <button
              ref={menuBtnRef}
              onClick={() => setOpen(true)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className={`eyebrow flex items-center gap-2 rounded-full px-4 py-2.5 md:hidden ${
                dark ? "bg-white/10 text-lavender" : "bg-ink text-lavender"
              }`}
            >
              <span className="flex flex-col gap-[3px]" aria-hidden="true">
                <span className="block h-px w-3.5 bg-current" />
                <span className="block h-px w-3.5 bg-current" />
              </span>
              Menu
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>{open && <MobileMenu onClose={closeMenu} />}</AnimatePresence>
    </>
  );
}
