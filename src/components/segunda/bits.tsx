import { useState, type ReactNode } from "react";
import { Check, Copy } from "lucide-react";
import { toast } from "sonner";

export async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    toast("Copiado. Pode colar no WhatsApp.");
    return true;
  } catch {
    toast("Seleciona o texto e copia na mão.");
    return false;
  }
}

export function CopyButton({
  text,
  label = "Copiar",
}: {
  text: string;
  label?: string;
}) {
  const [done, setDone] = useState(false);

  return (
    <button
      type="button"
      className="inline-flex h-11 items-center gap-2 rounded-lg bg-lime px-4 text-sm font-semibold text-ink"
      onClick={async () => {
        const ok = await copyText(text);
        if (!ok) return;
        setDone(true);
        window.setTimeout(() => setDone(false), 1400);
      }}
    >
      {done ? <Check className="size-4" /> : <Copy className="size-4" />}
      {done ? "Copiado" : label}
    </button>
  );
}

export function Field({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium tracking-wide text-muted uppercase">
        {label}
      </span>
      <input
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        className="h-12 w-full rounded-lg border border-line bg-surface-2 px-3 text-base text-fg outline-none placeholder:text-muted focus:border-lime"
      />
    </label>
  );
}

export function Panel({
  kicker,
  title,
  children,
}: {
  kicker: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="flex flex-col gap-5">
      <header>
        <p className="text-xs font-semibold tracking-widest text-lime uppercase">{kicker}</p>
        <h1 className="mt-1 font-display text-4xl leading-none font-semibold text-fg">{title}</h1>
      </header>
      {children}
    </section>
  );
}
