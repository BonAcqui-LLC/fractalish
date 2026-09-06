"""Index public HTML only; never traverse the surrounding research workspace."""
from pathlib import Path
from html.parser import HTMLParser
import json, re, sys
ROOT = Path(__file__).resolve().parent.parent
class Page(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.stack=[]; self.title=[]; self.headings=[]; self.body=[]; self.canonical=None; self.skip=False
    def handle_starttag(self, tag, attrs):
        a=dict(attrs)
        if tag == 'link' and a.get('rel') == 'canonical': self.canonical=a.get('href')
        if tag == 'meta' and (a.get('http-equiv','').lower() == 'refresh' or (a.get('name')=='robots' and 'noindex' in a.get('content',''))): self.skip=True
        if tag not in ['area','base','br','col','embed','hr','img','input','link','meta','param','source','track','wbr']: self.stack.append(tag)
    def handle_endtag(self, tag):
        if tag in self.stack: self.stack=self.stack[:len(self.stack)-1-self.stack[::-1].index(tag)]
    def handle_data(self, data):
        if any(t in self.stack for t in ['script','style','nav','noscript']): return
        if 'main' not in self.stack and any(t in self.stack for t in ['header','footer']): return
        if 'title' in self.stack: self.title.append(data)
        if 'main' in self.stack:
            self.body.append(data)
            if any(t in self.stack for t in ['h1','h2','h3','h4']): self.headings.append(data)
def clean(parts): return re.sub(r'\s+', ' ', ' '.join(parts)).strip()
docs={}
for file in sorted(ROOT.rglob('*.html')):
    rel=file.relative_to(ROOT)
    if any(p.startswith('.') or p in ['node_modules','_partials','live-verification'] for p in rel.parts): continue
    p=Page(); p.feed(file.read_text(encoding='utf-8-sig'))
    if p.skip or not p.body or rel.as_posix() in ['search.html','404.html']: continue
    url=p.canonical or ('https://fractalish.com/'+rel.as_posix())
    if not url.startswith('https://fractalish.com/'): continue
    url=url.removeprefix('https://fractalish.com')
    if url in docs: continue
    docs[url]=dict(url=url,title=clean(p.title),headings=clean(p.headings),text=clean(p.body))
output=json.dumps({'version':1,'documents':list(docs.values())},ensure_ascii=False,separators=(',',':'))+'\n'
target=ROOT/'assets/search-index.json'
if '--check' in sys.argv:
    if not target.exists() or target.read_text(encoding='utf-8') != output: raise SystemExit('Search index is stale: run python scripts/build-search-index.py')
else: target.write_text(output,encoding='utf-8',newline='\n')
print(f'Search index: {len(docs)} public pages, {len(output.encode())} bytes')
routes=sorted('/'+p.relative_to(ROOT).as_posix() for p in ROOT.rglob('*.html') if not any(x.startswith('.') or x in ['node_modules','_partials','live-verification'] for x in p.relative_to(ROOT).parts))
manifest=json.dumps(routes,indent=2)+'\n'
for target in [ROOT/'assets/search-routes.json',ROOT/'services/search-worker/routes.json']:
    if '--check' in sys.argv:
        if not target.exists() or target.read_text(encoding='utf-8') != manifest: raise SystemExit('Search route inventory is stale: run python scripts/build-search-index.py')
    else: target.write_text(manifest,encoding='utf-8',newline='\n')
