import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { NICHES } from "./sales.ts";
import { fachadasDo, pagina } from "./fachadas.ts";

describe("fachada do nicho", () => {
  it("cada ofício tem três páginas, e o porte aponta uma", () => {
    for (const niche of NICHES) {
      const mesa = fachadasDo(niche.id, "medio");
      assert.equal(mesa.sites.length, 3);
      assert.deepEqual(
        mesa.sites.map((site) => site.nome),
        ["Vitrine", "Loja", "Casa"],
      );
      assert.equal(mesa.sites.filter((site) => site.cabe).length, 1);
      assert.equal(mesa.sites.find((site) => site.cabe)?.nome, "Loja");
      if (niche.id !== "dent") {
        assert.notEqual(pagina(niche.id, "curto").titulo, pagina("dent", "curto").titulo);
      }
    }
  });

  it("pequeno cai na Vitrine e médio com estrutura cai na Casa", () => {
    assert.equal(fachadasDo("dent", "pequeno").sites.find((site) => site.cabe)?.id, "curto");
    assert.equal(fachadasDo("dent", "estrutura").sites.find((site) => site.cabe)?.id, "longo");
  });

  it("o dentista não vê a página do advogado", () => {
    assert.notEqual(pagina("dent", "curto").titulo, pagina("adv", "curto").titulo);
    assert.match(pagina("dent", "padrao").titulo, /Clínica/);
  });
});
