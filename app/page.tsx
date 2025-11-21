import About from "./components/About";
import ImageTriad from "./components/ImageTriad";
import ContactForm from "./components/ContactForm";
import Projects from "./components/Projects";

export default function Home() {
  return (
    <div className="w-full font-sans grid grid-rows items-center justify-items-center min-h-screen">
      <main className="w-full flex flex-col gap-8 items-center sm:items-start px-4 sm:px-0">
        <section id="about" className="w-full h-screen pt-24">
          {" "}
          {/* Add pt-24 here */}
          <About />
        </section>
        {/* <section id="image-triad" className="w-full">
          <ImageTriad />
        </section> */}
        <section id="projects" className="w-full min-h-200">
          <Projects />
        </section>
        <section id="contact" className="w-full">
          <ContactForm />
        </section>
      </main>
      <footer className="w-full flex gap-6 flex-wrap items-center justify-center py-6 mt-3 bg-black/70 backdrop-blur-md border-t border-yellow-400/20 shadow-xl shadow-black/50 text-white">
        © Brad Hankee 2025
      </footer>
    </div>
  );
}
