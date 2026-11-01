import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { FLUXO, porta, type Etapa } from "./fluxo.ts";

const ordem = FLUXO.map((etapa) => etapa.id);

describe("fluxo", () => {
  it("é uma linha, da landing ao acompanhamento", () => {
    assert.deepEqual(ordem, [
      "landing",
      "oferta",
      "fechamento",
      "pix",
      "agenda",
      "contexto",
      "treino",
      "entrega",
      "acompanha",
    ]);
  });

  it("não agenda sem Pix e não acompanha sem entrega", () => {
    const ate = (id: Etapa) => ordem.slice(0, ordem.indexOf(id)) as Etapa[];
    assert.equal(porta(ate("oferta"), "oferta"), true);
    assert.equal(porta(["landing", "oferta", "fechamento"], "agenda"), false);
    assert.equal(porta(ate("agenda"), "agenda"), true);
    assert.equal(porta(ate("acompanha").filter((id) => id !== "entrega"), "acompanha"), false);
    assert.equal(porta(ate("acompanha"), "acompanha"), true);
  });
});
