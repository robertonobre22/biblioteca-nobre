# Biblioteca Nobre — Bíblia do Projeto v1.3
Data: 25/10/2026
Estado: EM REVISÃO — atualização técnica/documental; não autoriza publicação editorial.

## Visão e governança
Biblioteca literária digital para romances, campanhas de RPG, crônicas e livros ilustrados. Roberto Nobre aprova identidades editoriais, texto canônico, acesso a obras e publicações. Sempre preservar originais, versões e histórico.

## Implantado e confirmado
- Repositório público independente: https://github.com/robertonobre22/biblioteca-nobre (branch main); repositório flipbooks e Atlas das Brumas não devem ser alterados.
- Hospedagem Cloudflare Pages: https://biblioteca-nobre.pages.dev/; integração e deploy automático GitHub → Cloudflare verificados em execução bem-sucedida. Leitor confirmou abertura de Google Forms e ampliação de imagens.
- Catálogo e estante com busca/filtros, quatro obras: Netheril (publicado, 41 capítulos), Darius (publicado, 8), Poderes Sombrios (em revisão, 2), Entre as Tramas do Tempo (leitura experimental, escrita pausada).
- Leitores com modo contínuo e modo páginas experimental, variações de fontes/temas e retenção local de posição em leitores verificados.
- Capas e ilustrações ampliáveis em visualizador compartilhado; confirmação funcional básica pelo proprietário, ainda sem auditoria exaustiva de acessibilidade/móvel.
- Contato por Google Forms: https://forms.gle/BNYQ3cGT5m9xwhoc8 (abertura confirmada pelo proprietário; envio e recepção de resposta ainda carecem de teste). Respostas não são armazenadas pelo site.
- GitHub Actions: testes estruturais em PR e main; checagem HTTP diária e após alterações. Últimas execuções consultadas com sucesso.
- Fluxo editorial registrado em docs/FLUXO_EDITORIAL_SIMPLES.md.

## Em desenvolvimento nesta ramificação
- Preparação isolada de substituição de capítulo nos livros JSON: ferramenta gera cópia separada + relatório com hashes e preserva os demais capítulos. Nunca reescreve arquivos originais nem faz merge. Teste automático associado.
- Limitação explícita: Elaris usa HTML próprio e requer adaptação por etapa específica; arquivos DOCX/PDF devem ser tratados e conferidos editorialmente antes de gerar o capítulo JSON. Nenhum novo capítulo foi substituído.

## A implementar — ordem recomendada
1. Validar fluxo real com UM capítulo experimental fornecido pelo autor, comparar com original, prévia e só publicar após autorização expressa.
2. Evoluir leitores gradualmente para manutenção comum, preservando texto, ordem, imagens e comportamento.
3. Verificar modo páginas, responsividade e acessibilidade em celular/tablet.
4. Integrar convites exclusivos e permissões por obra usando backend seguro; Supabase Auth/Postgres/RLS/Storage privado permanece PROPOSTA, não implantado.
5. Desenvolver painel simples do proprietário para gerenciar convites e disponibilização de obras; não colocar conteúdo restrito em GitHub/Cloudflare públicos.
6. Conferir recebimento no Google Forms e revisar controle de privacidade.
7. Avaliar alertas de falhas e configuração de regras de proteção da main, sem criar burocracia de aprovação técnica.

## Regras permanentes
- Recebimento → comparação com original → diagramação → prévia → aprovação → merge/publicação → verificação.
- Alterações editoriais, substituição de capítulos, mudanças em permissões e liberação de obras exigem aprovação específica.
- Testes automáticos não substituem aprovação autoral.
- Não tratar artefatos de planejamento como funcionalidades implantadas.
- Não associar imagem ao capítulo por suposição; não reescrever narrativa sem ordem do autor.
- Obras privadas nunca em arquivos publicados publicamente; autenticação visual não equivale a proteção de conteúdo.

## Histórico e documentação
Bíblia v1.2 preservada para histórico. Documentos antigos descrevem estados de implantação já superados, e devem ser lidos no contexto de suas datas. Proposta de plano de automação #19 não foi mesclada, mas as rotinas CI posteriores estão implantadas.
