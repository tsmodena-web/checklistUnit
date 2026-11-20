import re
import sys
from playwright.sync_api import sync_playwright
files={"before":sys.argv[1],"after":sys.argv[2]}
DIM="""()=>{const r=e=>e?[e.offsetWidth,e.offsetHeight,Math.round(e.getBoundingClientRect().width),Math.round(e.getBoundingClientRect().height)]:null;return [r(document.getElementById('outputFrame')),r(document.getElementById('printArea')),r(document.querySelector('#printArea .output-content'))]}"""
def run(b,f,w,h):
    out={}
    pg=b.new_page(viewport={"width":w,"height":h}); pg.goto("file://"+f); pg.wait_for_timeout(2500)
    t=lambda k: out.__setitem__(k,re.sub(r"\d{1,2}/\d{1,2}/\d{4},? \d{1,2}[.:]\d{2}([.:]\d{2})?","<WAKTU>",pg.evaluate("document.body.innerText")))
    t("home")
    for name,sel in [("glos","#glosBtn"),("flow","#flowBtn"),("guide","#guideBtn"),("tour","#tourOpen")]:
        pg.locator(sel).first.click(); pg.wait_for_timeout(700); t("ov-"+name)
        pg.keyboard.press("Escape"); pg.wait_for_timeout(300)
        pg.evaluate("document.querySelectorAll('.glos-layer,.tour,.layer').forEach(e=>e.hidden=true);document.body.classList.remove('locked')")
    pg.get_by_role("button",name="Mulai Form Persetujuan").first.click(); pg.wait_for_timeout(500); t("step1")
    pg.locator("select").first.select_option(index=1); pg.wait_for_timeout(300); t("step1-tipe")
    pg.evaluate("document.querySelectorAll('details.group').forEach(d=>d.open=true)"); pg.wait_for_timeout(300); t("step1-open")
    pg.locator("details.group input[type=checkbox]").first.check(); pg.wait_for_timeout(300); t("step1-checked")
    pg.locator("button:has-text('Bantu tentukan')").first.click(); pg.wait_for_timeout(500); t("tree")
    pg.evaluate("document.getElementById('treeLayer').hidden=true;document.body.classList.remove('locked')")
    pg.wait_for_timeout(300)
    pg.locator("#nextStep").click(); pg.wait_for_timeout(600); t("step2")
    for e in pg.locator("#editor input:visible, #editor textarea:visible").all():
        ty=e.get_attribute("type")
        e.fill("2026-11-20" if ty=="date" else "081234567890" if ty=="tel" else "Uji 123")
    pg.locator("#nextStep").click(); pg.wait_for_timeout(600); t("step3")
    pg.locator("input[name=decision]").first.check(); pg.wait_for_timeout(300); t("step3-decision")
    pg.evaluate("""()=>{d.explained=true;d.consent=true;const px='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==';for(const [r] of roleNames())d.signatures[r]=px;}""")
    pg.evaluate("showPreview()"); pg.wait_for_timeout(1500); t("preview")
    out["previewhidden"]=pg.evaluate("document.getElementById('previewView').hidden")
    out["dims"]=pg.evaluate(DIM)
    out["printcss"]=pg.evaluate("(()=>{const c=getComputedStyle(document.getElementById('printArea'));return [c.width,c.height,c.fontSize,c.fontFamily,c.padding]})()")
    out["outhtml"]=pg.evaluate("document.getElementById('printArea').innerHTML.length")
    pg.close(); return out
with sync_playwright() as p:
    b=p.chromium.launch(executable_path="/usr/bin/google-chrome",args=["--no-sandbox"])
    res={}
    for k,f in files.items():
        for w,h in((390,844),(1280,900)): res[(k,w)]=run(b,f,w,h)
    import difflib
    ok=True
    for w in (390,1280):
        a,c=res[("before",w)],res[("after",w)]
        for k in a:
            same=a[k]==c[k]; ok&=same
            if not same and isinstance(a[k],str): print(chr(10).join(difflib.unified_diff(a[k].split(chr(10)),c[k].split(chr(10)),lineterm="",n=0)))
            print(w,k,"OK" if same else "DIFF", len(a[k]) if isinstance(a[k],str) else a[k])
    print("ALL",ok); b.close()
