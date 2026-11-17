import farmMitra from "../assets/clients/farm-mitra.webp";
import travestingMoney from "../assets/clients/travesting-money.webp";
import onestopEvents from "../assets/clients/onestop-events.webp";
import systemicGains from "../assets/clients/systemic-gains.webp";
import kpsConstruction from "../assets/clients/kps-construction.webp";
import propcatcher from "../assets/clients/propcatcher.webp";
import baithack from "../assets/clients/baithack.webp";
import aspireProperties from "../assets/clients/aspire-properties.webp";
import pizzaBurst from "../assets/clients/pizza-burst.webp";
import pgInteriors from "../assets/clients/pg-interiors.webp";
import koolhome from "../assets/clients/koolhome.webp";
import skyHomeInterio from "../assets/clients/sky-home-interio.webp";
import vivahByRaka from "../assets/clients/vivah-by-raka.webp";
import bolKa from "../assets/clients/bol-ka.webp";

/*
  All site copy lives here. Wrap words in *asterisks* to set them in the
  italic serif accent, e.g. "content that *converts.*"
*/
export const content = {
  brand: {
    name: "Zoomify Media",
    tagline: "From content to conversion — we build brands that sell.",
  },

  nav: [
    { label: "Studio", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Work", href: "#work" },
    { label: "Process", href: "#process" },
    { label: "FAQ", href: "#faq" },
  ],

  /* The scroll story in the hero. Each chapter is one beat of the film. */
  story: {
    chapters: [
      { label: "Unseen", line: "Every brand starts as a *whisper* in the feed." },
      { label: "Story", line: "We find the story only *you* can tell." },
      { label: "Craft", line: "Shot. Cut. Graded. *Frame by frame.*" },
      { label: "Reach", line: "Then we put it where *everyone* is looking." },
      { label: "Growth", line: "From content to *conversion.*" },
    ],
    eyebrow: "Zoomify Media · Content & growth studio",
    subtitle:
      "We help businesses scale through strategic content, video production & performance marketing.",
  },

  stats: [
    { value: 200, suffix: "+", label: "Brand collaborations" },
    { value: 2000, suffix: "+", label: "Projects delivered" },
    { value: 5, suffix: "", label: "Services under one roof" },
  ],

  about: {
    statement:
      "Zoomify Media is a creative digital marketing studio. We don't just create content — we create content that *converts.*",
    body:
      "From concept to execution, our goal is simple: make your brand stand out and generate real results. Strategy, shoots, edits and ads, handled by one team that cares about your numbers as much as you do.",
    pillars: [
      { title: "Strategy first", text: "Every idea starts from your goals and your audience." },
      { title: "Made in-house", text: "Scripts, shoots, edits and design, under one roof." },
      { title: "Measured", text: "We track what works, then do more of it." },
    ],
  },

  services: [
    {
      title: "Content Creation",
      desc: "Reels, ads and brand videos that grab attention and drive engagement.",
      tags: ["Reels", "Ad films", "Brand videos", "Scripts"],
      art: "reels",
    },
    {
      title: "Social Media Management",
      desc: "Consistent posting, strategy and growth handling for your brand.",
      tags: ["Strategy", "Content calendar", "Community", "Insights"],
      art: "calendar",
    },
    {
      title: "Performance Marketing",
      desc: "ROI-driven Facebook and Google Ads that generate leads and sales.",
      tags: ["Meta Ads", "Google Ads", "Lead generation", "Retargeting"],
      art: "chart",
    },
    {
      title: "Branding & Design",
      desc: "Logos, creatives and visual identity that make your brand stand out.",
      tags: ["Logo", "Identity", "Creatives", "Guidelines"],
      art: "brand",
    },
    {
      title: "Video Production",
      desc: "Professional shoots with a high-quality camera and lighting setup.",
      tags: ["Shoots", "Lighting", "Direction", "Editing"],
      art: "camera",
    },
  ],

  industries: ["Real estate & interiors", "Food & cafés", "Events & weddings", "Finance", "More"],

  clients: [
    { name: "Propcatcher", logo: propcatcher, industry: "Real estate & interiors", note: "Real estate" },
    { name: "Pizza Burst", logo: pizzaBurst, industry: "Food & cafés", note: "Restaurant · Pune" },
    { name: "Vivah by Raka", logo: vivahByRaka, industry: "Events & weddings", note: "Wedding planners" },
    { name: "Aspire Properties", logo: aspireProperties, industry: "Real estate & interiors", note: "Real estate" },
    { name: "Systemic Gains", logo: systemicGains, industry: "Finance", note: "Finance", dark: true },
    { name: "Baithack", logo: baithack, industry: "Food & cafés", note: "Café" },
    { name: "Koolhome", logo: koolhome, industry: "Real estate & interiors", note: "Interior design studio" },
    { name: "Farm Mitra", logo: farmMitra, industry: "More", note: "Agriculture" },
    { name: "Sky Home Interio", logo: skyHomeInterio, industry: "Real estate & interiors", note: "Interiors" },
    { name: "Travesting Money", logo: travestingMoney, industry: "Finance", note: "Finance" },
    { name: "Bol Ka?", logo: bolKa, industry: "More", note: "Podcast", dark: true },
    { name: "PG Interiors", logo: pgInteriors, industry: "Real estate & interiors", note: "Interiors" },
    { name: "OneStop Happening Events", logo: onestopEvents, industry: "Events & weddings", note: "Event planner" },
    { name: "KPS Construction", logo: kpsConstruction, industry: "Real estate & interiors", note: "Construction" },
  ],

  process: [
    { title: "Discover", text: "We learn your brand, your audience and what growth means for you." },
    { title: "Strategise", text: "A content and ads plan built around your goals, not trends for their own sake." },
    { title: "Create", text: "Scripts, shoots, edits and design, produced in-house with a pro camera and lighting setup." },
    { title: "Launch", text: "Consistent posting and campaigns across the platforms your customers actually use." },
    { title: "Scale", text: "We measure what works, cut what doesn't and double down on the winners." },
  ],

  whyChooseUs: [
    { title: "Result-oriented", text: "Every reel, post and campaign is tied to a number that matters: reach, leads or sales." },
    { title: "Creative + strategy", text: "Strategy shapes the idea, craft makes it unmissable." },
    { title: "High-quality production", text: "Professional cameras, lighting and editing — not a rushed phone video." },
    { title: "Fast & reliable", text: "Clear timelines, quick turnarounds and no chasing." },
    { title: "Growth, not just content", text: "We measure success by how your brand grows, not by how many posts go out." },
  ],

  faq: [
    {
      q: "What does Zoomify Media do?",
      a: "We're a creative digital marketing studio. We create content (reels, ad films, brand videos), manage social media, run performance marketing on Meta and Google, design brand identities and handle professional video production.",
    },
    {
      q: "Which industries do you work with?",
      a: "We've worked with 200+ brands across real estate, interiors, restaurants and cafés, weddings and events, finance, construction, agriculture and media. If you have customers to reach, we can help you reach them.",
    },
    {
      q: "Do you shoot the videos yourselves?",
      a: "Yes. Shoots are done by our team with a professional camera and lighting setup, and scripting, editing and design are handled in-house too.",
    },
    {
      q: "Can you run our ads as well as make the content?",
      a: "Yes. Our performance marketing team runs ROI-focused Facebook, Instagram and Google Ads campaigns, so the content we make is the content that gets promoted.",
    },
    {
      q: "How do we get started?",
      a: "Send us a message through the form below or on WhatsApp. We'll set up a quick call to understand your brand and goals, then come back with a plan.",
    },
  ],

  contact: {
    phones: ["+91 9921779460", "+91 9272581220"],
    whatsapp: "919272581220",
    whatsappDisplay: "+91 9272581220",
    email: "Zoomifymedia@gmail.com",
    instagram: "@zoomifymedia",
    instagramUrl: "https://www.instagram.com/zoomifymedia/",
  },
};
