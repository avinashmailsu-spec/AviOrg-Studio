from pathlib import Path
from playwright.sync_api import sync_playwright
import shutil
root=Path(__file__).resolve().parents[1]
text=(root/'standalone/AviOrg_Studio_Pro_6_1.html').read_text()
with sync_playwright() as p:
 b=p.chromium.launch(headless=True,executable_path=shutil.which('chromium'),args=['--no-sandbox','--disable-dev-shm-usage'])
 for width,height in [(1280,860),(390,844)]:
  page=b.new_page(viewport={'width':width,'height':height},device_scale_factor=1)
  errors=[];page.on('pageerror',lambda e:errors.append(str(e)))
  page.set_content(text,wait_until='domcontentloaded');page.wait_for_selector('#chartSvg .node-card',timeout=15000);page.wait_for_timeout(400)
  path=root/f'_responsive_{width}.png';page.screenshot(path=str(path))
  print(width,'errors',errors,'overflow',page.evaluate('document.documentElement.scrollWidth - window.innerWidth'),'chart nodes',page.locator('#chartSvg .node-card').count())
  page.close()
 b.close()
