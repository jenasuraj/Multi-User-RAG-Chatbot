import Image from "next/image";
import Link from "next/link";
import { FiArrowRight, FiCheckCircle, FiCpu, FiLock, FiTarget } from "react-icons/fi";

const values = [
  { icon: FiLock, title: "Respect private knowledge", text: "The interface is built for controlled document access, clear auth entry points, and secure workspace language." },
  { icon: FiTarget, title: "Stay useful and focused", text: "Every screen supports a direct job: learn the product, ask questions, contact the team, or manage tasks." },
  { icon: FiCpu, title: "Prepare for real AI flows", text: "The UI already has places for streaming chat, uploads, retrieval context, and future citations." },
];

const stats = [
  { label: "Core pages", value: "6" },
  { label: "Frontend theme", value: "Light" },
  { label: "Max content width", value: "7xl" },
];

export const AboutPage = () => {
  return (
    <>
      <section className="w-full bg-[#f7fbf5]">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_0.9fr] lg:px-8">
          <div>
            <p className="text-sm font-bold uppercase text-emerald-700">About Nexora AI</p>
            <h1 className="mt-3 text-4xl font-bold leading-tight tracking-normal text-slate-950 sm:text-5xl">A clear frontend foundation for a private RAG chatbot.</h1>
            <p className="mt-6 text-lg leading-8 text-slate-600">Nexora AI is designed as a calm document workspace where users can upload files, retrieve the right context, chat with their knowledge base, and convert findings into practical tasks.</p>
            <Link href="/dashboard" className="mt-8 inline-flex items-center gap-2 rounded-lg bg-emerald-700 px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-emerald-800">
              View Dashboard
              <FiArrowRight aria-hidden="true" />
            </Link>
          </div>

          <div className="relative min-h-[420px] overflow-hidden rounded-lg border border-emerald-100 bg-white shadow-lg">
            <Image src="https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1200&q=80" alt="Team collaborating around product planning documents" fill sizes="(min-width: 1024px) 44vw, 100vw" className="object-cover" />
          </div>
        </div>
      </section>

      <section className="w-full bg-white">
        <div className="mx-auto grid max-w-7xl gap-5 px-4 py-12 sm:grid-cols-3 sm:px-6 lg:px-8">
          {stats.map((stat) => (
            <article key={stat.label} className="rounded-lg border border-emerald-100 bg-[#f7fbf5] p-6">
              <p className="text-3xl font-bold text-emerald-800">{stat.value}</p>
              <h2 className="mt-2 text-sm font-semibold text-slate-700">{stat.label}</h2>
            </article>
          ))}
        </div>
      </section>

      <section className="w-full bg-[#eef8ee]">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase text-emerald-700">Principles</p>
            <h2 className="mt-3 text-3xl font-bold tracking-normal text-slate-950 sm:text-4xl">Built around trust, clarity, and useful momentum.</h2>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {values.map(({ icon: Icon, title, text }) => (
              <article key={title} className="rounded-lg border border-emerald-100 bg-white p-6 shadow-sm">
                <span className="grid size-11 place-items-center rounded-lg bg-emerald-100 text-emerald-800">
                  <Icon aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-lg font-bold text-slate-950">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full bg-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[0.8fr_1fr] lg:px-8">
          <div>
            <p className="text-sm font-bold uppercase text-emerald-700">What is included</p>
            <h2 className="mt-3 text-3xl font-bold tracking-normal text-slate-950 sm:text-4xl">A frontend that is ready for backend integration later.</h2>
          </div>
          <div className="grid gap-4">
            {["Public pages with consistent layout", "Enhanced login and dashboard screens", "Frontend-only todo and contact experiences", "Responsive Tailwind styling across mobile and desktop"].map((item) => (
              <div key={item} className="flex items-center gap-3 rounded-lg border border-slate-200 bg-[#f7fbf5] p-4 text-slate-700">
                <FiCheckCircle className="shrink-0 text-emerald-700" aria-hidden="true" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
