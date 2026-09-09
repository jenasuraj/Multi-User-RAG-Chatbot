"use client";

import axios from "axios";
import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { FiFileText, FiSend, FiUploadCloud } from "react-icons/fi";
import { ChatHistory } from "@/types/ChatTypes";

const prompts = ["Summarize this PDF", "List renewal deadlines", "Find action items"];

export default function DashboardPage() {
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
      const response = await axios.post(`${API_URL}/upload/pdf`, formData, { withCredentials: true });
      setUploadStatus(response.data.message || `Uploaded ${file.name}`);
    } catch (error) {
      setUploadStatus(axios.isAxiosError(error) ? error.response?.data?.detail || "PDF upload failed." : "PDF upload failed.");
    } finally {
      setUploadingPdf(false);
      input.value = "";
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!message.trim()) return;
    const currentMessage = message;

    setChatHistory((prev) => [...prev, { user: currentMessage, bot: "", status: "Starting agent..." }]);
    setMessage("");

    try {
      const response = await fetch(`${API_URL}/graph/`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: currentMessage }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.detail || "Something went wrong.");
      }

      if (!response.body) throw new Error("Stream unavailable");

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let fullResponse = "";

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        fullResponse += decoder.decode(value, { stream: true });
        setChatHistory((prev) => [...prev.slice(0, -1), { ...prev[prev.length - 1], bot: fullResponse, status: "" }]);
      }
    } catch (error) {
      console.error(error);
      const errorMessage = error instanceof Error ? error.message : "Something went wrong.";
      setChatHistory((prev) => [...prev.slice(0, -1), { ...prev[prev.length - 1], status: errorMessage }]);
    }
  };

  return (
    <main className="w-full bg-[#f7fbf5]">
      <section className="mx-auto grid min-h-[calc(100vh-180px)] max-w-7xl gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[300px_1fr] lg:px-8">
        <aside className="rounded-lg border border-emerald-100 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <span className="grid size-11 place-items-center rounded-lg bg-emerald-100 text-emerald-800">
              <FiFileText aria-hidden="true" />
            </span>
            <div>
              <h1 className="text-lg font-bold text-slate-950">RAG Dashboard</h1>
              <p className="text-sm text-slate-500">Document chat workspace</p>
            </div>
          </div>

          <div className="mt-6 grid gap-3">
            <button type="button" disabled={uploadingPdf} onClick={() => fileInputRef.current?.click()} className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-700 px-4 py-3 font-semibold text-white shadow-sm transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-60">
              <FiUploadCloud aria-hidden="true" />
              {uploadingPdf ? "Uploading..." : "Upload PDF"}
            </button>
            <input ref={fileInputRef} type="file" accept="application/pdf" onChange={handlePdfUpload} className="hidden" />
            {uploadStatus && <p className="rounded-lg border border-emerald-100 bg-emerald-50 px-3 py-2 text-sm text-emerald-800">{uploadStatus}</p>}
          </div>

          <div className="mt-8">
            <h2 className="text-sm font-bold uppercase text-emerald-700">Prompt ideas</h2>
            <div className="mt-4 grid gap-2">
              {prompts.map((prompt) => (
                <button key={prompt} type="button" onClick={() => setMessage(prompt)} className="rounded-lg border border-slate-200 bg-[#f7fbf5] px-3 py-2 text-left text-sm font-medium text-slate-700 transition hover:border-emerald-200 hover:bg-emerald-50">
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        </aside>

        <section className="flex min-h-[620px] flex-col rounded-lg border border-emerald-100 bg-white shadow-lg">
          <div className="border-b border-emerald-100 px-5 py-4">
            <h2 className="text-lg font-bold text-slate-950">Ask your knowledge base</h2>
            <p className="text-sm text-slate-500">Upload a PDF, then ask grounded questions against your private context.</p>
          </div>

          <div className="flex-1 overflow-y-auto p-5">
            {chatHistory.length === 0 ? (
              <div className="flex h-full min-h-[360px] items-center justify-center">
                <div className="max-w-md text-center">
                  <span className="mx-auto grid size-14 place-items-center rounded-lg bg-emerald-100 text-emerald-800">
                    <FiFileText aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 text-xl font-bold text-slate-950">Your answers will appear here.</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">Start with one of the prompt ideas or type a question after uploading a PDF.</p>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-5">
                {chatHistory.map((chat, index) => (
                  <div key={index} className="flex flex-col gap-3">
                    <div className="flex justify-end">
                      <div className="max-w-[85%] rounded-lg bg-emerald-700 px-4 py-3 text-white shadow-sm sm:max-w-[75%]">{chat.user}</div>
                    </div>
                    {chat.status && (
                      <div className="flex justify-start">
                        <div className="rounded-lg bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
                          <span className="mr-2 inline-block animate-pulse">.</span>
                          {chat.status}
                        </div>
                      </div>
                    )}
                    {chat.bot && (
                      <div className="flex justify-start">
                        <div className="max-w-[85%] rounded-lg bg-[#f7fbf5] px-4 py-3 text-slate-800 shadow-sm sm:max-w-[75%]">{chat.bot}</div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="border-t border-emerald-100 p-4">
            <div className="flex flex-col gap-3 sm:flex-row">
              <input type="text" value={message} onChange={(event) => setMessage(event.target.value)} placeholder="Ask about your uploaded document" className="min-w-0 flex-1 rounded-lg border border-slate-200 bg-[#f7fbf5] px-4 py-3 text-base text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-emerald-600 focus:bg-white" />
              <button type="submit" className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-700 px-5 py-3 text-base font-semibold text-white shadow-sm transition hover:bg-emerald-800">
                Send
                <FiSend aria-hidden="true" />
              </button>
            </div>
          </form>
        </section>
      </section>
    </main>
  );
}
