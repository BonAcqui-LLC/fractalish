function timestampToSeconds(value) {
  const parts = value.trim().split(":").map(Number);
  if (!parts.length || parts.some(Number.isNaN)) {
    return 0;
  }
  return parts.reduce((total, part) => (total * 60) + part, 0);
}

function parseTimedSubtitleText(rawText) {
  return rawText
    .replace(/\u00c2/g, "")
    .split(/\r?\n\r?\n+/)
    .map((block) => block.trim())
    .filter(Boolean)
    .map((block) => {
      const lines = block.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
      const time = lines.shift() || "00:00:00";
      return {
        time,
        seconds: timestampToSeconds(time),
        text: lines.join(" ").replace(/\s+/g, " ").trim(),
      };
    })
    .filter((item) => item.text);
}

function renderSubtitlePanel(panel, entries) {
  const list = panel.querySelector("[data-subtitle-list]");
  const empty = panel.querySelector("[data-subtitle-empty]");
  const videoUrl = panel.getAttribute("data-video-url") || "";

  list.replaceChildren();

  for (const entry of entries) {
    const item = document.createElement("li");
    item.className = "subtitle-item";
    item.dataset.search = `${entry.time} ${entry.text}`.toLowerCase();

    const time = document.createElement("a");
    time.className = "subtitle-time";
    time.href = `${videoUrl}${videoUrl.includes("?") ? "&" : "?"}t=${entry.seconds}s`;
    time.target = "_blank";
    time.rel = "noreferrer noopener";
    time.textContent = entry.time;

    const text = document.createElement("span");
    text.className = "subtitle-text";
    text.textContent = entry.text;

    item.append(time, text);
    list.appendChild(item);
  }

  empty.classList.toggle("hide", entries.length > 0);
}

async function bootSubtitlePanels() {
  const panels = Array.from(document.querySelectorAll("[data-subtitle-source]"));

  await Promise.all(
    panels.map(async (panel) => {
      const status = panel.querySelector("[data-subtitle-status]");
      const input = panel.querySelector("[data-subtitle-search]");

      try {
        const response = await fetch(panel.getAttribute("data-subtitle-source"));
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        const entries = parseTimedSubtitleText(await response.text());
        panel._subtitleEntries = entries;
        renderSubtitlePanel(panel, entries);

        if (status) {
          status.textContent = `${entries.length} subtitle cues loaded.`;
        }

        if (input) {
          input.addEventListener("input", () => {
            const query = input.value.trim().toLowerCase();
            const filtered = !query
              ? panel._subtitleEntries
              : panel._subtitleEntries.filter((entry) =>
                  `${entry.time} ${entry.text}`.toLowerCase().includes(query)
                );
            renderSubtitlePanel(panel, filtered);
            if (status) {
              status.textContent = `${filtered.length} subtitle cues shown.`;
            }
          });
        }
      } catch (error) {
        if (status) {
          status.textContent = `Subtitle panel unavailable: ${error.message}`;
        }
      }
    })
  );
}

function getLightboxCaption(image) {
  const figure = image.closest("figure");
  const caption = figure?.querySelector("figcaption")?.textContent?.trim();
  return caption || image.alt || "Fractalish visual";
}

function shouldLightboxImage(image) {
  const src = image.getAttribute("src") || "";
  return Boolean(
    src.includes("/assets/figures/") ||
    image.closest(".image-frame, .feature-figure, .atlas-image")
  );
}

function buildLightbox() {
  const lightbox = document.createElement("div");
  lightbox.className = "image-lightbox";
  lightbox.setAttribute("role", "dialog");
  lightbox.setAttribute("aria-modal", "true");
  lightbox.setAttribute("aria-label", "Expanded visual");
  lightbox.setAttribute("hidden", "");
  const close = document.createElement("button");
  close.className = "image-lightbox__close";
  close.type = "button";
  close.setAttribute("aria-label", "Close enlarged image");
  close.textContent = "Close";
  const stage = document.createElement("div");
  stage.className = "image-lightbox__stage";
  stage.setAttribute("role", "document");
  const image = document.createElement("img");
  image.className = "image-lightbox__image";
  image.alt = "";
  const caption = document.createElement("p");
  caption.className = "image-lightbox__caption";
  stage.append(image, caption);
  lightbox.append(close, stage);
  document.body.appendChild(lightbox);
  return lightbox;
}

function initImageLightbox() {
  const images = Array.from(document.querySelectorAll("main img")).filter(shouldLightboxImage);
  if (!images.length) {
    return;
  }

  const lightbox = buildLightbox();
  const lightboxImage = lightbox.querySelector(".image-lightbox__image");
  const lightboxCaption = lightbox.querySelector(".image-lightbox__caption");
  const closeButton = lightbox.querySelector(".image-lightbox__close");
  let lastTrigger = null;

  const close = () => {
    lightbox.setAttribute("hidden", "");
    document.documentElement.classList.remove("has-image-lightbox");
    if (lastTrigger) {
      lastTrigger.focus({ preventScroll: true });
    }
  };

  const open = (image, trigger) => {
    lastTrigger = trigger;
    lightboxImage.src = image.currentSrc || image.src;
    lightboxImage.alt = image.alt || "";
    lightboxCaption.textContent = getLightboxCaption(image);
    lightbox.removeAttribute("hidden");
    document.documentElement.classList.add("has-image-lightbox");
    closeButton.focus({ preventScroll: true });
  };

  images.forEach((image) => {
    const frame = image.closest(".image-frame, .feature-figure, .atlas-image") || image;
    if (frame.dataset.lightboxReady === "true") {
      return;
    }
    frame.dataset.lightboxReady = "true";
    frame.classList.add("is-zoomable");
    frame.setAttribute("role", "button");
    frame.setAttribute("tabindex", "0");
    frame.setAttribute("aria-label", `Enlarge image: ${getLightboxCaption(image)}`);

    const hint = document.createElement("span");
    hint.className = "image-zoom-hint";
    hint.textContent = "Click to enlarge";
    if (frame !== image) {
      frame.appendChild(hint);
    }

    frame.addEventListener("click", () => open(image, frame));
    frame.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        open(image, frame);
      }
    });
  });

  closeButton.addEventListener("click", close);
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
      close();
    }
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !lightbox.hasAttribute("hidden")) {
      close();
    }
  });
}

function initMobileNav() {
  const toggle = document.querySelector("[data-nav-toggle]");
  const links = document.querySelector("[data-nav-links]");
  if (!toggle || !links) return;

  const setOpen = (open) => {
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    links.classList.toggle("is-open", open);
    document.documentElement.classList.toggle("nav-open", open);
  };

  toggle.addEventListener("click", () => {
    const open = toggle.getAttribute("aria-expanded") !== "true";
    setOpen(open);
  });

  links.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => setOpen(false));
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setOpen(false);
  });

  window.addEventListener("resize", () => {
    if (window.matchMedia("(min-width: 900px)").matches) setOpen(false);
  });
}

function initDocCollapsibles() {
  document.querySelectorAll("[data-doc-collapse]").forEach((section) => {
    const btn = section.querySelector("[data-doc-collapse-toggle]");
    const panel = section.querySelector("[data-doc-collapse-panel]");
    if (!btn || !panel) return;
    btn.addEventListener("click", () => {
      const open = btn.getAttribute("aria-expanded") !== "true";
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      panel.hidden = !open;
      section.classList.toggle("is-collapsed", !open);
    });
  });
}

function badgeClass(value) {
  const normalized = (value || "").toUpperCase();
  if (
    normalized.includes("VERIFIED") ||
    normalized.includes("FROZEN") ||
    normalized.includes("ESTABLISHED")
  ) {
    return "is-frozen";
  }
  if (
    normalized.includes("LOCALLY VALIDATED") ||
    normalized.includes("IMPLEMENTED") ||
    normalized.includes("CODE-PRESENT")
  ) {
    return "is-local";
  }
  if (
    normalized.includes("SPECIFICATION") ||
    normalized.includes("PROPOSED") ||
    normalized.includes("DEFERRED")
  ) {
    return "is-spec";
  }
  if (normalized.includes("EXTERNAL")) {
    return "is-external";
  }
  if (normalized.includes("NEGATIVE")) {
    return "is-negative";
  }
  if (normalized.includes("UNRESOLVED") || normalized.includes("NOT ESTABLISHED")) {
    return "is-unresolved";
  }
  return "";
}

function appendText(parent, tag, text, className) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  node.textContent = text || "";
  parent.appendChild(node);
  return node;
}

function appendStrongLine(parent, label, value) {
  const p = document.createElement("p");
  const strong = document.createElement("strong");
  strong.textContent = label;
  p.append(strong, " ", value || "");
  parent.appendChild(p);
}

function appendBadge(parent, value) {
  const badge = document.createElement("span");
  badge.className = `status-badge ${badgeClass(value)}`.trim();
  badge.textContent = value || "";
  parent.appendChild(badge);
}

function appendBindingCard(list, binding) {
  const source = binding.source || {};
  const evidence = Array.isArray(binding.evidence) ? binding.evidence.join("; ") : "";

  const article = document.createElement("article");
  article.className = "binding-card";
  const header = document.createElement("div");
  header.className = "binding-header";
  const titleWrap = document.createElement("div");
  appendText(titleWrap, "p", `${binding.binding_id || ""} / ${binding.claim_id || ""}`, "eyebrow");
  appendText(titleWrap, "h3", binding.name || "Untitled binding");
  const strip = document.createElement("div");
  strip.className = "status-strip";
  appendBadge(strip, binding.status);
  appendBadge(strip, binding.representation_layer);
  header.append(titleWrap, strip);

  const tags = document.createElement("div");
  tags.className = "binding-tags";
  appendText(tags, "span", binding.family, "binding-tag");
  appendText(tags, "span", binding.category, "binding-tag");

  const formula = document.createElement("div");
  formula.className = "binding-formula";
  appendText(formula, "code", binding.original_statement || "Original statement not published in this record.", "code-line");
  appendText(formula, "code", binding.normalized_representation || "Normalized representation not published in this record.", "code-line");

  const columns = document.createElement("div");
  columns.className = "binding-columns";
  const left = document.createElement("div");
  left.className = "binding-meta";
  appendStrongLine(left, "Definitions:", binding.definitions);
  appendStrongLine(left, "Input domain:", binding.input_domain);
  appendStrongLine(left, "Output domain:", binding.output_domain);
  appendStrongLine(left, "Implementation:", binding.implementation_status);
  appendStrongLine(left, "Implementation reference:", binding.implementation_ref);
  const right = document.createElement("div");
  right.className = "binding-meta";
  appendStrongLine(right, "Evidence IDs:", evidence || "No public evidence identifier listed.");
  appendStrongLine(right, "Public-safe source ID:", binding.public_safe_source_id || "No public-safe source ID listed.");
  appendStrongLine(right, "Next required evidence:", binding.next_required_evidence || "Not specified in this public ledger.");
  appendStrongLine(right, "Exact result:", binding.result);
  appendStrongLine(right, "Negative result:", binding.negative_result);
  appendStrongLine(right, "Boundary:", binding.boundary);
  columns.append(left, right);

  const links = document.createElement("div");
  links.className = "binding-links";
  appendStrongLine(links, "Public source:", `${source.repository || ""} / ${source.path || ""}`);
  appendStrongLine(links, "SHA-256:", source.sha256);
  if (source.commit) appendStrongLine(links, "Commit / authority:", source.commit);
  if (source.repository_locator) {
    const link = document.createElement("a");
    link.href = source.repository_locator;
    link.textContent = "Open source lane";
    links.appendChild(link);
  }

  const summary = document.createElement("p");
  summary.textContent = binding.summary || "";
  article.append(header, tags, summary, formula, columns, links);
  list.appendChild(article);
}

async function initBindingsExplorer() {
  const root = document.querySelector("[data-bindings-explorer]");
  if (!root) return;

  const source = root.getAttribute("data-bindings-source");
  const summary = root.querySelector("[data-bindings-summary]");
  const list = root.querySelector("[data-bindings-list]");
  const searchInput = root.querySelector("[data-bindings-search]");
  const familySelect = root.querySelector("[data-bindings-family]");
  const statusSelect = root.querySelector("[data-bindings-status]");
  const layerSelect = root.querySelector("[data-bindings-layer]");

  try {
    const response = await fetch(source);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    const payload = await response.json();
    const bindings = payload.bindings || [];

    const families = [...new Set(bindings.map((item) => item.family).filter(Boolean))].sort();
    const statuses = [...new Set(bindings.map((item) => item.status).filter(Boolean))].sort();
    const layers = [...new Set(bindings.map((item) => item.representation_layer).filter(Boolean))].sort();

    const appendOption = (select, value) => {
      if (!select) return;
      const option = document.createElement("option");
      option.value = value;
      option.textContent = value;
      select.appendChild(option);
    };
    families.forEach((value) => appendOption(familySelect, value));
    statuses.forEach((value) => appendOption(statusSelect, value));
    layers.forEach((value) => appendOption(layerSelect, value));

    const render = () => {
      const query = (searchInput?.value || "").trim().toLowerCase();
      const family = familySelect?.value || "";
      const status = statusSelect?.value || "";
      const layer = layerSelect?.value || "";

      const filtered = bindings.filter((binding) => {
        const haystack = [
          binding.binding_id,
          binding.claim_id,
          binding.name,
          binding.aliases,
          binding.family,
          binding.category,
          binding.original_statement,
          binding.normalized_representation,
          binding.summary,
          binding.negative_result,
          binding.public_safe_source_id,
          binding.next_required_evidence,
        ]
          .join(" ")
          .toLowerCase();

        return (
          (!query || haystack.includes(query)) &&
          (!family || binding.family === family) &&
          (!status || binding.status === status) &&
          (!layer || binding.representation_layer === layer)
        );
      });

      if (summary) {
        summary.textContent = `${filtered.length} of ${bindings.length} bindings shown.`;
      }
      if (list) {
        list.replaceChildren();
        filtered.forEach((binding) => appendBindingCard(list, binding));
      }
    };

    [searchInput, familySelect, statusSelect, layerSelect].forEach((node) => {
      node?.addEventListener("input", render);
      node?.addEventListener("change", render);
    });

    render();
  } catch (error) {
    if (summary) {
      summary.textContent = `Bindings explorer unavailable: ${error.message}`;
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  initMobileNav();
  initDocCollapsibles();
  if (document.querySelector("[data-subtitle-source]")) {
    bootSubtitlePanels();
  }
  initImageLightbox();
  initBindingsExplorer();
});
