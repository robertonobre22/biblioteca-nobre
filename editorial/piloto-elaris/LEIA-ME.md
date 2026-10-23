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

## Protótipo de automação com GitHub Actions (23/10/2026)
- Adicionados `scripts/converter_docx.py` e `.github/workflows/piloto-editorial.yml` na ramificação de desenvolvimento.
- O script verifica títulos e oito divisões, preserva parágrafos, emite JSON e relatório de posições e bloqueia divergências.
- O fluxo recebe um arquivo DOCX **já colocado** em `editorial/originais/` e exige SHA-256. Permissão `contents: read`; resultado como artefato temporário, sem commit, publicação nem modificação da estante.
- **Ainda não foi executado no GitHub**: workflow_dispatch só poderá operar de modo usual quando o workflow estiver na ramificação padrão; o DOCX de origem não foi enviado ao repositório; ainda falta integrar entrada segura via Drive ou outro canal e validar a execução remota. Não promover automaticamente.

## Segurança de manuscritos (validação real)
- Em 23/10/2026 foi confirmado pela API do GitHub que o repositório `robertonobre22/biblioteca-nobre` tem visibilidade **public**.
- O DOCX real de Darius foi processado **localmente**, com hash SHA-256 `d384c70fcf93a6bbcfa2531516434dc73f421a8b25b4783b06a28c6558265de0`; 154 parágrafos não vazios, 145 parágrafos narrativos, 7 partes + epílogo. Comparação preservou cada parágrafo do corpo.
- Por segurança, o workflow agora executa apenas teste sintético. **Não enviar manuscritos inéditos, DOCX ou JSON textual ao repositório público**, nem como arquivo em outra ramificação. O método seguro de ingestão privada ainda precisa ser implementado.
- O sucesso do workflow não certifica fidelidade tipográfica ou aprovação editorial; ambas seguem sujeitas à conferência.
