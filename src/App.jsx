import { useEffect } from "react";
import { MotionConfig } from "motion/react";
import Navbar from "./components/Navbar";
import Story from "./components/Story";
import ClientStrip from "./components/ClientStrip";
import About from "./components/About";
import Services from "./components/Services";
import Work from "./components/Work";
import Process from "./components/Process";
import Why from "./components/Why";
import Faq from "./components/Faq";
import CallToAction from "./components/CallToAction";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import WhatsAppFloat from "./components/WhatsAppFloat";
import { bindAnchorLinks, initSmoothScroll } from "./lib/smoothScroll";

export default function App() {
  useEffect(() => {
    const stopScroll = initSmoothScroll();
    const unbind = bindAnchorLinks();
    return () => {
      unbind();
      stopScroll();
    };
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <Navbar />
      <main>
        <Story />
        <ClientStrip />
        <About />
        <Services />
        <Work />
        <Process />
        <Why />
        <Faq />
        <CallToAction />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFloat />
    </MotionConfig>
  );
}
