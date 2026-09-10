"use client"

import axios from "axios";
import { ChangeEvent, Dispatch, SetStateAction, useRef, useState } from "react";
import { FiCheck, FiFileText, FiPlus, FiUploadCloud } from "react-icons/fi";
import { ChatThread } from "@/types/ChatTypes";


type SidebarProps = {
  setMessage: Dispatch<SetStateAction<string>>;
  threads: ChatThread[];
  activeThreadId: string;
  threadsLoading: boolean;
  creatingThread: boolean;
  threadStatus: string;
  onSelectThread: (threadId: string) => void;
  onCreateThread: () => void;
};

const Sidebar = ({
    setMessage,
    threads,
    activeThreadId,
    threadsLoading,
    creatingThread,
    threadStatus,
    onSelectThread,
    onCreateThread,
}: SidebarProps) => {
    
    const prompts = ["Summarize all of pdf data i've sent", "tell me something about myself", "current weather in delhi, and as per it perform a deep web search"];
    const API_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:8000";
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [uploadingPdf, setUploadingPdf] = useState(false);
    const [uploadStatus, setUploadStatus] = useState(""); 



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

    return (
    <>
    <aside className="scrollbar-none max-h-[620px] overflow-y-auto rounded-lg border border-emerald-100 bg-white p-5 pb-6 shadow-sm">
              <div className="flex items-center gap-3">
                <span className="grid size-11 place-items-center rounded-lg bg-emerald-100 text-emerald-800">
                  <FiFileText aria-hidden="true" />
                </span>
                <div>
                  <h1 className="text-lg font-bold text-slate-950">Dashboard</h1>
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

              <div className="mt-4 mb-2">
                <div className="flex items-center justify-between gap-3">
                  <h2 className="text-sm font-bold uppercase text-emerald-700">Previous chats</h2>
                  <button type="button" disabled={creatingThread} onClick={onCreateThread} className="grid size-9 place-items-center rounded-lg bg-slate-950 text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60">
                    <FiPlus aria-hidden="true" />
                  </button>
                </div>

                {threadStatus && <p className="mt-3 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700">{threadStatus}</p>}

                <div className="scrollbar-none mt-4 grid max-h-44 gap-2 overflow-y-auto pr-1">
                  {threadsLoading ? (
                    <p className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-600">Loading chats...</p>
                  ) : threads.length === 0 ? (
                    <p className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-600">No chats yet.</p>
                  ) : (
                    threads.map((thread) => {
                      const isGood = thread.status === "good";
                      const isActive = thread.thread_id === activeThreadId;
                      const threadId = thread.thread_id.split("_")
                      return (
                        <button key={thread.id} type="button" onClick={() => onSelectThread(thread.thread_id)} className={`flex w-full items-center justify-between gap-2 rounded-lg border px-3 py-2 text-left text-sm font-semibold transition ${isGood ? "border-emerald-200 bg-emerald-50 text-emerald-900 hover:bg-emerald-100" : "border-red-200 bg-red-50 text-red-900 hover:bg-red-100"}`}>
                          <span className="uppercase text-xs">Conversation {threadId[2]}: {thread.status}</span>
                          {isActive && <FiCheck className="shrink-0" aria-hidden="true" />}
                        </button>
                      );
                    })
                  )}
                </div>
              </div>
            </aside>
    </>
  )
}

export default Sidebar
