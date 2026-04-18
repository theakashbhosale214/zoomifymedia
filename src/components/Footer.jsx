import { FaInstagram, FaWhatsapp, FaHeart } from "react-icons/fa";
import { content } from "../data/content";

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-400 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-white text-xl font-bold mb-3">
              Zoomify<span className="text-orange-500">Media</span>
            </h3>
            <p className="text-sm leading-relaxed">
              Creative digital marketing agency focused on growth, storytelling,
              and results.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-white font-semibold mb-3">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              {content.nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="hover:text-orange-400 transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-white font-semibold mb-3">Connect With Us</h4>
            <div className="flex gap-4">
              <a
                href={content.contact.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-orange-500 hover:text-white transition-all"
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>
              <a
                href={`https://wa.me/${content.contact.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-green-500 hover:text-white transition-all"
                aria-label="WhatsApp"
              >
                <FaWhatsapp />
              </a>
            </div>
            <div className="mt-4 text-sm space-y-1">
              {content.contact.phones.map((phone, idx) => (
                <p key={idx}>
                  <a href={`tel:${phone.replace(/\s/g, "")}`} className="hover:text-orange-400 transition-colors">
                    {phone}
                  </a>
                </p>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6 text-center text-sm space-y-1">
          <p>
            Made with <FaHeart className="inline text-orange-500 mx-1" /> by
            Zoomify Media &copy; {new Date().getFullYear()}
          </p>
          <p className="text-gray-600">All rights reserved. Unauthorized use or reproduction is prohibited.</p>
        </div>
      </div>
    </footer>
  );
}
