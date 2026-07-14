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

document.addEventListener("DOMContentLoaded", () => {
  initMobileNav();
  initDocCollapsibles();
  if (document.querySelector("[data-subtitle-source]")) {
    bootSubtitlePanels();
  }
  initImageLightbox();
});
