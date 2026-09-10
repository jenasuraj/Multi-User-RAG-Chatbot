"use client";

import { FormEvent, useEffect, useState } from "react";
import { FiFileText, FiSend} from "react-icons/fi";
import { ChatHistory, ChatThread } from "@/types/ChatTypes";
import Sidebar from "@/features/dashboard/Sidebar";


export default function DashboardPage() {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<ChatHistory[]>([]);
  const [threads, setThreads] = useState<ChatThread[]>([]);
  const [activeThreadId, setActiveThreadId] = useState("");
  const [threadsLoading, setThreadsLoading] = useState(false);
  const [creatingThread, setCreatingThread] = useState(false);
  const [threadStatus, setThreadStatus] = useState("");
  const [threadRefresh, setThreadRefresh] = useState(0);
  const API_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:8000";

  useEffect(() => {
    let ignore = false;
    const loadThreads = async () => {
      try {
        setThreadsLoading(true);
        setThreadStatus("");
        const response = await fetch(`${API_URL}/graph/threads`, {
          credentials: "include",
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => null);
          throw new Error(errorData?.detail || "Could not load chats.");
        }

        const data: ChatThread[] = await response.json();
        if (ignore) return;

        setThreads(data);
        setActiveThreadId((current) => current || data[0]?.thread_id || "");
      } catch (error) {
        if (ignore) return;
        setThreadStatus(error instanceof Error ? error.message : "Could not load chats.");
      } finally {
        if (!ignore) setThreadsLoading(false);
      }
    };

    loadThreads();
    return () => {
      ignore = true;
    };
  }, [API_URL, threadRefresh]);




  const handleCreateThread = async () => {
    try {
      setCreatingThread(true);
      setThreadStatus("");
      const response = await fetch(`${API_URL}/graph/threads`, {
        method: "POST",
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.detail || "Could not create chat.");
      }

      const thread: ChatThread = await response.json();
      setActiveThreadId(thread.thread_id);
      setChatHistory([]);
      setThreadRefresh((current) => current + 1);
    } catch (error) {
      setThreadStatus(error instanceof Error ? error.message : "Could not create chat.");
    } finally {
      setCreatingThread(false);
    }
  };


  

  const handleSelectThread = (threadId: string) => {
    setActiveThreadId(threadId);
    setChatHistory([]);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!message.trim()) return;
    if (!activeThreadId) {
      setThreadStatus("Create a new chat first.");
      return;
    }

    const currentMessage = message;

    setChatHistory((prev) => [...prev, { user: currentMessage, bot: "", status: "Starting agent..." }]);
    setMessage("");

    try {
      const response = await fetch(`${API_URL}/graph/`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: currentMessage, thread_id: activeThreadId }),
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
      <section className="mx-auto grid min-h-screen max-w-7xl gap-6 px-4 py-3 sm:px-6 lg:grid-cols-[300px_1fr] lg:px-8">
        
        <Sidebar
          setMessage={setMessage}
          threads={threads}
          activeThreadId={activeThreadId}
          threadsLoading={threadsLoading}
          creatingThread={creatingThread}
          threadStatus={threadStatus}
          onSelectThread={handleSelectThread}
          onCreateThread={handleCreateThread}
        />
        <section className="flex max-h-[620px] flex-col rounded-lg border border-emerald-100 shadow-sm">
          <div className="border-b border-emerald-100 px-5 py-4">
            <h2 className="text-lg font-bold text-slate-950">Ask your knowledge base</h2>
            <p className="text-sm text-slate-500">Upload a PDF, then ask grounded questions against your private context.</p>
          </div>

          <div className="h-full overflow-y-auto p-5">
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
              <input type="text" value={message} onChange={(event) => setMessage(event.target.value)} placeholder="Ask about your uploaded document" className="min-w-0 flex-1 rounded-lg border border-slate-300 bg-white px-4 py-3 text-base text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-emerald-600 focus:bg-white" />
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
