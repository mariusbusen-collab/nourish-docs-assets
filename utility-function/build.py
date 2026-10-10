"""Bundle the app into a single, offline index.html.

The app is built on the margin design system (../design-system). This inlines
its stylesheets (fonts as base64) and margin.js, plus the two vendored
libraries (Motion, canvas-confetti).

usage: python3 build.py   (reads src/index.src.html, writes index.html)
"""
import pathlib, re, sys

here = pathlib.Path(__file__).parent
sys.dont_write_bytecode = True
sys.path.insert(0, str(here.parent / "design-system"))
from build import inline_css  # noqa: E402  (margin's own bundler)

src_path = here / "src" / "index.src.html"
html = src_path.read_text()
base = src_path.parent
v = here / "vendor"

html = re.sub(r'<link rel="stylesheet" href="([^"]+)">',
              lambda m: f"<style>\n{inline_css((base / m.group(1)).resolve())}\n</style>", html)
html = re.sub(r'<script src="([^"]+)"></script>',
              lambda m: f"<script>\n{(base / m.group(1)).resolve().read_text()}\n</script>", html)
html = (html.replace("/*@MOTION*/", (v / "motion.min.js").read_text())
            .replace("/*@CONFETTI*/", (v / "confetti.browser.js").read_text()))
(here / "index.html").write_text(html)
print(f"index.html: {len(html) / 1024:.0f} KB")
