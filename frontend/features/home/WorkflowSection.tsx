import { FiCheck, FiMessageSquare, FiUploadCloud } from "react-icons/fi";

const steps = [
  { icon: FiUploadCloud, title: "Upload a PDF", text: "Start with source documents such as notes, policies, papers, or contracts." },
  { icon: FiMessageSquare, title: "Ask direct questions", text: "Use the dashboard to stream answers from your private document context." },
  { icon: FiCheck, title: "Create next steps", text: "Move important takeaways into a simple todo flow for follow-through." },
];

export const WorkflowSection = () => {
  return (
    <section className="w-full bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.75fr_1fr] lg:items-start">
          <div>
            <p className="text-sm font-bold uppercase text-emerald-700">Workflow</p>
            <h2 className="mt-3 text-3xl font-bold tracking-normal text-slate-950 sm:text-4xl">From source material to finished work.</h2>
            <p className="mt-4 text-base leading-7 text-slate-600">The product flow stays intentionally simple, with one clear path through document upload, grounded chat, and task capture.</p>
          </div>

          <div className="grid gap-4">
            {steps.map(({ icon: Icon, title, text }, index) => (
              <article key={title} className="grid gap-4 rounded-lg border border-slate-200 bg-[#f7fbf5] p-5 sm:grid-cols-[auto_1fr]">
                <div className="flex items-center gap-3">
                  <span className="grid size-11 place-items-center rounded-lg bg-emerald-700 text-white">
                    <Icon aria-hidden="true" />
                  </span>
                  <span className="text-sm font-bold text-emerald-800">0{index + 1}</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-950">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
