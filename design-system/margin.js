/* =========================================================================
   margin · behaviour
   no dependencies. every feature is progressive: pages work without js.
   include once, as the last script in the body (see README.md).
   ========================================================================= */
(function () {
  "use strict";
  const root = document.documentElement;
  const REDUCE = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const INK = "#2a241d";

  /* ---------- illustrations: <span data-art="hanni"></span> ---------- */
  const ART = {
    hanni: () => `<svg class="m-sticker is-bob" viewBox="0 0 140 160" role="img" aria-label="hanni, a round yellow character, waving"><g stroke="${INK}" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" fill="none" filter="url(#m-wobble)">
      <g class="sun-rays"><circle cx="112" cy="26" r="10" fill="#f0c46a"/><path d="M112 7v6M112 39v6M93 26h6M125 26h6M99 13l4 4M121 35l4 4M99 39l4-4M121 17l4-4"/></g>
      <g class="body"><path d="M30 152c-8-30-6-62 8-84 14-22 50-24 66-4 16 20 18 58 10 88z" fill="#f0c46a"/><path class="wave" d="M108 98c10-8 16-20 16-32"/><path d="M33 106c-8 6-12 14-12 24"/><path d="M64 56c1-7 6-11 12-12"/>
      <circle cx="58" cy="90" r="3.2" fill="${INK}" stroke="none"/><circle cx="84" cy="90" r="3.2" fill="${INK}" stroke="none"/><path d="M60 103c6 7 18 7 24 0"/>
      <circle cx="49" cy="101" r="6" fill="#e98a6a" opacity=".45" stroke="none"/><circle cx="94" cy="101" r="6" fill="#e98a6a" opacity=".45" stroke="none"/></g></g></svg>`,
    nanni: () => `<svg class="m-sticker is-sway" viewBox="0 0 140 160" role="img" aria-label="nanni, a tall lilac character, working on a laptop"><g stroke="${INK}" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" fill="none" filter="url(#m-wobble)">
      <path d="M32 12a15 15 0 1 0 15 24a12 12 0 1 1-15-24z" fill="#ddd5f3"/>
      <g class="body"><path d="M38 152c-6-36-4-74 10-96 12-18 40-18 52 0 14 22 14 60 8 96z" fill="#b9aee3"/><path d="M56 77l9-4M88 77l-9-4"/>
      <circle cx="61" cy="86" r="3.2" fill="${INK}" stroke="none"/><circle cx="83" cy="86" r="3.2" fill="${INK}" stroke="none"/><path d="M63 101c3-2 6-2 9 0s6 2 9 0"/>
      <path d="M103 64c3 4 4 7 2 9s-6 0-5-3 3-6 3-6z" fill="#cfe3f3"/><rect x="47" y="112" width="50" height="28" rx="3" fill="#fbf8f3"/><circle cx="72" cy="126" r="2" fill="${INK}" stroke="none"/>
      <path d="M40 142h64"/><path d="M42 114c2 8 4 14 6 18M102 114c-2 8-4 14-6 18"/></g></g></svg>`,
    star: () => `<svg viewBox="0 0 40 40" aria-hidden="true" class="m-sticker" style="--size:28px"><path filter="url(#m-wobble)" d="M20 4l4 11 12 1-9 8 3 12-10-7-10 7 3-12-9-8 12-1z" fill="#f0c46a" stroke="${INK}" stroke-width="2" stroke-linejoin="round"/></svg>`,
    end: () => `<svg viewBox="0 0 32 12" class="m-poem-end" aria-hidden="true"><path d="M2 6c4-4 7 4 11 0s7 4 11 0 5-2 6-1" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>`,
  };
  function ensureDefs() {
    if (document.getElementById("m-wobble")) return;
    const s = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    s.setAttribute("width", "0"); s.setAttribute("height", "0"); s.setAttribute("aria-hidden", "true"); s.style.position = "absolute";
    s.innerHTML = `<filter id="m-wobble"><feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="2" seed="4" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="2.4" xChannelSelector="R" yChannelSelector="G"/></filter>`;
    document.body.prepend(s);
  }
  function renderArt() {
    const els = $$("[data-art]"); if (!els.length) return;
    ensureDefs();
    els.forEach(el => { const fn = ART[el.dataset.art]; if (fn && !el.firstElementChild) el.innerHTML = fn(); });
  }

  /* ---------- theme: <button class="m-theme" data-theme-toggle> ---------- */
  const saved = localStorage.getItem("m-theme");
  if (saved) root.dataset.theme = saved;
  function currentTheme() { return root.dataset.theme || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"); }
  function initTheme() {
    $$("[data-theme-toggle]").forEach(b => {
      if (!b.innerHTML.trim()) b.innerHTML = `<svg class="sun" viewBox="0 0 16 16" aria-hidden="true"><circle cx="8" cy="8" r="3.4" fill="currentColor"/><path d="M8 .8v2M8 13.2v2M.8 8h2M13.2 8h2M2.9 2.9l1.4 1.4M11.7 11.7l1.4 1.4M2.9 13.1l1.4-1.4M11.7 4.3l1.4-1.4" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg><svg class="moon" viewBox="0 0 16 16" aria-hidden="true"><path d="M10.8 1.6a6.4 6.4 0 1 0 3.6 10.4A5 5 0 1 1 10.8 1.6z" fill="currentColor"/></svg>`;
      b.setAttribute("aria-label", "switch light and dark");
      b.addEventListener("click", () => {
        const next = currentTheme() === "dark" ? "light" : "dark";
        root.dataset.theme = next; localStorage.setItem("m-theme", next);
        b.classList.toggle("is-turning");
      });
    });
  }

  /* ---------- reveal on scroll: .m-reveal, and marks with .m-mark-* ---------- */
  function initReveal() {
    const targets = $$(".m-reveal, .m-mark-under:not(.is-static), .m-mark-loop:not(.is-static), .m-mark-swash:not(.is-static)");
    if (!targets.length) return;
    if (REDUCE || !("IntersectionObserver" in window)) { targets.forEach(t => t.classList.add("is-in")); return; }
    root.classList.add("js-reveal");
    // stagger siblings that reveal together
    $$("[data-stagger]").forEach(group => $$(":scope > .m-reveal", group).forEach((el, i) => el.style.setProperty("--delay", i * (+group.dataset.stagger || 70) + "ms")));
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); } }), { rootMargin: "0px 0px -8% 0px", threshold: 0.12 });
    targets.forEach(t => io.observe(t));
    addEventListener("beforeprint", () => targets.forEach(t => t.classList.add("is-in")));
  }

  /* ---------- sidenotes on small screens: tap the number ---------- */
  function initSidenotes() {
    $$(".m-sn-ref").forEach(ref => {
      const note = ref.nextElementSibling; if (!note || !note.classList.contains("m-sidenote")) return;
      ref.setAttribute("aria-expanded", "false");
      ref.addEventListener("click", () => { const open = note.classList.toggle("is-open"); ref.setAttribute("aria-expanded", String(open)); });
    });
  }

  /* ---------- hover preview: <a data-preview="sun"> or data-preview-src="photo.jpg" ---------- */
  function initPreview() {
    const links = $$("[data-preview], [data-preview-src]"); if (!links.length || matchMedia("(hover: none)").matches) return;
    const box = document.createElement("div"); box.className = "m-preview"; box.setAttribute("aria-hidden", "true"); document.body.appendChild(box);
    let x = 0, y = 0, tx = 0, ty = 0, raf = null;
    const loop = () => { x += (tx - x) * 0.18; y += (ty - y) * 0.18; box.style.transform = `translate(${x + 24}px, ${y - 120}px)`; raf = requestAnimationFrame(loop); };
    links.forEach(a => {
      a.addEventListener("mouseenter", e => {
        box.innerHTML = a.dataset.previewSrc ? `<img src="${a.dataset.previewSrc}" alt="">` : `<div class="m-ph" data-tone="${a.dataset.preview}"></div>`;
        tx = x = e.clientX; ty = y = e.clientY; box.classList.add("is-on"); if (!raf && !REDUCE) loop();
      });
      a.addEventListener("mousemove", e => { tx = e.clientX; ty = e.clientY; if (REDUCE) box.style.transform = `translate(${tx + 24}px, ${ty - 120}px)`; });
      a.addEventListener("mouseleave", () => { box.classList.remove("is-on"); cancelAnimationFrame(raf); raf = null; });
    });
  }

  /* ---------- clock: <span class="m-clock" data-tz="Europe/Berlin" data-place="berlin"></span> ---------- */
  function initClock() {
    $$(".m-clock").forEach(el => {
      const tz = el.dataset.tz || "Europe/Berlin", place = el.dataset.place || "berlin";
      const tick = () => {
        const now = new Date();
        const t = now.toLocaleTimeString("en-GB", { timeZone: tz, hour: "2-digit", minute: "2-digit" });
        const h = +now.toLocaleString("en-GB", { timeZone: tz, hour: "2-digit", hour12: false });
        el.classList.toggle("is-night", h < 7 || h >= 20);
        el.innerHTML = `<span class="sun" aria-hidden="true"></span>${place}, ${t}`;
      };
      tick(); setInterval(tick, 20000);
    });
  }

  /* ---------- filters: <div data-filter-group> buttons[data-filter] + items[data-kind] ---------- */
  function initFilters() {
    $$("[data-filter-group]").forEach(g => {
      const target = document.querySelector(g.dataset.filterGroup); if (!target) return;
      const btns = $$("[data-filter]", g);
      btns.forEach(b => b.addEventListener("click", () => {
        btns.forEach(x => { x.setAttribute("aria-pressed", "false"); x.classList.remove("is-on"); });
        b.setAttribute("aria-pressed", "true"); b.classList.add("is-on");
        const f = b.dataset.filter;
        $$("[data-kind]", target).forEach(it => { it.hidden = !(f === "all" || it.dataset.kind === f); });
      }));
    });
  }

  /* ---------- toast: Margin.toast("saved") ---------- */
  let toastEl, toastT;
  function toast(msg) {
    if (!toastEl) { toastEl = document.createElement("div"); toastEl.className = "m-toast"; toastEl.setAttribute("role", "status"); document.body.appendChild(toastEl); }
    toastEl.textContent = msg; toastEl.classList.add("is-on"); clearTimeout(toastT); toastT = setTimeout(() => toastEl.classList.remove("is-on"), 1900);
  }

  /* ---------- copy: <button data-copy="#id"> or data-copy-text="…" ---------- */
  function initCopy() {
    $$("[data-copy], [data-copy-text]").forEach(b => b.addEventListener("click", () => {
      const txt = b.dataset.copyText || (document.querySelector(b.dataset.copy) || {}).textContent || "";
      (navigator.clipboard ? navigator.clipboard.writeText(txt.trim()) : Promise.reject()).then(() => toast("copied"), () => {});
    }));
  }

  function init() { renderArt(); initTheme(); initReveal(); initSidenotes(); initPreview(); initClock(); initFilters(); initCopy(); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
  window.Margin = { toast, art: ART, theme: currentTheme };
})();
