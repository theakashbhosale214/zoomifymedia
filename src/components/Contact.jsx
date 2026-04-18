import { useState, useRef } from "react";
import { FaInstagram, FaPhone, FaEnvelope, FaWhatsapp } from "react-icons/fa";
import emailjs from "@emailjs/browser";
import Section from "./Section";
import { content } from "../data/content";

// ─── EmailJS config ─────────────────────────────────────────────────────────
// Create a .env.local file in the project root with these values:
//   VITE_EMAILJS_SERVICE_ID=your_service_id
//   VITE_EMAILJS_TEMPLATE_ID=your_template_id
//   VITE_EMAILJS_PUBLIC_KEY=your_public_key
// Get them from: https://dashboard.emailjs.com
// ─────────────────────────────────────────────────────────────────────────────
const EJ_SERVICE  = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EJ_TEMPLATE = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EJ_KEY      = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

const INITIAL = { name: "", email: "", phone: "", company: "", service: "", message: "" };

export default function Contact() {
  const [form, setForm]     = useState(INITIAL);
  const [status, setStatus] = useState("idle");
  const formRef             = useRef();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("sending");
    emailjs.sendForm(EJ_SERVICE, EJ_TEMPLATE, formRef.current, EJ_KEY)
      .then(() => { setStatus("success"); setForm(INITIAL); })
      .catch(() => setStatus("error"));
  };

  return (
    <Section id="contact" dark>
      <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
        Contact Us
      </h2>
      <p className="text-center text-orange-200 mb-12">
        Let&apos;s create something amazing together.
      </p>

      <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
        {/* Info */}
        <div className="space-y-6">
          {content.contact.phones.map((phone, idx) => (
            <div key={idx} className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                <FaPhone className="text-orange-300" />
              </div>
              <div>
                <p className="text-sm text-orange-200/70">Phone</p>
                <a href={`tel:${phone.replace(/\s/g, "")}`} className="font-semibold hover:text-orange-300 transition-colors">
                  {phone}
                </a>
              </div>
            </div>
          ))}

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
              <FaWhatsapp className="text-green-400" />
            </div>
            <div>
              <p className="text-sm text-orange-200/70">WhatsApp</p>
              <a
                href={`https://wa.me/${content.contact.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold hover:text-green-400 transition-colors"
              >
                +91 9272581220
              </a>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
              <FaEnvelope className="text-orange-300" />
            </div>
            <div>
              <p className="text-sm text-orange-200/70">Email</p>
              <a href={`mailto:${content.contact.email}`} className="font-semibold hover:text-orange-300 transition-colors">
                {content.contact.email}
              </a>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
              <FaInstagram className="text-orange-300" />
            </div>
            <div>
              <p className="text-sm text-orange-200/70">Instagram</p>
              <a
                href={content.contact.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold hover:text-orange-300 transition-colors"
              >
                {content.contact.instagram}
              </a>
            </div>
          </div>
        </div>

        {/* Form */}
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
          <input name="name" type="text" placeholder="Your Name" value={form.name} onChange={handleChange} required
            className="w-full p-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-orange-200/50 focus:outline-none focus:border-orange-400/50 transition-colors" />
          <input name="email" type="email" placeholder="Your Email" value={form.email} onChange={handleChange} required
            className="w-full p-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-orange-200/50 focus:outline-none focus:border-orange-400/50 transition-colors" />
          <input name="phone" type="tel" placeholder="Your Phone Number" value={form.phone} onChange={handleChange}
            className="w-full p-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-orange-200/50 focus:outline-none focus:border-orange-400/50 transition-colors" />
          <input name="company" type="text" placeholder="Company / Brand Name" value={form.company} onChange={handleChange}
            className="w-full p-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-orange-200/50 focus:outline-none focus:border-orange-400/50 transition-colors" />
          <select name="service" value={form.service} onChange={handleChange}
            className="w-full p-4 bg-gray-900 border border-white/20 rounded-xl text-white focus:outline-none focus:border-orange-400/50 transition-colors">
            <option value="" disabled>Service Interested In</option>
            <option value="Content Creation">Content Creation</option>
            <option value="Social Media Management">Social Media Management</option>
            <option value="Performance Marketing">Performance Marketing</option>
            <option value="Branding & Design">Branding &amp; Design</option>
            <option value="Video Production">Video Production</option>
            <option value="Other">Other</option>
          </select>
          <textarea name="message" placeholder="Your Message" rows={4} value={form.message} onChange={handleChange} required
            className="w-full p-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-orange-200/50 focus:outline-none focus:border-orange-400/50 transition-colors resize-none" />

          <button
            type="submit"
            disabled={status === "sending"}
            className="w-full py-4 bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white font-bold rounded-xl transition-colors shadow-lg shadow-orange-500/20"
          >
            {status === "sending" ? "Sending…" : "Send Message"}
          </button>

          {status === "success" && (
            <p className="text-green-400 text-sm text-center">
              ✓ Message sent! We&apos;ll get back to you soon.
            </p>
          )}
          {status === "error" && (
            <p className="text-red-400 text-sm text-center">
              Something went wrong. Please try again or reach us on WhatsApp directly.
            </p>
          )}
        </form>
      </div>
    </Section>
  );
}
