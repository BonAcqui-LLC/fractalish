import {prepare, search, parse, positiveTerms, words} from './search-engine.mjs';
const form = document.querySelector('#site-search');
const input = document.querySelector('#search-query');
const status = document.querySelector('#search-status');
const results = document.querySelector('#search-results');
const more = document.querySelector('#search-more');
let index, found = [], terms = [], shown = 0, request = 0;
function node(tag, text) { const el = document.createElement(tag); el.textContent = text; return el; }
function snippet(text) {
  const pattern = /[\p{L}\p{N}_]+/gu;
  const tokens = [...text.matchAll(pattern)];
  const normalized = tokens.map(t => words(t[0])[0]);
  const spans = [];
  for (let i=0; i<tokens.length; i++) for (const term of terms) {
    if (term.value.every((w,j) => term.prefix ? normalized[i+j]?.startsWith(w) : normalized[i+j] === w)) {
      const last=tokens[i+term.value.length-1];
      spans.push([tokens[i].index,last.index+last[0].length]);
    }
  }
  const start = Math.max(0,(spans[0]?.[0] || 0)-90), end = Math.min(text.length,start+360);
  const p=node('p',start ? '…' : ''); let at=start;
  for (const [a,b] of spans.sort((a,b)=>a[0]-b[0])) {
    if (a<at || b>end) continue;
    p.append(document.createTextNode(text.slice(at,a)),node('mark',text.slice(a,b))); at=b;
  }
  p.append(document.createTextNode(text.slice(at,end)+(end<text.length?'…':'')));
  return p;
}
function next() {
  for (const d of found.slice(shown,shown+20)) {
    const item=node('li',''), title=node('h2',''), link=node('a',d.title);
    link.href=d.url; title.append(link);
    item.append(title,node('small',d.url),snippet(d.text)); results.append(item);
  }
  shown=Math.min(shown+20,found.length); more.hidden=shown>=found.length;
  more.textContent=`Show more (${found.length-shown} remaining)`;
}
async function run() {
  const current=++request;
  results.replaceChildren(); more.hidden=true;
  const query=input.value.trim();
  if (!query) { status.textContent='Enter words or a Boolean expression to search.'; return; }
  try {
    const tree=parse(query); terms=positiveTerms(tree);
    status.textContent='Loading search…';
    if (!index) {
      const response=await fetch('/assets/search-index.json');
      if (!response.ok) throw Error('Search index could not load. Please try again.');
      index=prepare((await response.json()).documents);
    }
    if(current!==request) return;
    found=search(index,query); shown=0;
    status.textContent=`${found.length} ${found.length===1?'result':'results'} across ${index.length} public pages.${found.length ? ' Ordered by keyword relevance.' : ' Try fewer terms, OR, or a prefix such as morph*. Your query has not been broadened.'}`;
    next();
  } catch(error) { if(current===request) status.textContent=error.message; }
}
form.addEventListener('submit',event=>{
  event.preventDefault(); const url=new URL(location.href);
  if(input.value.trim()) url.searchParams.set('q',input.value.trim()); else url.searchParams.delete('q');
  history.pushState({},'',url); run();
});
window.addEventListener('popstate',()=>{input.value=new URLSearchParams(location.search).get('q')||'';run();});
more.addEventListener('click',next);
input.value=new URLSearchParams(location.search).get('q')||''; run();
