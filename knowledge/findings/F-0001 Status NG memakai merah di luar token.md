---
type: finding
id: F-0001
app: fsr
severity: sedang
area: warna
status: selesai
found: 2026-11-20
review: "[[2026-W47]]"
pr: https://github.com/tsmodena-web/checklistUnit/pull/2
tags: [finding, app/fsr, ui/warna, status/selesai]
---
# F-0001 Status NG memakai merah di luar token

**Masalah.** Status NG memakai #dc3545, bukan token bahaya #c4321c.

**Standar.** [[Warna]]

**Usulan.** Override NG ke #c4321c. (Perubahan tampilan saja; lihat [[K-0001 Evaluasi tidak mengubah informasi]].)

**Status.** Selesai: diperbaiki di PR https://github.com/tsmodena-web/checklistUnit/pull/2 (merged 2026-11-20).

Terkait: [[Form Service Result]] · [[Evaluasi UI]] · [[2026-W47]]
