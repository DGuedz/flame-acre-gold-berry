import { useMemo, useState } from "react";
import { Check, ChevronLeft } from "lucide-react";
import {
  TRIAGEM,
  beneficios,
  diagnostico,
  horarios,
  mailLink,
  mensagemAgenda,
  oferta,
  waLink,
  type Horario,
} from "@/lib/quiz";
import { NICHES, tierById } from "@/lib/sales";
import { siteDe } from "@/lib/sites";
import { PORTES, fachadasDo, porteDe } from "@/lib/fachadas";
import { useSegunda } from "@/lib/store";
import { copyText } from "./bits";

type Screen = "oficio" | "porte" | "fachadas" | "pacote" | "triagem" | "pix" | "agenda" | "pago";

const ORDEM: Screen[] = ["oficio", "porte", "fachadas", "pacote", "triagem", "pix", "agenda"];

export function Quiz() {
  const pix = useSegunda((s) => s.pix);
  const setPix = useSegunda((s) => s.setPix);
  const [screen, setScreen] = useState<Screen>("oficio");
  const [nicheId, setNicheId] = useState("dent");
  const [porteId, setPorteId] = useState("medio");
  const [tierId, setTierId] = useState("padrao");
  const [passo, setPasso] = useState(0);
  const [marcas, setMarcas] = useState<string[]>([]);
  const [nome, setNome] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [horario, setHorario] = useState<Horario | null>(null);

  const diag = useMemo(() => diagnostico([], []), []);
  const tier = tierById(tierId);
  const lista = beneficios(tier);
  const beneficio = lista[passo] ?? lista[0];
  const slots = horarios(tier, marcas.includes("sento"));
  const texto = horario ? mensagemAgenda(nome, tier, diag.itens, marcas, horario) : "";
  const contato =
    nome.trim().length > 1 && phone.replace(/\D/g, "").length >= 10 && email.includes("@");
  const at = Math.max(0, ORDEM.indexOf(screen));

  function toggle(id: string, list: string[], set: (next: string[]) => void) {
    set(list.includes(id) ? list.filter((item) => item !== id) : [...list, id]);
  }

  function back() {
    if (screen === "porte") setScreen("oficio");
    else if (screen === "fachadas") setScreen("porte");
    else if (screen === "pacote") {
      if (passo > 0) setPasso((n) => n - 1);
      else setScreen("fachadas");
    } else if (screen === "triagem") setScreen("pacote");
    else if (screen === "pix") setScreen("triagem");
    else if (screen === "agenda") setScreen("pix");
    else if (screen === "pago") setScreen("agenda");
  }

  function escolher(id: string) {
    setTierId(id);
    setPasso(0);
    setHorario(null);
    setScreen("pacote");
  }

  function avancarBeneficio() {
    if (passo < lista.length - 1) setPasso((n) => n + 1);
    else setScreen("triagem");
  }

  function marcarHorario(item: Horario) {
    setHorario(item);
    const fala = mensagemAgenda(nome, tier, diag.itens, marcas, item);
    window.open(waLink(phone, fala), "_blank", "noopener,noreferrer");
    window.setTimeout(() => {
      window.open(mailLink(email, fala), "_blank", "noopener,noreferrer");
    }, 350);
    setScreen("pago");
  }

  return (
    <main className="mx-auto flex h-dvh w-full max-w-lg flex-col overflow-hidden bg-bg px-4 pt-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
      <header className="mb-3 flex shrink-0 items-center gap-3">
        {screen === "oficio" ? (
          <span className="shrink-0 text-sm font-semibold tracking-tight text-fg">Fachada</span>
        ) : (
          <button
            type="button"
            onClick={back}
            aria-label="Voltar"
            className="grid size-11 place-items-center rounded-full border border-line text-fg"
          >
            <ChevronLeft className="size-5" />
          </button>
        )}
        <div className="flex flex-1 gap-1" aria-hidden="true">
          {ORDEM.map((item, index) => (
            <span key={item} className={"h-1 flex-1 rounded-full " + (index <= at ? "bg-lime" : "bg-line")} />
          ))}
        </div>
      </header>

      <div key={screen === "pacote" ? `pacote-${passo}` : screen} className="quiz-rise flex min-h-0 flex-1 flex-col">
        {screen === "oficio" && (
          <Escolha
            title="Qual é o negócio?"
            hint="A página que abre é do seu ofício."
            options={NICHES.map((item) => ({ id: item.id, label: item.label, frase: "" }))}
            picked={nicheId}
            onPick={setNicheId}
            onNext={() => setScreen("porte")}
            next="Ver o tamanho"
          />
        )}
        {screen === "porte" && (
          <Escolha
            title="Qual o tamanho?"
            hint="O tamanho marca a fachada que cabe."
            options={PORTES.map((item) => ({ id: item.id, label: item.label, frase: item.frase }))}
            picked={porteId}
            onPick={(id) => {
              setPorteId(id);
              setTierId(porteDe(id).site);
            }}
            onNext={() => setScreen("fachadas")}
            next="Ver as fachadas"
          />
        )}
        {screen === "fachadas" && (
          <Fachadas nicheId={nicheId} porteId={porteId} onChoose={escolher} />
        )}
        {screen === "pacote" && (
          <Pacote
            label={siteDe(tier.id).nome}
            valor={`R$ ${tier.price.toLocaleString("pt-BR")}`}
            titulo={beneficio.titulo}
            frase={beneficio.frase}
            passo={passo}
            total={lista.length}
            ultimo={passo === lista.length - 1}
            onNext={avancarBeneficio}
          />
        )}
        {screen === "triagem" && (
          <Triagem
            marcas={marcas}
            nome={nome}
            phone={phone}
            email={email}
            pronto={contato}
            onToggle={(id) => toggle(id, marcas, setMarcas)}
            onNome={setNome}
            onPhone={setPhone}
            onEmail={setEmail}
            onNext={() => setScreen("pix")}
          />
        )}
        {screen === "pix" && (
          <Pix
            label={siteDe(tier.id).nome}
            valor={`R$ ${tier.price.toLocaleString("pt-BR")}`}
            promessa={oferta(tier.id).promessa}
            fecha={oferta(tier.id).fecha}
            pix={pix}
            onPix={setPix}
            onCopy={() => void copyText(pix.trim() || `R$ ${tier.price.toLocaleString("pt-BR")}`)}
            onPaid={() => setScreen("agenda")}
          />
        )}
        {screen === "agenda" && (
          <Agenda label={siteDe(tier.id).nome} escopo={`${tier.hours}. O primeiro encontro é este.`} slots={slots} onPick={marcarHorario} />
        )}
        {screen === "pago" && horario && (
          <Pago nome={nome} quando={horario.quando} texto={texto} zap={waLink(phone, texto)} mail={mailLink(email, texto)} />
        )}
      </div>
    </main>
  );
}

function Escolha({
  title,
  hint,
  options,
  picked,
  onPick,
  onNext,
  next,
}: {
  title: string;
  hint: string;
  options: { id: string; label: string; frase: string }[];
  picked: string;
  onPick: (id: string) => void;
  onNext: () => void;
  next: string;
}) {
  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <h1 className="shrink-0 font-display text-4xl leading-none font-semibold text-fg">{title}</h1>
      <p className="mt-2 shrink-0 text-sm text-muted">{hint}</p>
      <div className="mt-3 grid min-h-0 flex-1 grid-cols-2 content-start gap-2 overflow-y-auto">
        {options.map((item) => {
          const on = item.id === picked;
          return (
            <button
              key={item.id}
              type="button"
              aria-pressed={on}
              onClick={() => onPick(item.id)}
              className="logo-tile relative min-h-16 rounded-xl px-3 py-3 text-left"
            >
              <span className="block text-sm font-semibold text-fg">{item.label}</span>
              {item.frase ? <span className="mt-1 block text-xs text-muted">{item.frase}</span> : null}
              {on ? (
                <span className="absolute top-2 right-2 grid size-5 place-items-center rounded-full bg-[#22a35a] text-white">
                  <Check className="size-3" strokeWidth={3} />
                </span>
              ) : null}
            </button>
          );
        })}
      </div>
      <button type="button" onClick={onNext} className="logo-go mt-3 h-12 w-full shrink-0 rounded-lg text-sm font-semibold">
        {next}
      </button>
    </div>
  );
}

function Fachadas({
  nicheId,
  porteId,
  onChoose,
}: {
  nicheId: string;
  porteId: string;
  onChoose: (id: string) => void;
}) {
  const mesa = fachadasDo(nicheId, porteId);
  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <h1 className="shrink-0 font-display text-4xl leading-none font-semibold text-fg">Três fachadas.</h1>
      <p className="mt-2 shrink-0 text-sm text-muted">
        De {mesa.niche.label.toLowerCase()}. A marcada cabe no {mesa.porte.label.toLowerCase()}.
      </p>
      <div className="mt-3 flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto">
        {mesa.sites.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => onChoose(item.id)}
            className="logo-tile rounded-xl px-3 py-3 text-left"
          >
            <span className="block rounded-lg bg-bg px-3 py-2">
              <span className="block h-1 w-8 rounded-full bg-lime" />
              <span className="mt-1 block font-display text-lg leading-none font-semibold text-fg">{item.face.titulo}</span>
              {item.face.linhas.map((linha) => (
                <span key={linha} className="mt-1 block text-xs text-muted">
                  {linha}
                </span>
              ))}
            </span>
            <span className="mt-2 flex items-baseline justify-between gap-3">
              <span className="font-display text-2xl leading-none font-semibold text-fg">{item.nome}</span>
              <span className="font-display text-2xl leading-none font-semibold text-lime">{item.valor}</span>
            </span>
            {item.cabe ? (
              <span className="mt-2 inline-flex w-fit rounded-full bg-[#22a35a] px-2 py-0.5 text-xs font-semibold text-white">
                Cabe em você
              </span>
            ) : null}
          </button>
        ))}
      </div>
    </div>
  );
}

function Pacote({
  label,
  valor,
  titulo,
  frase,
  passo,
  total,
  ultimo,
  onNext,
}: {
  label: string;
  valor: string;
  titulo: string;
  frase: string;
  passo: number;
  total: number;
  ultimo: boolean;
  onNext: () => void;
}) {
  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <p className="shrink-0 text-sm text-muted">
        {label} · {valor}
      </p>
      <div className="grid min-h-0 flex-1 place-items-center text-center">
        <div>
          <h1 className="font-display text-5xl leading-none font-semibold text-fg">{titulo}</h1>
          <p className="mx-auto mt-4 max-w-xs text-base text-muted">{frase}</p>
        </div>
      </div>
      <div className="mb-3 flex justify-center gap-1.5" aria-hidden="true">
        {Array.from({ length: total }, (_, index) => (
          <span key={index} className={"h-1.5 w-6 rounded-full " + (index <= passo ? "bg-[#22a35a]" : "bg-line")} />
        ))}
      </div>
      <button type="button" onClick={onNext} className="logo-go h-12 w-full shrink-0 rounded-lg text-sm font-semibold">
        {ultimo ? "Fazer a triagem" : "O que vem atrás"}
      </button>
    </div>
  );
}

function Triagem({
  marcas,
  nome,
  phone,
  email,
  pronto,
  onToggle,
  onNome,
  onPhone,
  onEmail,
  onNext,
}: {
  marcas: string[];
  nome: string;
  phone: string;
  email: string;
  pronto: boolean;
  onToggle: (id: string) => void;
  onNome: (value: string) => void;
  onPhone: (value: string) => void;
  onEmail: (value: string) => void;
  onNext: () => void;
}) {
  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="min-h-0 flex-1 overflow-y-auto">
        <h1 className="font-display text-4xl leading-none font-semibold text-fg">O que já está pronto?</h1>
        <p className="mt-2 text-sm text-muted">Marca o que você tem. O resto a gente vê no encontro.</p>
        <div className="mt-3 grid grid-cols-2 gap-2">
          {TRIAGEM.map((item) => {
            const on = marcas.includes(item.id);
            return (
              <button
                key={item.id}
                type="button"
                aria-pressed={on}
                onClick={() => onToggle(item.id)}
                className="logo-tile relative min-h-16 rounded-xl px-3 text-left text-sm font-semibold text-fg"
              >
                {item.label}
                {on ? (
                  <span className="absolute top-2 right-2 grid size-5 place-items-center rounded-full bg-[#22a35a] text-white">
                    <Check className="size-3" strokeWidth={3} />
                  </span>
                ) : null}
              </button>
            );
          })}
        </div>
        <div className="mt-3 grid gap-2">
          <Field label="Seu nome" value={nome} onChange={onNome} placeholder="Maria" autoComplete="name" />
          <Field label="WhatsApp" value={phone} onChange={onPhone} placeholder="41 9..." inputMode="tel" autoComplete="tel" />
          <Field label="E-mail" value={email} onChange={onEmail} placeholder="voce@email.com" inputMode="email" autoComplete="email" />
        </div>
      </div>
      <button
        type="button"
        disabled={!pronto}
        onClick={onNext}
        className="logo-go mt-3 h-12 w-full shrink-0 rounded-lg text-sm font-semibold disabled:opacity-70"
      >
        Ir pro Pix
      </button>
    </div>
  );
}

function Pix({
  label,
  valor,
  promessa,
  fecha,
  pix,
  onPix,
  onCopy,
  onPaid,
}: {
  label: string;
  valor: string;
  promessa: string;
  fecha: string;
  pix: string;
  onPix: (value: string) => void;
  onCopy: () => void;
  onPaid: () => void;
}) {
  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="grid min-h-0 flex-1 content-center">
        <p className="text-sm text-muted">{label}</p>
        <h1 className="font-display text-6xl leading-none font-semibold text-lime">{valor}</h1>
        <p className="mt-4 max-w-xs font-display text-3xl leading-none font-semibold text-fg">{promessa}</p>
        <p className="mt-3 max-w-xs text-sm text-muted">{fecha} O horário abre quando o Pix cair.</p>
        {pix.trim() ? (
          <p className="mt-4 rounded-xl border border-line bg-surface px-3 py-3 text-sm text-fg">Pix: {pix.trim()}</p>
        ) : (
          <div className="mt-4">
            <Field label="Chave Pix" value={pix} onChange={onPix} placeholder="pra receber" />
          </div>
        )}
      </div>
      <div className="flex shrink-0 gap-2 pt-3">
        <button type="button" onClick={onCopy} className="h-12 flex-1 rounded-lg border border-line text-sm font-semibold text-fg">
          Copiar Pix
        </button>
        <button type="button" onClick={onPaid} className="logo-go h-12 flex-[1.4] rounded-lg text-sm font-semibold">
          Pagar e marcar
        </button>
      </div>
    </div>
  );
}

function Agenda({
  label,
  escopo,
  slots,
  onPick,
}: {
  label: string;
  escopo: string;
  slots: Horario[];
  onPick: (item: Horario) => void;
}) {
  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <h1 className="shrink-0 font-display text-4xl leading-none font-semibold text-fg">Escolhe o horário.</h1>
      <p className="mt-2 shrink-0 text-sm text-muted">
        {label}. {escopo}
      </p>
      <div className="mt-3 flex min-h-0 flex-1 flex-col gap-3">
        {slots.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => onPick(item)}
            className="logo-tile flex flex-1 flex-col items-start justify-center rounded-xl px-4 text-left"
          >
            <span className="font-display text-3xl leading-none font-semibold text-fg">{item.quando}</span>
            <span className="mt-1 text-sm text-muted">{item.nota}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function Pago({
  nome,
  quando,
  texto,
  zap,
  mail,
}: {
  nome: string;
  quando: string;
  texto: string;
  zap: string;
  mail: string;
}) {
  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="min-h-0 flex-1 overflow-y-auto">
        <h1 className="font-display text-4xl leading-none font-semibold text-fg">
          {nome.trim() ? `${nome.trim()}, horário marcado.` : "Horário marcado."}
        </h1>
        <p className="mt-2 text-base text-fg">{quando}</p>
        <p className="mt-3 text-sm leading-relaxed text-muted">{texto}</p>
      </div>
      <div className="mt-3 flex shrink-0 flex-col gap-2">
        <a href={zap} className="grid h-12 place-items-center rounded-lg bg-lime text-sm font-semibold text-ink">
          Abrir o WhatsApp
        </a>
        <a href={mail} className="grid h-12 place-items-center rounded-lg border border-line text-sm font-semibold text-fg">
          Abrir o e-mail
        </a>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  inputMode,
  autoComplete,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  inputMode?: "tel" | "email";
  autoComplete?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-medium tracking-wide text-muted uppercase">{label}</span>
      <input
        value={value}
        placeholder={placeholder}
        inputMode={inputMode}
        autoComplete={autoComplete}
        onChange={(event) => onChange(event.target.value)}
        className="h-11 w-full rounded-lg border border-line bg-surface-2 px-3 text-base text-fg outline-none placeholder:text-muted focus:border-lime"
      />
    </label>
  );
}
