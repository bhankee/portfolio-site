import About from "./components/About";
import Expertise from "./components/Expertise";
import ContactForm from "./components/ContactForm";
import Projects from "./components/Projects";
import EmailCaptureModal from "./components/EmailCaptureModal";

export default function Home() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="w-full font-sans min-h-screen">
      <EmailCaptureModal />
      <main className="w-full space-y-8 md:space-y-12">
        <section id="about" className="w-full pt-24 md:pt-32">
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
        © Brad Hankee {currentYear}
      </footer>
    </div>
  );
}
