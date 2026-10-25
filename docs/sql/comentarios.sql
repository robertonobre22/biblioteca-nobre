-- Executar no banco D1 privado vinculado como COMENTARIOS_DB.
CREATE TABLE IF NOT EXISTS comentarios (
 id INTEGER PRIMARY KEY AUTOINCREMENT,
 obra TEXT NOT NULL,
 tipo TEXT NOT NULL,
 trecho TEXT NOT NULL DEFAULT '',
 mensagem TEXT NOT NULL,
 email TEXT,
 criado_em TEXT NOT NULL,
 estado TEXT NOT NULL DEFAULT 'novo'
);
CREATE INDEX IF NOT EXISTS idx_comentarios_criado_em ON comentarios(criado_em DESC);
