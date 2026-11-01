import { useState, type FormEvent } from "react";
import { NICHES, SCRIPTS, TIERS, formatBrl, tierById } from "@/lib/sales";
import { PAID_STATUSES, STATUS_LABEL, STATUS_ORDER, type LeadStatus, useSegunda } from "@/lib/store";
import { CopyButton, Field, Panel } from "./bits";

export function Funil() {
  const leads = useSegunda((s) => s.leads);
  const addLead = useSegunda((s) => s.addLead);
  const setStatus = useSegunda((s) => s.setStatus);
  const removeLead = useSegunda((s) => s.removeLead);
  const seller = useSegunda((s) => s.seller);
  const city = useSegunda((s) => s.city);
  const scriptId = useSegunda((s) => s.scriptId);
  const tierId = useSegunda((s) => s.tierId);
  const setLeadTier = useSegunda((s) => s.setLeadTier);

  const [business, setBusiness] = useState("");
  const [nicheId, setNicheId] = useState(NICHES[0].id);
  const [leadTier, setNewTier] = useState(tierId);
  const [phone, setPhone] = useState("");
  const [area, setArea] = useState("");
  const [filter, setFilter] = useState<LeadStatus | "todos">("todos");

  const visible = filter === "todos" ? leads : leads.filter((lead) => lead.status === filter);
  const paid = leads
    .filter((lead) => PAID_STATUSES.includes(lead.status))
    .reduce((sum, lead) => sum + tierById(lead.tierId).price, 0);
  const hot = leads.filter((lead) => lead.status === "respondeu" || lead.status === "negociando").length;

  function submit(event: FormEvent) {
    event.preventDefault();
    if (!business.trim()) return;
    addLead({
      business: business.trim(),
      nicheId,
      phone: phone.trim(),
      area: area.trim(),
      tierId: leadTier,
    });
    setBusiness("");
    setPhone("");
    setArea("");
  }

  return (
    <Panel kicker="Lista de Curitiba" title="Vinte nomes. Quinze mensagens.">
      <div className="grid grid-cols-3 gap-2">
        <Stat label="Na mira" value={String(leads.length)} />
        <Stat label="Quentes" value={String(hot)} />
        <Stat label="Fechado" value={`R$ ${formatBrl(paid)}`} />
      </div>

      <form onSubmit={submit} className="flex flex-col gap-3 rounded-xl border border-line bg-surface p-4">
        <Field label="Negócio" value={business} onChange={setBusiness} placeholder="Silva Advogados" />
        <label className="block">
          <span className="mb-1.5 block text-xs font-medium tracking-wide text-muted uppercase">Nicho</span>
          <select
            value={nicheId}
            onChange={(event) => setNicheId(event.target.value)}
            className="h-12 w-full rounded-lg border border-line bg-surface-2 px-3 text-base text-fg outline-none"
          >
            {NICHES.map((niche) => (
              <option key={niche.id} value={niche.id}>
                {niche.label}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="mb-1.5 block text-xs font-medium tracking-wide text-muted uppercase">Ritmo</span>
          <select
            value={leadTier}
            onChange={(event) => setNewTier(event.target.value)}
            className="h-12 w-full rounded-lg border border-line bg-surface-2 px-3 text-base text-fg outline-none"
          >
            {TIERS.map((tier) => (
              <option key={tier.id} value={tier.id}>
                {tier.label} · R$ {formatBrl(tier.price)}
              </option>
            ))}
          </select>
        </label>
        <div className="grid grid-cols-2 gap-3">
          <Field label="WhatsApp" value={phone} onChange={setPhone} placeholder="41 9..." />
          <Field label="Bairro" value={area} onChange={setArea} placeholder="Batel" />
        </div>
        <button type="submit" className="h-12 rounded-lg bg-lime text-sm font-semibold text-ink">
          Colocar na lista
        </button>
      </form>

      <div className="flex gap-2 overflow-x-auto pb-1">
        <FilterChip on={filter === "todos"} onClick={() => setFilter("todos")} label="Todos" />
        {STATUS_ORDER.map((status) => (
          <FilterChip
            key={status}
            on={filter === status}
            onClick={() => setFilter(status)}
            label={STATUS_LABEL[status]}
          />
        ))}
      </div>

      {visible.length === 0 ? (
        <p className="rounded-xl border border-dashed border-line px-4 py-8 text-center text-sm text-muted">
          Abre o Google Maps, busca o nicho e anota quem não tem site. Meta de hoje: 20.
        </p>
      ) : (
        <ul className="flex flex-col gap-3">
          {visible.map((lead) => {
            const niche = NICHES.find((item) => item.id === lead.nicheId) ?? NICHES[0];
            const tier = tierById(lead.tierId);
            const script = SCRIPTS.find((item) => item.id === scriptId) ?? SCRIPTS[0];
            const text = script.build({
              business: lead.business,
              niche,
              seller,
              city: city.trim() || "Curitiba",
              tier,
            });
            return (
              <li key={lead.id} className="rounded-xl border border-line bg-surface p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="text-lg font-semibold text-fg">{lead.business}</h2>
                    <p className="text-sm text-muted">
                      {niche.label} · {tier.label}
                      {lead.area ? ` · ${lead.area}` : ""}
                      {lead.phone ? ` · ${lead.phone}` : ""}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeLead(lead.id)}
                    className="text-sm text-muted underline"
                  >
                    Tirar
                  </button>
                </div>
                <label className="mt-3 block">
                  <span className="sr-only">Status de {lead.business}</span>
                  <select
                    value={lead.status}
                    onChange={(event) => setStatus(lead.id, event.target.value as LeadStatus)}
                    className="h-11 w-full rounded-lg border border-line bg-surface-2 px-3 text-sm text-fg"
                  >
                    {STATUS_ORDER.map((status) => (
                      <option key={status} value={status}>
                        {STATUS_LABEL[status]}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="mt-2 block">
                  <span className="sr-only">Ritmo de {lead.business}</span>
                  <select
                    value={tier.id}
                    onChange={(event) => setLeadTier(lead.id, event.target.value)}
                    className="h-11 w-full rounded-lg border border-line bg-surface-2 px-3 text-sm text-fg"
                  >
                    {TIERS.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.label} · R$ {formatBrl(item.price)}
                      </option>
                    ))}
                  </select>
                </label>
                <div className="mt-3">
                  <CopyButton text={text} label="Copiar abordagem" />
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </Panel>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-line bg-surface px-3 py-3">
      <p className="text-xs text-muted">{label}</p>
      <p className="mt-1 text-sm font-semibold text-lime">{value}</p>
    </div>
  );
}

function FilterChip({
  on,
  onClick,
  label,
}: {
  on: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        "h-10 shrink-0 rounded-full border px-3 text-sm " +
        (on ? "border-lime bg-lime text-ink" : "border-line bg-surface text-fg")
      }
    >
      {label}
    </button>
  );
}
