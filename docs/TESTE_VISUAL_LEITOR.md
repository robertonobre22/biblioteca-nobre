# Validação automatizada do leitor experimental
Estado: testes de navegador em desenvolvimento.

A rotina GitHub Actions usa Chromium (Playwright) para abrir o protótipo de leitura em resolução de computador e celular. Injeta um capítulo longo fictício na memória do navegador e verifica distribuição em mais de uma página, botões de navegação, deslocamento horizontal, ilustração presente, retorno à leitura contínua e ausência de erros JavaScript.

Ela **não** modifica manuscritos nem os arquivos de livros reais. A etapa de revisão humana ainda é necessária para avaliar cortes sutis, contraste, qualidade da leitura, responsividade em diferentes navegadores e formatos de ilustração. O fluxo de testes de navegador não substitui os testes estruturais atuais.
