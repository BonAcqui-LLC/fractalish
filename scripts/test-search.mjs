import assert from 'node:assert/strict';
import fs from 'node:fs';
import {prepare, search, parse} from '../assets/search-engine.mjs';
const docs=prepare([
  {url:'/a',title:'Natural Math',headings:'Integer morphology',text:'Cognitive basin preserves natural math. MCVA.'},
  {url:'/b',title:'Quantum',headings:'Archive',text:'Natural beautiful math and morphological AMCVA.'},
  {url:'/c',title:'MCVA',headings:'Methods',text:'Natural math. Quantum archive.'},
  {url:'/d',title:'Other',headings:'',text:'mathematics basin'}
]);
const urls=q=>search(docs,q).map(x=>x.url).sort();
assert.deepEqual(urls('natural math'),['/a','/b','/c']);
assert.deepEqual(urls('"natural math"'),['/a','/c']);
assert.deepEqual(urls('(MCVA OR AMCVA) NOT quantum'),['/a']);
assert.deepEqual(urls('MCVA OR AMCVA AND quantum'),['/a','/b','/c']);
assert.deepEqual(urls('MCVA -quantum'),['/a']);
assert.deepEqual(urls('morph*'),['/a','/b']);
assert.deepEqual(urls('math'),['/a','/b','/c']);
assert.deepEqual(urls('NOT (MCVA OR AMCVA)'),['/d']);
assert.deepEqual(urls('NOT NOT MCVA'),['/a','/c']);
assert.deepEqual(urls('MCVA | AMCVA'),['/a','/b','/c']);
assert.deepEqual(urls('nonexistent'),[]);
assert.equal(search(docs,'"natural math"')[0].url,'/a');
for(const q of ['"unclosed','(MCVA','MCVA)','MCVA AND','OR MCVA','()','*','mo*rph','""','MCVA OR OR math','x'.repeat(501)]) assert.throws(()=>parse(q),q);
const real=prepare(JSON.parse(fs.readFileSync(new URL('../assets/search-index.json',import.meta.url))).documents);
for(const [q,path] of [['"authority compiler"','/research/authority-compiler/'],['"persistent observer"','/persistent-observer'],['"natural math"','/natural-math']]) {
  const results=search(real,q);
  assert.ok(results.slice(0,5).some(d=>d.url===path),`${q}: expected relevant page in top 5`);
  console.log(q,results.slice(0,3).map(d=>d.url));
}
assert.equal(new Set(real.map(d=>d.url)).size,real.length);
assert.ok(real.every(d=>d.url.startsWith('/')&&!d.url.startsWith('//')));
console.log('PASS: Boolean precedence, exclusions, phrases, whole words, prefixes, malformed queries, ranking, and public index.');
