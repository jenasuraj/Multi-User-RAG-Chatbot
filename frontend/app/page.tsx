import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-100 px-4">
      <section className="w-full max-w-xl rounded-xl border border-zinc-200 bg-white p-8 text-center shadow-sm">
        <h1 className="text-3xl font-semibold text-zinc-900">
          Multi-User RAG Chatbot
        </h1>
        <p className="mt-3 text-zinc-600">
          Login to access your dashboard, upload PDFs, and chat with your documents.
        </p>

        <Link
          href="/login"
          className="mt-6 inline-flex rounded-md bg-zinc-900 px-5 py-3 font-medium text-white hover:bg-zinc-700"
        >
          Login
        </Link>
      </section>
    </main>
  );
}
