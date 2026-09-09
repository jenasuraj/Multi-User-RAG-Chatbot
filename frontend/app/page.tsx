"use client";

import axios from "axios";
import { ChangeEvent, FormEvent, useRef, useState} from "react";
import {ChatHistory} from "../types/ChatTypes";
import { GrUpload } from "react-icons/gr";
import { IoSearchOutline } from "react-icons/io5";


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
        <div className="h-[520px] overflow-y-auto rounded-lg border border-zinc-200 bg-white [scrollbar-width:none] [&::-webkit-scrollbar]:hidden p-6 shadow-sm">
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

                {chat.status && (
                  <div className="flex justify-start">
                    <div className="text-sm text-zinc-500">
                      <span className="mr-2 inline-block animate-pulse">
                        .
                      </span>

                      {chat.status}
                    </div>
                  </div>
                )}

                {chat.bot && (
                  <div className="flex justify-start">
                    <div className="max-w-[75%] rounded-lg bg-zinc-100 px-4 py-3 text-zinc-900">
                      {chat.bot}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
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
              className="rounded-md border border-zinc-300 bg-white px-5 py-1 flex items-center justify-center text-base font-medium text-zinc-900 hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <GrUpload className=" inline-block" />
            </button>

            <button
              type="submit"
              className="rounded-md bg-zinc-900 px-4 py-1 text-base font-medium text-white hover:bg-zinc-700"
            >
              <IoSearchOutline size={25} color="white"/>
            </button>
          </div>

          {uploadStatus && (
            <p className="text-sm text-zinc-500">
              {uploadStatus}
            </p>
          )}
        </form>
      </section>
    </main>
  );
}