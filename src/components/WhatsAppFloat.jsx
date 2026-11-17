import { useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { FaWhatsapp } from "react-icons/fa";
import { content } from "../data/content";

/** Quiet WhatsApp pill that appears once the visitor has finished the story. */
export default function WhatsAppFloat() {
  const [show, setShow] = useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", () => {
    const hero = document.getElementById("home");
    setShow(hero ? hero.getBoundingClientRect().bottom < window.innerHeight * 0.5 : false);
  });

  return (
    <AnimatePresence>
      {show && (
        <motion.a
          href={`https://wa.me/${content.contact.whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with Zoomify Media on WhatsApp"
          initial={{ opacity: 0, y: 24, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.9 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="group fixed bottom-5 right-5 z-40 flex items-center gap-2.5 rounded-full bg-night p-2 text-lavender shadow-[0_18px_40px_-16px_rgb(13_16_32/0.6)] ring-1 ring-white/10 md:bottom-7 md:right-7 md:pr-5"
        >
          <span className="grid h-10 w-10 place-items-center rounded-full bg-[#25d366] text-white transition-transform duration-500 group-hover:rotate-12">
            <FaWhatsapp size={20} />
          </span>
          <span className="hidden text-[13.5px] font-medium md:inline">Chat with us</span>
        </motion.a>
      )}
    </AnimatePresence>
  );
}
