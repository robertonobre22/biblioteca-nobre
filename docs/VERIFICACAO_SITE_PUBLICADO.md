# Auditoria automática do site publicado
Estado: implementação técnica para revisão.
- Executa diariamente e após a conclusão bem-sucedida dos testes da branch main; pode ser disparada manualmente.
- Consulta o site público, os leitores, o catálogo, scripts e capas; verifica a presença do Google Forms e do visualizador nas cinco páginas.
- Se o deploy ainda estiver em propagação, uma checagem imediatamente posterior ao teste GitHub pode falhar temporariamente. Confirmar no Cloudflare antes de tratar como falha persistente.
- O resultado aparece em GitHub > Actions > Verificar site publicado. Sem envio de mensagens reais ao Google Forms.
- Nenhuma senha, token ou material restrito é utilizado.
- Avisos automáticos por e-mail dependem das preferências de notificações do próprio GitHub e não estão configurados pelo projeto.
