import Image from "next/image";
import Link from "next/link";
import { FiArrowRight, FiLayers, FiLock, FiZap } from "react-icons/fi";

const points = [
  { icon: FiLock, title: "Private by default", text: "Designed around authenticated workspaces and document-aware sessions." },
  { icon: FiLayers, title: "Built for mixed work", text: "Move from reading a source to asking questions and planning next steps." },
  { icon: FiZap, title: "Fast feedback", text: "Streaming responses keep the interface feeling responsive while answers form." },
];

export const HomeAboutSection = () => {
  return (
    <section className="w-full bg-white">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[0.9fr_1fr] lg:px-8">
        <div className="relative min-h-[360px] overflow-hidden rounded-lg border border-slate-200">
          <Image src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80" alt="Person reviewing analytics and notes on a laptop" fill sizes="(min-width: 1024px) 42vw, 100vw" className="object-cover" />
        </div>

        <div>
          <p className="text-sm font-bold uppercase text-emerald-700">About the app</p>
          <h2 className="mt-3 text-3xl font-bold tracking-normal text-slate-950 sm:text-4xl">A document assistant that feels like part of the workflow.</h2>
          <p className="mt-5 text-base leading-7 text-slate-600">The frontend is shaped for a RAG product: upload a PDF, ask specific questions, review grounded answers, and keep a simple todo list for the work those answers create.</p>

          <div className="mt-8 grid gap-4">
            {points.map(({ icon: Icon, title, text }) => (
              <div key={title} className="flex gap-4 rounded-lg border border-emerald-100 bg-[#f7fbf5] p-4">
                <span className="grid size-11 shrink-0 place-items-center rounded-lg bg-emerald-100 text-emerald-800">
                  <Icon aria-hidden="true" />
                </span>
                <div>
                  <h3 className="font-semibold text-slate-950">{title}</h3>
                  <p className="mt-1 text-sm leading-6 text-slate-600">{text}</p>
                </div>
              </div>
            ))}
          </div>

          <Link href="/about" className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-emerald-800 transition hover:text-emerald-950">
            Learn more
            <FiArrowRight aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
};
