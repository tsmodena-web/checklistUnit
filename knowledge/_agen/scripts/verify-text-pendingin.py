import re
import json,sys
from playwright.sync_api import sync_playwright
files={"before":sys.argv[1],"after":sys.argv[2]}
SZ="""()=>{const e=document.querySelector('#printArea');if(!e||!e.offsetParent)return null;return [e.offsetWidth,e.offsetHeight,e.scrollWidth,e.scrollHeight,e.innerHTML.length,e.outerHTML.replace(/transform:[^;"]*;?/g,'').length]}"""
def run(b,f,w,h):
    out={}
    def newp():
        pg=b.new_page(viewport={"width":w,"height":h}); pg.on("dialog",lambda d:d.accept())
        pg.route("**/*",lambda r:r.abort() if r.request.url.startswith("http") else r.continue_())
        pg.goto("file://"+f); pg.wait_for_timeout(1200); return pg
    pg=newp()
    def snap(k):
        pg.wait_for_timeout(250); out[k]={"text":re.sub(r"\d{1,2}/\d{1,2}/\d{4},? \d{1,2}[.:]\d{2}([.:]\d{2})?","<WAKTU>",pg.evaluate("document.body.innerText")),"size":pg.evaluate(SZ)}
    snap("landing")
    pg.close()
    pg=newp(); n=pg.evaluate("[...document.querySelectorAll('#generalType option')].length") if False else None
    for form in ["general","bocor_body"]:
        pg.close(); pg=newp()
        pg.locator(f"[data-form-choice={form}]").click()
        opts=[None]
        if form=="general":
            opts=pg.evaluate("[...document.querySelectorAll('#generalType option:not([disabled])')].map(o=>o.value)")
        for i,o in enumerate(opts):
            if o is not None:
                pg.select_option("#generalType",o)
            snap(f"{form}-{o}-s1")
            pg.click("#nextBtn"); snap(f"{form}-{o}-s2")
            pg.evaluate("document.querySelectorAll('details').forEach(d=>d.open=true)"); snap(f"{form}-{o}-s2open")
            pg.click("#nextBtn"); snap(f"{form}-{o}-s3")
            pg.click("#prevBtn");pg.click("#prevBtn")
    pg.close(); return out
if __name__=="__main__":
    with sync_playwright() as p:
        b=p.chromium.launch(executable_path="/usr/bin/google-chrome",args=["--no-sandbox"])
        res={}
        for k,f in files.items():
            for w,h in((390,844),(1280,900)): res[(k,w)]=run(b,f,w,h)
        ok=True; n=0
        for w in (390,1280):
            a,c=res[("before",w)],res[("after",w)]
            assert a.keys()==c.keys()
            for k in a:
                n+=1
                for part in("text","size"):
                    if a[k][part]!=c[k][part]:
                        ok=False; print(w,k,part,"DIFF")
                        if part=="text":
                            import difflib; print("\n".join(difflib.unified_diff(a[k][part].split("\n"),c[k][part].split("\n"),lineterm="",n=0)))
                        else: print(a[k][part],c[k][part])
        print("screens/viewport",n//2,"ALL OK" if ok else "FAIL"); b.close()
