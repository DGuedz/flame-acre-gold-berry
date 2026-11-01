# Spec — resposta a cada incentivo

A spec nasce no quiz. Não se entrevista de novo.

Entrada: o que ele marcou em "já uso" e "o que emperra", mais nome, WhatsApp e e-mail.

## Como o quiz liga o incentivo

| Marcação | Incentivo que acende |
|---|---|
| Usa WhatsApp, ou emperra "não chamam no Zap", ou não marcou nada | WhatsApp no botão |
| Não usa Google, ou emperra "não me acham" | Ser achado no Google |
| Usa Instagram, ou emperra "não veem o que eu vendo" | Instagram cai no site |
| Usa e-mail, ou emperra "não mandam e-mail" | Aviso no e-mail |
| Sempre | Claude e Codex |

Plano, pela quantidade de canais (Zap, Google, e-mail ou Instagram contam como um canal juntos):

| Canais | Plano | Resposta de prazo |
|---|---|---|
| 1 | Curto | R$ 1.497. Uma semana. Duas conversas. Sem programa antigo. |
| 2 | Padrão | R$ 2.997. Três semanas. Quatro encontros. |
| 3 | Longo | R$ 4.997. Até 45 dias. |

## Incentivo WhatsApp

Dado que o incentivo acendeu e o Pix foi conferido,
quando o site entra no ar,
então o botão principal abre `wa.me` do número dele, com o serviço já escrito na mensagem.
E o número não é o nosso.

Gate: um clique de teste cai no WhatsApp dele, não no nosso.

## Incentivo Google

Dado que o incentivo acendeu,
quando a página publica,
então ela tem título com serviço e cidade, um único título principal, e nome, telefone, endereço e cidade nos dados locais.

Gate: esses quatro existem na página publicada.
Fora do gate: frase "você vai aparecer em primeiro".

## Incentivo Instagram

Dado que o incentivo acendeu,
quando a página publica,
então existe um endereço único para colar na bio, e esse endereço termina no botão de WhatsApp.

Gate: a bio de teste abre o site e o site abre o Zap dele.

## Incentivo e-mail

Dado que o incentivo acendeu,
quando alguém chama pelo site,
então o mesmo aviso que cai no WhatsApp dele cai no e-mail que ele digitou no quiz.

Gate: os dois textos citam o mesmo serviço. Não são mensagens diferentes.

## Incentivo Claude

Dado qualquer plano,
quando chega o encontro de "você mexe",
então ele mesmo troca um texto ou um preço, conversando, com a gente do lado.

Gate: a troca fica registrada como feita por ele, não por nós.
Curto: nessa conversa. Padrão: nos encontros. Longo: com prática entre um encontro e outro.

## Incentivo Codex

Dado qualquer plano,
quando alguém pede para mudar o site,
então a mudança mora num arquivo só de conteúdo. Layout não se mexe.

Gate: um pedido de ajuste altera só esse arquivo.

## Incentivo prazo

Dado o plano calculado,
quando o Pix é conferido,
então a primeira resposta marca o primeiro encontro dentro do prazo do plano.
Curto não inclui agenda, caixa nem sistema.
Padrão e Longo só abrem programa antigo com ele na sessão.
