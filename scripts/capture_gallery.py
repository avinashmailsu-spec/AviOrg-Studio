"""Capture actual browser screenshots for the public AviOrg README."""
from pathlib import Path
from playwright.sync_api import sync_playwright
import shutil
ROOT=Path(__file__).resolve().parents[1]
HTML=(ROOT/'standalone/AviOrg_Studio_Pro_6_1.html').read_text(encoding='utf-8')
DOCS=ROOT/'docs';DOCS.mkdir(exist_ok=True)
with sync_playwright() as p:
    b=p.chromium.launch(headless=True,executable_path=shutil.which('chromium') or '/usr/bin/chromium',args=['--no-sandbox','--disable-dev-shm-usage'])
    page=b.new_page(viewport={'width':1536,'height':960},device_scale_factor=1)
    errors=[]
    page.on('pageerror', lambda e:errors.append(str(e)))
    page.set_content(HTML, wait_until='domcontentloaded')
    page.wait_for_selector('#chartSvg .node-card',timeout=15000)
    page.wait_for_timeout(450)
    page.screenshot(path=str(DOCS/'AviOrg_Luxury_Overview.png'))
    page.evaluate('window.Structura.showPanel("themes")')
    page.wait_for_timeout(300)
    page.screenshot(path=str(DOCS/'AviOrg_Luxury_Design_Studio.png'))
    # Capture a different chart design under an Ocean workspace.
    page.locator('.luxe-swatch[data-appearance="ocean"]').click()
    if page.locator('#presetGallery .preset').count()>33:
        page.locator('#presetGallery .preset').nth(22).click()
    page.wait_for_timeout(350)
    page.screenshot(path=str(DOCS/'AviOrg_Luxury_Ocean.png'))
    page.locator('.luxe-swatch[data-appearance="emerald"]').click()
    if page.locator('#presetGallery .preset').count()>33:
        page.locator('#presetGallery .preset').nth(35).click()
    page.wait_for_timeout(350)
    page.screenshot(path=str(DOCS/'AviOrg_Luxury_Emerald.png'))
    page.evaluate('window.Structura.showPanel("office")')
    page.wait_for_timeout(220)
    page.screenshot(path=str(DOCS/'AviOrg_Luxury_Office.png'))
    print('screenshots:',*[x.name for x in DOCS.glob('AviOrg_Luxury_*.png')],sep='\n')
    print('errors:',errors)
    b.close()
