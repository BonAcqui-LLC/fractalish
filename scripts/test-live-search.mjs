import fs from 'node:fs';
import assert from 'node:assert/strict';
import {prepare,search} from '../assets/search-engine.mjs';
// Isolate the coordinator from the Cloudflare runtime; extraction is checked against live HTML separately.
const inventory=JSON.parse(fs.readFileSync(new URL('../services/search-worker/routes.json',import.meta.url)));
assert.ok(fs.readFileSync(new URL('../services/search-worker/wrangler.toml',import.meta.url),'utf8').includes('"global_fetch_strictly_public"'),'The crawler must fetch public Worker overlays, not bypass them for origin HTML');
const source=fs.readFileSync(new URL('../services/search-worker/worker.mjs',import.meta.url),'utf8')
  .replace("import inventory from './routes.json';",`const inventory=${JSON.stringify(inventory)};`)
  .replace("import { WorkerEntrypoint } from 'cloudflare:workers';",'class WorkerEntrypoint {}');
const worker=await import('data:text/javascript;base64,'+Buffer.from(source).toString('base64'));
const originalFetch=globalThis.fetch;
globalThis.fetch=async url=>String(url).includes('search-routes.json')?new Response('',{status:404}):new Response('<urlset></urlset>');
const store=new Map([['index','previous-good-index']]);
const env={SEARCH_INDEX:{put:async(k,v)=>store.set(k,v)},PAGE_FETCHER:{batch:async paths=>paths.map(path=>({path,page:{title:path,text:'Complete body including introduction.',headings:'Heading',links:path==='/'?['/discovered-at-tail']:[],sources:[]}}))}};
try {
  const built=await worker.build(env);
  assert.ok(built.documents.some(d=>d.url==='/discovered-at-tail'),'New links in the final partial batch must be crawled');
  assert.equal(built.coverage.length,new Set(built.coverage.map(x=>x.path)).size);
  assert.ok(inventory.every(path=>built.coverage.some(x=>x.path===path)),'Every inventory file needs a disposition');
  env.PAGE_FETCHER.batch=async()=>{throw Error('Simulated missing deployment page');};
  await assert.rejects(()=>worker.default.scheduled({},env),/missing deployment page/);
  assert.equal(store.get('index'),'previous-good-index','A failed crawl must not replace the index');
  assert.equal(JSON.parse(store.get('status')).previousIndexPreserved,true);
} finally {globalThis.fetch=originalFetch;}
if(process.argv[2]){
  const live=JSON.parse(fs.readFileSync(process.argv[2]));
  const docs=prepare(live.documents);
  assert.ok(inventory.every(path=>live.coverage.some(x=>x.path===path)));
  for(const path of ['/scientific-neighbors','/research/authority-compiler/'])assert.ok(search(docs,'marr').some(d=>d.url===path),`marr must find ${path}`);
  assert.ok(docs.some(d=>d.url==='/ageometrics'),'Canonical redirect must not discard Ageometrics');
  assert.ok(docs.find(d=>d.url==='/scientific-neighbors').text.includes('Related work, overlap, and differences.'),'Article header must be indexed');
  console.log(`Live regression: ${docs.length} pages, ${live.coverage.length} routes; both Marr results present.`);
}
console.log('PASS: complete inventory, discovered links, partial batches, and failed-crawl preservation.');
