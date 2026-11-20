import fs from 'fs'; import vm from 'vm'; import assert from 'assert';
const [id,bt,ba,at,aa]=process.argv.slice(2);
const scripts=h=>[...h.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/g)].map(m=>m[0]);
let ok=true;
for(const [n,b,a] of [['template',bt,at],['index.html',ba,aa]]){
  const B=scripts(fs.readFileSync(b,'utf8')),A=scripts(fs.readFileSync(a,'utf8'));
  const same=B.length===A.length&&B.every((x,i)=>x===A[i]); ok&&=same;
  console.log(id,n,'script blocks',B.length,'byte-identik:',same);
  // constants
  let nconst=0;
  for(let i=0;i<B.length;i++){
    const src=B[i].replace(/^<script[^>]*>|<\/script>$/g,''), src2=A[i].replace(/^<script[^>]*>|<\/script>$/g,'');
    const names=[...new Set([...src.matchAll(/^\s*const\s+([A-Z][A-Z0-9_]+)\s*=/gm)].map(m=>m[1]))];
    for(const nm of names){
      const ev=s=>{const m=new RegExp('^\\s*const\\s+'+nm+'\\s*=\\s*([\\s\\S]*?);\\s*$','m');const mm=s.match(m);if(!mm)return undefined;try{return vm.runInNewContext('('+mm[1]+')')}catch{return 'ERR'}};
      const x=ev(src),y=ev(src2); if(x==='ERR'||x===undefined)continue; assert.deepStrictEqual(JSON.parse(JSON.stringify(y)),JSON.parse(JSON.stringify(x))); nconst++;
    }
  }
  console.log(id,n,'konstanta data deepStrictEqual:',nconst);
}
process.exit(ok?0:1);
