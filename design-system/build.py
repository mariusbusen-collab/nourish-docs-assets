"""Bundle each page into a single, self-contained html file in dist/.

Inlines stylesheets (with fonts as base64), scripts and images, so a page
can be opened anywhere, shared as one file, or previewed offline.

usage: python3 build.py
"""
import base64, mimetypes, pathlib, re

here = pathlib.Path(__file__).parent
dist = here / "dist"

PAGES = [here / "index.html", *sorted((here / "templates").glob("*.html"))]

def data_uri(path):
    mime = mimetypes.guess_type(path.name)[0] or ("font/woff2" if path.suffix == ".woff2" else "application/octet-stream")
    return f"data:{mime};base64,{base64.b64encode(path.read_bytes()).decode()}"

def inline_css(css_path):
    css = css_path.read_text()
    def font(m):
        ref = m.group(1)
        if ref.startswith("data:"):
            return m.group(0)
        return f'url("{data_uri((css_path.parent / ref).resolve())}")'
    return re.sub(r'url\("?((?!data:)[^")]+\.woff2)"?\)', font, css)

def bundle(page):
    html = page.read_text()
    base = page.parent
    html = re.sub(r'<link rel="stylesheet" href="([^"]+)">',
                  lambda m: f"<style>\n{inline_css((base / m.group(1)).resolve())}\n</style>", html)
    html = re.sub(r'<img src="((?!data:|https?:)[^"]+)"',
                  lambda m: f'<img src="{data_uri((base / m.group(1)).resolve())}"', html)
    html = re.sub(r'<script src="([^"]+)"></script>',
                  lambda m: f"<script>\n{(base / m.group(1)).resolve().read_text()}\n</script>", html)
    # flatten links: dist/ holds every page side by side
    html = html.replace('href="templates/', 'href="').replace('href="../index.html"', 'href="index.html"')
    dist.mkdir(exist_ok=True)
    out = dist / page.name
    out.write_text(html)
    return out

def tokens_json():
    """Write tokens.json from tokens.css: light values, plus the dark overrides."""
    import json
    css = (here / "tokens.css").read_text()
    blocks = re.findall(r"(:root[^{]*)\{(.*?)\n\}", css, re.S)
    def props(body):
        body = re.sub(r"/\*.*?\*/", "", body, flags=re.S)
        return {k: v.strip() for k, v in re.findall(r"--([\w-]+):\s*([^;]+);", body)}
    light = props(blocks[0][1])
    dark = props(re.search(r':root\[data-theme="dark"\]\s*\{(.*?)\}', css, re.S).group(1))
    out = {"name": "margin", "version": "0.1.0", "light": light, "dark": dark}
    (here / "tokens.json").write_text(json.dumps(out, indent=2) + "\n")
    print(f"tokens.json: {len(light)} tokens, {len(dark)} dark overrides")

if __name__ == "__main__":
    tokens_json()
    for p in PAGES:
        o = bundle(p)
        print(f"{o.relative_to(here)}: {o.stat().st_size / 1024:.0f} KB")
