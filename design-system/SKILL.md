---
name: margin-design-system
description: Apply "margin", Marius Busen's personal design system (warm paper and ink, Fraunces + Inter + IBM Plex Mono, terracotta accent, hand-drawn marks, calm motion) to any web page, essay, poem, portfolio page, HTML artifact or small app for Marius's personal site or personal projects. Use whenever Marius asks for something "in my style", "on my site", "with margin", or builds a personal (non-voize) page, essay layout, poem page or project page. Do not use for voize-branded work.
---

# margin

The system lives in this folder. Read `README.md` first, then use the files. Never re-invent values: every colour, size, space and curve is a token in `tokens.css`.

## How to build a page

1. Start from the closest template in `templates/` (home, writing, essay, poem, project). Copy it; don't start from scratch.
2. Link `fonts.css`, `tokens.css`, `base.css`, `components.css`, and put `margin.js` as the last script in the body. Add the one-line theme script in `<head>` (see README).
3. Put `class="m-grain"` on `<body>` and wrap content in `.m-page`.
4. Use components by class (`m-` prefix, `is-` states). Need something new? Build it from tokens and semantic roles only, and add it to `components.css` and the style guide, so it exists once.
5. Run `python3 build.py` when a single shareable file is needed. It writes to `dist/`.

## Rules

- **Words first.** One typeface family does display and reading (Fraunces). Inter is for UI only. Plex Mono is for dates, labels and numbers.
- **Lowercase** headings, nav and UI copy. Poems keep their own capitalisation.
- **One accent.** Terracotta (`--accent`, `--accent-text` for text) for links, marks and one number per screen. No other colour for emphasis.
- **One hand-drawn mark per screen**, at most (`m-mark-under`, `m-mark-loop`, `m-mark-swash`).
- **Semantic roles only** in components (`--bg`, `--surface`, `--text-2` …), never primitives like `--paper-100`. Dark mode must work without extra code.
- **Text contrast:** `--text-3` is the lightest allowed text. `--ink-500` is never text.
- **Charts:** use `--data-1…3` for categories (max three, then fold into "other"), `--data-pos/neg` for diverging. Read the dataviz skill if one is available.
- **Motion:** `--ease-out` by default, `--ease-spring` for playful moments, durations `--dur-1…4`. Respect reduced motion (base.css does this globally; check custom animations too).
- **Images:** real photos go in `m-figure`. Use `is-print` + `is-tape` for personal, warm moments. Until a photo exists, use `m-ph` with a `data-tone`, and mark it `[TK]`.
- **Copy:** never invent facts about Marius. Put `[TK]` where his words or facts are needed.
- **Essays:** `m-prose` inside `m-with-margin`, sidenotes for asides, `m-pullquote` for the one line that matters, `m-math` for formulas.
- **Poems:** `m-poem`, one `<p class="m-stanza">` per stanza, one `<span>` per line. End with `<span data-art="end"></span>`.

## Before you hand it over

- Open the page in light and dark, desktop and 390px wide. Check for overflow and label collisions.
- Check the console for errors.
- If you changed tokens, rebuild (`python3 build.py`) and re-check contrast.
