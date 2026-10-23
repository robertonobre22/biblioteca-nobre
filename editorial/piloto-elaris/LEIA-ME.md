# Biblioteca Nobre — Piloto editorial Elaris / Darius

**Estado:** em desenvolvimento, uso interno. **Nenhum livro deste piloto está publicado ou autorizado para publicação.**

## Decisões confirmadas
- `Entre as Tramas do Tempo – As Estações de Elaris Anwyn`: livro principal, **em desenvolvimento**.
- `O Homem que Aprendeu a Forjar Silêncio`: **obra complementar / spin-off**; a definição da versão publicável continua em revisão.
- Pasta visual do Drive: **referências para recriação**, nunca copiar automaticamente as imagens antigas para o site.

## Resultado da ingestão local (dois DOCX recebidos)
- Livro principal: **4.065 parágrafos não vazios**, **63 títulos ou estruturas candidatas** detectados. Há repetição de números de capítulos, planejamento, variantes e instruções no final. **Não é seguro converter tudo diretamente como texto canônico.**
- Spin-off: **154 parágrafos não vazios**, **7 partes e um epílogo** identificados. Ainda necessita revisão autoral.
- Os DOCX examinados não contêm imagens embutidas pelo método de formas inline. As ilustrações serão uma fase separada.

## Guarda editorial
O material original é imutável. Toda separação entre narrativa e notas deve ser rastreável (índice do parágrafo de origem, título detectado, estado de revisão). Trechos ambíguos permanecem sinalizados, sem exclusão automática. Acessos não são concedidos e nada é adicionado ao `catalogo.json` público nesta fase.

## Experimento de automação
1. Entrada: arquivo DOCX e metadados de obra.
2. Inventário: extrair parágrafos, títulos candidatos, sequência e sinais de conteúdo editorial misto.
3. Conferência: produzir relatório e proposta de recortes, preservando integralmente o original.
4. Saída: arquivos de leitura somente para revisão numa ramificação de desenvolvimento.
5. Imagens: classificar referências da pasta visual; recriar somente com aprovação de cada proposta visual.
6. Prévia e integração: GitHub e Cloudflare; **a publicação depende de autorização expressa**, e o merge automático ainda precisa de configuração e testes de permissões.

## Não implementado ainda
A importação contínua de arquivos novos do Drive, o acionamento automático de builds de DOCX, o upload autônomo de mídias, os testes de paginação e o fluxo de promoção autorizada. Este documento é o registro do piloto e não afirma que esses mecanismos já funcionam.

## Ensaio de conversão realizado — Darius
- Fonte: DOCX encaminhado na conversa, preservado sem alteração.
- Seções recuperadas: **7 partes + epílogo**.
- Parágrafos narrativos exportados: **145**; adicionalmente há 8 cabeçalhos de seção e 1 título geral (154 entradas não vazias).
- SHA-256 da fonte: `d384c70fcf93a6bbcfa2531516434dc73f421a8b25b4783b06a28c6558265de0`.
- Entregas geradas: leitor offline HTML com modos contínuo/páginas, livro estruturado JSON e relatório de conversão, reunidos em ZIP para revisão. Essas entregas ainda são arquivos locais de revisão, não integrantes do site público.
- Verificação automatizada: JavaScript do leitor passou em `node --check`; revisão visual e conferência literária ainda pendentes.
- Próxima intervenção autoral: apenas após a revisão técnica da prévia offline, antes de publicar ou gerar imagens definitivas.
