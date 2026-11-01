import { botPrompt, codexBrief, kapsoSketch, tierById } from "@/lib/sales";
import { useSegunda } from "@/lib/store";
import { CopyButton, Panel } from "./bits";

const STEPS = [
  "O site de segunda leva o botão wa.me do número do cliente. A mensagem do serviço já vai escrita. O Zap que abre é o dele.",
  "Você não compra fluxo de ninguém e não abre zip alheio. A página é sua. O canal é a API que você já usa.",
  "Kapso entra quando o atendimento for seu, ou quando o cliente te der o número. Texto livre só nas 24h depois que a pessoa falou.",
  "Fora dessa janela a Cloud API só manda template aprovado. Lista fria por ali derruba a qualidade do número.",
  "As seções moram num arquivo só. Codex e Claude mudam o texto sem refazer o layout.",
];

export function Bot() {
  const seller = useSegunda((s) => s.seller);
  const pix = useSegunda((s) => s.pix);
  const city = useSegunda((s) => s.city);
  const tier = tierById(useSegunda((s) => s.tierId));
  const prompt = botPrompt(seller, pix, city, tier);
  const sketch = kapsoSketch();
  const brief = codexBrief(city);

  return (
    <Panel kicker="Feito por você" title="Infra que o Codex aguenta.">
      <p className="text-base leading-relaxed text-muted">
        A obra é o site mais o curso, no ritmo escolhido na Oferta. Codex e Claude só
        mudam o arquivo de conteúdo. O contratante opera na sessão, não você no lugar dele.
      </p>

      <ol className="flex flex-col gap-3">
        {STEPS.map((step, index) => (
          <li key={step} className="flex gap-3 rounded-xl border border-line bg-surface p-4">
            <span className="font-display text-2xl text-lime">{index + 1}</span>
            <p className="text-sm leading-relaxed text-fg">{step}</p>
          </li>
        ))}
      </ol>

      <article className="rounded-xl border border-line bg-surface p-4">
        <h2 className="font-display text-2xl">Pedido para o Codex</h2>
        <pre className="mt-3 max-h-80 overflow-auto font-sans text-sm leading-relaxed whitespace-pre-wrap text-fg">
          {brief}
        </pre>
        <div className="mt-4">
          <CopyButton text={brief} label="Copiar pedido" />
        </div>
      </article>

      <article className="rounded-xl border border-line bg-surface p-4">
        <h2 className="font-display text-2xl">Como ligar</h2>
        <pre className="mt-3 max-h-80 overflow-auto font-sans text-sm leading-relaxed whitespace-pre-wrap text-fg">
          {sketch}
        </pre>
        <div className="mt-4">
          <CopyButton text={sketch} label="Copiar ligação" />
        </div>
      </article>

      <article className="rounded-xl border border-line bg-surface p-4">
        <h2 className="font-display text-2xl">Cérebro do atendimento</h2>
        <p className="mt-1 text-sm text-muted">
          Para quando a pessoa responder. Já sai com seu nome, cidade e Pix.
        </p>
        <pre className="mt-3 max-h-80 overflow-auto font-sans text-sm leading-relaxed whitespace-pre-wrap text-fg">
          {prompt}
        </pre>
        <div className="mt-4">
          <CopyButton text={prompt} label="Copiar cérebro" />
        </div>
      </article>
    </Panel>
  );
}
