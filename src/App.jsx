import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import WhatWeDo from "./components/WhatWeDo";
import Portfolio from "./components/Portfolio";
import Services from "./components/Services";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import InstagramFloat from "./components/InstagramFloat";

export default function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <WhatWeDo />
      <Portfolio />
      <Services />
      <About />
      <Contact />
      <Footer />
      <InstagramFloat />
    </>
  );
}
