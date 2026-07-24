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

  list.innerHTML = "";

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
  lightbox.innerHTML = `
    <button class="image-lightbox__close" type="button" aria-label="Close enlarged image">Close</button>
    <div class="image-lightbox__stage" role="document">
      <img class="image-lightbox__image" alt="">
      <p class="image-lightbox__caption"></p>
    </div>
  `;
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

function renderBindingCard(binding) {
  const source = binding.source || {};
  const repoLink = source.repository_locator
    ? `<a href="${source.repository_locator}">Open source lane</a>`
    : "";
  const commit = source.commit ? `<strong>Commit / authority:</strong> ${source.commit}` : "";
  const evidence = Array.isArray(binding.evidence) ? binding.evidence.join("; ") : "";

  return `
    <article class="binding-card">
      <div class="binding-header">
        <div>
          <p class="eyebrow">${binding.binding_id} / ${binding.claim_id}</p>
          <h3>${binding.name}</h3>
        </div>
        <div class="status-strip">
          <span class="status-badge ${badgeClass(binding.status)}">${binding.status}</span>
          <span class="status-badge ${badgeClass(binding.representation_layer)}">${binding.representation_layer}</span>
        </div>
      </div>
      <div class="binding-tags">
        <span class="binding-tag">${binding.family}</span>
        <span class="binding-tag">${binding.category}</span>
      </div>
      <p>${binding.summary}</p>
      <div class="binding-formula">
        <code class="code-line">${binding.original_statement || "Original statement not published in this record."}</code>
        <code class="code-line">${binding.normalized_representation || "Normalized representation not published in this record."}</code>
      </div>
      <div class="binding-columns">
        <div class="binding-meta">
          <p><strong>Definitions:</strong> ${binding.definitions}</p>
          <p><strong>Input domain:</strong> ${binding.input_domain}</p>
          <p><strong>Output domain:</strong> ${binding.output_domain}</p>
          <p><strong>Implementation:</strong> ${binding.implementation_status}</p>
          <p><strong>Implementation reference:</strong> ${binding.implementation_ref}</p>
        </div>
        <div class="binding-meta">
          <p><strong>Evidence IDs:</strong> ${evidence || "No public evidence identifier listed."}</p>
          <p><strong>Public-safe source ID:</strong> ${binding.public_safe_source_id || "No public-safe source ID listed."}</p>
          <p><strong>Next required evidence:</strong> ${binding.next_required_evidence || "Not specified in this public ledger."}</p>
          <p><strong>Exact result:</strong> ${binding.result}</p>
          <p><strong>Negative result:</strong> ${binding.negative_result}</p>
          <p><strong>Boundary:</strong> ${binding.boundary}</p>
        </div>
      </div>
      <div class="binding-links">
        <span><strong>Public source:</strong> ${source.repository} / ${source.path}</span>
        <span><strong>SHA-256:</strong> ${source.sha256}</span>
        ${commit ? `<span>${commit}</span>` : ""}
        ${repoLink}
      </div>
    </article>
  `;
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

    families.forEach((value) => familySelect?.insertAdjacentHTML("beforeend", `<option value="${value}">${value}</option>`));
    statuses.forEach((value) => statusSelect?.insertAdjacentHTML("beforeend", `<option value="${value}">${value}</option>`));
    layers.forEach((value) => layerSelect?.insertAdjacentHTML("beforeend", `<option value="${value}">${value}</option>`));

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
        list.innerHTML = filtered.map(renderBindingCard).join("");
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
