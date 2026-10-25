# Formulário privado — implantação controlada
Estado: código preparado na ramificação de revisão; NÃO ativado nem testado em produção.

1. Na Cloudflare, criar um banco D1 exclusivo para comentários. Executar o SQL de `docs/sql/comentarios.sql`.
2. Em Workers & Pages → projeto Biblioteca Nobre → Settings → Bindings, vincular D1 como `COMENTARIOS_DB`. Configurar também para previews, se for testar no preview.
3. Em Turnstile, criar um widget para o domínio da Biblioteca Nobre. Em Variables and Secrets, adicionar `TURNSTILE_SITEKEY` (texto público) e `TURNSTILE_SECRET` (segredo). Nunca colocar o segredo no GitHub.
4. A função `/api/comentarios/config` só habilita o botão quando banco e Turnstile estão configurados. A rota `/api/comentarios` valida dados, verifica Turnstile no servidor e grava no D1.
5. Testar envio válido, erros de validação, campo honeypot, ausência de token, erro de banco, mobile, privacidade e acesso não autorizado. Acrescentar proteção de taxa/WAF no Cloudflare antes da produção. Não publicar sem validação.
6. Para ler os relatos inicialmente, o proprietário poderá consultar o banco no painel Cloudflare D1. Painel privado e notificações por e-mail ficam para outra etapa, a aprovar. Retenção e descarte precisam de decisão.
7. Garantir que a configuração de build/deploy inclua a pasta `functions/`; se o projeto servir uma pasta de saída diferente, verificar a estrutura e adaptar.

Fontes técnicas: https://developers.cloudflare.com/pages/functions/ , https://developers.cloudflare.com/pages/functions/bindings/ , https://developers.cloudflare.com/pages/functions/plugins/turnstile/ .

**Importante:** a segurança do repositório não depende de ocultar seu endereço. Issues públicas requerem GitHub mas não concedem permissão de editar código. O formulário privado evita essa dependência e exposição do comentário.
