(() => {
  if (window.__siteAiWidgetLoaded) return;
  window.__siteAiWidgetLoaded = true;
  const siteName = document.currentScript?.dataset.siteName || document.title.split("|")[0].trim() || "this site";
  const style = document.createElement("style");
  style.textContent = `
    #site-ai-button{position:fixed;right:22px;bottom:22px;z-index:2147483000;width:54px;height:54px;border:0;border-radius:50%;background:#182338;color:#fff;box-shadow:0 16px 38px rgba(0,0,0,.28);font:700 20px/1 system-ui;cursor:pointer}
    #site-ai-panel{position:fixed;right:22px;bottom:88px;z-index:2147483000;width:min(360px,calc(100vw - 28px));height:min(510px,calc(100vh - 120px));display:none;grid-template-rows:auto 1fr auto;background:#fff;color:#1d2430;border:1px solid rgba(20,30,40,.14);border-radius:16px;box-shadow:0 22px 60px rgba(0,0,0,.24);overflow:hidden;font:14px/1.45 system-ui,-apple-system,Segoe UI,sans-serif}
    #site-ai-panel[data-open="true"]{display:grid}
    #site-ai-head{display:flex;align-items:center;justify-content:space-between;background:#182338;color:#fff;padding:14px 16px;font-weight:700}
    #site-ai-close{border:0;background:transparent;color:#fff;font-size:24px;line-height:1;cursor:pointer}
    #site-ai-log{padding:14px;overflow:auto;background:#fafafa}
    .site-ai-msg{max-width:86%;margin:0 0 10px;padding:10px 12px;border-radius:14px;background:#eceff3;white-space:pre-wrap}
    .site-ai-user{margin-left:auto;background:#182338;color:#fff}
    #site-ai-form{display:flex;gap:8px;padding:12px;border-top:1px solid #e7e9ee;background:#fff}
    #site-ai-input{flex:1;min-width:0;border:1px solid #d7dce4;border-radius:10px;padding:10px;font:inherit}
    #site-ai-send{border:0;border-radius:10px;background:#182338;color:#fff;padding:0 14px;font-weight:700;cursor:pointer}
    @media (max-width:520px){#site-ai-button{right:14px;bottom:14px}#site-ai-panel{right:14px;bottom:78px}}
  `;
  document.head.appendChild(style);
  const panel = document.createElement("section");
  panel.id = "site-ai-panel";
  panel.setAttribute("aria-label", `Ask about ${siteName}`);
  panel.innerHTML = `
    <div id="site-ai-head"><span>Ask about ${siteName}</span><button id="site-ai-close" aria-label="Close">x</button></div>
    <div id="site-ai-log"><div class="site-ai-msg">Hi. I can answer questions about this site and point you toward what it covers.</div></div>
    <form id="site-ai-form"><input id="site-ai-input" autocomplete="off" placeholder="Ask anything..." /><button id="site-ai-send">Send</button></form>
  `;
  const button = document.createElement("button");
  button.id = "site-ai-button";
  button.type = "button";
  button.setAttribute("aria-label", `Ask about ${siteName}`);
  button.textContent = "...";
  document.body.append(panel, button);
  const log = panel.querySelector("#site-ai-log");
  const input = panel.querySelector("#site-ai-input");
  const history = [];
  function add(text, who) {
    const node = document.createElement("div");
    node.className = "site-ai-msg" + (who === "user" ? " site-ai-user" : "");
    node.textContent = text;
    log.appendChild(node);
    log.scrollTop = log.scrollHeight;
  }
  button.addEventListener("click", () => {
    panel.dataset.open = panel.dataset.open === "true" ? "false" : "true";
    if (panel.dataset.open === "true") input.focus();
  });
  panel.querySelector("#site-ai-close").addEventListener("click", () => panel.dataset.open = "false");
  panel.querySelector("#site-ai-form").addEventListener("submit", async (event) => {
    event.preventDefault();
    const text = input.value.trim();
    if (!text) return;
    input.value = "";
    add(text, "user");
    history.push({ role: "user", content: text });
    add("Thinking...", "assistant");
    try {
      const res = await fetch("/api/site-chat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ messages: history.slice(-8) }),
      });
      const data = await res.json();
      const reply = data.reply || data.error || "I had trouble generating a response. Try again.";
      log.lastChild.textContent = reply;
      history.push({ role: "assistant", content: reply });
    } catch {
      log.lastChild.textContent = "I could not reach the site assistant just now.";
    }
  });
})();
