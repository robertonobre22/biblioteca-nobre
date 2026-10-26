'use strict';
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'../exemplos/livro-ilustrado');
const html=fs.readFileSync(path.join(root,'index.html'),'utf8'),js=fs.readFileSync(path.join(root,'previa.js'),'utf8');
for(const id of ['page-navigation','previous','next','page-status'])assert(html.includes('id="'+id+'"'),'Controle não encontrado: '+id);
assert(html.includes('column-fill:auto')&&html.includes('break-inside:avoid'),'CSS paginado ausente');
assert(js.includes('article.scrollWidth')&&js.includes('article.scrollLeft'),'Medição e navegação ausentes');
console.log('OK: recursos básicos do modo páginas estão presentes; teste visual em navegador ainda necessário.');
