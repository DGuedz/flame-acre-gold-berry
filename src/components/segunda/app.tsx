import { useEffect, useState } from "react";
import { useSegunda } from "@/lib/store";
import { Galeria } from "./galeria";
import { Quiz } from "./quiz";

export function SegundaApp() {
  const [escolha, setEscolha] = useState<{ nicheId: string; porteId: string } | null>(null);

  useEffect(() => {
    void useSegunda.persist.rehydrate();
  }, []);

  function abrir(proxima: { nicheId: string; porteId: string }) {
    setEscolha(proxima);
    document.getElementById("quiz")?.scrollIntoView({ behavior: "smooth" });
  }

  const chave = escolha ? `${escolha.nicheId}-${escolha.porteId}` : "livre";

  return (
    <div className="bg-[#f4f4f2]">
      <Hero />
      <Galeria onOpen={abrir} />
      <section id="quiz" className="bg-[#101410]">
        <div className="mx-auto w-full max-w-lg px-4 pt-10">
          <p className="text-xs font-semibold tracking-[0.18em] text-[#9aa396]">03 — QUIZ</p>
          <h2 className="mt-3 font-display text-5xl leading-none font-semibold text-[#f3f1e8]">Qual é o seu?</h2>
        </div>
        <Quiz
          key={chave}
          inicio={escolha ?? undefined}
          onSair={
            escolha
              ? () => {
                  setEscolha(null);
                  document.getElementById("paginas")?.scrollIntoView({ behavior: "smooth" });
                }
              : undefined
          }
        />
      </section>
    </div>
  );
}

function Hero() {
  return (
    <section className="flex min-h-dvh flex-col bg-[#f4f4f2] px-4 pt-5 pb-10 text-[#161616]">
      <nav className="flex items-center justify-between">
        <span className="font-display text-3xl leading-none font-semibold">Fachada</span>
        <span className="flex gap-4 text-sm font-semibold">
          <a href="#paginas">Páginas</a>
          <a href="#quiz">Quiz</a>
        </span>
      </nav>
      <p className="mt-12 text-xs font-semibold tracking-[0.18em] text-[#5c5c5c]">01 — HERO</p>
      <h1 className="mt-3 font-display text-[4.6rem] leading-[0.84] font-semibold tracking-tight">
        O SITE
        <br />
        DO TAMANHO
        <br />
        DA <span className="bg-[#161616] px-2 text-[#d6f25c]">EMPRESA.</span>
      </h1>
      <p className="mt-5 max-w-xs text-base text-[#3a3a3a]">
        Vitrine, Loja ou Casa. No ar em 7 dias. Quem pesquisa cai no Zap.
      </p>
      <div className="mt-6 flex gap-2">
        <a href="#paginas" className="rounded-full bg-[#161616] px-4 py-3 text-sm font-semibold text-white">
          Ver as páginas
        </a>
        <a href="#quiz" className="rounded-full bg-[#d6f25c] px-4 py-3 text-sm font-semibold text-[#14180a]">
          Fazer o quiz
        </a>
      </div>
      <div className="mt-8 grid grid-cols-3 gap-2">
        <Faixa nome="Vitrine" valor="1.497" />
        <Faixa nome="Loja" valor="2.997" />
        <Faixa nome="Casa" valor="4.997" />
      </div>
    </section>
  );
}

function Faixa({ nome, valor }: { nome: string; valor: string }) {
  return (
    <div className="rounded-2xl bg-white px-3 py-4 shadow-[0_10px_30px_rgba(0,0,0,0.06)]">
      <p className="font-display text-2xl leading-none font-semibold">{nome}</p>
      <p className="mt-2 text-xs text-[#5c5c5c]">R$ {valor}</p>
    </div>
  );
}