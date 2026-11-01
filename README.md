# Fachada

fachadabusiness.com.br

Quiz de um minuto para o pequeno e médio comércio. O cliente marca o que já usa e o que emperra. O diagnóstico diz o que entra na fachada nova. Ele paga no Pix. A mesma mensagem abre no WhatsApp e no e-mail.

## O que o quiz vende

Site com o WhatsApp dele no botão, página achável no Google, caminho do Instagram até o Zap, aviso no e-mail, e ele mesmo muda texto e preço no Claude e no Codex.

| Canais marcados | Plano | Preço | Prazo |
|---|---|---|---|
| 1 | Curto | R$ 1.497 | Uma semana, duas conversas. Sem caixa nem agenda. |
| 2 | Padrão | R$ 2.997 | Três semanas, quatro encontros. |
| 3 | Longo | R$ 4.997 | Até 45 dias. |

A regra mora em `src/lib/quiz.ts`. A resposta depois do Pix mora em `specs/oferta/`.

## Rodar

```bash
npm install
npm run dev
```

Abre em `http://127.0.0.1:8080`.

```bash
npm run typecheck
npm run build
```

## Spec

- `specs/oferta/constituicao.md` — o que a resposta não pode furar
- `specs/oferta/spec.md` — cada incentivo e o gate
- `specs/oferta/plan.md` — o tubo, do quiz ao mês de acompanhamento
- `specs/oferta/tasks.md` — a ordem do trabalho
