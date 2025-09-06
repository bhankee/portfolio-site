import Image from "next/image";

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">

        <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start mt-[60px]">
          <section id="about" className="w-full mb-8 min-h-600">
            About Brad
          </section>
          <section id="projects" className="w-full mb-8 min-h-200">
            Projects Here
          </section>
          <section id="contact" className="w-full mb-8 min-h-200">
            Contact Here
          </section>

        </main>

      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        Footer
      </footer>
    </div>
  );
}
