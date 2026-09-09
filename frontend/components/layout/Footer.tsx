import Link from "next/link";
import { FiDatabase, FiGithub, FiMail } from "react-icons/fi";

const footerLinks = [
  { href: "/about", label: "About" },
  { href: "/todos", label: "Todos" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/contact", label: "Contact" },
];

export const Footer = () => {
  return (
    <footer className="w-full border-t border-emerald-100 bg-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-start">
          <div className="max-w-md">
            <Link href="/" className="mb-4 flex items-center gap-3 text-slate-950">
              <span className="grid size-10 place-items-center rounded-lg bg-emerald-600 text-white">
                <FiDatabase aria-hidden="true" />
              </span>
              <span className="text-lg font-bold">Nexora AI</span>
            </Link>
            <p className="text-sm leading-6 text-slate-600">A clean frontend for private document chat, lightweight task tracking, and focused knowledge workflows.</p>
          </div>

          <div className="flex flex-wrap gap-3">
            {footerLinks.map((link) => (
              <Link key={link.href} href={link.href} className="rounded-md px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-emerald-50 hover:text-emerald-800">
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex flex-col justify-between gap-4 border-t border-emerald-100 pt-6 text-sm text-slate-500 sm:flex-row">
          <p>(c) 2026 Nexora AI. Built for calmer document work.</p>
          <div className="flex gap-4">
            <a href="mailto:hello@nexora.ai" className="inline-flex items-center gap-2 transition hover:text-emerald-800">
              <FiMail aria-hidden="true" />
              hello@nexora.ai
            </a>
            <a href="https://github.com" className="inline-flex items-center gap-2 transition hover:text-emerald-800">
              <FiGithub aria-hidden="true" />
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
