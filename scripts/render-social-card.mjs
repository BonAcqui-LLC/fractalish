import path from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { chromium } = require("playwright");
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const output = path.join(root, "assets", "figures", "cf-social-card.png");
const browser = await chromium.launch({ channel: "chrome", headless: true });
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
await page.setContent(`<!doctype html>
<html><head><meta charset="utf-8"><style>
*{box-sizing:border-box}html,body{margin:0;width:1200px;height:630px;background:#06090d;color:#f3f7f2;font-family:Arial,sans-serif}main{position:relative;width:100%;height:100%;padding:58px 68px;border:1px solid #24313a;overflow:hidden}.rule{width:86px;height:6px;background:#7cff6b;margin-bottom:34px}.brand{position:absolute;right:68px;top:58px;color:#aeb9c3;font-size:24px;font-weight:700}.brand b{color:#7cff6b}h1{margin:0;max-width:900px;font-family:Georgia,serif;font-size:72px;line-height:1.02;letter-spacing:0}.lede{margin:22px 0 42px;max-width:850px;color:#c8d3da;font-size:25px;line-height:1.35}.chain{display:grid;grid-template-columns:1fr 38px 1fr 38px 1fr 38px 1fr;align-items:stretch}.stage{min-height:116px;padding:18px 16px;border:1px solid #43515a;background:#0d141a;display:flex;flex-direction:column;justify-content:space-between}.stage span{color:#9dd7ff;font-size:13px;font-weight:700;text-transform:uppercase}.stage strong{font-size:21px;line-height:1.2}.arrow{display:grid;place-items:center;color:#7cff6b;font-size:28px}.foot{position:absolute;left:68px;bottom:26px;color:#8998a3;font-size:14px}</style></head><body><main>
<div class="rule"></div><div class="brand">Fractalish<b>.</b></div>
<h1>Consequential Formation</h1>
<p class="lede">How what happens leaves a difference, and how that difference changes what can happen next.</p>
<div class="chain"><div class="stage"><span>01</span><strong>Change</strong></div><div class="arrow">&#8594;</div><div class="stage"><span>02</span><strong>Retained consequence</strong></div><div class="arrow">&#8594;</div><div class="stage"><span>03</span><strong>Altered constraint</strong></div><div class="arrow">&#8594;</div><div class="stage"><span>04</span><strong>Changed future possibilities</strong></div></div>
<div class="foot">Framework, method, projects, and evidence kept in explicit relation.</div>
</main></body></html>`);
await page.screenshot({ path: output, type: "png" });
await browser.close();
console.log(output);
