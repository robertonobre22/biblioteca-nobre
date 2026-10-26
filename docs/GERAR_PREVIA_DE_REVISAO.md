# Gerador de prévia comparativa de revisão
Estado: ferramenta técnica aprovada para testes, sem publicação editorial automática.

A ferramenta recebe um novo capítulo Markdown e o ID do capítulo da obra experimental organizada por manifesto. Gera, **fora da pasta da obra**, um diretório com cópias da versão antiga e da proposta, relatório de hashes e página de comparação por blocos. Valida imagens referenciadas, não sobrescreve a pasta de revisão e não modifica o capítulo original.

Comando interno de demonstração:

`node scripts/gerar-previa-revisao.cjs --obra exemplos/livro-ilustrado --capitulo c001 --novo exemplos/livro-ilustrado/capitulos/capitulo-01-revisado.md --saida /tmp/bn-previa-revisao`

Para visualizar a página, é necessário servi-la num ambiente de revisão com HTTP(S), pois a página usa `fetch`; não abrir via `file://`. Não copiar previews confidenciais para sites públicos. **Ainda não há um botão de aprovação editorial conectado a essa prévia.**

O comparador destaca diferenças de blocos e referências de imagens, mas não substitui revisão literária nem mostra imagens em tamanho integral nesse painel.
