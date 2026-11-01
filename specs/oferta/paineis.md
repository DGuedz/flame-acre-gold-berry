# Painéis — a conta antes da tela

A ordem do Matheus vale: pasta e definição do número primeiro, painel do CEO por último. Seis departamentos não valem. Quatro livros e uma leitura chegam.

O CEO não calcula. Se a linha não está escrita, a resposta é "sem dado". Número de exemplo fica marcado como exemplo.

## A conta

Cada número tem uma frase. Sem a frase, ele não entra na tela.

| Número | Conta | Não é |
|---|---|---|
| Quiz aberto | Passou da segunda pergunta | Visita, curtida, clique no anúncio |
| Pacote | Tocou um preço | O plano que a gente sugeriu |
| Disse que pagou | Tocou "Pagar e marcar" | Dinheiro na conta |
| Pix | O valor caiu e alguém conferiu | O botão |
| Horário | Escolheu o horário depois do Pix conferido | Pedido de horário no quiz |
| Gasto | O que a conta de anúncio cobrou naquele dia | O que a gente acha que gastou |
| Custo por quiz | Gasto daquele vídeo dividido pelos quizzes daquele link | Se o quiz é zero, vira "sem dado", não infinito |
| No ar | Sete dias depois do Pix conferido, com a página no endereço | Promessa no card |
| Acompanhamento | 15, 30 ou 45 dias contados do Pix conferido | Um mês genérico |

Quiz é de vendas. Gasto é de marketing. Os dois não repetem o mesmo número. Quem junta é a leitura do dia.

## Os livros

Só se acrescenta linha. Não se reescreve o passado.

`dados/vendas.md` — data, nome, dor, pacote, disse que pagou, Pix conferido, horário.

`dados/anuncios.md` — data, vídeo, gasto, quizzes daquele link.

`dados/caixa.md` — data, nome, pacote, valor. Só entra com Pix conferido.

`dados/entrega.md` — data do Pix, nome, pacote, dia em que sobe, último dia de acompanhamento.

A leitura do dia é `dados/hoje.md`.

## A leitura

Um arquivo, oito linhas, no fim do dia. Se não houve fato novo, copia o de ontem e escreve "igual".

1. Quizzes.
2. Pix conferido, em reais.
3. Gasto do dia.
4. Custo por quiz, ou "sem dado".
5. Sites que tinham de subir e não subiram.
6. Acompanhamentos que vencem em sete dias.
7. O vermelho. Um só. Se dois competem, ganha o que trava Pix ou site no ar.
8. O que fazer amanhã, uma frase.

## O que não abre painel

Suporte, engenharia e previsão de caixa. Não há linha para sustentar. Curso de Claude e Codex mora na entrega, no encontro, não num departamento.

## O quiz hoje não obedece

O botão "Pagar e marcar" já abre o horário e a mensagem diz que o Pix caiu. Isso é "disse que pagou", não Pix. Enquanto não houver conferência, essa linha não entra em caixa nem em entrega, e o horário não conta.

A conta acima fica. O quiz é que será corrigido depois. Não se afroxa a definição para combinar com o botão.

## A sequência

Fim do dia, nesta ordem. Não pula passo. Não antecipa a tela.

1. Quiz. Quem passou da segunda pergunta ganha linha em `dados/vendas.md`. Se tocou um preço, escreve o pacote. Se tocou "Pagar e marcar", escreve que disse que pagou. Horário fica vazio.
2. Banco. Só o Pix conferido entra em `dados/caixa.md`. Na mesma pessoa, em vendas, marca o Pix e aí copia o horário, se ela escolheu.
3. Entrega. Uma linha em `dados/entrega.md`: data do Pix, dia em que o site sobe (sete dias depois), último dia de acompanhamento (15, 30 ou 45, conforme o pacote).
4. Anúncio. Uma linha por vídeo em `dados/anuncios.md`, com o gasto que a conta cobrou. O quiz daquele link sai do passo 1. Sem quiz, o custo não se divide.
5. Leitura. Reescreve `dados/hoje.md` com as oito linhas, lendo só os livros. Um vermelho. Se nada mudou, copia o de ontem e escreve "igual".
6. Para. Não abre painel. Não estima o dia seguinte em reais.

## Ordem de montar

1. Esta conta.
2. Os quatro livros, vazios, com o cabeçalho.
3. A leitura de hoje.
4. Só então uma tela. A tela lê a leitura. Não inventa coluna.
