import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import emailjs from "@emailjs/browser";
import { FaEnvelope, FaInstagram, FaPhoneAlt, FaWhatsapp } from "react-icons/fa";
import { content } from "../data/content";
import { SELECT_SERVICE_EVENT } from "../lib/events";
import SectionLabel from "./SectionLabel";
import { Reveal, SplitText } from "./Motion";

// ─── EmailJS config ─────────────────────────────────────────────────────────
// Create a .env.local file in the project root with these values:
//   VITE_EMAILJS_SERVICE_ID=your_service_id
//   VITE_EMAILJS_TEMPLATE_ID=your_template_id
//   VITE_EMAILJS_PUBLIC_KEY=your_public_key
// The form posts the same field names as before (name, email, phone, company,
// service, message), so an existing EmailJS template keeps working.
// ─────────────────────────────────────────────────────────────────────────────
const EJ_SERVICE = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EJ_TEMPLATE = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EJ_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

const INITIAL = { name: "", email: "", phone: "", company: "", service: "", message: "" };
const SERVICE_OPTIONS = [...content.services.map((s) => s.title), "Something else"];

function Method({ icon: Icon, label, value, href, external, accent, children }) {
  return (
    <div
      className={`group relative flex min-h-[8rem] flex-col justify-between sm:min-h-[9.5rem] rounded-[1.4rem] p-5 transition-transform duration-500 ease-expo hover:-translate-y-1 ${
        accent ? "bg-night text-lavender" : "bg-paper text-ink ring-1 ring-ink/6"
      }`}
    >
      <div className="flex items-center justify-between">
        <span className={`grid h-10 w-10 place-items-center rounded-full ${accent ? "bg-peach text-night" : "bg-lavender text-ink"}`}>
          <Icon />
        </span>
        {children}
      </div>
      <a
        href={href}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        className="after:absolute after:inset-0 after:rounded-[1.4rem]"
      >
        <span className={`eyebrow block !text-[10px] ${accent ? "text-lavender/55" : "text-mist"}`}>{label}</span>
        <span className="mt-1 block font-display text-[15px] font-medium tracking-[-0.01em] [overflow-wrap:anywhere]">{value}</span>
      </a>
    </div>
  );
}

export default function Contact() {
  const [form, setForm] = useState(INITIAL);
  const [status, setStatus] = useState("idle");
  const [copied, setCopied] = useState(false);
  const formRef = useRef(null);
  const c = content.contact;

  useEffect(() => {
    const onSelect = (e) => setForm((f) => ({ ...f, service: e.detail }));
    window.addEventListener(SELECT_SERVICE_EVENT, onSelect);
    return () => window.removeEventListener(SELECT_SERVICE_EVENT, onSelect);
  }, []);

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("sending");
    emailjs
      .sendForm(EJ_SERVICE, EJ_TEMPLATE, formRef.current, EJ_KEY)
      .then(() => {
        setStatus("success");
        setForm(INITIAL);
      })
      .catch(() => setStatus("error"));
  };

  const copyEmail = async (e) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(c.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${c.email}`;
    }
  };

  return (
    <section id="contact" tabIndex={-1} data-theme="light" className="relative bg-lavender px-5 py-24 sm:px-8 md:px-12 md:py-32">
      <div className="mx-auto grid max-w-[1240px] gap-14 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <Reveal>
            <SectionLabel index="07" label="Contact" />
          </Reveal>
          <SplitText
            text="Tell us about your *brand.*"
            className="mt-8 font-display text-[clamp(2.5rem,5.6vw,5.5rem)] font-medium leading-[0.95] tracking-[-0.045em]"
          />
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-sm text-[16px] leading-relaxed text-ink/70">
              A launch, a rebrand, or just more customers. Share a few details and we&apos;ll come back with ideas,
              not a sales pitch.
            </p>
          </Reveal>

          <Reveal delay={0.15} className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Method icon={FaWhatsapp} label="WhatsApp · fastest" value={c.whatsappDisplay} href={`https://wa.me/${c.whatsapp}`} external accent />
            <Method icon={FaPhoneAlt} label="Call us" value={c.phones[0]} href={`tel:${c.phones[0].replace(/\s/g, "")}`}>
              <a href={`tel:${c.phones[1].replace(/\s/g, "")}`} className="relative z-10 font-mono text-[11px] text-mist hover:text-ink">
                or {c.phones[1]}
              </a>
            </Method>
            <Method icon={FaEnvelope} label="Email" value={c.email} href={`mailto:${c.email}`}>
              <button
                type="button"
                onClick={copyEmail}
                className="eyebrow relative z-10 rounded-full border border-ink/12 px-2.5 py-1 !text-[9.5px] text-mist transition-colors hover:border-ink hover:text-ink"
              >
                <span aria-live="polite">{copied ? "Copied" : "Copy"}</span>
              </button>
            </Method>
            <Method icon={FaInstagram} label="Instagram" value={c.instagram} href={c.instagramUrl} external />
          </Reveal>
        </div>

        <Reveal delay={0.1} className="lg:col-span-7">
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="rounded-[2rem] bg-paper p-6 shadow-[0_40px_90px_-60px_rgb(18_20_42/0.5)] ring-1 ring-ink/6 sm:p-9 md:p-11"
          >
            <p className="font-display text-2xl font-medium tracking-[-0.025em]">Start a project</p>
            <p className="mt-1 text-[15px] text-mist">Takes about a minute.</p>

            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              <label className="block">
                <span className="field-label">Your name *</span>
                <input name="name" type="text" required autoComplete="name" placeholder="Jane Doe" value={form.name} onChange={handleChange} className="field-input" />
              </label>
              <label className="block">
                <span className="field-label">Email *</span>
                <input name="email" type="email" required autoComplete="email" placeholder="you@brand.com" value={form.email} onChange={handleChange} className="field-input" />
              </label>
              <label className="block">
                <span className="field-label">Phone</span>
                <input name="phone" type="tel" autoComplete="tel" placeholder="+91" value={form.phone} onChange={handleChange} className="field-input" />
              </label>
              <label className="block">
                <span className="field-label">Company / brand</span>
                <input name="company" type="text" autoComplete="organization" placeholder="Your brand" value={form.company} onChange={handleChange} className="field-input" />
              </label>
            </div>

            <fieldset className="mt-7">
              <legend className="field-label">I&apos;m interested in</legend>
              <div className="mt-3 flex flex-wrap gap-2">
                {SERVICE_OPTIONS.map((opt) => {
                  const active = form.service === opt;
                  return (
                    <button
                      key={opt}
                      type="button"
                      aria-pressed={active}
                      onClick={() => setForm((f) => ({ ...f, service: active ? "" : opt }))}
                      className={`rounded-full px-4 py-2 text-[13.5px] transition-all duration-300 ${
                        active ? "bg-night text-lavender" : "bg-lavender text-ink/75 hover:bg-lavender-2 hover:text-ink"
                      }`}
                    >
                      {active && <span className="mr-1.5 text-peach">✓</span>}
                      {opt}
                    </button>
                  );
                })}
              </div>
              <input type="hidden" name="service" value={form.service} />
            </fieldset>

            <label className="mt-7 block">
              <span className="field-label">Tell us a little more *</span>
              <textarea
                name="message"
                rows={4}
                required
                placeholder="Goals, timelines, what's not working right now…"
                value={form.message}
                onChange={handleChange}
                className="field-input resize-none"
              />
            </label>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="submit"
                disabled={status === "sending"}
                className="group inline-flex items-center justify-center gap-3 rounded-full bg-night py-2 pl-6 pr-2 text-[15px] font-semibold text-lavender transition-colors duration-300 hover:bg-ember disabled:opacity-60"
              >
                {status === "sending" ? "Sending…" : "Send message"}
                <span className="grid h-10 w-10 place-items-center rounded-full bg-peach text-night transition-transform duration-500 ease-expo group-hover:rotate-45">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <path d="M3 11L11 3M11 3H4.5M11 3V9.5" stroke="currentColor" strokeWidth="1.6" />
                  </svg>
                </span>
              </button>
              <p className="text-[13px] text-mist">
                Prefer to talk?{" "}
                <a href={`https://wa.me/${c.whatsapp}`} target="_blank" rel="noopener noreferrer" className="font-medium text-ink underline decoration-peach decoration-2 underline-offset-4">
                  WhatsApp us
                </a>
              </p>
            </div>

            <div aria-live="polite">
              <AnimatePresence>
                {status === "success" && (
                  <motion.p
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mt-6 rounded-xl bg-powder/50 px-4 py-3 text-sm text-ink"
                  >
                    Message sent. We&apos;ll get back to you soon.
                  </motion.p>
                )}
                {status === "error" && (
                  <motion.p
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mt-6 rounded-xl bg-peach/25 px-4 py-3 text-sm text-ink"
                  >
                    Something went wrong. Please try again, or reach us on{" "}
                    <a href={`https://wa.me/${c.whatsapp}`} target="_blank" rel="noopener noreferrer" className="font-medium underline">
                      WhatsApp
                    </a>{" "}
                    directly.
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
