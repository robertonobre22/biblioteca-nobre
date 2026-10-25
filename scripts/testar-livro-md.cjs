'use strict';
const assert=require('node:assert/strict'),path=require('node:path'),fs=require('node:fs');
const {build}=require('./compilar-livro-md.cjs');
const p=path.resolve(__dirname,'../exemplos/livro-ilustrado');
const data=build(path.join(p,'manifesto.json'));
assert.deepEqual(data.chapters[0].blocks.map(x=>x.type),['paragraph','image','paragraph']);
assert(data.chapters[0].blocks[1].alt);
assert(fs.existsSync(path.join(p,data.chapters[0].blocks[1].src)));
console.log('OK: imagem no ponto certo, textos preservados e arquivo real encontrado.');
