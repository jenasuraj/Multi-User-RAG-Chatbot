import Image from "next/image";
import Link from "next/link";
import {
  FiArrowRight,
  FiCheck,
  FiDatabase,
  FiFileText,
  FiLayers,
  FiLock,
  FiMessageSquare,
  FiSearch,
  FiShield,
  FiUploadCloud,
  FiUsers,
  FiZap,
} from "react-icons/fi";

const features = [
  {
    icon: FiSearch,
    title: "Context-aware retrieval",
    description:
      "Ask natural questions and retrieve the most relevant passages from your private knowledge base in seconds.",
    className: "lg:col-span-7",
  },
  {
    icon: FiLock,
    title: "Private by design",
    description:
      "Every workspace stays isolated, so each user only searches and chats with the documents they are allowed to access.",
    className: "lg:col-span-5",
  },
  {
    icon: FiUploadCloud,
    title: "Simple PDF ingestion",
    description:
      "Upload documents, index knowledge, and make it instantly available to your assistant.",
    className: "lg:col-span-4",
  },
  {
    icon: FiMessageSquare,
    title: "Streaming conversations",
    description:
      "Get fast, natural responses while your AI reasons across the context that actually matters.",
    className: "lg:col-span-4",
  },
  {
    icon: FiUsers,
    title: "Multi-user architecture",
    description:
      "Built for teams, products, and SaaS applications where data boundaries cannot be an afterthought.",
    className: "lg:col-span-4",
  },
];

const testimonials = [
  {
    name: "Maya Chen",
    role: "Product Lead",
    quote:
      "We stopped digging through folders and started asking questions. The speed difference is enormous.",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=240&q=85",
  },
  {
    name: "Daniel Ross",
    role: "Engineering Manager",
    quote:
      "The multi-user separation is exactly what we needed for a production-ready internal knowledge assistant.",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=240&q=85",
  },
  {
    name: "Sofia Malik",
    role: "Operations Director",
    quote:
      "Our team can finally get accurate answers from internal documents without knowing where every file lives.",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=240&q=85",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#07080b] text-white selection:bg-violet-400/30">
      <div className="pointer-events-none fixed inset-x-0 top-0 -z-0 h-[620px] bg-[radial-gradient(circle_at_50%_-20%,rgba(124,58,237,0.28),transparent_58%)]" />

      <nav className="sticky top-0 z-50 border-b border-white/8 bg-[#07080b]/75 backdrop-blur-2xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">
          <Link href="/" className="group flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-2xl border border-white/10 bg-white text-black shadow-[0_0_40px_rgba(255,255,255,0.12)] transition group-hover:scale-105">
              <FiLayers className="text-lg" />
            </div>
            <div>
              <p className="text-sm font-semibold tracking-[0.18em] text-white">NEXORA</p>
              <p className="text-[10px] uppercase tracking-[0.24em] text-zinc-500">Private AI knowledge</p>
            </div>
          </Link>

          <div className="hidden items-center gap-8 text-sm text-zinc-400 md:flex">
            <a href="#features" className="transition hover:text-white">Features</a>
            <a href="#about" className="transition hover:text-white">About</a>
            <a href="#testimonials" className="transition hover:text-white">Testimonials</a>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/login"
              className="hidden rounded-full px-4 py-2 text-sm font-medium text-zinc-300 transition hover:bg-white/5 hover:text-white sm:inline-flex"
            >
              Sign in
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-black transition hover:bg-zinc-200 sm:px-5"
            >
              Get started <FiArrowRight />
            </Link>
          </div>
        </div>
      </nav>

      <section className="relative z-10 mx-auto max-w-7xl px-5 pb-24 pt-20 sm:px-8 sm:pt-28 lg:px-10 lg:pb-32 lg:pt-32">
        <div className="mx-auto max-w-5xl text-center">
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-400/8 px-4 py-2 text-xs font-medium text-violet-200 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
            <span className="size-1.5 rounded-full bg-violet-400 shadow-[0_0_14px_rgba(167,139,250,0.9)]" />
            Your private documents, now conversational
          </div>

          <h1 className="text-balance text-5xl font-semibold tracking-[-0.055em] text-white sm:text-6xl lg:text-[82px] lg:leading-[0.98]">
            Turn scattered knowledge into
            <span className="block bg-gradient-to-r from-violet-300 via-fuchsia-200 to-cyan-200 bg-clip-text text-transparent">
              instant answers.
            </span>
          </h1>

          <p className="mx-auto mt-7 max-w-2xl text-pretty text-base leading-7 text-zinc-400 sm:text-lg">
            A multi-user RAG workspace that lets every user upload private documents, retrieve the right context, and chat with their knowledge securely.
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/login"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-black transition hover:-translate-y-0.5 hover:bg-zinc-200 sm:w-auto"
            >
              Start chatting with your docs
              <FiArrowRight className="transition group-hover:translate-x-1" />
            </Link>
            <a
              href="#features"
              className="inline-flex w-full items-center justify-center rounded-full border border-white/10 bg-white/[0.03] px-6 py-3.5 text-sm font-medium text-zinc-300 backdrop-blur transition hover:bg-white/[0.07] sm:w-auto"
            >
              Explore features
            </a>
          </div>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-zinc-500">
            {["Isolated user data", "Fast semantic search", "Secure PDF workflows"].map((item) => (
              <span key={item} className="flex items-center gap-2">
                <FiCheck className="text-emerald-400" /> {item}
              </span>
            ))}
          </div>
        </div>

        <div className="relative mx-auto mt-16 max-w-6xl sm:mt-20">
          <div className="absolute -inset-5 rounded-[40px] bg-gradient-to-r from-violet-500/20 via-transparent to-cyan-500/20 blur-3xl" />
          <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[#0d0f14] p-2 shadow-[0_50px_140px_rgba(0,0,0,0.65)] sm:p-3">
            <div className="relative min-h-[510px] overflow-hidden rounded-[22px] border border-white/8 bg-[#111318] lg:min-h-[620px]">
              <Image
                src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1800&q=88"
                alt="Modern AI workspace on a laptop"
                fill
                priority
                className="object-cover opacity-48"
                sizes="(max-width: 1280px) 100vw, 1200px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#090a0e] via-[#090a0e]/55 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-violet-950/30 via-transparent to-cyan-950/20" />

              <div className="absolute left-5 right-5 top-5 flex items-center justify-between rounded-2xl border border-white/10 bg-black/35 px-4 py-3 backdrop-blur-xl sm:left-8 sm:right-8 sm:top-8">
                <div className="flex items-center gap-3">
                  <div className="flex size-9 items-center justify-center rounded-xl bg-white text-black"><FiLayers /></div>
                  <div className="text-left">
                    <p className="text-xs font-semibold text-white">Research workspace</p>
                    <p className="text-[10px] text-zinc-400">12 documents indexed</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 rounded-full border border-emerald-400/15 bg-emerald-400/10 px-3 py-1.5 text-[10px] font-medium text-emerald-300">
                  <span className="size-1.5 rounded-full bg-emerald-400" /> Ready
                </div>
              </div>

              <div className="absolute bottom-5 left-5 right-5 grid gap-4 sm:bottom-8 sm:left-8 sm:right-8 lg:grid-cols-[0.9fr_1.4fr]">
                <div className="rounded-2xl border border-white/10 bg-black/55 p-5 text-left backdrop-blur-2xl">
                  <div className="mb-5 flex items-center justify-between">
                    <p className="text-xs font-medium text-zinc-300">Knowledge base</p>
                    <FiDatabase className="text-violet-300" />
                  </div>
                  <div className="space-y-3">
                    {["Product-roadmap.pdf", "Architecture-notes.pdf", "Customer-research.pdf"].map((file, index) => (
                      <div key={file} className="flex items-center gap-3 rounded-xl border border-white/8 bg-white/[0.04] p-3">
                        <div className={`flex size-9 items-center justify-center rounded-lg ${index === 0 ? "bg-violet-400/15 text-violet-300" : "bg-white/5 text-zinc-400"}`}>
                          <FiFileText />
                        </div>
                        <div className="min-w-0">
                          <p className="truncate text-[11px] font-medium text-zinc-200">{file}</p>
                          <p className="mt-0.5 text-[9px] text-zinc-500">Indexed and searchable</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-[#111318]/88 p-5 text-left backdrop-blur-2xl sm:p-6">
                  <div className="flex justify-end">
                    <div className="max-w-[82%] rounded-2xl rounded-br-md bg-white px-4 py-3 text-xs leading-5 text-black">
                      What are the biggest priorities in our product roadmap?
                    </div>
                  </div>
                  <div className="mt-4 max-w-[92%] rounded-2xl rounded-bl-md border border-white/8 bg-white/[0.04] p-4">
                    <div className="mb-3 flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.14em] text-violet-300">
                      <FiZap /> Answer grounded in 3 sources
                    </div>
                    <p className="text-xs leading-6 text-zinc-300 sm:text-sm">
                      The roadmap prioritizes onboarding speed, tenant-level data isolation, and higher retrieval accuracy before expanding integrations.
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {["Roadmap · p.4", "Architecture · p.2", "Research · p.8"].map((source) => (
                        <span key={source} className="rounded-full border border-white/8 bg-black/25 px-3 py-1.5 text-[9px] text-zinc-400">{source}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="relative z-10 border-t border-white/6 bg-[#090a0e] py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="max-w-3xl">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-violet-300">Features</p>
            <h2 className="text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl">
              Everything your knowledge layer needs.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-7 text-zinc-400">
              Designed around the parts that matter in a real RAG product: ingestion, retrieval, access boundaries, and a clean conversational experience.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-4 lg:grid-cols-12">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <article
                  key={feature.title}
                  className={`group relative min-h-[250px] overflow-hidden rounded-[28px] border border-white/8 bg-gradient-to-br from-white/[0.055] to-white/[0.015] p-7 transition duration-300 hover:-translate-y-1 hover:border-white/15 sm:p-8 ${feature.className}`}
                >
                  <div className="absolute right-0 top-0 size-40 translate-x-1/3 -translate-y-1/3 rounded-full bg-violet-500/10 blur-3xl transition group-hover:bg-violet-500/20" />
                  <div className="relative flex h-full flex-col justify-between gap-12">
                    <div className="flex size-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.06] text-xl text-violet-200 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
                      <Icon />
                    </div>
                    <div>
                      <div className="mb-3 flex items-center gap-3">
                        <span className="text-[10px] font-medium tracking-[0.2em] text-zinc-600">0{index + 1}</span>
                        <div className="h-px w-8 bg-white/10" />
                      </div>
                      <h3 className="text-xl font-semibold tracking-[-0.02em] text-white">{feature.title}</h3>
                      <p className="mt-3 max-w-xl text-sm leading-6 text-zinc-400">{feature.description}</p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="about" className="relative z-10 py-24 sm:py-32">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-2 lg:gap-20 lg:px-10">
          <div className="relative">
            <div className="absolute -inset-6 rounded-[40px] bg-violet-500/10 blur-3xl" />
            <div className="relative min-h-[520px] overflow-hidden rounded-[32px] border border-white/10">
              <Image
                src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1400&q=88"
                alt="Team collaborating around a workspace"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 rounded-2xl border border-white/15 bg-black/45 p-5 backdrop-blur-xl">
                <p className="text-xs uppercase tracking-[0.18em] text-zinc-400">Built for real teams</p>
                <div className="mt-3 grid grid-cols-3 gap-3">
                  {["Private", "Grounded", "Scalable"].map((item) => (
                    <div key={item} className="rounded-xl bg-white/[0.06] px-3 py-3 text-center text-xs font-medium text-zinc-200">{item}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-cyan-300">About us</p>
            <h2 className="text-4xl font-semibold tracking-[-0.045em] text-white sm:text-5xl">
              Your knowledge should not be trapped in folders.
            </h2>
            <p className="mt-6 text-base leading-8 text-zinc-400">
              Nexora is built around a simple idea: the information you already own should be instantly useful. Instead of searching folder trees, opening ten PDFs, and manually comparing notes, you can ask one question and get a grounded answer from the right context.
            </p>
            <p className="mt-5 text-base leading-8 text-zinc-400">
              Multi-user isolation keeps the experience personal and secure, while retrieval-augmented generation keeps answers connected to the source material that matters.
            </p>

            <div className="mt-9 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-5">
                <FiShield className="text-xl text-emerald-300" />
                <p className="mt-4 text-sm font-semibold text-white">Secure user boundaries</p>
                <p className="mt-2 text-xs leading-5 text-zinc-500">Keep each user&apos;s documents and retrieval context separated.</p>
              </div>
              <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-5">
                <FiDatabase className="text-xl text-violet-300" />
                <p className="mt-4 text-sm font-semibold text-white">Knowledge that compounds</p>
                <p className="mt-2 text-xs leading-5 text-zinc-500">Add more documents over time without changing how users ask questions.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="testimonials" className="relative z-10 border-y border-white/6 bg-[#0a0b0f] py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div className="max-w-3xl">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-violet-300">Testimonials</p>
              <h2 className="text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl">Less searching. More knowing.</h2>
            </div>
            <p className="max-w-md text-sm leading-6 text-zinc-500">A knowledge assistant should disappear into the workflow and make the team feel faster, not give them another tool to manage.</p>
          </div>

          <div className="mt-12 grid gap-4 lg:grid-cols-3">
            {testimonials.map((testimonial) => (
              <article key={testimonial.name} className="group rounded-[28px] border border-white/8 bg-white/[0.035] p-7 transition hover:border-white/15 hover:bg-white/[0.05]">
                <div className="mb-8 flex items-center gap-1 text-violet-300">
                  {[1, 2, 3, 4, 5].map((star) => <span key={star} className="text-sm">★</span>)}
                </div>
                <blockquote className="text-lg leading-8 tracking-[-0.01em] text-zinc-200">“{testimonial.quote}”</blockquote>
                <div className="mt-9 flex items-center gap-4 border-t border-white/8 pt-6">
                  <div className="relative size-11 overflow-hidden rounded-full border border-white/10">
                    <Image src={testimonial.image} alt={testimonial.name} fill className="object-cover" sizes="44px" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{testimonial.name}</p>
                    <p className="mt-0.5 text-xs text-zinc-500">{testimonial.role}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 px-5 py-24 sm:px-8 sm:py-32 lg:px-10">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[36px] border border-white/10 bg-gradient-to-br from-violet-500/20 via-[#111318] to-cyan-500/10 px-6 py-16 text-center shadow-[0_40px_120px_rgba(0,0,0,0.45)] sm:px-10 sm:py-20">
          <div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-500/25 blur-[100px]" />
          <div className="absolute bottom-0 right-0 h-64 w-64 translate-x-1/3 translate-y-1/3 rounded-full bg-cyan-400/15 blur-[90px]" />
          <div className="relative mx-auto max-w-3xl">
            <div className="mx-auto mb-6 flex size-14 items-center justify-center rounded-2xl border border-white/15 bg-white/10 text-xl backdrop-blur"><FiZap /></div>
            <h2 className="text-4xl font-semibold tracking-[-0.045em] text-white sm:text-5xl">Give your documents a conversation layer.</h2>
            <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-zinc-300 sm:text-base">Upload your knowledge, keep user data separated, and start getting answers grounded in the files that matter.</p>
            <Link href="/login" className="group mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-black transition hover:-translate-y-0.5 hover:bg-zinc-200">
              Build your knowledge workspace <FiArrowRight className="transition group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      <footer className="relative z-10 border-t border-white/8 bg-[#06070a]">
        <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:px-10">
          <div className="grid gap-10 border-b border-white/8 pb-10 sm:grid-cols-2 lg:grid-cols-4">
            <div className="sm:col-span-2">
              <Link href="/" className="flex items-center gap-3">
                <div className="flex size-9 items-center justify-center rounded-xl bg-white text-black"><FiLayers /></div>
                <span className="text-sm font-semibold tracking-[0.18em]">NEXORA</span>
              </Link>
              <p className="mt-4 max-w-sm text-sm leading-6 text-zinc-500">A secure multi-user RAG chatbot for turning private documents into searchable, conversational knowledge.</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-300">Product</p>
              <div className="mt-4 flex flex-col gap-3 text-sm text-zinc-500">
                <a href="#features" className="transition hover:text-white">Features</a>
                <a href="#about" className="transition hover:text-white">About</a>
                <a href="#testimonials" className="transition hover:text-white">Testimonials</a>
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-300">Account</p>
              <div className="mt-4 flex flex-col gap-3 text-sm text-zinc-500">
                <Link href="/login" className="transition hover:text-white">Sign in</Link>
                <Link href="/login" className="transition hover:text-white">Create account</Link>
                <Link href="/dashboard" className="transition hover:text-white">Dashboard</Link>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-between gap-3 pt-7 text-xs text-zinc-600 sm:flex-row sm:items-center">
            <p>© 2026 Nexora AI. Built for private knowledge workflows.</p>
            <div className="flex items-center gap-2"><FiShield /> Secure multi-user architecture</div>
          </div>
        </div>
      </footer>
    </main>
  );
}
