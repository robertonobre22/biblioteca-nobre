'use strict';
const assert=require('node:assert/strict'),path=require('node:path'),fs=require('node:fs');
const {build}=require('./compilar-livro-md.cjs');
const p=path.resolve(__dirname,'../exemplos/livro-ilustrado'),data=build(path.join(p,'manifesto.json'));
assert.deepEqual(data.chapters[0].blocks.map(b=>b.type),['heading','paragraph','separator','image','paragraph']);
assert(data.chapters[0].blocks[3].alt);
assert(fs.existsSync(path.join(p,data.chapters[0].blocks[3].src)));
console.log('OK: formatação, imagem no ponto certo e arquivo encontrado.');
