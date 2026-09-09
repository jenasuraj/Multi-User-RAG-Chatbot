"use client";

import axios from "axios";
import { ChangeEvent, FormEvent, useRef, useState} from "react";
import {ChatHistory} from "../types/ChatTypes";
import { GrUpload } from "react-icons/gr";



export default function Home() {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<ChatHistory[]>([]);
  const [uploadingPdf, setUploadingPdf] = useState(false);
  const [uploadStatus, setUploadStatus] = useState("");
  const API_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:8000";
  const fileInputRef = useRef<HTMLInputElement>(null);



  const handlePdfUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const input = event.target;
    const file = input.files?.[0];
    if (!file) return;
    const isPdf = file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf");
    if (!isPdf) {
      setUploadStatus("Only PDF files are supported.");
      input.value = "";
      return;
    }
    const formData = new FormData();
    formData.append("pdf", file);
    try {
      setUploadingPdf(true);
      setUploadStatus(`Uploading ${file.name}...`);
      const response = await axios.post(`${API_URL}/upload/pdf`,formData,
        {
          withCredentials: true,
        }
      );
      setUploadStatus(
        response.data.message || `Uploaded ${file.name}`
      );
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setUploadStatus(
          error.response?.data?.detail || "PDF upload failed."
        );
      } else {
        setUploadStatus("PDF upload failed.");
      }
    } finally {
      setUploadingPdf(false);
      input.value = "";
    }
  };


 

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!message.trim()) return;
    const currentMessage = message;
    setChatHistory((prev) => [
      ...prev,
      {
        user: currentMessage,
        bot: "",
        status: "Starting agent...",
      },
    ]);
    setMessage("");
    try {
      const response = await fetch(`${API_URL}/graph/`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: currentMessage,
        }),
      });
      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(
          errorData?.detail || "Something went wrong."
        );
      }
      if (!response.body) {
        throw new Error("Stream unavailable");
      }
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let fullResponse = "";
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        fullResponse += decoder.decode(value, {
          stream: true,
        });
        setChatHistory((prev) => [
          ...prev.slice(0, -1),
          {
            ...prev[prev.length - 1],
            bot: fullResponse,
            status: "",
          },
        ]);
      }
    } catch (error) {
      console.error(error);

      const errorMessage =
        error instanceof Error
          ? error.message
          : "Something went wrong.";

      setChatHistory((prev) => [
        ...prev.slice(0, -1),
        {
          ...prev[prev.length - 1],
          status: errorMessage,
        },
      ]);
    }
  };







  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-100 px-4 py-8">
      <section className="flex w-full max-w-3xl flex-col gap-4">
        <div className="h-[520px] overflow-y-auto rounded-lg border border-zinc-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-5">
            {chatHistory.map((chat, index) => (
              <div
                key={index}
                className="flex flex-col gap-3"
              >
                <div className="flex justify-end">
                  <div className="max-w-[75%] rounded-lg bg-zinc-900 px-4 py-3 text-white">
                    {chat.user}
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

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-2"
        >
          <div className="flex gap-3">
            <input
              type="text"
              value={message}
              onChange={(event) =>
                setMessage(event.target.value)
              }
              placeholder="Type your message"
              className="min-w-0 flex-1 rounded-md border border-zinc-300 bg-white px-4 py-3 text-base text-zinc-900 outline-none focus:border-zinc-700"
            />

            <input
              ref={fileInputRef}
              type="file"
              accept="application/pdf"
              onChange={handlePdfUpload}
              className="hidden"
            />

            <button
              type="button"
              disabled={uploadingPdf}
              onClick={() =>
                fileInputRef.current?.click()
              }
              className="rounded-md border border-zinc-300 bg-white px-4 py-1 flex items-center justify-center text-base font-medium text-zinc-900 hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <GrUpload className=" inline-block" />
            </button>

            <button
              type="submit"
              className="rounded-md bg-zinc-900 px-6 py-3 text-base font-medium text-white hover:bg-zinc-700"
            >
              Submit
            </button>
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
