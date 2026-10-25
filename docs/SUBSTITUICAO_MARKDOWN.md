# Substituição editorial de capítulos Markdown — versão inicial
Estado: ferramenta de preparação, sem integração automática no catálogo ou nos leitores.

O assistente recebe o arquivo do autor, identifica o capítulo por ID no manifesto da obra e executa internamente a revisão. A ferramenta escreve uma **cópia** do novo Markdown e um relatório comparando hashes, quantidade de blocos e referências de ilustração. Recusa sobrescrever originais ou resultados preexistentes. Valida existência das imagens citadas no novo texto.

Exemplo técnico: `node scripts/revisar-capitulo-md.cjs --manifesto exemplos/livro-ilustrado/manifesto.json --capitulo c001 --novo /tmp/capitulo-reescrito.md --saida /tmp/revisao-capitulo.md`.

Se imagens saírem da revisão ou mudarem de posição, o relatório alerta por mudança na lista/ordem; a aprovação autoral continua necessária. O histórico final é preservado por Git após publicação aprovada. **Ainda não converte DOCX/PDF automaticamente, nem mostra diferenças parágrafo a parágrafo; não prepara publicações sozinho.** Obras públicas atuais continuam intactas.
