"""Regenerate the single-file offline AviOrg edition from repository source."""
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
html = (ROOT / 'index.html').read_text(encoding='utf-8')
for filename in ['styles.css', 'pro4.css', 'pro5.css', 'pro6.css', 'premium.css','luxury.css']:
    link = f'<link rel="stylesheet" href="assets/css/{filename}">'
    assert link in html, filename
    html = html.replace(link, '<style>\n' + (ROOT/'assets/css'/filename).read_text(encoding='utf-8') + '\n</style>')
for filename in ['jszip.min.js', 'pptxgen.min.js']:
    tag = f'<script src="assets/vendor/{filename}"></script>'
    assert tag in html, filename
    html = html.replace(tag, '<script>\n' + (ROOT/'assets/vendor'/filename).read_text(encoding='utf-8') + '\n</script>')
for filename in ['app.js', 'pro4.js', 'pro5.js', 'pro6.js', 'premium.js','luxury.js']:
    tag = f'<script src="assets/js/{filename}"></script>'
    assert tag in html, filename
    html = html.replace(tag, '<script>\n' + (ROOT/'assets/js'/filename).read_text(encoding='utf-8') + '\n</script>')
# Self-contained favicon: on standalone pages the original is retained as a data URI.
# If the favicon is referenced as a local file, create the data URI from the bundled SVG.
import base64
p = ROOT/'assets/brand/logo.svg'
html = html.replace('href="assets/brand/logo.svg"', f'href="data:image/svg+xml;base64,{base64.b64encode(p.read_bytes()).decode()}"')
out = ROOT/'standalone/AviOrg_Studio_Pro_6_3_Luxury.html'
out.parent.mkdir(exist_ok=True)
out.write_text(html, encoding='utf-8')
legacy = ROOT/'standalone/AviOrg_Studio_Pro_6_1.html'
legacy.write_text(html, encoding='utf-8')
print(f'Wrote {out.name}: {out.stat().st_size:,} bytes (plus backwards-compatible alias)')
