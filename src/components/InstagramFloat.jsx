import { FaInstagram } from "react-icons/fa";
import { content } from "../data/content";

export default function InstagramFloat() {
  return (
    <a
      href={content.contact.instagramUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-gradient-to-br from-primary to-purple-800 text-white p-4 rounded-full shadow-2xl hover:scale-110 hover:shadow-primary/50 transition-all duration-300 group"
      aria-label="Follow us on Instagram"
    >
      <FaInstagram size={24} className="group-hover:rotate-12 transition-transform" />
      <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-900 text-white text-xs px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        Follow us on Instagram
      </span>
    </a>
  );
}
