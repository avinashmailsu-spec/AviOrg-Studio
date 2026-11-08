"""Local Chromium smoke test and static repository integrity test."""
from pathlib import Path
import shutil
import subprocess
import sys
import unittest
import zipfile

ROOT = Path(__file__).resolve().parents[1]

class SiteTests(unittest.TestCase):
    def test_static_references(self):
        subprocess.run([sys.executable, str(ROOT/'scripts/check_repo.py')], check=True)

    def test_pages_site_minimal(self):
        subprocess.run([sys.executable, str(ROOT/'scripts/build_site.py')], check=True)
        dist=ROOT/'dist'
        self.assertTrue((dist/'index.html').is_file())
        self.assertTrue((dist/'assets/js/app.js').is_file())
        self.assertFalse((dist/'examples').exists())
        self.assertFalse((dist/'standalone').exists())
        self.assertFalse((dist/'docs').exists())

    def test_site_in_chromium(self):
        try:
            from playwright.sync_api import sync_playwright
        except ImportError:
            self.skipTest('Install requirements-dev.txt to run browser tests')
        with sync_playwright() as p:
                browser_exe=shutil.which('chromium') or shutil.which('google-chrome')
                b=p.chromium.launch(headless=True, **({'executable_path':browser_exe,'args':['--no-sandbox','--disable-dev-shm-usage']} if browser_exe else {}))
                page=b.new_page(viewport={'width':1440,'height':900},accept_downloads=True)
                errors=[]
                page.on('pageerror',lambda e: errors.append(str(e)))
                page.set_content((ROOT/'standalone/AviOrg_Studio_Pro_6_3_Luxury.html').read_text(encoding='utf-8'),wait_until='load')
                page.wait_for_selector('#chartSvg .node-card',timeout=12000)
                self.assertIn('AviOrg Studio',page.title())
                self.assertTrue(page.locator('#uxAboutCreditBtn').is_visible())
                self.assertIn('Avinash Ekka',page.locator('#uxAboutCreditBtn').inner_text())
                self.assertEqual(page.evaluate('typeof window.Structura.exportPPTX'),'function')
                page.keyboard.press('Control+k')
                self.assertTrue(page.locator('#uxLauncher').is_visible())
                page.keyboard.press('Escape')
                self.assertFalse(page.locator('#uxLauncher').is_visible())
                # Assert actual PPTX export is downloadable.
                with page.expect_download(timeout=45000) as dl:
                    page.evaluate('window.Structura.exportPPTX()')
                path=dl.value.path()
                with zipfile.ZipFile(path) as z:
                    self.assertIn('ppt/presentation.xml',z.namelist())
                self.assertEqual(errors,[],f'Browser errors: {errors}')
                b.close()

if __name__ == '__main__':
    unittest.main()
