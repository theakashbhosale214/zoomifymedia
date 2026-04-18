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

export default function App() {
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
    </>
  );
}
