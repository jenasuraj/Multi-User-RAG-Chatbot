import Link from "next/link";
import { FiDatabase, FiGithub, FiMail } from "react-icons/fi";

const footerLinks = [
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

      </div>
    </footer>
  );
};
