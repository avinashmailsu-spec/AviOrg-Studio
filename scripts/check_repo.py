"""Dependency-free repository checks for CI and local development."""
from pathlib import Path
from html.parser import HTMLParser
import zipfile
import sys

ROOT = Path(__file__).resolve().parents[1]
FILES = ['index.html', 'assets/brand/logo.svg', 'assets/css/styles.css',
         'assets/css/premium.css', 'assets/js/app.js', 'assets/js/premium.js',
         'assets/vendor/jszip.min.js', 'assets/vendor/pptxgen.min.js',
         'standalone/AviOrg_Studio_Pro_6_3_Luxury.html']

class Assets(HTMLParser):
    def __init__(self):
        super().__init__()
        self.assets=[]
    def handle_starttag(self, tag, attrs):
        d = dict(attrs)
        target = d.get('src') if tag == 'script' else (d.get('href') if tag == 'link' else None)
        if target and not target.startswith(('data:', 'https:', 'http:', '#')):
            self.assets.append(target)

def main():
    missing=[path for path in FILES if not (ROOT/path).is_file()]
    assert not missing, f'Missing files: {missing}'
    page=(ROOT/'index.html').read_text(encoding='utf-8')
    assert 'Avinash Ekka' in page
    assert 'AviOrg Studio' in page
    p=Assets();p.feed(page)
    assert p.assets, 'No local assets were detected'
    missing_assets=[f for f in p.assets if not (ROOT/f).exists()]
    assert not missing_assets, f'Broken local references: {missing_assets}'
    assert 'assets/js/premium.js' in p.assets
    assert 'assets/vendor/jszip.min.js' in p.assets
    bundled=(ROOT/'standalone/AviOrg_Studio_Pro_6_3_Luxury.html').read_text(encoding='utf-8')
    assert 'Developed by Avinash Ekka' in bundled
    assert 'class="app-shell"' in bundled
    assert 'assets/js/' not in bundled, 'Standalone app still links to script files'
    for f in ['AviOrg_Excel_Import_Template.xlsx','AviOrg_Editable_Example.pptx']:
        with zipfile.ZipFile(ROOT/'examples'/f) as z:
            assert z.testzip() is None, f'{f}: corrupt ZIP container'
    print(f'OK: {len(FILES)} key files; {len(p.assets)} local asset references; valid Office examples')

if __name__ == '__main__':
    main()
