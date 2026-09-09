"use client";

import axios from "axios";
import Link from "next/link";
import { ChangeEvent, FormEvent, useState } from "react";
import { FiArrowRight, FiCheckCircle, FiLock, FiMail, FiUser } from "react-icons/fi";

export const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const API_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:8000";
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError("");

    try {
      setLoading(true);

      if (isLogin) {
        const response = await axios.post(`${API_URL}/auth/login`, { email: formData.email, password: formData.password }, { withCredentials: true });
        console.log("Login response:", response.data);
      } else {
        const response = await axios.post(`${API_URL}/auth/register`, { name: formData.name, email: formData.email, password: formData.password }, { withCredentials: true });
        console.log("Register response:", response.data);
      }

      window.location.replace("/dashboard");
    } catch (error) {
      console.log("API error:", error);
      setError(axios.isAxiosError(error) ? error.response?.data?.detail || "Something went wrong." : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full bg-[#f7fbf5]">
      <div className="mx-auto grid min-h-[calc(100vh-180px)] max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[0.9fr_1fr] lg:px-8">
        <div>
          <p className="text-sm font-bold uppercase text-emerald-700">Secure access</p>
          <h1 className="mt-3 text-4xl font-bold leading-tight tracking-normal text-slate-950 sm:text-5xl">{isLogin ? "Welcome back to your knowledge workspace." : "Create your document intelligence workspace."}</h1>
          <p className="mt-6 text-lg leading-8 text-slate-600">Sign in to upload PDFs, chat with private context, and keep document follow-ups organized in one clean interface.</p>

          <div className="mt-8 grid gap-4">
            {["Authenticated document chat", "Private PDF upload flow", "Task tracking for follow-ups"].map((item) => (
              <div key={item} className="flex items-center gap-3 text-slate-700">
                <FiCheckCircle className="text-emerald-700" aria-hidden="true" />
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-lg border border-emerald-100 bg-white p-6 shadow-lg sm:p-8">
          <div className="mb-6 flex gap-2 rounded-lg bg-emerald-50 p-1">
            <button type="button" onClick={() => { setIsLogin(true); setError(""); }} className={`flex-1 rounded-md px-4 py-2.5 text-sm font-bold transition ${isLogin ? "bg-white text-emerald-900 shadow-sm" : "text-slate-600 hover:text-emerald-900"}`}>
              Login
            </button>
            <button type="button" onClick={() => { setIsLogin(false); setError(""); }} className={`flex-1 rounded-md px-4 py-2.5 text-sm font-bold transition ${!isLogin ? "bg-white text-emerald-900 shadow-sm" : "text-slate-600 hover:text-emerald-900"}`}>
              Register
            </button>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {error && <p role="alert" className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}

            {!isLogin && (
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-sm font-semibold text-slate-700">Name</label>
                <div className="flex items-center gap-3 rounded-lg border border-slate-200 bg-[#f7fbf5] px-4 focus-within:border-emerald-600 focus-within:bg-white">
                  <FiUser className="text-slate-400" aria-hidden="true" />
                  <input id="name" name="name" type="text" value={formData.name} onChange={handleChange} placeholder="Enter your name" required className="min-w-0 flex-1 bg-transparent py-3 text-slate-950 outline-none placeholder:text-slate-400" />
                </div>
              </div>
            )}

            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-sm font-semibold text-slate-700">Email</label>
              <div className="flex items-center gap-3 rounded-lg border border-slate-200 bg-[#f7fbf5] px-4 focus-within:border-emerald-600 focus-within:bg-white">
                <FiMail className="text-slate-400" aria-hidden="true" />
                <input id="email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Enter your email" required className="min-w-0 flex-1 bg-transparent py-3 text-slate-950 outline-none placeholder:text-slate-400" />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="password" className="text-sm font-semibold text-slate-700">Password</label>
              <div className="flex items-center gap-3 rounded-lg border border-slate-200 bg-[#f7fbf5] px-4 focus-within:border-emerald-600 focus-within:bg-white">
                <FiLock className="text-slate-400" aria-hidden="true" />
                <input id="password" name="password" type="password" value={formData.password} onChange={handleChange} placeholder="Enter your password" required className="min-w-0 flex-1 bg-transparent py-3 text-slate-950 outline-none placeholder:text-slate-400" />
              </div>
            </div>

            <button type="submit" disabled={loading} className="mt-2 inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-700 px-4 py-3 font-semibold text-white shadow-sm transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-60">
              {loading ? "Please wait..." : isLogin ? "Login" : "Create Account"}
              {!loading && <FiArrowRight aria-hidden="true" />}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-500">
            Need context first?{" "}
            <Link href="/about" className="font-semibold text-emerald-800 hover:text-emerald-950">Read about the app</Link>
          </p>
        </div>
      </div>
    </section>
  );
};
