import { EXCLUDES, INCLUDES, PIPELINE, STAGES, TIERS, formatBrl } from "@/lib/sales";
import { useSegunda } from "@/lib/store";
import { Panel } from "./bits";

export function Oferta() {
  const tierId = useSegunda((s) => s.tierId);
  const setTierId = useSegunda((s) => s.setTierId);
  const tier = TIERS.find((item) => item.id === tierId) ?? TIERS[1];

  return (
    <Panel kicker="A obra" title="Site mais o curso, na prática.">
      <p className="text-base leading-relaxed text-muted">
        Contratar a construção do site e levar um curso de Claude e Codex dentro da obra.
        O ritmo muda o horário, não o caminho.
      </p>

      <div className="flex flex-col gap-3">
        {TIERS.map((item) => {
          const on = item.id === tier.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setTierId(item.id)}
              className={
                "rounded-xl border p-4 text-left " +
                (on ? "border-lime bg-surface" : "border-line bg-surface")
              }
            >
              <div className="flex items-baseline justify-between gap-3">
                <h2 className="font-display text-3xl text-fg">{item.label}</h2>
                <p className="text-sm font-semibold text-lime">R$ {formatBrl(item.price)}</p>
              </div>
              <p className="mt-1 text-sm text-muted">
                {item.calendar} · {item.hours}
              </p>
            </button>
          );
        })}
      </div>

      <article className="rounded-xl border border-line bg-surface p-4">
        <h2 className="font-display text-2xl">{tier.label}</h2>
        <p className="mt-2 text-sm text-fg">{tier.fit}</p>
        <dl className="mt-4 flex flex-col gap-3 text-sm">
          <Row label="Curso" value={tier.course} />
          <Row label="Legado" value={tier.legacy} />
          <Row label="Depois do ar" value={tier.follow} />
          <Row label="Pagamento" value={`${tier.installments}, ou Pix de R$ ${formatBrl(tier.price)}`} />
        </dl>
      </article>

      <article className="rounded-xl border border-line bg-surface p-4">
        <h2 className="font-display text-2xl">Do primeiro oi ao mês</h2>
        <ol className="mt-3 flex flex-col gap-3">
          {PIPELINE.map((step, index) => (
            <li key={step.title} className="border-t border-line pt-3 first:border-0 first:pt-0">
              <p className="text-sm font-semibold text-lime">
                {index + 1}. {step.title}
              </p>
              <p className="mt-1 text-sm leading-relaxed text-fg">{step.text}</p>
            </li>
          ))}
        </ol>
      </article>

      <article className="rounded-xl border border-line bg-surface p-4">
        <h2 className="font-display text-2xl">Estágios da obra</h2>
        <ol className="mt-3 flex flex-col gap-3">
          {STAGES.map((stage) => (
            <li key={stage.n} className="border-t border-line pt-3 first:border-0 first:pt-0">
              <p className="text-sm font-semibold text-fg">
                {stage.n}. {stage.title}
              </p>
              <p className="mt-1 text-sm leading-relaxed text-muted">{stage.text}</p>
            </li>
          ))}
        </ol>
      </article>

      <div className="grid gap-3">
        <List title="Em todo ritmo" items={INCLUDES} tone="fg" />
        <List title="Não entra" items={EXCLUDES} tone="muted" />
      </div>
    </Panel>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-t border-line pt-3">
      <dt className="text-xs font-medium tracking-wide text-muted uppercase">{label}</dt>
      <dd className="mt-1 leading-relaxed text-fg">{value}</dd>
    </div>
  );
}

function List({
  title,
  items,
  tone,
}: {
  title: string;
  items: string[];
  tone: "fg" | "muted";
}) {
  return (
    <article className="rounded-xl border border-line bg-surface p-4">
      <h2 className="font-display text-2xl">{title}</h2>
      <ul className={"mt-3 flex flex-col gap-2 text-sm leading-relaxed " + (tone === "fg" ? "text-fg" : "text-muted")}>
        {items.map((item) => (
          <li key={item} className="border-t border-line pt-2 first:border-0 first:pt-0">
            {item}
          </li>
        ))}
      </ul>
    </article>
  );
}
