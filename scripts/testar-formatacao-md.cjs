'use strict';
const assert=require('node:assert/strict');const {parse}=require('./biblioteca-markdown.js');
const md='# Abertura\n\nA voz era *baixa* e o pacto **definitivo**.\n\n---\n\n![Cena](imagens/exemplo.png)\n\nDepois veio o silêncio.';
const blocks=parse(md);assert.deepEqual(blocks.map(b=>b.type),['heading','paragraph','separator','image','paragraph']);
assert.deepEqual(blocks[1].inlines.map(x=>x.type),['text','em','text','strong','text']);
assert.equal(blocks[3].src,'imagens/exemplo.png');
assert.throws(()=>parse('![errado](../segredo.png)'),/inválida/);
assert.throws(()=>parse('<script>alert(1)</script>'),/HTML/);
console.log('OK: títulos, ênfase, separadores, imagens e rejeição de caminhos inseguros.');
