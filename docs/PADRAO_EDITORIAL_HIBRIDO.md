# Padrão Markdown + JSON + imagens — protótipo
**Estado: em revisão técnica. Nenhuma obra foi migrada.**

- Originais autorais DOCX/PDF permanecem preservados.
- Um Markdown por capítulo, em ordem definida pelo manifesto JSON.
- Ilustrações em pasta `imagens/`, referenciadas em linhas próprias no lugar exato da narrativa.
- Compilador transforma capítulos em blocos intermediários de texto e imagem; **ainda não conecta aos leitores atuais**.
- Para obter prévia em ambiente de desenvolvimento: `node scripts/compilar-livro-md.cjs exemplos/livro-ilustrado/manifesto.json /tmp/livro-compilado.json`.
- Teste técnico: `node scripts/testar-livro-md.cjs`.

**Limites**: o protótipo trata apenas parágrafos simples, imagens isoladas e cabeçalho de capítulo. Negritos, itálicos, notas, legendas elaboradas e demais recursos exigem aperfeiçoamento antes de migrar obras reais. Nunca substituir capítulos ou publicar automaticamente. Para conteúdo de acesso restrito, não colocar manuscritos em repositório público.

## Prévia no navegador

Abra `exemplos/livro-ilustrado/index.html` no Preview do Cloudflare (não está vinculada ao catálogo). A prévia lê o Markdown diretamente, preserva ordem de parágrafo/imagem, apresenta leitura contínua e visual de página e permite ampliar a ilustração. **A paginação real e o renderizador completo de Markdown ainda não foram implementados**. É um protótipo, não uma edição publicável.

## Formatação literária do protótipo

O parser experimental compartilhado entre compilador e prévia reconhece títulos níveis 1–3, parágrafos, **negrito**, *itálico*, separadores de cena e imagens em linhas próprias. HTML arbitrário e caminhos de imagem fora da pasta permitida são recusados. Ainda não reconhece todos os recursos Markdown (notas, listas, links, citações complexas e escape de caracteres) nem implementa paginação real. Não converter obras publicadas automaticamente.
