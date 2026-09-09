import Image from "next/image";
import Link from "next/link";
import { FiArrowRight, FiCheckCircle, FiMessageSquare } from "react-icons/fi";

const highlights = ["Private PDF upload", "Streaming answers", "Workspace-ready UI"];

export const HeroSection = () => {
  return (
    <section className="w-full bg-[#f7fbf5]">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_0.9fr] lg:px-8 lg:py-20">
        <div className="max-w-3xl">
          <div className="mb-5 inline-flex items-center gap-2 rounded-lg border border-emerald-200 bg-white px-3 py-2 text-sm font-medium text-emerald-800 shadow-sm">
            <FiMessageSquare aria-hidden="true" />
            Private multi-user RAG chatbot
          </div>
          <h1 className="text-4xl font-bold leading-tight tracking-normal text-slate-950 sm:text-5xl lg:text-6xl">Chat with your documents, then turn answers into action.</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">Nexora AI gives teams a polished place to upload PDFs, ask grounded questions, and manage follow-up todos without leaving the knowledge workspace.</p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/todos" className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-700 px-5 py-3 text-base font-semibold text-white shadow-sm transition hover:bg-emerald-800">
              Open Todo Workspace
              <FiArrowRight aria-hidden="true" />
            </Link>
            <Link href="/dashboard" className="inline-flex items-center justify-center gap-2 rounded-lg border border-emerald-200 bg-white px-5 py-3 text-base font-semibold text-emerald-900 shadow-sm transition hover:bg-emerald-50">
              Try Chat Dashboard
            </Link>
          </div>

          <div className="mt-8 grid gap-3 text-sm font-medium text-slate-700 sm:grid-cols-3">
            {highlights.map((item) => (
              <div key={item} className="flex items-center gap-2">
                <FiCheckCircle className="text-emerald-700" aria-hidden="true" />
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="relative min-h-[420px] overflow-hidden rounded-lg border border-emerald-100 bg-white shadow-xl">
          <Image src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80" alt="Bright collaborative workspace with laptops and documents" fill priority sizes="(min-width: 1024px) 44vw, 100vw" className="object-cover" />
          <div className="absolute inset-x-4 bottom-4 rounded-lg bg-white/92 p-4 shadow-lg backdrop-blur">
            <div className="mb-3 flex items-center justify-between gap-3">
              <p className="text-sm font-semibold text-slate-950">Knowledge answer</p>
              <span className="rounded-md bg-emerald-100 px-2 py-1 text-xs font-semibold text-emerald-800">Grounded</span>
            </div>
            <p className="text-sm leading-6 text-slate-600">&quot;The contract renewal clause starts 45 days before expiry. I found it in the uploaded vendor agreement.&quot;</p>
          </div>
        </div>
      </div>
    </section>
  );
};
