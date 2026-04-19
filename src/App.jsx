import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Portfolio from "./components/Portfolio";
import Services from "./components/Services";
import WhyChooseUs from "./components/WhyChooseUs";
import About from "./components/About";
import CallToAction from "./components/CallToAction";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import InstagramFloat from "./components/InstagramFloat";
import StaggeredMenu from "./components/StaggeredMenu";
import { content } from "./data/content";
import logo from "./assets/logo/WhatsApp Image 2026-04-18 at 20.44.43.jpeg";

export default function App() {
  const menuItems = content.nav.map(i => ({ label: i.label, link: i.href }));
  const socialItems = [
    { label: "Instagram", link: content.contact.instagramUrl },
    { label: "WhatsApp", link: `https://wa.me/${content.contact.whatsapp}` },
  ];

  return (
    <>
      <Navbar />
      <Hero />
      <Portfolio />
      <Services />
      <WhyChooseUs />
      <About />
      <CallToAction />
      <Contact />
      <Footer />
      <InstagramFloat />
      <StaggeredMenu
        isFixed={true}
        className="mobile-only"
        items={menuItems}
        socialItems={socialItems}
        colors={["#FF6B35", "#1a1a2e"]}
        accentColor="#FF6B35"
        logoUrl={logo}
        displayItemNumbering={true}
      />
    </>
  );
}
