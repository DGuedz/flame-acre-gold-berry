import { NICHES } from "./sales.ts";
import { siteDe } from "./sites.ts";

export type Face = {
  titulo: string;
  linhas: string[];
};

export type Porte = {
  id: string;
  label: string;
  frase: string;
  site: "curto" | "padrao" | "longo";
};

export const PORTES: Porte[] = [
  { id: "pequeno", label: "Pequeno", frase: "Eu atendo. Sem equipe.", site: "curto" },
  { id: "medio", label: "Médio", frase: "Tenho equipe.", site: "padrao" },
  { id: "estrutura", label: "Médio com estrutura", frase: "Tenho equipe, marca e sistema.", site: "longo" },
];

const FACES: Record<string, Record<string, Face>> = {
  adv: {
    curto: { titulo: "Dra. Ana", linhas: ["Família e trabalhista", "Chama no Zap"] },
    padrao: { titulo: "Escritório Ana Ribeiro", linhas: ["Família", "Trabalhista", "Quem somos"] },
    longo: { titulo: "Ribeiro Advogados", linhas: ["A banca", "Os sócios", "O sistema do escritório"] },
  },
  dent: {
    curto: { titulo: "Dra. Clara", linhas: ["Limpeza e canal", "Chama no Zap"] },
    padrao: { titulo: "Clínica Clara", linhas: ["Limpeza", "Canal", "Como chegar"] },
    longo: { titulo: "Clara Odontologia", linhas: ["A clínica", "A equipe", "A agenda"] },
  },
  est: {
    curto: { titulo: "Sala da Bia", linhas: ["Limpeza de pele", "Chama no Zap"] },
    padrao: { titulo: "Bia Estética", linhas: ["Pele", "Corpo", "Quem faz"] },
    longo: { titulo: "Casa Bia", linhas: ["A marca", "Os protocolos", "A agenda"] },
  },
  cont: {
    curto: { titulo: "Contador João", linhas: ["Abre MEI", "Chama no Zap"] },
    padrao: { titulo: "João Contabilidade", linhas: ["MEI", "Empresa", "Documentos"] },
    longo: { titulo: "João e Equipe", linhas: ["O escritório", "A equipe", "O sistema"] },
  },
  imob: {
    curto: { titulo: "Corretor Luiz", linhas: ["Apartamento no bairro", "Chama no Zap"] },
    padrao: { titulo: "Luiz Imóveis", linhas: ["Venda", "Aluguel", "O bairro"] },
    longo: { titulo: "Casa Luiz", linhas: ["A imobiliária", "Os corretores", "O sistema"] },
  },
  arq: {
    curto: { titulo: "Ana, arquitetura", linhas: ["Projeto da casa", "Chama no Zap"] },
    padrao: { titulo: "Ana Arquitetura", linhas: ["Casas", "Reformas", "O escritório"] },
    longo: { titulo: "Ana Studio", linhas: ["A marca", "Os projetos", "O sistema"] },
  },
  psi: {
    curto: { titulo: "Ana, psicologia", linhas: ["Atendimento online", "Chama no Zap"] },
    padrao: { titulo: "Consultório da Ana", linhas: ["Adulto", "Casal", "Como começa"] },
    longo: { titulo: "Casa da Ana", linhas: ["O consultório", "A abordagem", "A agenda"] },
  },
  pet: {
    curto: { titulo: "Pet da esquina", linhas: ["Banho e tosa", "Chama no Zap"] },
    padrao: { titulo: "Pet da Praça", linhas: ["Banho", "Tosa", "Como chegar"] },
    longo: { titulo: "Casa Pet", linhas: ["A loja", "A equipe", "A agenda"] },
  },
};

export function porteDe(id: string) {
  return PORTES.find((item) => item.id === id) ?? PORTES[0];
}

export function pagina(nicheId: string, siteId: string): Face {
  const mesa = FACES[nicheId] ?? FACES.dent;
  return mesa[siteId] ?? mesa.padrao;
}

export function fachadasDo(nicheId: string, porteId: string) {
  const niche = NICHES.find((item) => item.id === nicheId) ?? NICHES[1];
  const porte = porteDe(porteId);
  return {
    niche,
    porte,
    sites: (["curto", "padrao", "longo"] as const).map((id) => {
      const site = siteDe(id);
      return {
        id,
        nome: site.nome,
        valor: `R$ ${site.preco.toLocaleString("pt-BR")}`,
        cara: site.cara,
        face: pagina(niche.id, id),
        cabe: id === porte.site,
      };
    }),
  };
}
