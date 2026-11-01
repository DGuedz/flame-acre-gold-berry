import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { addDays, fecharDia, livrosVazios } from "./leitura.ts";

describe("sequência do dia", () => {
  it("não trata o botão como Pix", () => {
    const { livros, leitura } = fecharDia(livrosVazios(), {
      data: "2026-11-01",
      quizzes: [
        {
          nome: "Maria",
          dor: "não chamam no Zap",
          video: "zap",
          pacote: "padrao",
          disseQuePagou: true,
          horarioPedido: "Quinta, 10h",
        },
      ],
      pix: [],
      gastos: [{ video: "zap", gasto: 40 }],
      noAr: [],
    });

    assert.equal(livros.caixa.length, 0);
    assert.equal(livros.entrega.length, 0);
    assert.equal(livros.vendas[0].horario, "");
    assert.equal(livros.vendas[0].pixConferido, "não");
    assert.equal(livros.vendas[0].disseQuePagou, "sim");
    assert.deepEqual(leitura, [
      "Quizzes: 1",
      "Pix conferido: sem dado",
      "Gasto do dia: R$ 40",
      "Custo por quiz: R$ 40",
      "Sites que tinham de subir e não subiram: sem dado",
      "Acompanhamentos que vencem em sete dias: sem dado",
      "Vermelho: Maria: Pix não conferido",
      "Amanhã: Conferir o Pix de Maria",
    ]);
  });

  it("só abre caixa e entrega quando o Pix é conferido", () => {
    const primeiro = fecharDia(livrosVazios(), {
      data: "2026-11-01",
      quizzes: [{ nome: "Maria", dor: "não chamam no Zap", video: "zap", pacote: "padrao", disseQuePagou: true, horarioPedido: "Quinta, 10h" }],
      pix: [],
      gastos: [],
      noAr: [],
    });
    const segundo = fecharDia(primeiro.livros, {
      data: "2026-11-02",
      quizzes: [],
      pix: [{ nome: "Maria", pacote: "padrao", valor: 2997 }],
      gastos: [],
      noAr: [],
    });

    assert.equal(segundo.livros.vendas.length, 1);
    assert.equal(segundo.livros.vendas[0].pixConferido, "sim");
    assert.equal(segundo.livros.vendas[0].horario, "Quinta, 10h");
    assert.equal(segundo.livros.caixa[0].valor, 2997);
    assert.equal(segundo.livros.entrega[0].sobeEm, "2026-11-09");
    assert.equal(segundo.livros.entrega[0].acompanhaAte, "2026-12-02");
    assert.equal(addDays("2026-11-02", 15), "2026-11-17");
    assert.equal(addDays("2026-11-02", 45), "2026-12-17");
  });

  it("não divide gasto por zero", () => {
    const { leitura } = fecharDia(livrosVazios(), {
      data: "2026-11-01",
      quizzes: [],
      pix: [],
      gastos: [{ video: "google", gasto: 50 }],
      noAr: [],
    });
    assert.equal(leitura[3], "Custo por quiz: sem dado");
    assert.equal(leitura.includes("Infinity"), false);
  });

  it("o vermelho do site atrasado ganha do acompanhamento", () => {
    const aberto = fecharDia(livrosVazios(), {
      data: "2026-11-01",
      quizzes: [{ nome: "João", dor: "não me acham", video: "google", pacote: "curto" }],
      pix: [{ nome: "João", pacote: "curto", valor: 1497 }],
      gastos: [],
      noAr: [],
    });
    const depois = fecharDia(aberto.livros, {
      data: "2026-11-10",
      quizzes: [],
      pix: [],
      gastos: [],
      noAr: [],
    });
    assert.equal(depois.leitura[6], "Vermelho: João: o site não subiu");
    assert.match(depois.leitura[5], /João/);
  });
});
