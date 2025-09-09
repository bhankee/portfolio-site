
import About from "./components/About";
import ContactForm from "./components/ContactForm";

export default function Home() {
  return (
    <div className="w-full font-sans grid grid-rows items-center justify-items-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <main className="w-full flex flex-col gap-8 items-center sm:items-start mt-16 px-4 sm:px-0">
        <section id="about" className="w-full mb-8 min-h-200">
          <About />
        </section>
        <section id="projects" className="w-full mb-8 min-h-200">
          Projects Here
        </section>
        <section id="contact" className="w-full mb-8 min-h-200">
          <ContactForm />
        </section>
      </main>
      <footer className="w-full flex gap-6 flex-wrap items-center justify-center py-6 bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300">
        Footer
      </footer>
    </div>
  );
}

