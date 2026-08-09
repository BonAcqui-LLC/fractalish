const AI_MODELS = [
  "@cf/meta/llama-4-scout-17b-16e-instruct",
  "@cf/meta/llama-3.1-8b-instruct-fast",
];

const MAX_BODY_BYTES = 12_000;
const MAX_MESSAGES = 8;
const MAX_MESSAGE_CHARS = 1_200;
const MAX_TOTAL_CHARS = 4_000;
const RATE_WINDOW_MS = 60_000;
const RATE_LIMIT = 12;
const REQUEST_TIMEOUT_MS = 18_000;
const APPROVED_ORIGINS = new Set([
  "https://fractalish.com",
  "https://www.fractalish.com",
  "http://localhost:8788",
  "http://localhost:8891",
  "http://127.0.0.1:8788",
  "http://127.0.0.1:8891",
]);
const buckets = new Map();

const SYSTEM_PROMPT = [
  "You are a bounded site assistant for Fractalish (fractalish.com).",
  "Answer from the provided page/site context when it is relevant, and say when the site does not establish something.",
  "Do not upgrade SPECIFICATION, HOLD, PROPOSED, EXTERNAL REPORTED RESULT, negative result, or not-yet-run protocol language into demonstrated fact.",
  "Distinguish Fractalish site claims from general background knowledge.",
  "Preserve negative results and explicit non-claims.",
  "Point users toward relevant Fractalish pages when helpful.",
  "Answer in 2-4 clear sentences unless asked for more.",
].join(" ");

const CURATED_SITE_CONTEXT = [
  "Fractalish frames form as accumulated consequence and treats geometry as one way of measuring the receipt.",
  "The public Constitution is at /constitution and CONSTITUTION.md v0.1 dated 2026-08-09.",
  "The site uses explicit evidence/status boundaries including VERIFIED / FROZEN, BUILT AND LOCALLY VALIDATED, SPECIFICATION, PROPOSED INTEGRATION, EXTERNAL REPORTED RESULT, HOLD, and negative results.",
  "No current release claims that the full Natural Math–UFWK–Cognitive Basin–Bolt-On pipeline is demonstrated end to end inside a production language-model service.",
  "Relevant pages include /framework, /documents, /persistent-observer, /natural-math, /cognitive-basin, /bolt-on, /mathematical-bindings, /status, and /review.",
].join("\n");

function isAllowedOrigin(origin) {
  if (!origin) return true;
  if (APPROVED_ORIGINS.has(origin)) return true;
  try {
    const url = new URL(origin);
    return url.protocol === "https:" && url.hostname.endsWith(".fractalish.pages.dev");
  } catch {
    return false;
  }
}

function responseHeaders(request, contentType = "application/json; charset=utf-8") {
  const origin = request.headers.get("origin");
  const headers = {
    "content-type": contentType,
    "cache-control": "no-store",
    "x-content-type-options": "nosniff",
    "vary": "Origin",
  };
  if (origin && isAllowedOrigin(origin)) {
    headers["access-control-allow-origin"] = origin;
    headers["access-control-allow-methods"] = "POST, OPTIONS";
    headers["access-control-allow-headers"] = "content-type";
    headers["access-control-max-age"] = "600";
  }
  return headers;
}

function json(request, data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: responseHeaders(request),
  });
}

function clientKey(context) {
  const request = context.request;
  const ip =
    request.headers.get("cf-connecting-ip") ||
    request.headers.get("x-forwarded-for") ||
    "unknown";
  const origin = request.headers.get("origin") || "no-origin";
  return `${ip}|${origin}`;
}

function rateLimited(context) {
  const now = Date.now();
  const key = clientKey(context);
  const current = buckets.get(key) || { start: now, count: 0 };
  if (now - current.start > RATE_WINDOW_MS) {
    buckets.set(key, { start: now, count: 1 });
    return false;
  }
  current.count += 1;
  buckets.set(key, current);
  return current.count > RATE_LIMIT;
}

function extractAiReply(result) {
  return (
    result?.response ||
    result?.result?.response ||
    result?.text ||
    result?.result?.text ||
    result?.output_text ||
    ""
  ).trim();
}

async function runWithTimeout(promise, ms) {
  let timeout;
  const timer = new Promise((_, reject) => {
    timeout = setTimeout(() => reject(new Error("AI request timed out")), ms);
  });
  try {
    return await Promise.race([promise, timer]);
  } finally {
    clearTimeout(timeout);
  }
}

async function runSiteAi(env, payload) {
  let lastError;
  for (const model of AI_MODELS) {
    try {
      const result = await runWithTimeout(env.AI.run(model, payload), REQUEST_TIMEOUT_MS);
      if (extractAiReply(result)) return result;
      lastError = new Error(`No text returned from ${model}`);
    } catch (err) {
      lastError = err;
    }
  }
  throw lastError;
}

function normalizeMessages(value) {
  const input = Array.isArray(value) ? value.slice(-MAX_MESSAGES) : [];
  const messages = [];
  let total = 0;
  for (const item of input) {
    const role = item?.role === "assistant" ? "assistant" : item?.role === "user" ? "user" : null;
    const content = String(item?.content || "").trim();
    if (!role || !content) continue;
    const clipped = content.slice(0, MAX_MESSAGE_CHARS);
    total += clipped.length;
    if (total > MAX_TOTAL_CHARS) break;
    messages.push({ role, content: clipped });
  }
  return messages;
}

function pageContext(body) {
  const page = body && typeof body.page === "object" ? body.page : {};
  const fields = [
    ["URL", page.url],
    ["Title", page.title],
    ["Description", page.description],
    ["Visible headings", Array.isArray(page.headings) ? page.headings.slice(0, 8).join(" | ") : ""],
  ]
    .map(([label, value]) => {
      const text = String(value || "").replace(/\s+/g, " ").trim().slice(0, 700);
      return text ? `${label}: ${text}` : "";
    })
    .filter(Boolean)
    .join("\n");
  return fields || "No current-page context supplied.";
}

export async function onRequestOptions(context) {
  const origin = context.request.headers.get("origin");
  if (!isAllowedOrigin(origin)) {
    return new Response(null, {
      status: 403,
      headers: {
        "cache-control": "no-store",
        "vary": "Origin",
        "x-content-type-options": "nosniff",
      },
    });
  }
  return new Response(null, { status: 204, headers: responseHeaders(context.request) });
}

export async function onRequestPost(context) {
  const request = context.request;
  const origin = request.headers.get("origin");
  if (!isAllowedOrigin(origin)) {
    return json(request, { error: "Origin not allowed" }, 403);
  }
  if (rateLimited(context)) {
    return json(request, { error: "Too many requests. Please wait and try again." }, 429);
  }
  const contentType = request.headers.get("content-type") || "";
  if (!contentType.toLowerCase().includes("application/json")) {
    return json(request, { error: "Content-Type must be application/json" }, 415);
  }
  const declaredLength = Number(request.headers.get("content-length") || 0);
  if (declaredLength > MAX_BODY_BYTES) {
    return json(request, { error: "Request too large" }, 413);
  }

  let text;
  try {
    text = await request.text();
  } catch {
    return json(request, { error: "Could not read request body" }, 400);
  }
  if (text.length > MAX_BODY_BYTES) {
    return json(request, { error: "Request too large" }, 413);
  }

  let body;
  try {
    body = JSON.parse(text);
  } catch {
    return json(request, { error: "Invalid JSON" }, 400);
  }

  const messages = normalizeMessages(body.messages);
  const lastUser = [...messages].reverse().find((msg) => msg.role === "user");
  if (!lastUser) {
    return json(request, { error: "Message is required" }, 400);
  }

  try {
    const result = await runSiteAi(context.env, {
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        {
          role: "system",
          content: `Curated site context:\n${CURATED_SITE_CONTEXT}\n\nCurrent page context:\n${pageContext(body)}`,
        },
        ...messages,
      ],
      max_tokens: 350,
    });
    return json(request, { reply: extractAiReply(result) });
  } catch {
    return json(request, { error: "AI assistant is temporarily unavailable." }, 503);
  }
}

export function onRequest(context) {
  return json(context.request, { error: "Method not allowed" }, 405);
}
