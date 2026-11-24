---
type: finding
id: F-0040
app: pendingin
severity: rendah
area: komponen
status: terbuka
found: 2026-11-23
review: "[[2026-W48]]"
pr: 
tags: [finding, app/pendingin, ui/komponen, status/terbuka]
---
# F-0040 Ikon Bootstrap dari CDN kosong offline

**Masalah.** Ikon Bootstrap dimuat dari CDN sehingga kosong saat offline.

**Standar.** [[Kartu dan Panel]]

**Usulan.** Ganti dengan ikon inline SVG atau sediakan cadangan lokal. (Perubahan tampilan saja; lihat [[K-0001 Evaluasi tidak mengubah informasi]].)

**Status.** Terbuka; tidak diperbaiki otomatis (butuh markup/aset/keputusan desain atau dipantau).

Terkait: [[Checklist Unit Pendingin]] · [[Evaluasi UI]] · [[2026-W48]]
