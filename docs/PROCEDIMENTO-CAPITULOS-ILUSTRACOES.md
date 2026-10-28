# Procedimento editorial — capítulos e ilustrações

Aplicação: contos em desenvolvimento e crônicas de RPG da Biblioteca Nobre.

1. **Receber** — autor envia capítulo novo, correção ou imagem. Identificar obra, capítulo e, para ilustrações, cena/parágrafo de inserção.
2. **Preparar** — criar alteração em branch de revisão, nunca diretamente na `main`. Manter capítulos existentes, URL pública, estilo e navegação. Uma única fonte para cada imagem; preservar o texto aprovado.
3. **Conferir** — comparar antes/depois, sequência de capítulos, ortografia apenas quando solicitada, links, capa, proporção e ponto narrativo da imagem. Guardar original no histórico do Git.
4. **Aprovar e publicar** — abrir pull request, apresentar prévia e resumo das mudanças. Mesclar à `main` somente com autorização explícita do autor. Verificar site após implantação.

**Estrutura recomendada por obra** (adaptar aos leitores existentes, sem reestruturação desnecessária):

```
livros/<slug>/
  capitulos/001.html
  imagens/capa.webp
  imagens/<identificador-da-cena>.webp
```

A integração com o leitor público e o `catalogo.json` deve ser feita somente quando a obra e seu primeiro capítulo forem recebidos e aprovados. Estado inicial: `em-desenvolvimento` / leitura pública parcial, se autorizada. Capítulos futuros podem ser adicionados sem substituir os anteriores. Revisões de capítulos existentes recebem commit específico para rastreabilidade.

**Comandos simples do autor**:
- “Adicionar capítulo 2 à obra X.”
- “Corrigir o capítulo 1 da obra X: [texto].”
- “Inserir esta ilustração na cena [descrição] do capítulo 1 da obra X.”
- “Aprovado para publicar a revisão da obra X.”

**Segurança:** nenhuma fusão, publicação ou edição de texto autoral sem aprovação específica. Uma obra incompleta nunca deve ser catalogada como concluída.
