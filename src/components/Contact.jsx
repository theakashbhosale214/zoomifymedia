import { useState } from "react";
import { FaInstagram, FaPhone, FaEnvelope } from "react-icons/fa";
import Section from "./Section";
import Button from "./Button";
import { content } from "../data/content";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    alert("Thanks for reaching out! We'll get back to you soon.");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <Section id="contact" dark>
      <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
        Contact Us
      </h2>
      <p className="text-center text-purple-200 mb-12">
        Let&apos;s create something amazing together.
      </p>

      <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
        {/* Info */}
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
              <FaPhone className="text-purple-200" />
            </div>
            <div>
              <p className="text-sm text-purple-300">Phone</p>
              <p className="font-semibold">{content.contact.phone}</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
              <FaEnvelope className="text-purple-200" />
            </div>
            <div>
              <p className="text-sm text-purple-300">Email</p>
              <p className="font-semibold">{content.contact.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
              <FaInstagram className="text-purple-200" />
            </div>
            <div>
              <p className="text-sm text-purple-300">Instagram</p>
              <a
                href={content.contact.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold hover:text-purple-200 transition-colors"
              >
                {content.contact.instagram}
              </a>
            </div>
          </div>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <input
            name="name"
            type="text"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full p-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-purple-300 focus:outline-none focus:border-white/50 transition-colors"
          />
          <input
            name="email"
            type="email"
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full p-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-purple-300 focus:outline-none focus:border-white/50 transition-colors"
          />
          <textarea
            name="message"
            placeholder="Your Message"
            rows={4}
            value={form.message}
            onChange={handleChange}
            required
            className="w-full p-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-purple-300 focus:outline-none focus:border-white/50 transition-colors resize-none"
          />
          <Button variant="primary" className="w-full text-center">
            Send Message
          </Button>
        </form>
      </div>
    </Section>
  );
}
