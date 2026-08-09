(() => {
  if (window.__siteAiWidgetLoaded) return;
  window.__siteAiWidgetLoaded = true;

  const siteName = document.currentScript?.dataset.siteName || document.title.split("|")[0].trim() || "this site";
  const style = document.createElement("style");
  style.textContent = `
    #site-ai-button{position:fixed;right:22px;bottom:22px;z-index:2147483000;width:54px;height:54px;border:0;border-radius:50%;background:#182338;color:#fff;box-shadow:0 16px 38px rgba(0,0,0,.28);font:700 20px/1 system-ui;cursor:pointer}
    #site-ai-panel{position:fixed;right:22px;bottom:88px;z-index:2147483000;width:min(360px,calc(100vw - 28px));height:min(560px,calc(100vh - 120px));display:none;grid-template-rows:auto 1fr auto;background:#fff;color:#1d2430;border:1px solid rgba(20,30,40,.14);border-radius:16px;box-shadow:0 22px 60px rgba(0,0,0,.24);overflow:hidden;font:14px/1.45 system-ui,-apple-system,Segoe UI,sans-serif}
    #site-ai-panel[data-open="true"]{display:grid}
    #site-ai-head{display:flex;align-items:center;justify-content:space-between;background:#182338;color:#fff;padding:14px 16px;font-weight:700}
    #site-ai-close{border:0;background:transparent;color:#fff;font-size:24px;line-height:1;cursor:pointer}
    #site-ai-log{padding:14px;overflow:auto;background:#fafafa}
    .site-ai-msg{max-width:86%;margin:0 0 10px;padding:10px 12px;border-radius:14px;background:#eceff3;white-space:pre-wrap}
    .site-ai-user{margin-left:auto;background:#182338;color:#fff}
    .site-ai-disclosure{margin:6px 0 0;color:#5f6b78;font-size:12px;line-height:1.35}
    #site-ai-form{display:flex;gap:8px;padding:12px;border-top:1px solid #e7e9ee;background:#fff}
    #site-ai-input{flex:1;min-width:0;border:1px solid #d7dce4;border-radius:10px;padding:10px;font:inherit}
    #site-ai-send{border:0;border-radius:10px;background:#182338;color:#fff;padding:0 14px;font-weight:700;cursor:pointer}
    @media (max-width:520px){#site-ai-button{right:14px;bottom:14px}#site-ai-panel{right:14px;bottom:78px}}
  `;
  document.head.appendChild(style);

  const panel = document.createElement("section");
  panel.id = "site-ai-panel";
  panel.setAttribute("aria-label", `Ask about ${siteName}`);

  const header = document.createElement("div");
  header.id = "site-ai-head";
  const heading = document.createElement("span");
  heading.textContent = `Ask about ${siteName}`;
  const close = document.createElement("button");
  close.id = "site-ai-close";
  close.type = "button";
  close.setAttribute("aria-label", "Close");
  close.textContent = "×";
  header.append(heading, close);

  const log = document.createElement("div");
  log.id = "site-ai-log";
  const greeting = document.createElement("div");
  greeting.className = "site-ai-msg";
  greeting.textContent = "Hi. I can answer questions about this site and point you toward what it covers.";
  const disclosure = document.createElement("p");
  disclosure.className = "site-ai-disclosure";
  disclosure.textContent =
    "Privacy note: messages you send here are sent through the Fractalish Cloudflare Pages AI endpoint for processing by Cloudflare Workers AI. Do not submit sensitive or private information. This widget does not provide a published retention guarantee.";
  log.append(greeting, disclosure);

  const form = document.createElement("form");
  form.id = "site-ai-form";
  const input = document.createElement("input");
  input.id = "site-ai-input";
  input.autocomplete = "off";
  input.placeholder = "Ask anything...";
  input.maxLength = 1200;
  const send = document.createElement("button");
  send.id = "site-ai-send";
  send.type = "submit";
  send.textContent = "Send";
  form.append(input, send);

  panel.append(header, log, form);

  const button = document.createElement("button");
  button.id = "site-ai-button";
  button.type = "button";
  button.setAttribute("aria-label", `Ask about ${siteName}`);
  button.textContent = "...";
  document.body.append(panel, button);

  const history = [];
  function add(text, who) {
    const node = document.createElement("div");
    node.className = "site-ai-msg" + (who === "user" ? " site-ai-user" : "");
    node.textContent = text;
    log.appendChild(node);
    log.scrollTop = log.scrollHeight;
    return node;
  }

  function pageContext() {
    const description = document.querySelector('meta[name="description"]')?.content || "";
    const headings = Array.from(document.querySelectorAll("main h1, main h2"))
      .map((node) => node.textContent.trim())
      .filter(Boolean)
      .slice(0, 8);
    return {
      url: location.pathname,
      title: document.title,
      description,
      headings,
    };
  }

  button.addEventListener("click", () => {
    panel.dataset.open = panel.dataset.open === "true" ? "false" : "true";
    if (panel.dataset.open === "true") input.focus();
  });
  close.addEventListener("click", () => {
    panel.dataset.open = "false";
  });
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const text = input.value.trim();
    if (!text) return;
    input.value = "";
    add(text, "user");
    history.push({ role: "user", content: text });
    const pending = add("Thinking...", "assistant");
    try {
      const res = await fetch("/api/site-chat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ messages: history.slice(-8), page: pageContext() }),
      });
      const data = await res.json().catch(() => ({}));
      const reply = data.reply || data.error || "I had trouble generating a response. Try again.";
      pending.textContent = reply;
      history.push({ role: "assistant", content: reply });
    } catch {
      pending.textContent = "I could not reach the site assistant just now.";
    }
  });
})();
