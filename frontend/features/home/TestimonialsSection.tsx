import { FiStar } from "react-icons/fi";

const testimonials = [
  { name: "Priya N.", role: "Research lead", quote: "The layout makes it obvious where to upload sources, ask questions, and keep track of what needs review." },
  { name: "Arjun S.", role: "Product manager", quote: "It feels like a practical workspace rather than a demo. The todo page is exactly where action items belong." },
  { name: "Maya R.", role: "Operations analyst", quote: "The green theme is calm, and the dashboard gives enough structure without burying the chat." },
];

export const TestimonialsSection = () => {
  return (
    <section className="w-full bg-[#f7fbf5]">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase text-emerald-700">Testimonials</p>
            <h2 className="mt-3 text-3xl font-bold tracking-normal text-slate-950 sm:text-4xl">Designed for people who read, decide, and ship.</h2>
          </div>
          <div className="flex gap-1 text-amber-500" aria-label="Five star rating">
            {Array.from({ length: 5 }).map((_, index) => (
              <FiStar key={index} aria-hidden="true" />
            ))}
          </div>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {testimonials.map((item) => (
            <article key={item.name} className="rounded-lg border border-emerald-100 bg-white p-6 shadow-sm">
              <p className="text-base leading-7 text-slate-700">&quot;{item.quote}&quot;</p>
              <div className="mt-6 border-t border-emerald-100 pt-4">
                <h3 className="font-bold text-slate-950">{item.name}</h3>
                <p className="text-sm text-slate-500">{item.role}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
