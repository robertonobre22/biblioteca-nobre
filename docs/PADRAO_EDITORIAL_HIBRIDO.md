# Padrão Markdown + JSON + imagens — protótipo
**Estado: em revisão técnica. Nenhuma obra foi migrada.**

- Originais autorais DOCX/PDF permanecem preservados.
- Um Markdown por capítulo, em ordem definida pelo manifesto JSON.
- Ilustrações em pasta `imagens/`, referenciadas em linhas próprias no lugar exato da narrativa.
- Compilador transforma capítulos em blocos intermediários de texto e imagem; **ainda não conecta aos leitores atuais**.
- Para obter prévia em ambiente de desenvolvimento: `node scripts/compilar-livro-md.cjs exemplos/livro-ilustrado/manifesto.json /tmp/livro-compilado.json`.
- Teste técnico: `node scripts/testar-livro-md.cjs`.

**Limites**: o protótipo trata apenas parágrafos simples, imagens isoladas e cabeçalho de capítulo. Negritos, itálicos, notas, legendas elaboradas e demais recursos exigem aperfeiçoamento antes de migrar obras reais. Nunca substituir capítulos ou publicar automaticamente. Para conteúdo de acesso restrito, não colocar manuscritos em repositório público.
