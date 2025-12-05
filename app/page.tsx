import About from "./components/About";
import Expertise from "./components/Expertise";
import ContactForm from "./components/ContactForm";
import Projects from "./components/Projects";
import EmailCaptureModal from "./components/EmailCaptureModal";

export default function Home() {
  return (
    <div className="w-full font-sans min-h-screen">
      <EmailCaptureModal />
      <main className="w-full space-y-2 md:space-y-2">
        <section id="about" className="w-full min-h-screen pt-24">
          <About />
        </section>
        <section id="expertise" className="w-full px-4 sm:px-0">
          <Expertise />
        </section>
        <section id="projects" className="w-full px-4 sm:px-0">
          <Projects />
        </section>
        <section id="contact" className="w-full px-4 sm:px-0 pb-16">
          <ContactForm />
        </section>
      </main>
      <footer className="w-full flex gap-6 flex-wrap items-center justify-center py-6 bg-black/70 backdrop-blur-md border-t border-yellow-400/20 shadow-xl shadow-black/50 text-white">
        © Brad Hankee 2025
      </footer>
    </div>
  );
}
