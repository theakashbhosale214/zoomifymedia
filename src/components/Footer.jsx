import { FaInstagram, FaTwitter, FaLinkedin, FaHeart } from "react-icons/fa";
import { content } from "../data/content";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-white text-xl font-bold mb-3">
              Zoomify Media
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
                    className="hover:text-primary transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-white font-semibold mb-3">Follow Us</h4>
            <div className="flex gap-4">
              <a
                href={content.contact.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-primary hover:text-white transition-all"
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-primary hover:text-white transition-all"
                aria-label="Twitter"
              >
                <FaTwitter />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-primary hover:text-white transition-all"
                aria-label="LinkedIn"
              >
                <FaLinkedin />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6 text-center text-sm">
          <p>
            Made with <FaHeart className="inline text-primary mx-1" /> by Growth
            Frame Media &copy; {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
}
