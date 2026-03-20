import dynamic from 'next/dynamic';
import Navbar from "../../sections/Navbar";
import Hero from "../../sections/Hero";

const About = dynamic(() => import("../../sections/About"), { ssr: true });
const Experiences = dynamic(() => import("../../sections/Experiences"), { ssr: true });
const Projects = dynamic(() => import("../../sections/Projects"), { ssr: true });
const Testimonial = dynamic(() => import("../../sections/Testimonial"), { ssr: true });
const Contact = dynamic(() => import("../../sections/Contact"), { ssr: true });
const Footer = dynamic(() => import("../../sections/Footer"), { ssr: true });

const App = () => {
  return (
    <>
      <Navbar />
      <Hero />
    <main className="container mx-auto max-w-7xl">
      <About />
      <Experiences />
      <Projects />
      <Testimonial />
      <Contact />
      <Footer/>
    </main>
    </>
  );
};

export default App;