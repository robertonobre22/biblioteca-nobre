# Biblioteca Nobre — Plano de Automação v1.0
Data: 24/10/2026
Situação: PROPOSTO; nenhuma mudança em produção por este documento.

## Diagnóstico comprovado
- Repositório GitHub: robertonobre22/biblioteca-nobre, branch main.
- O commit 5c3351cce04c8b5ca27c4d6653d1f1c56eb3de8d acionou o workflow dinâmico "pages build and deployment", run 40153346752, em 25/10/2026 02:09 UTC-3, com conclusão success.
- Isso confirma processamento de implantação do commit pelo pipeline Pages; não confirma sozinho a resposta HTTP atual, interface visual ou envio real do Google Forms.
- Ausência observada de .github/workflows na main (a integração do Cloudflare registra seus próprios check runs).
- O link do formulário escolhido é https://forms.gle/BNYQ3cGT5m9xwhoc8. Conteúdo e permissões do Google Forms não verificados por ferramenta.

## Meta operacional
Automatizar tarefas repetitivas sem automatizar decisões autorais, exposição de material privado ou publicação sem aprovação. Preservar integralmente originais, histórico e opções de recuperação.

## Fluxo-alvo
1. Proposta ou recebimento de obra: ficheiro de origem e metadados em revisão; sem publicação automática.
2. Branch de trabalho e Pull Request: resumo editorial, arquivos alterados, checks de catálogo/JSON, imagens e links, validação HTML/JS e verificação para não incluir segredos nem obras privadas.
3. Prévia: Cloudflare Pages Preview para o PR, testes de desktop, móvel e teclado e aprovação explícita do proprietário.
4. Merge autorizado em main: implantação automática Cloudflare Pages.
5. Pós-implantação: auditor HTTP da home, leitor e assets com verificação de link Google Forms e scripts de imagens; guardar commit implantado, hora, resultados e falhas.
6. Em falha: alertar o proprietário e evitar novos merges; reversão somente mediante autorização quando envolver conteúdo publicado.

## Prioridades técnicas
P0 (preparar primeiro): workflow GitHub Actions só de checks, acionado em PR e push, sem tokens Cloudflare; validadores leves do catalogo.json (formato, ids únicos, href/cover locais existentes) e varredura de marcadores de conflito. O GitHub deve tratar check falho como bloqueador antes de merge, quando branch protection/ruleset for configurada.
P0: saúde pós-deploy: teste de páginas publicadas e recursos sem autenticação, registro de HTTP/status/commit onde possível e alerta em caso de regressão. Usar secrets seguros para avisos, nunca expor credenciais em repositório público.
P1: testes end-to-end com Playwright no preview, incluindo modal de ampliação (teclado/Escape), leitores e links para Google Forms. Não automatizar envio de mensagens reais no formulário.
P1: padronizar leitor compartilhado gradualmente, sem reescrever textos canônicos. Registrar checagem editorial de origem e imagens.
P2: auditoria semanal de links quebrados e imagens ausentes; relatório técnico resumido em issue privada ou outro canal aprovado (não criar issues públicas com dados de leitores).
P2: catálogo editorial automatizado por geração de metadados somente após revisão; publicação de capítulos continua manualmente autorizada.
Futuro: identidade por convites e acervo privado com backend e testes de permissão (Supabase proposto). Não implementar a partir desta automação.

## Problemas a investigar no painel Cloudflare
- Confirmar se projeto biblioteca-nobre está ligado ao repositório certo e a branch de produção é main.
- Confirmar produção habilitada, deploy # associado ao commit e sua URL, diretório de saída e modalidade Git Integration x Direct Upload.
- Verificar se página pública respondeu com atualização (cache, aba antiga, versão regional).
- Configurar alertas de falha e confirmar que PR previews aparecem.
- Não reinstalar integração, alterar domínio ou executar upload manual antes de identificar a causa de qualquer divergência.

## Fontes técnicas oficiais
- https://developers.cloudflare.com/pages/configuration/git-integration/
- https://developers.cloudflare.com/pages/configuration/git-integration/github-integration/
- https://developers.cloudflare.com/pages/configuration/git-integration/troubleshooting/

## Pendências dependentes de ação autorizada
- Habilitar no GitHub as políticas de proteção da main após testar workflow; precisa de configuração administrativa.
- Consultar painel Cloudflare autenticado para validar configuração efetiva.
- Aprovar retenção/alerta e eventual comunicação automática ao autor.
