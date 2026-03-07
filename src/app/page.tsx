import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Hero from "./sections/Hero";
import Work from "./sections/Work";
import Lab from "./sections/Lab";
import About from "./sections/About";
import Contact from "./sections/Contact";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Nav />
      <Hero />
      <Work />
      <Lab />
      <About />
      <Contact />
      <Footer />
    </div>
  );
}
