import Link from "next/link";
import { FiArrowRight, FiDatabase } from "react-icons/fi";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/todos", label: "Todos" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/contact", label: "Contact" },
];

export const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-emerald-100 bg-[#f7fbf5]/95 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8" aria-label="Main navigation">
        <Link href="/" className="flex items-center gap-3 text-slate-950">
          <span className="grid size-10 place-items-center rounded-lg bg-emerald-600 text-white shadow-sm">
            <FiDatabase aria-hidden="true" />
          </span>
          <span className="text-lg font-bold tracking-normal">Nexora AI</span>
        </Link>

        <div className="hidden items-center gap-1 rounded-lg border border-emerald-100 bg-white/80 p-1 shadow-sm md:flex">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="rounded-md px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-emerald-50 hover:text-emerald-800">
              {link.label}
            </Link>
          ))}
        </div>

        <Link href="/login" className="inline-flex items-center gap-2 rounded-lg bg-emerald-700 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-800">
          Login
          <FiArrowRight aria-hidden="true" />
        </Link>
      </nav>
    </header>
  );
};
