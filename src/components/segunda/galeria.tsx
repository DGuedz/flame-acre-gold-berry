import { useState } from "react";
import { modelos } from "@/lib/fachadas";
import { NICHES } from "@/lib/sales";

type Escolha = { nicheId: string; porteId: string };

const TINTA: Record<string, { papel: string; tinta: string; acento: string }> = {
  adv: { papel: "#17191e", tinta: "#f3efe6", acento: "#c6a15d" },
  dent: { papel: "#f3faf8", tinta: "#12312e", acento: "#1c7d6e" },
  est: { papel: "#1c1218", tinta: "#f8efe8", acento: "#e7b3c0" },
  cont: { papel: "#f3f7f1", tinta: "#1c2a16", acento: "#3d7a32" },
  imob: { papel: "#f7f3ec", tinta: "#2a241c", acento: "#a36b3c" },
  arq: { papel: "#f2f2f2", tinta: "#111111", acento: "#111111" },
  psi: { papel: "#f6f3f8", tinta: "#2c2433", acento: "#7d6b93" },
  pet: { papel: "#fff6ec", tinta: "#3a2a16", acento: "#d86b24" },
};

export function Galeria({ onOpen }: { onOpen: (escolha: Escolha) => void }) {
  const [oficio, setOficio] = useState("tudo");
  const [tamanho, setTamanho] = useState("tudo");
  const grade = modelos().filter((item) => {
    if (oficio !== "tudo" && item.nicheId !== oficio) return false;
    if (tamanho !== "tudo" && item.siteId !== tamanho) return false;
    return true;
  });

  return (
    <section id="paginas" className="bg-[#f4f4f2] text-[#161616]">
      <header className="mx-auto w-full max-w-6xl px-4 pt-16">
        <p className="text-xs font-semibold tracking-[0.18em] text-[#5c5c5c]">02 — PÁGINAS</p>
        <h2 className="mt-3 max-w-xl font-display text-5xl leading-none font-semibold tracking-tight">
          Escolhe o site pelo que você vê.
        </h2>
        <p className="mt-3 max-w-md text-sm text-[#5c5c5c]">
          Oito ofícios. Três tamanhos. O preço está embaixo do modelo.
        </p>
        <div className="mt-5 flex gap-2 overflow-x-auto pb-1">
          <Pilha on={oficio === "tudo"} onClick={() => setOficio("tudo")}>
            Tudo
          </Pilha>
          {NICHES.map((item) => (
            <Pilha key={item.id} on={oficio === item.id} onClick={() => setOficio(item.id)}>
              {item.label}
            </Pilha>
          ))}
        </div>
        <div className="mt-2 flex gap-2">
          <Pilha on={tamanho === "tudo"} onClick={() => setTamanho("tudo")}>
            Os três
          </Pilha>
          <Pilha on={tamanho === "curto"} onClick={() => setTamanho("curto")}>
            Vitrine
          </Pilha>
          <Pilha on={tamanho === "padrao"} onClick={() => setTamanho("padrao")}>
            Loja
          </Pilha>
          <Pilha on={tamanho === "longo"} onClick={() => setTamanho("longo")}>
            Casa
          </Pilha>
        </div>
      </header>
      <section className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-8 px-4 py-8 sm:grid-cols-2 lg:grid-cols-3">
        {grade.map((item) => (
          <button
            key={`${item.nicheId}-${item.siteId}`}
            type="button"
            onClick={() => onOpen({ nicheId: item.nicheId, porteId: item.porteId })}
            className="text-left"
          >
            <Shot item={item} />
            <span className="mt-3 block text-base font-semibold">{item.face.titulo}</span>
            <span className="mt-1 block text-sm text-[#5c5c5c]">
              {item.niche} · {item.nome}
            </span>
            <span className="mt-1 block font-display text-2xl leading-none font-semibold">{item.valor}</span>
          </button>
        ))}
      </section>
    </section>
  );
}

function Pilha({ on, onClick, children }: { on: boolean; onClick: () => void; children: string }) {
  return (
    <button
      type="button"
      aria-pressed={on}
      onClick={onClick}
      className={
        "h-9 shrink-0 rounded-full px-3 text-sm font-semibold " +
        (on ? "bg-[#161616] text-white" : "bg-white text-[#161616] ring-1 ring-[#e4e4e0]")
      }
    >
      {children}
    </button>
  );
}

function Shot({ item }: { item: ReturnType<typeof modelos>[number] }) {
  const cor = TINTA[item.nicheId] ?? TINTA.dent;
  return (
    <span
      className="block overflow-hidden rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.08)]"
      style={{ background: cor.papel, color: cor.tinta }}
    >
      <span className="flex h-8 items-center gap-1 px-3">
        <i className="size-2 rounded-full bg-current opacity-30" />
        <i className="size-2 rounded-full bg-current opacity-30" />
        <i className="size-2 rounded-full bg-current opacity-30" />
      </span>
      {item.siteId === "curto" ? <Vitrine face={item.face} acento={cor.acento} /> : null}
      {item.siteId === "padrao" ? <Loja face={item.face} acento={cor.acento} /> : null}
      {item.siteId === "longo" ? <Casa face={item.face} acento={cor.acento} /> : null}
    </span>
  );
}

function Vitrine({ face, acento }: { face: { titulo: string; linhas: string[] }; acento: string }) {
  return (
    <span className="grid min-h-64 place-items-center px-6 pb-8 text-center">
      <span>
        <span className="block font-display text-4xl leading-none font-semibold">{face.titulo}</span>
        <span className="mt-3 block text-sm opacity-70">{face.linhas[0]}</span>
        <span
          className="mt-5 inline-block rounded-full px-4 py-2 text-xs font-semibold text-white"
          style={{ background: acento }}
        >
          {face.linhas[1]}
        </span>
      </span>
    </span>
  );
}

function Loja({ face, acento }: { face: { titulo: string; linhas: string[] }; acento: string }) {
  return (
    <span className="block min-h-64 px-4 pb-5">
      <span className="flex items-center justify-between text-[11px] font-semibold">
        <span>{face.titulo}</span>
        <span className="rounded-full px-2 py-1 text-white" style={{ background: acento }}>
          Zap
        </span>
      </span>
      <span className="mt-4 grid grid-cols-3 gap-2">
        {face.linhas.map((linha) => (
          <span key={linha} className="rounded-xl bg-current/10 px-2 py-6 text-center text-[11px] font-semibold">
            {linha}
          </span>
        ))}
      </span>
    </span>
  );
}

function Casa({ face, acento }: { face: { titulo: string; linhas: string[] }; acento: string }) {
  return (
    <span className="block min-h-64 px-4 pb-5">
      <span className="flex items-center justify-between text-[11px] font-semibold opacity-70">
        <span>Início</span>
        <span>Marca</span>
        <span>Sistema</span>
        <span className="rounded-full px-2 py-1 text-white opacity-100" style={{ background: acento }}>
          Zap
        </span>
      </span>
      <span className="mt-4 block font-display text-3xl leading-none font-semibold">{face.titulo}</span>
      <span className="mt-4 grid grid-cols-2 gap-2">
        {face.linhas.map((linha) => (
          <span key={linha} className="rounded-xl bg-current/10 px-2 py-5 text-xs font-semibold">
            {linha}
          </span>
        ))}
      </span>
    </span>
  );
}
