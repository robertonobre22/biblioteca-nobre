# Biblioteca Nobre — Bíblia do Projeto v1.4
Atualizada em 25/10/2026. **Referência vigente da arquitetura e das decisões do projeto.**

## 1. Finalidade e autoridade editorial
A Biblioteca Nobre é uma biblioteca literária digital para romances, crônicas de RPG, coleções e livros ilustrados. O proprietário decide o texto canônico, a identidade visual, o acesso e a publicação de cada obra. Nenhuma alteração narrativa, substituição de capítulo ou publicação de conteúdo acontece sem aprovação específica.

**Estados:** proposta; em desenvolvimento; em revisão; aprovado; publicado. Um teste técnico bem-sucedido não altera o estado editorial.

## 2. Arquitetura atual — implantada
- **Código e histórico:** repositório público independente [robertonobre22/biblioteca-nobre](https://github.com/robertonobre22/biblioteca-nobre), branch `main`. O repositório `flipbooks` e o Atlas das Brumas são separados e devem ser preservados.
- **Hospedagem:** Cloudflare Pages em https://biblioteca-nobre.pages.dev/, com implantação automática a partir do GitHub; implantação e verificações recentes confirmadas como bem-sucedidas.
- **Estante e catálogo:** `index.html`, `catalogo.json` e `assets/catalogo.js`.
- **Leitores existentes:** `ler.html` / `assets/public-reader.js`; `darius.html` / `assets/darius-reader.js`; `poderes-sombrios.html` / `assets/barovia.js`; `entre-tramas-experimental.html` (leitor próprio). CSS compartilhado em `assets/public.css`.
- **Arquivos das obras atuais:** dados JSON em `livros/` onde aplicável; imagens em `assets/`. Não converter ou alterar esses arquivos sem preparação e aprovação.
- **Experiência existente:** leitura contínua e modo de páginas experimental; fontes, temas e posição de leitura em leitores compatíveis. Ampliação de capas e ilustrações via `assets/image-viewer.js` — abertura funcional confirmada pelo proprietário. Ainda requer auditoria abrangente em dispositivos móveis e acessibilidade.
- **Comentários:** links para o Google Forms https://forms.gle/BNYQ3cGT5m9xwhoc8; abertura confirmada pelo proprietário, mas teste de envio e recebimento de respostas pendente. O site não armazena respostas.
- **Automação:** `.github/workflows/verificar-biblioteca.yml` valida catálogo, referências e ferramentas editoriais; `.github/workflows/verificar-site-publicado.yml` verifica URLs do site. As execuções recentes do GitHub, Cloudflare e da auditoria HTTP foram concluídas com sucesso. Não equivalem à certificação de toda a experiência do leitor.

## 3. Obras e estados atuais do catálogo
| Obra | Estado no catálogo | Observações |
|---|---|---|
| Toda História de Netheril | Publicado | 41 capítulos |
| O Homem que Aprendeu a Forjar Silêncio | Publicado | 8 capítulos |
| Poderes Sombrios — A Maldição de Strahd | Em revisão | 2 capítulos; conferir fontes originais |
| Entre as Tramas do Tempo — As Estações de Elaris Anwyn | Em desenvolvimento, com leitura pública experimental | Escrita pausada, capa provisória e capítulos sujeitos a revisão |

Os estados são metadados do catálogo, não homologação literária de cada capítulo.

## 4. Arquitetura editorial aprovada — padrão híbrido
- **Original autoral:** DOCX ou PDF, preservado em local apropriado; originais restritos nunca em repositório público.
- **Texto editorial de trabalho:** Markdown (`.md`), idealmente um arquivo por capítulo.
- **Manifesto/metadados:** JSON para identificar obra, capítulos, ordem, estado editorial e referências.
- **Ilustrações:** WebP, PNG ou JPEG em arquivos separados, vinculados ao ponto narrativo correto por referência no Markdown e metadados. Manter proporções, textos alternativos e possibilidade de ampliação.
- **Entrega ao leitor:** geração/adaptação automática para leitura contínua e paginação; **integração final ainda não implementada**.

A adoção desse padrão foi aprovada. A migração efetiva das obras existentes **não** foi aprovada nem executada. Os livros antigos em JSON continuam funcionando no formato anterior até testes e autorização para cada mudança.

## 5. Ferramentas editoriais implantadas, ainda experimentais
- `scripts/preparar-substituicao.cjs`: gera cópia de livro JSON com um capítulo substituído, sem sobrescrever original e com relatório.
- `scripts/compilar-livro-md.cjs`: compila exemplo de Markdown + imagem em blocos intermediários JSON; ainda não é um renderizador completo de Markdown.
- `scripts/revisar-capitulo-md.cjs`: prepara cópia de revisão Markdown, confere referências de imagens e gera relatório.
- `scripts/gerar-previa-revisao.cjs`: produz um pacote separado com original, revisão e página comparativa; não publica.
- `exemplos/livro-ilustrado/`: exemplo fictício com ilustração técnica, leitor de demonstração e comparação por blocos em `comparacao.html`. A página não constitui um fluxo de aprovação editorial nem um leitor definitivo.

Esses artefatos existem na branch principal e seus testes automatizados foram executados. **Não há ainda fluxo completo de receber DOCX/PDF → converter sem perdas → comparar → prévia em ambos os modos → aprovação → substituir capítulo real.** Não classificar essa jornada como pronta.

## 6. Pendências priorizadas
1. Preservação fiel de formatação literária (itálico, negrito, cabeçalhos, separadores, notas, legendas) e integração do modelo híbrido aos leitores existentes.
2. Prévia real de capítulo ilustrado em ambos os modos, com paginação verdadeira, avaliação no celular/tablet e acessibilidade.
3. Fluxo de substituição com comparação detalhada e aprovação da versão editorial; validar primeiro com uma única obra experimental. O proprietário fornece arquivo e imagens; o assistente administra o processo técnico conforme permissões disponíveis.
4. Confirmar envio/recebimento e privacidade do Google Forms.
5. **Acesso restrito por convite:** autenticação e autorização real por obra/capítulo. Arquitetura GitHub + Cloudflare + Supabase Auth/PostgreSQL/RLS/Storage privado é **proposta**, não implementada; decisão aprovada: cadastro exclusivamente por convite do proprietário. Não colocar obras privadas no GitHub público nem em URLs públicas.
6. **Painel administrativo simples:** administrar convites, permissões, catálogo e estados editoriais; ainda não implementado.
7. Avaliar notificações diretas de falhas e regras de proteção da branch principal, mantendo baixo atrito operacional.

## 7. Procedimento editorial obrigatório
Receber original → identificar obra/versão → preservar fonte → analisar comparativamente → preparar capítulo/imagens → gerar prévia em revisão → conferir → obter autorização específica → publicar/atualizar no GitHub → verificar Cloudflare e integridade. Sugestões de revisão não autorizam reescrita.

O assistente executa procedimentos técnicos disponíveis sem exigir que o proprietário programe. Quando houver etapa manual, fornecer instruções detalhadas de cliques, sem burocracia adicional.

## 8. Governança de documentação e histórico
**Esta v1.4 é a referência vigente.** As versões `docs/BIBLIA_DO_PROJETO_v1.2.md` e `docs/BIBLIA_DO_PROJETO_v1.3.md` permanecem arquivadas como registros históricos, sem apagar conteúdo nem representá-las como atuais. O arquivo `README.md` deve apontar exclusivamente para a Bíblia vigente.

Documentos antigos descrevem etapas e estados de implantação anteriores; não devem sobrescrever esta referência. Proposta PR #19 (plano de automação) não foi integrada, embora partes do planejamento tenham sido implantadas depois.

## 9. Proteções permanentes
Preservar autorias, cenas, diálogos, ilustrações e ordem original até aprovação expressa. Não publicar rascunhos por sucesso de testes. Não confundir bloqueio visual com proteção de conteúdo. Não criar permissões, liberar obras, excluir versões ou mudar identidade visual sem autorização. O histórico Git ajuda a recuperar alterações de código, mas originais e obras privadas exigem preservação apropriada independente do repositório público.
