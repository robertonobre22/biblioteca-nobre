// Execute: node scripts/validar-publicacao.mjs
import fs from 'node:fs';
import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
const read = name => fs.readFileSync(name, 'utf8');
const book = JSON.parse(read('livros/netheril.json'));
assert.equal(book.id, 'toda-historia-de-netheril');
assert.equal(book.chapters.length, 41, 'Quantidade de capítulos inesperada');
assert(book.chapters.every(c => c.title && c.tomo && c.paragraphs.length), 'Capítulo vazio ou sem título/tomo');
assert(!JSON.stringify(book).includes('PLANEJAMENTOS:'), 'Planejamentos editoriais não podem constar no livro publicado');
const index = read('index.html'), reader = read('ler.html');
assert(index.includes('ler.html'), 'Catálogo não aponta para leitor');
assert(reader.includes('assets/public-reader.js'), 'Leitor não carrega script');
assert(fs.existsSync('assets/public.css'), 'CSS ausente');
assert(fs.existsSync('assets/public-reader.js'), 'Script ausente');
execFileSync(process.execPath, ['--check', 'assets/public-reader.js']);
console.log('Validação estrutural OK: 41 capítulos, arquivos principais, JS e exclusão de planejamentos.');
console.log('ATENÇÃO: testes visuais, autenticidade editorial e hospedagem não são cobertos.');
