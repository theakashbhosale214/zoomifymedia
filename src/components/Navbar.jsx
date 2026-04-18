import { useState, useEffect } from "react";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import { content } from "../data/content";
import logo from "../assets/logo/WhatsApp Image 2026-04-18 at 20.44.43.jpeg";

export default function Navbar() {
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
        {/* Logo */}
        <a href="#home" className="flex items-center gap-3 group">
          <div className="relative p-[2px] rounded-full bg-gradient-to-br from-orange-400 via-orange-500 to-yellow-400 shadow-md shadow-orange-500/40 group-hover:shadow-orange-400/60 transition-shadow duration-300">
            <img
              src={logo}
              alt="Zoomify Media"
              className="h-10 w-10 rounded-full object-cover block"
            />
          </div>
          <div className="flex flex-col leading-none select-none">
            <span
              className="text-lg font-black tracking-wide"
              style={{ background: "linear-gradient(90deg,#fff 0%,#e2e8f0 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
            >
              ZOOMIFY
            </span>
            <span
              className="text-[10px] font-bold tracking-[0.22em] uppercase"
              style={{ background: "linear-gradient(90deg,#f97316 0%,#fb923c 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
            >
              MEDIA
            </span>
          </div>
        </a>

        {/* Desktop nav — StaggeredMenu handles mobile */}
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
      </div>
    </nav>
  );
}
