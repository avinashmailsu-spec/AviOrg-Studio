"""Pro 6.3 appearance and backwards-compatibility checks."""
from pathlib import Path
import unittest
import shutil
from playwright.sync_api import sync_playwright

ROOT=Path(__file__).resolve().parents[1]
HTML=(ROOT/'standalone/AviOrg_Studio_Pro_6_3_Luxury.html').read_text(encoding='utf-8')

class LuxuryAppearanceTests(unittest.TestCase):
    def setUp(self):
        self.browser_ctx=sync_playwright()
        self.pw=self.browser_ctx.start()
        self.browser=self.pw.chromium.launch(headless=True,executable_path=shutil.which('chromium') or '/usr/bin/chromium',args=['--no-sandbox','--disable-dev-shm-usage'])
        self.page=self.browser.new_page(viewport={'width':1536,'height':960},accept_downloads=True)
        self.errors=[]
        self.page.on('pageerror',lambda e:self.errors.append(str(e)))
        self.page.set_content(HTML,wait_until='domcontentloaded')
        self.page.wait_for_selector('#chartSvg .node-card',timeout=20000)
    def tearDown(self):
        self.browser.close();self.browser_ctx.__exit__(None,None,None)
    def test_initial_luxury_theme_preserves_chart(self):
        self.assertIn('Pro 6.3',self.page.title())
        self.assertEqual(self.page.locator('#chartSvg .node-card').count(),10)
        self.assertEqual(self.page.evaluate("document.body.dataset.luxeAppearance"),'royal')
        self.assertEqual(self.page.evaluate("window.Structura.getState().preset"),75)
        self.assertEqual(self.page.evaluate("window.Structura.getState().colorMode"),'department')
        self.assertTrue(self.page.locator('#uxAboutCreditBtn').count())
        self.assertEqual(self.errors,[])
    def test_appearance_swatches_do_not_mutate_chart(self):
        self.page.evaluate('window.Structura.showPanel("themes")')
        self.assertTrue(self.page.locator('#luxeAppearance').is_visible())
        before=self.page.evaluate('JSON.stringify(window.Structura.getState().people)')
        for appearance in ('ocean','emerald','royal'):
            self.page.locator(f'.luxe-swatch[data-appearance="{appearance}"]').click()
            self.assertEqual(self.page.evaluate('document.body.dataset.luxeAppearance'),appearance)
            self.assertEqual(self.page.locator(f'.luxe-swatch[data-appearance="{appearance}"]').get_attribute('aria-pressed'),'true')
        self.assertEqual(before,self.page.evaluate('JSON.stringify(window.Structura.getState().people)'))
        self.assertEqual(self.errors,[])
    def test_navigation_export_and_command_palette(self):
        self.page.keyboard.press('Control+k')
        self.assertTrue(self.page.locator('#uxLauncher').is_visible())
        self.page.keyboard.press('Escape')
        self.assertFalse(self.page.locator('#uxLauncher').is_visible())
        for panel in ('themes','layout','office','workforce','people'):
            self.page.evaluate(f'window.Structura.showPanel("{panel}")')
            self.assertTrue(self.page.locator(f'#panel-{panel}').is_visible(),panel)
        with self.page.expect_download(timeout=45000) as dl:
            self.page.evaluate('window.Structura.exportPPTX()')
        self.assertTrue(dl.value.suggested_filename.lower().endswith('.pptx'))
        self.assertEqual(self.errors,[])

if __name__=='__main__':unittest.main()
