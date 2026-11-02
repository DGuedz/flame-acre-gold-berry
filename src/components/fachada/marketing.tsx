import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

export type PageFrameProps = {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
  actions?: ReactNode;
};

export function PageFrame({ eyebrow, title, description, children, actions }: PageFrameProps) {
  return (
    <div className="min-h-screen bg-[#101410] text-[#f3f1e8]">
      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
        <header className="mb-8 flex flex-col gap-4 rounded-[28px] border border-[#2a322d] bg-[#181e19] px-4 py-4 shadow-[0_12px_30px_rgba(0,0,0,0.18)] sm:px-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <Link to="/" className="font-display text-3xl leading-none font-semibold tracking-tight text-[#f3f1e8]">
              Fachada
            </Link>
            <nav className="flex flex-wrap items-center gap-2 text-sm font-medium text-[#dfe6da]">
              <NavLink to="/catalogo">Catálogo</NavLink>
              <NavLink to="/quiz">Quiz</NavLink>
              <NavLink to="/planos">Planos</NavLink>
              <NavLink to="/garantia">Garantia</NavLink>
              <NavLink to="/termos">Soberania</NavLink>
            </nav>
          </div>
        </header>

        <main className="rounded-[30px] border border-[#2a322d] bg-[#181e19] px-4 py-8 sm:px-6 lg:px-8">
          <div className="mb-8 max-w-3xl">
            <p className="text-xs font-semibold tracking-[0.24em] text-[#a8b3a1]">{eyebrow}</p>
            <h1 className="mt-3 font-display text-4xl leading-none font-semibold tracking-tight text-[#f3f1e8] sm:text-5xl">
              {title}
            </h1>
            <p className="mt-4 max-w-2xl text-base text-[#c7d0c4]">{description}</p>
            {actions ? <div className="mt-6 flex flex-wrap gap-3">{actions}</div> : null}
          </div>

          {children}
        </main>
      </div>
    </div>
  );
}

function NavLink({ to, children }: { to: string; children: ReactNode }) {
  return (
    <Link
      to={to as any}
      className="rounded-full border border-[#2a322d] bg-[#101410] px-3 py-1.5 text-[#f3f1e8] transition hover:border-[#4c5b4d] hover:bg-[#1d261f]"
    >
      {children}
    </Link>
  );
}

export function SectionTitle({ kicker, title, text }: { kicker: string; title: string; text?: string }) {
  return (
    <div className="mb-5 max-w-2xl">
      <p className="text-xs font-semibold tracking-[0.2em] text-[#9aa396]">{kicker}</p>
      <h2 className="mt-3 font-display text-3xl leading-none font-semibold tracking-tight text-[#f3f1e8]">
        {title}
      </h2>
      {text ? <p className="mt-3 text-sm text-[#c7d0c4]">{text}</p> : null}
    </div>
  );
}

export function MetricCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-2xl border border-[#2a322d] bg-[#101410] p-5">
      <div className="font-display text-4xl leading-none font-semibold text-[#d6f25c]">{value}</div>
      <p className="mt-3 text-sm text-[#c7d0c4]">{label}</p>
    </div>
  );
}

export function Pill({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-[#313a33] bg-[#101410] px-3 py-1.5 text-xs font-semibold text-[#f3f1e8]">
      {children}
    </span>
  );
}

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`rounded-[24px] border border-[#2a322d] bg-[#101410] p-5 ${className}`}>{children}</div>;
}

export function Checklist({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-sm text-[#dfe6da]">
          <span className="mt-1 inline-block size-2 rounded-full bg-[#d6f25c]" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
