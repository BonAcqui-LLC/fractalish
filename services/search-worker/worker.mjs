import inventory from './routes.json';
import { WorkerEntrypoint } from 'cloudflare:workers';
const ORIGIN='https://fractalish.com';
const CRAWLER_VERSION=5;
const clean=s=>s.replace(/\s+/g,' ').trim();
const excluded=new Set(['/search','/search.html','/404.html']);
function local(raw,base=ORIGIN) {
  try { const u=new URL(raw,base); if(u.origin!==ORIGIN)return null; return u.pathname; } catch {return null;}
}
function htmlRoute(path) { return path && !/\.[^/]+$/.test(path.replace(/\/$/,'')) || /\.html$/.test(path||''); }
async function get(path) {
  for(let attempt=0;attempt<2;attempt++){
    try{
      const response=await fetch(ORIGIN+path+(path.includes('?')?'&':'?')+'search_crawl='+Date.now(),{redirect:'follow',signal:AbortSignal.timeout(15000)});
      if(!response.ok)throw Error(`HTTP ${response.status}`);
      return response;
    }catch(error){if(attempt===1)throw Error(`${path}: ${error.message}`);}
  }
}
// Parse the served document, including article headers and pages without <main>.
export async function extract(html) {
  let title='',body='',headings='',canonical=null,redirect=null,noindex=false;
  const links=[],sources=[];
  let stripped=await new HTMLRewriter()
    .on('script, style, nav, body > header, .site-header, body > footer, .site-footer, noscript, [hidden], [aria-hidden="true"]',{element(e){e.remove();}})
    .transform(new Response(html)).text();
  const collect=fn=>({text(t){fn(t.text+(t.lastInTextNode?' ':''));}});
  const hasMain=/<main\b/i.test(stripped);
  await new HTMLRewriter()
    .on('title',collect(s=>title+=s))
    .on(hasMain?'main':'body',collect(s=>body+=s))
    .on('h1, h2, h3, h4',collect(s=>headings+=s))
    .on('link[rel="canonical"]',{element(e){canonical=e.getAttribute('href');}})
    .on('meta',{element(e){
      if(e.getAttribute('name')?.toLowerCase()==='robots' && /noindex/i.test(e.getAttribute('content')||''))noindex=true;
      if(e.getAttribute('http-equiv')?.toLowerCase()==='refresh')redirect=(e.getAttribute('content')||'').match(/url\s*=\s*['"]?([^'";]+)/i)?.[1]?.trim();
    }})
    .on('a[href]',{element(e){links.push(e.getAttribute('href'));}})
    .on('[data-subtitle-source]',{element(e){sources.push({type:'text',url:e.getAttribute('data-subtitle-source')});}})
    .on('[data-bindings-source]',{element(e){sources.push({type:'bindings',url:e.getAttribute('data-bindings-source')});}})
    .transform(new Response(stripped)).text();
  return {title:clean(title),text:clean(body),headings:clean(headings),canonical,redirect,noindex,links,sources};
}
function strings(value){return typeof value==='string'?value:Array.isArray(value)?value.map(strings).join(' '):value&&typeof value==='object'?Object.values(value).map(strings).join(' '):'';}
export class PageFetcher extends WorkerEntrypoint {
  async batch(paths) {
    if(!Array.isArray(paths)||paths.length>8)throw Error('Invalid crawl batch');
    const output=[];
    for(const path of paths){
      if(local(path)!==path)throw Error('Invalid crawl path');
      const response=await get(path);
      if(!response.headers.get('content-type')?.includes('text/html')){output.push({path,nonHtml:true});continue;}
      const page=await extract(await response.text());
      if(!page.redirect&&!page.noindex)for(const source of page.sources){
        const p=local(source.url,ORIGIN+path);if(!p)throw Error(`${path}: unsupported external content source`);
        const r=await get(p);page.text+=' '+(source.type==='bindings'?strings((await r.json()).bindings):await r.text());
      }
      output.push({path,page});
    }
    return output;
  }
}
export async function build(env) {
  const started=new Date().toISOString();
  const sitemap=await (await get('/sitemap.xml')).text();
  let deployedInventory=[];
  const manifest=await fetch(ORIGIN+'/assets/search-routes.json?search_crawl='+Date.now(),{signal:AbortSignal.timeout(15000)});
  if(manifest.ok){
    deployedInventory=await manifest.json();
    if(!Array.isArray(deployedInventory)||!deployedInventory.every(p=>typeof p==='string'&&local(p)===p&&htmlRoute(p)))throw Error('Invalid deployed HTML inventory');
  }else if(manifest.status!==404)throw Error(`Deployment inventory: HTTP ${manifest.status}`);
  const seeds=[...(deployedInventory.length?deployedInventory:inventory),'/',...Array.from(sitemap.matchAll(/<loc>(.*?)<\/loc>/g),m=>local(m[1])).filter(Boolean)];
  const queue=[...new Set(seeds)],visited=new Set(),documents=new Map(),coverage=[],candidates=new Map();
  for(let i=0;i<queue.length;) {
    if(queue.length>280)throw Error('Crawl exceeded 280 routes; review batch budget before increasing limit.');
    const pending=queue.slice(i,i+8);i+=pending.length;
    const paths=pending.filter(path=>{
      if(visited.has(path))return false;visited.add(path);
      if(excluded.has(path)){coverage.push({path,status:'utility'});return false;}return true;
    });
    const batch=paths.length?await env.PAGE_FETCHER.batch(paths):[];
    for(const {path,page,nonHtml} of batch){
    if(nonHtml){coverage.push({path,status:'non-html'});continue;}
    const add=raw=>{const p=local(raw,ORIGIN+path);if(p&&htmlRoute(p)&&!queue.includes(p))queue.push(p);};
    for(const link of page.links)add(link);
    if(page.redirect){add(page.redirect);coverage.push({path,status:'redirect',target:page.redirect});continue;}
    if(page.noindex){coverage.push({path,status:'noindex'});continue;}
    const canonical=page.canonical?local(page.canonical,ORIGIN+path):path.replace(/\/index.html$/,'/').replace(/\.html$/,'');
    if(!canonical)throw Error(`${path}: canonical points outside the site`);
    // Always retrieve the canonical deployed route before choosing its text.
    if(path!==canonical){add(canonical);coverage.push({path,status:'alias',target:canonical});if(page.text)candidates.set(canonical,{path,page});continue;}
    if(!page.text)throw Error(`${path}: empty extracted content`);
    documents.set(canonical,{url:canonical,title:page.title,headings:page.headings,text:clean(page.text)});
    coverage.push({path,status:'indexed'});
    }
  }
  if(coverage.length!==queue.length)throw Error('Not every discovered route was accounted for');
  // A canonical URL can itself be a legacy meta redirect to a real content page.
  for(const [canonical,{path,page}] of candidates){
    if(!documents.has(canonical)&&coverage.some(x=>x.path===canonical&&x.status==='redirect')){
      documents.set(canonical,{url:canonical,title:page.title,headings:page.headings,text:clean(page.text)});
      const entry=coverage.find(x=>x.path===path);entry.status='indexed';entry.canonical=canonical;
    }
  }
  for(const entry of coverage)if(entry.status==='alias'&&!documents.has(entry.target)&&!coverage.some(x=>x.path===entry.target&&['redirect','noindex','utility'].includes(x.status)))throw Error(`Unresolved alias: ${entry.path}`);
  if(documents.size<60)throw Error('Unexpected loss of indexed pages; retaining previous index.');
  return {version:2,crawlerVersion:CRAWLER_VERSION,indexedAt:new Date().toISOString(),startedAt:started,source:'live deployment',schedule:'Daily at 09:17 UTC',documents:[...documents.values()].sort((a,b)=>a.url.localeCompare(b.url)),coverage};
}
let running;
async function refresh(env){
  if(running)return running;
  running=(async()=>{
    try{
      const index=await build(env);
      await env.SEARCH_INDEX.put('index',JSON.stringify(index));
      await env.SEARCH_INDEX.put('status',JSON.stringify({ok:true,indexedAt:index.indexedAt,pages:index.documents.length,routes:index.coverage.length,coverage:index.coverage,schedule:index.schedule}));
      console.log(JSON.stringify({event:'search-index-refreshed',pages:index.documents.length,routes:index.coverage.length}));return index;
    }catch(error){await env.SEARCH_INDEX.put('status',JSON.stringify({ok:false,failedAt:new Date().toISOString(),error:error.message,previousIndexPreserved:true}));throw error;}
    finally{running=null;}
  })();return running;
}
export default {
  async scheduled(event,env){await refresh(env);},
  async fetch(request,env,ctx){
    if(!['GET','HEAD'].includes(request.method))return new Response('Method not allowed',{status:405});
    const path=new URL(request.url).pathname;
    if(!['/assets/search-index.json','/assets/search-status.json'].includes(path))return new Response('Not found',{status:404});
    if(path.endsWith('search-status.json'))return new Response(await env.SEARCH_INDEX.get('status')||'{"ok":false,"status":"not yet indexed"}',{headers:{'Content-Type':'application/json','Cache-Control':'no-store'}});
    let index=await env.SEARCH_INDEX.get('index','json');
    if(!index||index.crawlerVersion!==CRAWLER_VERSION){try{index=await refresh(env);}catch{if(!index)return Response.json({error:'Search indexing failed; please retry later.'},{status:503});}}
    else if(Date.now()-Date.parse(index.indexedAt)>86400000)ctx.waitUntil(refresh(env));
    return Response.json(index,{headers:{'Cache-Control':'public, max-age=60, must-revalidate','X-Search-Indexed-At':index.indexedAt}});
  }
};
