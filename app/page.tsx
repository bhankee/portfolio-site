
import About from "./components/About";
import ContactForm from "./components/ContactForm";

export default function Home() {
  return (
    <div className="w-full font-sans grid grid-rows items-center justify-items-center">
      <main className="w-full flex flex-col gap-[32px] row-start-2 items-center sm:items-start">

        <main className="w-full flex flex-col gap-[32px] row-start-2 items-center sm:items-start mt-[60px]">

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
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        Footer
      </footer>
    </div>
  );
}
