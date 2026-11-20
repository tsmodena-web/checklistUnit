import sys
from playwright.sync_api import sync_playwright
out=sys.argv[1]; only=[]
A={k:(sys.argv[2+i] if len(sys.argv)>2+i else "") for i,k in enumerate(["fsr","pendingin","persetujuan"])}
def np(b,f,w,h):
    pg=b.new_page(viewport={"width":w,"height":h}); pg.on("dialog",lambda d:d.accept())
    pg.route("**/*",lambda r:r.abort() if r.request.url.startswith("http") else r.continue_())
    pg.goto("file://"+f); pg.wait_for_timeout(1800); return pg
def fill_pers(pg):
    for e in pg.locator("#editor input:visible, #editor textarea:visible").all():
        ty=e.get_attribute("type")
        e.fill("2026-11-20" if ty=="date" else "081234567890" if ty=="tel" else "Uji 123")
with sync_playwright() as p:
    b=p.chromium.launch(executable_path="/usr/bin/google-chrome",args=["--no-sandbox"])
    for w,h in((390,844),(1280,900)):
        v=str(w)
        def sh(pg,id,n):
            pg.wait_for_timeout(400); pg.screenshot(path=f"{out}/{id}-{n}-{v}.png",full_page=False if w==1280 else True)
        if not only or "fsr" in only:
            pg=np(b,A["fsr"],w,h); sh(pg,"fsr","home")
            pg.click("button[data-mode=maintenance]"); pg.wait_for_timeout(400); sh(pg,"fsr","pick")
            pg.locator("#unitGrid button").nth(1).click(); pg.wait_for_timeout(400); sh(pg,"fsr","setup")
            pg.locator("#modeGrid button").first.click(); pg.wait_for_timeout(800); sh(pg,"fsr","step1")
            pg.evaluate("()=>{window.validationIssues=()=>[]}")
            pg.locator("[data-action=step][data-step='1']").click(); pg.wait_for_timeout(500); sh(pg,"fsr","step2")
            pg.locator("[data-action=step][data-step='2']").click(); pg.wait_for_timeout(500); sh(pg,"fsr","step3")
            pg.locator("#previewStep").click(); pg.wait_for_timeout(1200); sh(pg,"fsr","preview")
            pg.close()
        if not only or "pendingin" in only:
            pg=np(b,A["pendingin"],w,h); sh(pg,"pendingin","home")
            pg.locator("[data-form-choice=general]").click(); pg.select_option("#generalType",index=1); sh(pg,"pendingin","step1")
            pg.click("#nextBtn"); sh(pg,"pendingin","step2")
            pg.click("#nextBtn"); sh(pg,"pendingin","preview"); pg.close()
        if not only or "persetujuan" in only:
            pg=np(b,A["persetujuan"],w,h); sh(pg,"persetujuan","home")
            pg.get_by_role("button",name="Mulai Form Persetujuan").first.click(); pg.wait_for_timeout(500)
            pg.locator("select").first.select_option(index=1); pg.evaluate("document.querySelector('details.group').open=true"); pg.locator("details.group input[type=checkbox]").first.check(); sh(pg,"persetujuan","step1")
            pg.locator("#nextStep").click(); pg.wait_for_timeout(500); sh(pg,"persetujuan","step2")
            fill_pers(pg); pg.locator("#nextStep").click(); pg.wait_for_timeout(500); sh(pg,"persetujuan","step3")
            pg.evaluate("""()=>{d.explained=true;d.consent=true;const px='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==';for(const [r] of roleNames())d.signatures[r]=px;}""")
            pg.evaluate("showPreview()"); pg.wait_for_timeout(1200); sh(pg,"persetujuan","preview"); pg.close()
    b.close()
