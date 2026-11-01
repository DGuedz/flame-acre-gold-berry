# Plano — spec-driven DevOps

A resposta ao incentivo é um tubo. Cada etapa só anda se a spec da anterior passou.

```
quiz
  → spec do caso (o que ele marcou)
  → Pix conferido por humano
  → mesma mensagem no WhatsApp e no e-mail
  → obra só dos incentivos acesos
  → gates
  → no ar
  → um mês
```

## O que o quiz já faz

"Já paguei" abre o WhatsApp e o e-mail com a lista do diagnóstico. Isso é o aviso, não a entrega. O navegador pode bloquear a segunda janela. A tela seguinte deixa os dois links.

## Resposta humana, em cima desse aviso

| Quando | Quem | O que sai |
|---|---|---|
| Até 15 min depois do "Já paguei" | Você | Confere o Pix na conta. Se não caiu, responde no mesmo Zap: "ainda não entrou". |
| Pix conferido, no mesmo dia | Você | Responde no Zap e no e-mail com a data do primeiro encontro e a lista do que entra. Pede logo, endereço e o que ele vende. Não pede senha. |
| Primeiro encontro | Os dois | Contexto. Só abre programa antigo se o plano não for Curto e ele estiver na sala. |
| Encontro de mexer | Ele | Ele troca um texto. Esse é o gate do Claude. |
| Antes do ar | Você | Roda o gate de cada incentivo aceso. O que não acendeu não se constrói. |
| No ar | Você | Manda o endereço no Zap e no e-mail. Se Instagram acendeu, manda a frase da bio. |
| 30 dias | Você | Um toque por semana no Padrão. Dois toques no Curto. Toque semanal e um plantão no Longo. Depois, para. |

## Ambientes

| Ambiente | Serve para | Gate para sair |
|---|---|---|
| Quiz | Diagnóstico e captura | Nome, Zap e e-mail válidos, pelo menos uma marca em cada pergunta |
| Caso | A spec daquele cliente, gerada das marcas | Lista idêntica à mensagem que ele recebeu |
| Obra | Site em construção, arquivo único de conteúdo | Mudança de texto não mexe no layout |
| Ar | Página pública | Gates dos incentivos acesos, e só esses |

Não há ambiente de anúncio. Verba de Google Ads não faz parte da oferta.

## Pipeline

1. **Capturar.** O quiz grava marcas, plano, nome, Zap, e-mail. Isso é a spec do caso. Não se reabre entrevista.
2. **Conferir.** Humano olha o Pix. Sem conferência, a obra não começa.
3. **Responder.** Uma mensagem, dois canais. Se o texto do e-mail divergir do Zap, o passo falha.
4. **Construir.** Só o incentivo aceso entra na obra. Curto pula agenda, caixa e sistema.
5. **Verificar.** Checklist binário, um item por incentivo. Falhou um, não publica.
6. **Publicar.** Endereço no Zap e no e-mail. Bio, se Instagram acendeu.
7. **Acompanhar.** Trinta dias. O relógio começa no dia do ar, não no dia do Pix.

## Quando a resposta diz não

- Pediu primeiro lugar no Google: a spec Google não cobre isso. Resposta pronta: a página fica achável. Posição ninguém promete.
- Pediu para a gente subir anúncio: fora. A página mede o clique no Zap. A verba é dele.
- Pediu senha por mensagem: não. Ou ele abre com a gente do lado, ou fica para o encontro.
- Plano Curto e ele quer ligar o caixa: sobe para o Padrão e só então a spec de programa antigo existe.
- "Já paguei" sem Pix na conta: a mensagem automática pode ter saído. A resposta humana desfaz. A obra não começa.
