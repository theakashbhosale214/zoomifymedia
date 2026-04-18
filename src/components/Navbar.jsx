import { useState, useEffect } from "react";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { content } from "../data/content";
import logo from "../assets/logo/WhatsApp Image 2026-04-18 at 20.44.43.jpeg";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-gray-950/95 backdrop-blur-md shadow-lg shadow-black/20"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        <a href="#home" className="flex items-center gap-3 group">
          <img
            src={logo}
            alt="Zoomify Media"
            className="h-10 w-10 rounded-full object-cover border-2 border-orange-500/50 group-hover:border-orange-500 transition-colors"
          />
          <span className="text-xl font-bold text-white tracking-tight">
            Zoomify<span className="text-orange-500">Media</span>
          </span>
        </a>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-6">
          {content.nav.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="text-sm font-medium text-gray-300 hover:text-orange-400 transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 after:bg-orange-500 after:transition-all hover:after:w-full"
              >
                {item.label}
              </a>
            </li>
          ))}
          <li className="flex items-center gap-3 ml-2">
            <a
              href={content.contact.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-orange-400 transition-colors"
              aria-label="Instagram"
            >
              <FaInstagram size={20} />
            </a>
            <a
              href={`https://wa.me/${content.contact.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-green-400 transition-colors"
              aria-label="WhatsApp"
            >
              <FaWhatsapp size={20} />
            </a>
          </li>
          <li>
            <a
              href="#contact"
              className="ml-2 inline-block px-5 py-2 bg-orange-500 text-white text-sm font-semibold rounded-lg hover:bg-orange-600 transition-colors shadow-lg shadow-orange-500/20"
            >
              Get Started
            </a>
          </li>
        </ul>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-white text-2xl"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <HiX /> : <HiMenuAlt3 />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-gray-950/95 backdrop-blur-md border-t border-gray-800 px-6 pb-6">
          <ul className="flex flex-col gap-4 pt-4">
            {content.nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="text-sm font-medium text-gray-300 hover:text-orange-400 transition-colors"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li className="flex items-center gap-4 pt-2">
              <a
                href={content.contact.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-orange-400 font-medium"
              >
                <FaInstagram size={18} /> Instagram
              </a>
              <a
                href={`https://wa.me/${content.contact.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-green-400 font-medium"
              >
                <FaWhatsapp size={18} /> WhatsApp
              </a>
            </li>
            <li>
              <a
                href="#contact"
                className="inline-block px-5 py-2 bg-orange-500 text-white text-sm font-semibold rounded-lg"
                onClick={() => setOpen(false)}
              >
                Get Started
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
