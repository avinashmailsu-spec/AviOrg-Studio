"""Create a minimal static site for GitHub Pages (no private project files)."""
from pathlib import Path
import shutil

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'dist'

if OUT.exists():
    shutil.rmtree(OUT)
OUT.mkdir()
shutil.copy2(ROOT / 'index.html', OUT / 'index.html')
shutil.copy2(ROOT / '.nojekyll', OUT / '.nojekyll')
shutil.copytree(ROOT / 'assets', OUT / 'assets')
print(f'GitHub Pages site created: {OUT} ({sum(x.is_file() for x in OUT.rglob("*"))} files)')
