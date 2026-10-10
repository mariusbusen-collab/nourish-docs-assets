"""Inline fonts and libraries into a single, offline index.html.

usage: python3 build.py   (reads src/index.src.html, writes index.html)
"""
import base64, pathlib

here = pathlib.Path(__file__).parent
src = (here / "src" / "index.src.html").read_text()
v = here / "vendor"

def b64(name):
    return base64.b64encode((v / name).read_bytes()).decode()

fonts = f"""
@font-face {{ font-family: "Fraunces"; font-style: normal; font-weight: 100 900; font-display: swap; src: url(data:font/woff2;base64,{b64("fraunces.woff2")}) format("woff2"); }}
@font-face {{ font-family: "Fraunces"; font-style: italic; font-weight: 100 900; font-display: swap; src: url(data:font/woff2;base64,{b64("fraunces-italic.woff2")}) format("woff2"); }}
@font-face {{ font-family: "Inter"; font-style: normal; font-weight: 400 600; font-display: swap; src: url(data:font/woff2;base64,{b64("inter.woff2")}) format("woff2"); }}
"""
out = (src.replace("/*@FONTS*/", fonts)
          .replace("/*@MOTION*/", (v / "motion.min.js").read_text())
          .replace("/*@CONFETTI*/", (v / "confetti.browser.js").read_text()))
(here / "index.html").write_text(out)
print(f"index.html: {len(out) / 1024:.0f} KB")
