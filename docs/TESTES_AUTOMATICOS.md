# Verificações automáticas — Biblioteca Nobre
Estado: em revisão técnica. Não altera obras nem publica capítulos.

Quando alguém propuser mudanças por Pull Request direcionado à main, o GitHub Actions verificará automaticamente: catálogo JSON, IDs únicos, existência das capas e leitores citados no catálogo, referências locais de HTML e sintaxe dos JavaScripts em assets.

O fluxo também roda quando houver alteração na main, para registrar eventuais regressões. Não contém segredos nem envia conteúdo para serviços externos.

Limites: estes são testes estruturais e não substituem prova de leitura, inspeção de layout ou disponibilidade do Google Forms. A proteção obrigatória de merge depende de configurar uma regra na branch main depois de observar que a rotina funciona.

Se um teste falhar, revisar logs da aba Actions antes de mesclar o PR. Não desabilitar testes para publicar obras.
