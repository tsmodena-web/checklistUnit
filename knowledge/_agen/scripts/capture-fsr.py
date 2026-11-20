import re
import json,sys
from playwright.sync_api import sync_playwright
f,out,shots=sys.argv[1],sys.argv[2],sys.argv[3] if len(sys.argv)>3 else ""
res={}
def vis(pg): return pg.evaluate("()=>document.body.innerText")
def sz(pg): return pg.evaluate("()=>{const o=document.querySelector('#outputFrame'),p=document.querySelector('#printArea'),r=(e)=>{if(!e)return null;const b=e.getBoundingClientRect();return [e.offsetWidth,e.offsetHeight,Math.round(b.width*100)/100,Math.round(b.height*100)/100,e.scrollWidth,e.scrollHeight]};return {frame:r(o),paper:r(p)}}")
with sync_playwright() as p:
    b=p.chromium.launch(executable_path="/usr/bin/google-chrome",args=["--no-sandbox"])
    for vn,(w,h) in {"390":(390,844),"1280":(1280,900)}.items():
        pg=b.new_page(viewport={"width":w,"height":h}); pg.goto("file://"+f); pg.wait_for_timeout(2500)
        def snap(n):
            res[f"{vn}/{n}"]={"text":re.sub(r"\d{1,2}/\d{1,2}/\d{4},? \d{1,2}[.:]\d{2}([.:]\d{2})?","<WAKTU>",vis(pg)),"size":sz(pg)}
            if shots: pg.screenshot(path=f"{shots}/{vn}-{n}.png",full_page=True)
        snap("home")
        pg.click("button[data-mode=maintenance]"); pg.wait_for_timeout(500); snap("maint")
        pg.fill("#unitSearch","oven"); pg.wait_for_timeout(300); snap("search")
        pg.fill("#unitSearch","zzzz"); pg.wait_for_timeout(300); snap("search-empty")
        pg.fill("#unitSearch",""); pg.wait_for_timeout(300)
        pg.locator("#unitGrid button").nth(1).click(); pg.wait_for_timeout(500); snap("setup")
        pg.click("button[data-project=other]"); pg.wait_for_timeout(300); snap("setup-other")
        pg.click("button[data-project=regular]"); pg.wait_for_timeout(300)
        pg.locator("#modeGrid button").first.click(); pg.wait_for_timeout(800); snap("editor")
        # open all details
        pg.evaluate("()=>document.querySelectorAll('details').forEach(d=>d.open=true)"); pg.wait_for_timeout(300); snap("editor-open")
        for i in (1,2):
            try:
                pg.evaluate("()=>{window.__v=window.validationIssues;window.validationIssues=()=>[]}")
                pg.locator(f"[data-action=step][data-step='{i}']").click(timeout=2000); pg.wait_for_timeout(500)
                pg.evaluate("()=>document.querySelectorAll('details').forEach(d=>d.open=true)"); snap(f"step{i+1}")
            except Exception as e: print("step ERR",i,str(e)[:80])
        try:
            pg.evaluate("()=>{window.validationIssues=()=>[]}")
            pg.locator("#previewStep").click(timeout=2000); pg.wait_for_timeout(1200); snap("preview")
        except Exception as e: print("preview ERR",str(e)[:80])
        # other modes
        pg.goto("file://"+f); pg.wait_for_timeout(1500)
        for m in ["installation","survey"]:
            pg.click(f"button[data-mode={m}]"); pg.wait_for_timeout(500); snap(m+"-pick")
            try:
                pg.locator("#unitGrid button").first.click(timeout=2000); pg.wait_for_timeout(400); snap(m+"-setup")
                pg.locator("#modeGrid button").first.click(timeout=2000); pg.wait_for_timeout(800); snap(m+"-editor")
                pg.evaluate("()=>document.querySelectorAll('details').forEach(d=>d.open=true)"); snap(m+"-editor-open")
                pg.evaluate("()=>{window.validationIssues=()=>[]}")
                for i in (1,2):
                    pg.locator(f"[data-action=step][data-step='{i}']").click(timeout=2000); pg.wait_for_timeout(400)
                    pg.evaluate("()=>document.querySelectorAll('details').forEach(d=>d.open=true)"); snap(f"{m}-step{i+1}")
                pg.locator("#previewStep").click(timeout=2000); pg.wait_for_timeout(1200); snap(m+"-preview")
            except Exception as e: print(m,"ERR",str(e)[:80])
            pg.goto("file://"+f); pg.wait_for_timeout(1500)
        pg.close()
    b.close()
json.dump(res,open(out,"w"),ensure_ascii=False)
print(len(res),"screens")
