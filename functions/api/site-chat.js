const AI_MODELS = [
  "@cf/meta/llama-4-scout-17b-16e-instruct",
  "@cf/meta/llama-3.1-8b-instruct-fast",
];

const SYSTEM_PROMPT =
  "You are a helpful assistant for Fractalish (fractalish.com), a public research site about Natural Math, MCVA, CNTM, form, pattern, classification, and exploratory mathematical tools. Keep claims bounded, distinguish prototypes from established results, and answer in 2-4 clear sentences unless asked for more.";

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
      "access-control-allow-origin": "*",
      "access-control-allow-methods": "POST, OPTIONS",
      "access-control-allow-headers": "content-type",
    },
  });
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

async function runSiteAi(env, payload) {
  let lastError;
  for (const model of AI_MODELS) {
    try {
      const result = await env.AI.run(model, payload);
      if (extractAiReply(result)) return result;
      lastError = new Error(`No text returned from ${model}`);
    } catch (err) {
      lastError = err;
    }
  }
  throw lastError;
}

export async function onRequestOptions() {
  return json({ ok: true });
}

export async function onRequestPost(context) {
  let body;
  try {
    body = await context.request.json();
  } catch {
    return json({ error: "Invalid JSON" }, 400);
  }
  const messages = Array.isArray(body.messages) ? body.messages.slice(-8) : [];
  const lastUser = [...messages].reverse().find((msg) => msg && msg.role === "user");
  if (!lastUser || !String(lastUser.content || "").trim()) {
    return json({ error: "Message is required" }, 400);
  }
  try {
    const result = await runSiteAi(context.env, {
      messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
      max_tokens: 350,
    });
    return json({ reply: extractAiReply(result) });
  } catch (err) {
    return json({ error: `AI unavailable: ${err.message}` }, 503);
  }
}

export function onRequest() {
  return json({ error: "Method not allowed" }, 405);
}
