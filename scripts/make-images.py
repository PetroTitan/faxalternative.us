"""Render og.png, apple-touch-icon.png and favicon.ico into src/static.

Run with any Python that has Playwright + Chromium:
    python scripts/make-images.py
The images are committed, so the Cloudflare build never needs this.
"""
import pathlib, struct
from playwright.sync_api import sync_playwright

root = pathlib.Path(__file__).resolve().parent.parent
static = root / "src" / "static"
icon = (static / "favicon.svg").read_text()

OG = f"""<!doctype html><html><head><style>
*{{margin:0;box-sizing:border-box}}
body{{width:1200px;height:630px;background:#fbfaf7;font-family:-apple-system,"Helvetica Neue",Arial,sans-serif;color:#14201f;
display:flex;flex-direction:column;justify-content:space-between;padding:72px 80px;border-bottom:18px solid #0b6e5f}}
.top{{display:flex;align-items:center;gap:18px;font-size:34px;font-weight:700}}
.top svg{{width:64px;height:64px}} .top span{{color:#0b6e5f}}
h1{{font-size:84px;line-height:1.04;letter-spacing:-2.5px;max-width:980px}}
p{{font-size:34px;color:#4f5e5b;line-height:1.35}} b{{color:#0b6e5f}}
</style></head><body>
<div class="top">{icon}<div>fax<span>alternative</span>.us</div></div>
<h1>The alternative to a fax machine</h1>
<p>Fax online with <b>faxB2B</b>, or from your phone with the<br><b>FAX app</b> for iPhone and Android. No machine, no landline.</p>
</body></html>"""

with sync_playwright() as p:
    b = p.chromium.launch()
    pg = b.new_page(viewport={"width": 1200, "height": 630})
    pg.set_content(OG); pg.screenshot(path=str(static / "og.png"))
    for size, name in [(180, "apple-touch-icon.png"), (32, "favicon-32.png")]:
        pg = b.new_page(viewport={"width": size, "height": size})
        pg.set_content(f"<html><body style='margin:0'>{icon.replace('<svg ', f'<svg width=\"{size}\" height=\"{size}\" ')}</body></html>")
        pg.screenshot(path=str(static / name), omit_background=True)
    b.close()

# favicon.ico = one 32x32 PNG wrapped in an ICO container
png = (static / "favicon-32.png").read_bytes()
ico = struct.pack("<HHH", 0, 1, 1) + struct.pack("<BBBBHHII", 32, 32, 0, 0, 1, 32, len(png), 22) + png
(static / "favicon.ico").write_bytes(ico)
(static / "favicon-32.png").unlink()
print("wrote", [f.name for f in static.iterdir()])
