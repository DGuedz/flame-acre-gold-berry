import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { SITES } from "./sites.ts";

describe("três sites", () => {
  it("o tamanho do site é o preço", () => {
    assert.deepEqual(
      SITES.map((site) => [site.nome, site.preco]),
      [
        ["Vitrine", 1497],
        ["Loja", 2997],
        ["Casa", 4997],
      ],
    );
  });

  it("cada um mostra o que vem atrás, e a Vitrine não abre sistema", () => {
    for (const site of SITES) assert.ok(site.atras.length >= 5);
    const vitrine = SITES[0].atras.map((peca) => peca.titulo).join(" ");
    const loja = SITES[1].atras.map((peca) => peca.titulo).join(" ");
    const casa = SITES[2].atras.map((peca) => peca.titulo).join(" ");
    assert.match(vitrine, /Sem sistema velho/);
    assert.equal(loja.includes("Um sistema"), true);
    assert.equal(casa.includes("Até dois sistemas"), true);
    assert.equal(vitrine.includes("Um sistema"), false);
  });
});
