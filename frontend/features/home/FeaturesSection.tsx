import { FiCheckSquare, FiFileText, FiMessageCircle, FiSearch, FiShield, FiUsers } from "react-icons/fi";

const features = [
  { icon: FiFileText, title: "PDF-ready intake", text: "Give users a focused upload path for source material before they begin a chat." },
  { icon: FiSearch, title: "Context retrieval", text: "Frame answers around retrieved context so people can move faster with confidence." },
  { icon: FiMessageCircle, title: "Streaming chat", text: "A familiar conversation surface keeps research and clarification in one place." },
  { icon: FiCheckSquare, title: "Todo workspace", text: "Capture decisions, reviews, and follow-up tasks after each document session." },
  { icon: FiUsers, title: "Multi-user friendly", text: "Navigation and pages are ready for team workflows, auth, and shared dashboards." },
  { icon: FiShield, title: "Security-first tone", text: "The interface sets expectations around private documents and controlled access." },
];

export const FeaturesSection = () => {
  return (
    <section className="w-full bg-[#eef8ee]">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-bold uppercase text-emerald-700">Features</p>
          <h2 className="mt-3 text-3xl font-bold tracking-normal text-slate-950 sm:text-4xl">Everything the first frontend needs to feel complete.</h2>
          <p className="mt-4 text-base leading-7 text-slate-600">The UI covers public marketing pages and the core app surfaces without pretending backend work is finished.</p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(({ icon: Icon, title, text }) => (
            <article key={title} className="rounded-lg border border-emerald-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
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
  );
};
