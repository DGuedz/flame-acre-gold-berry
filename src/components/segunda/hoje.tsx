import { Check } from "lucide-react";
import { MONDAY, SATURDAY, SUNDAY } from "@/lib/sales";
import { useSegunda } from "@/lib/store";
import { Field, Panel } from "./bits";

function Day({
  label,
  hint,
  items,
}: {
  label: string;
  hint: string;
  items: { id: string; text: string }[];
}) {
  const done = useSegunda((s) => s.done);
  const toggleDone = useSegunda((s) => s.toggleDone);
  const total = items.filter((item) => done[item.id]).length;

  return (
    <article className="rounded-xl border border-line bg-surface p-4">
      <div className="mb-3 flex items-baseline justify-between gap-3">
        <div>
          <h2 className="font-display text-2xl text-fg">{label}</h2>
          <p className="text-sm text-muted">{hint}</p>
        </div>
        <p className="text-sm font-semibold text-lime">
          {total}/{items.length}
        </p>
      </div>
      <ul className="flex flex-col gap-2">
        {items.map((item) => {
          const on = Boolean(done[item.id]);
          return (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => toggleDone(item.id)}
                className="flex min-h-11 w-full items-start gap-3 rounded-lg px-1 py-2 text-left"
              >
                <span
                  className={
                    "mt-0.5 grid size-5 shrink-0 place-items-center rounded-full border " +
                    (on ? "border-lime bg-lime text-ink" : "border-line bg-transparent")
                  }
                  aria-hidden="true"
                >
                  {on ? <Check className="size-3" strokeWidth={3} /> : null}
                </span>
                <span className={on ? "text-muted line-through" : "text-fg"}>{item.text}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </article>
  );
}

export function Hoje() {
  const seller = useSegunda((s) => s.seller);
  const pix = useSegunda((s) => s.pix);
  const city = useSegunda((s) => s.city);
  const setSeller = useSegunda((s) => s.setSeller);
  const setPix = useSegunda((s) => s.setPix);
  const setCity = useSegunda((s) => s.setCity);
  const setTab = useSegunda((s) => s.setTab);

  return (
    <Panel kicker="Sábado para segunda" title="Começa hoje. Cobra segunda.">
      <p className="text-base leading-relaxed text-muted">
        Contrata o site e leva o curso de Claude e Codex na obra. Três ritmos, de 7 a 45
        dias. O Pix de segunda sai de mensagem humana, hoje e domingo.
      </p>

      <div className="grid gap-3">
        <Field label="Seu nome na mensagem" value={seller} onChange={setSeller} placeholder="Juninho" />
        <Field label="Chave Pix" value={pix} onChange={setPix} placeholder="email, telefone ou aleatória" />
        <Field label="Cidade" value={city} onChange={setCity} placeholder="Curitiba" />
      </div>

      <Day label="Hoje" hint="Munição. Sem isso, segunda não tem o que cobrar." items={SATURDAY} />
      <Day label="Domingo" hint="15 abordagens. Mais que isso arrisca bloqueio." items={SUNDAY} />
      <Day label="Segunda" hint="Follow-up, Pix, entrega." items={MONDAY} />

      <button
        type="button"
        onClick={() => setTab("funil")}
        className="h-12 rounded-lg bg-lime text-sm font-semibold text-ink"
      >
        Montar a lista de 20
      </button>
    </Panel>
  );
}
