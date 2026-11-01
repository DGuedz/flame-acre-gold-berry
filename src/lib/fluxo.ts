export const FLUXO = [
  { id: "landing", label: "Landing", fecha: "A pessoa toca e cai no funil." },
  { id: "oferta", label: "Oferta", fecha: "Escolhe o pacote no funil." },
  { id: "fechamento", label: "Fechamento", fecha: "Nome, WhatsApp e e-mail." },
  { id: "pix", label: "Pix", fecha: "O valor foi conferido." },
  { id: "agenda", label: "Agendamento", fecha: "Horário marcado depois do Pix." },
  { id: "contexto", label: "Integração e contexto", fecha: "Marca, domínio e o sistema que o pacote inclui." },
  { id: "treino", label: "Treinamento", fecha: "O curso aconteceu no projeto." },
  { id: "entrega", label: "Entrega", fecha: "O site está no ar, em até 7 dias do Pix." },
  { id: "acompanha", label: "Acompanhamento", fecha: "Corre 15, 30 ou 45 dias, conforme o contrato." },
] as const;

export type Etapa = (typeof FLUXO)[number]["id"];

export function porta(feitas: readonly Etapa[], proxima: Etapa) {
  const indice = FLUXO.findIndex((etapa) => etapa.id === proxima);
  return FLUXO.slice(0, indice).every((etapa) => feitas.includes(etapa.id));
}
