import { create } from "zustand";
import { persist } from "zustand/middleware";

export type LeadStatus =
  | "lista"
  | "abordado"
  | "respondeu"
  | "negociando"
  | "fechado"
  | "contexto"
  | "integracao"
  | "curso"
  | "noar"
  | "mes"
  | "perdido";

export type Lead = {
  id: string;
  business: string;
  nicheId: string;
  phone: string;
  area: string;
  tierId: string;
  status: LeadStatus;
  createdAt: string;
};

export type TabId = "hoje" | "oferta" | "texto" | "funil" | "bot";

type SegundaState = {
  tab: TabId;
  seller: string;
  pix: string;
  city: string;
  nicheId: string;
  tierId: string;
  scriptId: string;
  done: Record<string, boolean>;
  leads: Lead[];
  setTab: (tab: TabId) => void;
  setSeller: (seller: string) => void;
  setPix: (pix: string) => void;
  setCity: (city: string) => void;
  setNicheId: (nicheId: string) => void;
  setTierId: (tierId: string) => void;
  setScriptId: (scriptId: string) => void;
  toggleDone: (id: string) => void;
  addLead: (lead: Omit<Lead, "id" | "createdAt" | "status">) => void;
  setStatus: (id: string, status: LeadStatus) => void;
  setLeadTier: (id: string, tierId: string) => void;
  removeLead: (id: string) => void;
};

export const useSegunda = create<SegundaState>()(
  persist(
    (set) => ({
      tab: "hoje",
      seller: "",
      pix: "",
      city: "Curitiba",
      nicheId: "adv",
      tierId: "padrao",
      scriptId: "direto",
      done: {},
      leads: [],
      setTab: (tab) => set({ tab }),
      setSeller: (seller) => set({ seller }),
      setPix: (pix) => set({ pix }),
      setCity: (city) => set({ city }),
      setNicheId: (nicheId) => set({ nicheId }),
      setTierId: (tierId) => set({ tierId }),
      setScriptId: (scriptId) => set({ scriptId }),
      toggleDone: (id) =>
        set((s) => ({ done: { ...s.done, [id]: !s.done[id] } })),
      addLead: (lead) =>
        set((s) => ({
          leads: [
            {
              ...lead,
              id: crypto.randomUUID(),
              tierId: lead.tierId,
              status: "lista",
              createdAt: new Date().toISOString(),
            },
            ...s.leads,
          ],
        })),
      setStatus: (id, status) =>
        set((s) => ({
          leads: s.leads.map((lead) => (lead.id === id ? { ...lead, status } : lead)),
        })),
      setLeadTier: (id, tierId) =>
        set((s) => ({
          leads: s.leads.map((lead) => (lead.id === id ? { ...lead, tierId } : lead)),
        })),
      removeLead: (id) =>
        set((s) => ({ leads: s.leads.filter((lead) => lead.id !== id) })),
    }),
    { name: "segunda-os", skipHydration: true },
  ),
);

export const STATUS_LABEL: Record<LeadStatus, string> = {
  lista: "Prospecção",
  abordado: "Abordado",
  respondeu: "Respondeu",
  negociando: "Fechando",
  fechado: "Pago",
  contexto: "Contexto",
  integracao: "Integração",
  curso: "Curso",
  noar: "No ar",
  mes: "Mês",
  perdido: "Perdido",
};

export const STATUS_ORDER: LeadStatus[] = [
  "lista",
  "abordado",
  "respondeu",
  "negociando",
  "fechado",
  "contexto",
  "integracao",
  "curso",
  "noar",
  "mes",
  "perdido",
];

export const PAID_STATUSES: LeadStatus[] = [
  "fechado",
  "contexto",
  "integracao",
  "curso",
  "noar",
  "mes",
];
