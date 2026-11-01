export type Pacote = "curto" | "padrao" | "longo";

const DIAS: Record<Pacote, number> = { curto: 15, padrao: 30, longo: 45 };

export type Venda = {
  data: string;
  nome: string;
  dor: string;
  pacote: Pacote | "";
  disseQuePagou: "sim" | "não";
  pixConferido: "sim" | "não";
  horarioPedido: string;
  horario: string;
};

export type Anuncio = { data: string; video: string; gasto: number; quizzes: number };
export type Caixa = { data: string; nome: string; pacote: Pacote; valor: number };
export type Entrega = { dataPix: string; nome: string; pacote: Pacote; sobeEm: string; acompanhaAte: string };

export type Livros = {
  vendas: Venda[];
  anuncios: Anuncio[];
  caixa: Caixa[];
  entrega: Entrega[];
};

export type QuizDoDia = {
  nome: string;
  dor: string;
  video: string;
  pacote?: Pacote;
  disseQuePagou?: boolean;
  horarioPedido?: string;
};

export type PixDoDia = { nome: string; pacote: Pacote; valor: number };
export type GastoDoDia = { video: string; gasto: number };

export const livrosVazios = (): Livros => ({ vendas: [], anuncios: [], caixa: [], entrega: [] });

export function addDays(iso: string, days: number) {
  const [year, month, day] = iso.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
}

function reais(valor: number) {
  return `R$ ${valor.toLocaleString("pt-BR")}`;
}

export function fecharDia(
  antes: Livros,
  dia: { data: string; quizzes: QuizDoDia[]; pix: PixDoDia[]; gastos: GastoDoDia[]; noAr: string[] },
) {
  const vendas = antes.vendas.map((linha) => ({ ...linha }));
  const caixa = [...antes.caixa];
  const entrega = [...antes.entrega];

  for (const quiz of dia.quizzes) {
    vendas.push({
      data: dia.data,
      nome: quiz.nome,
      dor: quiz.dor,
      pacote: quiz.pacote ?? "",
      disseQuePagou: quiz.disseQuePagou ? "sim" : "não",
      pixConferido: "não",
      horarioPedido: quiz.horarioPedido ?? "",
      horario: "",
    });
  }

  for (const pix of dia.pix) {
    caixa.push({ data: dia.data, nome: pix.nome, pacote: pix.pacote, valor: pix.valor });
    const aberta = [...vendas].reverse().find((linha) => linha.nome === pix.nome && linha.pixConferido === "não");
    if (aberta) {
      aberta.pixConferido = "sim";
      aberta.pacote = pix.pacote;
      if (aberta.horarioPedido) aberta.horario = aberta.horarioPedido;
    }
    entrega.push({
      dataPix: dia.data,
      nome: pix.nome,
      pacote: pix.pacote,
      sobeEm: addDays(dia.data, 7),
      acompanhaAte: addDays(dia.data, DIAS[pix.pacote]),
    });
  }

  const anuncios = [
    ...antes.anuncios,
    ...dia.gastos.map((gasto) => ({
      data: dia.data,
      video: gasto.video,
      gasto: gasto.gasto,
      quizzes: dia.quizzes.filter((quiz) => quiz.video === gasto.video).length,
    })),
  ];

  const livros = { vendas, anuncios, caixa, entrega };
  return { livros, leitura: ler(dia.data, livros, dia.noAr) };
}

export function ler(data: string, livros: Livros, noAr: string[]) {
  const quizzes = livros.vendas.filter((linha) => linha.data === data).length;
  const pix = livros.caixa.filter((linha) => linha.data === data).reduce((soma, linha) => soma + linha.valor, 0);
  const gasto = livros.anuncios.filter((linha) => linha.data === data).reduce((soma, linha) => soma + linha.gasto, 0);
  const custo = quizzes === 0 ? "sem dado" : reais(Math.round(gasto / quizzes));
  const atrasados = livros.entrega.filter((linha) => linha.sobeEm <= data && !noAr.includes(linha.nome));
  const vencendo = livros.entrega.filter((linha) => linha.acompanhaAte >= data && linha.acompanhaAte <= addDays(data, 7));
  const semPix = livros.vendas.filter((linha) => linha.disseQuePagou === "sim" && linha.pixConferido === "não");

  let vermelho = "nenhum";
  if (atrasados.length > 0) vermelho = `${atrasados[0].nome}: o site não subiu`;
  else if (semPix.length > 0) vermelho = `${semPix[0].nome}: Pix não conferido`;
  else if (vencendo.length > 0) vermelho = `${vencendo[0].nome}: acompanhamento vence em ${vencendo[0].acompanhaAte}`;

  const amanha =
    atrasados.length > 0
      ? `Subir o site de ${atrasados[0].nome}`
      : semPix.length > 0
        ? `Conferir o Pix de ${semPix[0].nome}`
        : vencendo.length > 0
          ? `Falar com ${vencendo[0].nome} antes do acompanhamento acabar`
          : "igual";

  return [
    `Quizzes: ${quizzes === 0 ? "sem dado" : String(quizzes)}`,
    `Pix conferido: ${pix === 0 ? "sem dado" : reais(pix)}`,
    `Gasto do dia: ${gasto === 0 ? "sem dado" : reais(gasto)}`,
    `Custo por quiz: ${custo}`,
    `Sites que tinham de subir e não subiram: ${atrasados.length === 0 ? "sem dado" : atrasados.map((linha) => linha.nome).join(", ")}`,
    `Acompanhamentos que vencem em sete dias: ${vencendo.length === 0 ? "sem dado" : vencendo.map((linha) => linha.nome).join(", ")}`,
    `Vermelho: ${vermelho}`,
    `Amanhã: ${amanha}`,
  ];
}
