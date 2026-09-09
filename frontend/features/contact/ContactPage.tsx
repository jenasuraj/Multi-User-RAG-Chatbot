"use client";

import { FormEvent, useState } from "react";
import { FiMail, FiMapPin, FiPhone, FiSend } from "react-icons/fi";

const contactMethods = [
  { icon: FiMail, label: "Email", value: "hello@nexora.ai" },
  { icon: FiPhone, label: "Phone", value: "+91 98765 43210" },
  { icon: FiMapPin, label: "Location", value: "Remote-first team" },
];

export const ContactPage = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <section className="w-full bg-[#f7fbf5]">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[0.85fr_1fr] lg:px-8">
          <div>
            <p className="text-sm font-bold uppercase text-emerald-700">Contact</p>
            <h1 className="mt-3 text-4xl font-bold leading-tight tracking-normal text-slate-950 sm:text-5xl">Tell us what your document workflow needs.</h1>
            <p className="mt-6 text-lg leading-8 text-slate-600">Send a quick note about your use case, documents, or dashboard ideas. This form is frontend-only for now and shaped for future backend wiring.</p>

            <div className="mt-8 grid gap-4">
              {contactMethods.map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-center gap-4 rounded-lg border border-emerald-100 bg-white p-4 shadow-sm">
                  <span className="grid size-11 place-items-center rounded-lg bg-emerald-100 text-emerald-800">
                    <Icon aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-slate-500">{label}</p>
                    <p className="font-bold text-slate-950">{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="rounded-lg border border-emerald-100 bg-white p-6 shadow-lg sm:p-8">
            {submitted && <p role="status" className="mb-5 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800">Thanks, your message is ready for future backend handling.</p>}

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-sm font-semibold text-slate-700">Name</label>
                <input id="name" name="name" type="text" required placeholder="Your name" className="rounded-lg border border-slate-200 bg-[#f7fbf5] px-4 py-3 text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-emerald-600 focus:bg-white" />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-sm font-semibold text-slate-700">Email</label>
                <input id="email" name="email" type="email" required placeholder="you@example.com" className="rounded-lg border border-slate-200 bg-[#f7fbf5] px-4 py-3 text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-emerald-600 focus:bg-white" />
              </div>
            </div>

            <div className="mt-5 flex flex-col gap-2">
              <label htmlFor="subject" className="text-sm font-semibold text-slate-700">Subject</label>
              <input id="subject" name="subject" type="text" required placeholder="How can we help?" className="rounded-lg border border-slate-200 bg-[#f7fbf5] px-4 py-3 text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-emerald-600 focus:bg-white" />
            </div>

            <div className="mt-5 flex flex-col gap-2">
              <label htmlFor="message" className="text-sm font-semibold text-slate-700">Message</label>
              <textarea id="message" name="message" required rows={6} placeholder="Share a few details..." className="resize-none rounded-lg border border-slate-200 bg-[#f7fbf5] px-4 py-3 text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-emerald-600 focus:bg-white" />
            </div>

            <button type="submit" className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-700 px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-emerald-800">
              Send Message
              <FiSend aria-hidden="true" />
            </button>
          </form>
        </div>
      </section>
    </>
  );
};
