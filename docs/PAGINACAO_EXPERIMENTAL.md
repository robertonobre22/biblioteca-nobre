# Paginação experimental em Markdown
Implementação demonstrativa no leitor `exemplos/livro-ilustrado/index.html`.
O modo páginas usa colunas CSS com altura definida e navegação anterior/próxima. O navegador calcula a distribuição e o script estima a quantidade de páginas pela largura horizontal.
Imagens e blocos usam `break-inside:avoid` para reduzir cortes; textos longos podem continuar na página seguinte. O cálculo é refeito ao mudar o tamanho da janela e carregar imagens.
**Limitações:** a divisão é controlada pelo navegador; ainda é necessário testar visualmente em Mac, Android e tablet, incluindo capítulos longos e imagens de página inteira. A versão contínua permanece disponível. Nenhum leitor público foi substituído nem obra migrada.
