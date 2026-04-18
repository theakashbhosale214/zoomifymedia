import { useState } from "react";
import { FaInstagram } from "react-icons/fa";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { content } from "../data/content";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#home" className="text-xl font-bold text-primary tracking-tight">
          Zoomify Media
        </a>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-8">
          {content.nav.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="text-sm font-medium text-gray-700 hover:text-primary transition-colors"
              >
                {item.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href={content.contact.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-secondary transition-colors"
              aria-label="Instagram"
            >
              <FaInstagram size={20} />
            </a>
          </li>
        </ul>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-gray-700 text-2xl"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <HiX /> : <HiMenuAlt3 />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white border-t px-6 pb-6">
          <ul className="flex flex-col gap-4 pt-4">
            {content.nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="text-sm font-medium text-gray-700 hover:text-primary transition-colors"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href={content.contact.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-primary font-medium"
              >
                <FaInstagram size={18} /> Follow us
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
