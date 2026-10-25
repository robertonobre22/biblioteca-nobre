#!/usr/bin/env node
// Biblioteca Nobre — ferramenta técnica para PREPARAR substituições, nunca publicar.
'use strict';
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto'),assert=require('node:assert/strict');
function fail(message){console.error('ERRO: '+message);process.exit(1)}
const args=process.argv.slice(2);
function get(name){let i=args.indexOf(name);return i<0?null:args[i+1]}
if(args.includes('--help')||!args.length){console.log('Uso: node scripts/preparar-substituicao.cjs --livro livros/darius.json --indice 1 --entrada novo-capitulo.json --saida /tmp/preparado.json');process.exit(0)}
const livro=get('--livro'),entrada=get('--entrada'),saida=get('--saida'),index=Number(get('--indice'));
if(!livro||!entrada||!saida||!Number.isSafeInteger(index)||index<1)fail('Informe --livro, --indice (a partir de 1), --entrada e --saida.');
const root=path.resolve(__dirname,'..'),source=path.resolve(root,livro);
if(!source.startsWith(path.join(root,'livros')+path.sep)||!source.endsWith('.json'))fail('O livro deve estar em livros/*.json.');
if(!fs.existsSync(source)||!fs.existsSync(entrada))fail('Arquivo de origem ou capítulo novo não encontrado.');
const out=path.resolve(saida);if(out===source||out===path.resolve(entrada))fail('A saída deve ser outro arquivo, nunca sobrescrever o original.');
if(fs.existsSync(out))fail('A saída já existe. Não será sobrescrita.');
const original=fs.readFileSync(source),book=JSON.parse(original),replacement=JSON.parse(fs.readFileSync(entrada,'utf8'));
assert(Array.isArray(book.chapters),'Estrutura de capítulos inválida');
assert(index<=book.chapters.length,'Índice fora da obra');
const before=book.chapters[index-1];
assert(typeof replacement==='object'&&replacement&&!Array.isArray(replacement),'Capítulo substituto inválido');
assert(typeof replacement.title==='string'&&replacement.title.trim(),'Novo capítulo precisa de título');
assert(Array.isArray(replacement.paragraphs)&&replacement.paragraphs.length>0&&replacement.paragraphs.every(p=>typeof p==='string'&&p.trim()),'Novo capítulo precisa de parágrafos completos');
if(replacement.id!==undefined&&before.id!==undefined&&replacement.id!==before.id)fail('O ID canônico do capítulo não corresponde.');
if(replacement.number!==undefined&&before.number!==undefined&&replacement.number!==before.number)fail('O número canônico do capítulo não corresponde.');
if(replacement.illustrations!==undefined&&!Array.isArray(replacement.illustrations))fail('Ilustrações inválidas.');
const after={...before,...replacement};
if(before.id!==undefined)after.id=before.id;
if(before.number!==undefined)after.number=before.number;
// Campos não informados são preservados, inclusive vínculos de arte e proveniência.
book.chapters[index-1]=after;
const sha=d=>crypto.createHash('sha256').update(d).digest('hex');
const contents=JSON.stringify(book,null,2)+'\n';
fs.mkdirSync(path.dirname(out),{recursive:true});
fs.writeFileSync(out,contents,{flag:'wx'});
const report={book:book.id,index,originalTitle:before.title,newTitle:after.title,oldParagraphs:before.paragraphs?.length??0,newParagraphs:after.paragraphs.length,originalSha256:sha(original),preparedSha256:sha(contents),output:out,otherChaptersUnchanged:true,publication:'NÃO AUTORIZADA — apenas prévia local'};
fs.writeFileSync(out+'.relatorio.json',JSON.stringify(report,null,2)+'\n',{flag:'wx'});
console.log(JSON.stringify(report,null,2));
