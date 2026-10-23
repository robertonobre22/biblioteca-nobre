#!/usr/bin/env python3
"""Converte DOCX em JSON para prévia editorial, mantendo rastreabilidade."""
import argparse
import hashlib
import json
import re
from pathlib import Path
from docx import Document

PART = re.compile(r"^(Parte\s+(?:[IVXLCDM]+|\d+)\s*[—–-]\s*.+|Epílogo\s*[—–-]\s*.+)$",re.I)

def convert(source, output, title, book_id):
    data=source.read_bytes()
    paragraphs=[{"source_paragraph":i,"text":p.text.strip()} for i,p in enumerate(Document(source).paragraphs) if p.text.strip()]
    if not paragraphs: raise ValueError("Documento vazio")
    if paragraphs[0]["text"] != title: raise ValueError("Título inicial difere do esperado: revisão obrigatória")
    if any("Capítulo" in p["text"] for p in paragraphs[1:]): raise ValueError("Documento contém capítulos adicionais: mapeamento manual necessário")
    sections=[]
    current=None
    for item in paragraphs[1:]:
        if PART.match(item["text"]):
            if current: sections.append(current)
            current={"tomo":"Crônica de Darius","title":item["text"],"paragraphs":[],"source_positions":[]}
        else:
            if current is None: raise ValueError("Parágrafo antes da primeira parte: mapeamento manual necessário")
            current["paragraphs"].append(item["text"])
            current["source_positions"].append(item["source_paragraph"])
    if current: sections.append(current)
    if len(sections)!=8 or not sections[-1]["title"].lower().startswith("epílogo"):
        raise ValueError("Esperadas sete partes e epílogo; reveja a fonte")
    all_source=[p["text"] for p in paragraphs[1:] if not PART.match(p["text"])]
    all_out=[p for s in sections for p in s["paragraphs"]]
    if all_source!=all_out: raise AssertionError("Diferença textual detectada: saída bloqueada")
    book={"id":book_id,"title":title,"status":"em-revisao","chapters":[{"tomo":s["tomo"],"title":s["title"],"paragraphs":s["paragraphs"],"illustrations":[]} for s in sections]}
    report={"original_file":source.name,"source_sha256":hashlib.sha256(data).hexdigest(),"total_nonempty_paragraphs":len(paragraphs),"body_paragraphs":len(all_source),"sections":len(sections),"text_integrity":"identical_per_paragraph","section_ranges":[{"title":s["title"],"source_positions":s["source_positions"]} for s in sections],"publication_authorized":False}
    output.mkdir(parents=True,exist_ok=True)
    (output/"livro.json").write_text(json.dumps(book,ensure_ascii=False,indent=2),encoding="utf-8")
    (output/"relatorio.json").write_text(json.dumps(report,ensure_ascii=False,indent=2),encoding="utf-8")
    return report

if __name__=="__main__":
    p=argparse.ArgumentParser()
    p.add_argument("source",type=Path);p.add_argument("--output",type=Path,required=True);p.add_argument("--title",required=True);p.add_argument("--id",required=True)
    a=p.parse_args()
    print(json.dumps(convert(a.source,a.output,a.title,a.id),ensure_ascii=False,indent=2))
