import { NICHES, OBJECTIONS, SCRIPTS, closingMessage, tierById } from "@/lib/sales";
import { useSegunda } from "@/lib/store";
import { CopyButton, Panel } from "./bits";

export function Textos() {
  const nicheId = useSegunda((s) => s.nicheId);
  const scriptId = useSegunda((s) => s.scriptId);
  const seller = useSegunda((s) => s.seller);
  const pix = useSegunda((s) => s.pix);
  const city = useSegunda((s) => s.city);
  const tierId = useSegunda((s) => s.tierId);
  const setNicheId = useSegunda((s) => s.setNicheId);
  const setScriptId = useSegunda((s) => s.setScriptId);

  const niche = NICHES.find((item) => item.id === nicheId) ?? NICHES[0];
  const script = SCRIPTS.find((item) => item.id === scriptId) ?? SCRIPTS[0];
  const tier = tierById(tierId);
  const message = script.build({
    business: "",
    niche,
    seller,
    city: city.trim() || "Curitiba",
    tier,
  });

  return (
    <Panel kicker="O que colar" title="Mensagem pronta.">
      <p className="text-sm leading-relaxed text-muted">
        Sem link na primeira mensagem. Troca uma palavra entre um envio e outro. Máximo de
        15 por dia, das 10h às 17h.
      </p>

      <div className="flex flex-wrap gap-2">
        {NICHES.map((item) => {
          const on = item.id === niche.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setNicheId(item.id)}
              className={
                "h-10 rounded-full border px-3 text-sm " +
                (on
                  ? "border-lime bg-lime text-ink"
                  : "border-line bg-surface text-fg")
              }
            >
              {item.label}
            </button>
          );
        })}
      </div>

      <p className="text-sm leading-relaxed text-muted">{niche.pain}</p>
      <CopyButton text={niche.maps} label={`Copiar busca: ${niche.maps}`} />

      <div className="flex flex-wrap gap-2">
        {SCRIPTS.map((item) => {
          const on = item.id === script.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setScriptId(item.id)}
              className={
                "h-10 rounded-full border px-3 text-sm " +
                (on ? "border-lime bg-lime text-ink" : "border-line bg-surface text-fg")
              }
            >
              {item.label}
            </button>
          );
        })}
      </div>

      <article className="rounded-xl border border-line bg-surface p-4">
        <pre className="font-sans text-sm leading-relaxed whitespace-pre-wrap text-fg">{message}</pre>
        <div className="mt-4">
          <CopyButton text={message} label="Copiar mensagem" />
        </div>
      </article>

      <div className="flex flex-col gap-2">
        {OBJECTIONS.map((item) => (
          <details key={item.q} className="rounded-xl border border-line bg-surface px-4 py-3">
            <summary className="cursor-pointer text-base font-medium text-fg">{item.q}</summary>
            <p className="mt-2 text-sm leading-relaxed text-muted">{item.a}</p>
            <div className="mt-3">
              <CopyButton text={item.a} label="Copiar resposta" />
            </div>
          </details>
        ))}
      </div>

      <article className="rounded-xl border border-line bg-surface p-4">
        <h2 className="font-display text-2xl">Quando disser sim</h2>
        <pre className="mt-3 font-sans text-sm leading-relaxed whitespace-pre-wrap text-fg">
          {closingMessage(pix, tier)}
        </pre>
        <div className="mt-4">
          <CopyButton text={closingMessage(pix, tier)} label="Copiar fechamento" />
        </div>
      </article>
    </Panel>
  );
}
