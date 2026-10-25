// Cloudflare Pages Functions: armazenamento privado D1; sem exposição de mensagens ao navegador.
const json=(payload,status=200)=>new Response(JSON.stringify(payload),{status,headers:{'content-type':'application/json; charset=utf-8','cache-control':'no-store','x-content-type-options':'nosniff'}});
export async function onRequestPost({request,env}) {
 if(!env.COMENTARIOS_DB||!env.TURNSTILE_SECRET)return json({ok:false,error:'Serviço em configuração.'},503);
 if(!(request.headers.get('content-type')||'').includes('multipart/form-data'))return json({ok:false,error:'Formato inválido.'},415);
 if(Number(request.headers.get('content-length')||0)>12000)return json({ok:false,error:'Mensagem muito grande.'},413);
 let data;try{data=await request.formData()}catch{return json({ok:false,error:'Dados inválidos.'},400)}
 const val=k=>String(data.get(k)||'').trim();
 if(val('website'))return json({ok:true});
 const obra=val('obra'),tipo=val('tipo'),trecho=val('trecho'),mensagem=val('mensagem'),email=val('email'),token=val('cf-turnstile-response');
 const obras=['Toda História de Netheril','Poderes Sombrios — A Maldição de Strahd','O Homem que Aprendeu a Forjar Silêncio','Entre as Tramas do Tempo — As Estações de Elaris Anwyn','Biblioteca em geral'];
 if(!obras.includes(obra)||!['inconsistencia','revisao','opiniao','outro'].includes(tipo)||trecho.length>180||mensagem.length<10||mensagem.length>5000||email.length>254||(email&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)))return json({ok:false,error:'Verifique os campos do formulário.'},400);
 if(!token)return json({ok:false,error:'Complete a verificação antispam.'},400);
 let verification;try{const v=await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify',{method:'POST',headers:{'content-type':'application/x-www-form-urlencoded'},body:new URLSearchParams({secret:env.TURNSTILE_SECRET,response:token,remoteip:request.headers.get('CF-Connecting-IP')||''})});verification=await v.json()}catch{return json({ok:false,error:'Não foi possível validar o envio.'},503)}
 if(!verification.success)return json({ok:false,error:'Verificação antispam não concluída.'},403);
 try{await env.COMENTARIOS_DB.prepare('INSERT INTO comentarios (obra,tipo,trecho,mensagem,email,criado_em) VALUES (?,?,?,?,?,?)').bind(obra,tipo,trecho,mensagem,email||null,new Date().toISOString()).run()}catch{return json({ok:false,error:'O recebimento está temporariamente indisponível.'},503)}
 return json({ok:true},201);
}
export async function onRequestGet(){return json({ok:false,error:'Método não permitido.'},405)}
