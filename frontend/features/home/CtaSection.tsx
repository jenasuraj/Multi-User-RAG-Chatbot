import Link from "next/link";
import { FiArrowRight, FiUploadCloud } from "react-icons/fi";

export const CtaSection = () => {
  return (
    <section className="w-full bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-8 rounded-lg border border-emerald-200 bg-emerald-700 p-8 text-white shadow-lg md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <div className="mb-4 inline-flex size-12 items-center justify-center rounded-lg bg-white/15">
              <FiUploadCloud aria-hidden="true" />
            </div>
            <h2 className="text-3xl font-bold tracking-normal sm:text-4xl">Ready to organize your first document session?</h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-emerald-50">Jump into the dashboard for document chat or start in the todo workspace to plan what your RAG assistant should help you finish.</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row md:flex-col">
            <Link href="/dashboard" className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-5 py-3 font-semibold text-emerald-900 shadow-sm transition hover:bg-emerald-50">
              Open Dashboard
              <FiArrowRight aria-hidden="true" />
            </Link>
            <Link href="/contact" className="inline-flex items-center justify-center rounded-lg border border-white/40 px-5 py-3 font-semibold text-white transition hover:bg-white/10">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
