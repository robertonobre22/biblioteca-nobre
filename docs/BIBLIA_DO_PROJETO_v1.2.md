# Biblioteca Nobre — Bíblia do Projeto v1.2
Data da auditoria: 24/10/2026
Estado: atualização documental para revisão; não equivale a aprovação de publicação de obras.

## 1. Propósito e autoridade
Biblioteca digital de romances, contos, crônicas e livros ilustrados, com espaço para campanhas de RPG e outras coleções. Roberto Nobre decide a autoria, identidade editorial, acesso, publicação e substituição de obras. Toda alteração narrativa exige autorização explícita. Preservar originais e histórico Git.

## 2. Infraestrutura — realidade observada
- Repositório ativo: https://github.com/robertonobre22/biblioteca-nobre (público, branch main).
- URL informada da produção: https://biblioteca-nobre.pages.dev/ (domínio Cloudflare Pages; vínculo de deploy e versão online não confirmados pela auditoria de código).
- Repositório independente de robertonobre22/flipbooks; o Atlas das Brumas não deve ser tocado.
- Catálogo real em catalogo.json; interface index.html e assets/catalogo.js.
- Leitores implementados em ler.html/assets/public-reader.js, darius.html/assets/darius-reader.js, poderes-sombrios.html/assets/barovia.js e edição específica entre-tramas-experimental.html.
- CSS compartilhado assets/public.css; imagens WebP em assets/.
- GitHub Issues template .github/ISSUE_TEMPLATE/comentario-leitura.yml hoje é destino público de feedback.
- Não foram identificados na árvore examinada componentes Supabase, autenticação, painel de administrador ou formulário com processamento seguro. Não tratá-los como existentes.

## 3. Catálogo observado (status conforme metadados, não revisão autoral independente)
- Toda História de Netheril: publicado, 41 capítulos, ilustrações em assets.
- Poderes Sombrios — A Maldição de Strahd: em revisão, 2 capítulos; conferir parágrafos com PDFs.
- O Homem que Aprendeu a Forjar Silêncio: publicado, 8 capítulos, capa aprovada.
- Entre as Tramas do Tempo — As Estações de Elaris Anwyn: leitura pública experimental, escrita pausada, capítulos sujeitos a revisão, capa provisória.
Estados em catalogo.json são etiquetas do sistema e não prova de conferência final de cada fonte.

## 4. Experiência de leitura
- Dois modos existentes: contínuo e páginas; modo páginas ainda experimental e requer verificação em celular/tablet.
- Fontes, tema e posição de leitura persistidos no navegador em leitores verificados.
- Preservar a ordem e associação das imagens ao texto original.
- NOVO REQUISITO APROVADO PELO PEDIDO DO PROPRIETÁRIO: ampliar capa e ilustrações por toque/clique, com visualizador sobreposto, zoom sem cortes, fechamento por botão/Escape, suporte a teclado, foco e celular; voltar ao mesmo ponto de leitura. Ampliar não significa publicar imagem em resolução maior do que a disponível. Não abrir imagens de obras privadas em URL pública.

## 5. Comunicação de leitores — decisão aprovada em 24/10/2026
- Canal escolhido pelo proprietário: Google Forms, endereço https://forms.gle/BNYQ3cGT5m9xwhoc8.
- Botões de comentários na estante e páginas dos livros apontam para o mesmo formulário, sem encaminhar o leitor para GitHub e sem exigir conta GitHub.
- A URL foi fornecida pelo proprietário. A abertura e as permissões do formulário não puderam ser verificadas automaticamente; confirmar manualmente envio anônimo, coleta opcional de e-mail, recebimento e visibilidade das respostas.
- Google Forms não é garantia de anonimato: depende das configurações de coleta de e-mail, autenticação e compartilhamento escolhidas pelo proprietário.
- O projeto NÃO coleta ou armazena respostas do formulário nos seus arquivos públicos; controle de acesso às respostas é feito na conta Google do proprietário.
- A alternativa anterior de formulário interno via Cloudflare Functions + D1 + Turnstile fica arquivada como proposta técnica futura, e seu código experimental é retirado desta ramificação para evitar implantação de serviços não configurados.
- Não publicar automaticamente mensagens nem converter relatos em issues públicas.
- Se a URL do formulário mudar, atualizar de modo coordenado os links de todas as páginas.

## 6. Convites e permissões — preservar decisões 21/10
- Cadastro de leitores só mediante convite do proprietário.
- Obras públicas sem login; obras privadas autenticadas com autorização efetiva, verificável no servidor; possibilidade futura de concessão por obra/capítulo/grupo.
- GitHub para código e histórico; nunca hospedar textos ou imagens de acesso restrito no repositório público, Cloudflare Pages público ou links diretos públicos.
- Supabase Auth, PostgreSQL com RLS e Storage privado continuam ARQUITETURA PROPOSTA e dependem de validação e testes, sem implantação comprovada. Atualizar referência anterior que mencionava GitHub Pages: a implantação atual declarada usa Cloudflare Pages, a confirmar no painel.
- Não supor que ocultar botões protege conteúdo: políticas, sessão, cache, links temporários e revogação exigem ensaio técnico.

## 7. Fluxo editorial obrigatório
Recebimento (DOCX/PDF/imagens) → identificação → comparação com original → preparação → diagramação → prévia → aprovação editorial explícita → publicação controlada → verificação técnica.
Texto canônico imutável até aprovação; rastrear revisão e preservar originais. Trabalhar em branch e Pull Request, nunca fazer merge automático de conteúdo literário. Não dar a 'em desenvolvimento' aparência de 'publicado definitivo'.

## 8. Divergências e documentos a reconciliar
- DECISOES_E_ARQUITETURA_v1.1.md, de 21/10, dizia 'repositório não criado' e previa GitHub Pages: informação superada pelo repositório atual e endereço Cloudflare informado.
- docs/FASE_PAGINAS_ABERTURAS.md e docs/NETHERIL_ARTES_E_LEITURA.md contêm afirmações históricas de 'imagens não publicadas'/'main inalterada'. Hoje assets possui dezenas de imagens Netheril WebP e conteúdo na main: preservar documentos como registros da fase em que foram escritos, não como fotografia do estado atual.
- catalogo.json tem status distinto entre cada obra. Um status 'publicado' exige rastreabilidade da aprovação editorial; verificar documentação antes de qualquer correção retroativa.
- Experiência Elaris está em HTML monolítico independente; propor convergência futura para componentes compartilhados sem reescrever texto ou migrar automaticamente.
- README.md muito curto; projeto precisa de índice para esta Bíblia, inventário e fluxo de deploy. Proposta, não alterado nesta revisão.
- Confirmação do vínculo automático GitHub → Cloudflare, configuração de builds e eventuais headers de segurança depende de leitura do painel Cloudflare ou teste público, não comprovado pela inspeção do GitHub.

## 9. Prioridades e critérios de aceite
P0: integrar link do Google Forms, conferir configuração de respostas públicas e testar entrega e privacidade antes de publicar.
P1: ampliação das imagens em todas as superfícies (estante, leitores, Elaris), com teclado, celular e acessibilidade; testar sem impacto na navegação de capítulos.
P1: auditoria das obras públicas e dos metadados de publicação; corrigir divergências editoriais só após aprovação.
P2: confirmar pipeline de deploy Cloudflare e documentação de manutenção.
P2: prototipar convites, login e acervo restrito; não ativar sem teste de autorização.
P3: painel administrativo simples, revisão de feedback e permissões por obra.

## 10. Registro da auditoria
Fonte: leitura do repositório robertonobre22/biblioteca-nobre/main em 24/10/2026 (commit d5dddb6826004f523b0831bf65efe21d6804a582), mais DECISOES_E_ARQUITETURA_v1.1.md fornecido pelo proprietário.
Limite: site Cloudflare não pôde ser recuperado na consulta externa; não alegar testes de produção.
Situação desta Bíblia: EM REVISÃO, aberta em branch separada, sem alterações na produção. Em 24/10/2026 o proprietário escolheu Google Forms para comentários; a verificação externa do formulário ainda está pendente.
