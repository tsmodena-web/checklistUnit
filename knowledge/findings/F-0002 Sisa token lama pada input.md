---
type: finding
id: F-0002
app: fsr
severity: sedang
area: warna
status: selesai
found: 2026-11-20
review: "[[2026-W47]]"
pr: https://github.com/tsmodena-web/checklistUnit/pull/2
tags: [finding, app/fsr, ui/warna, status/selesai]
---
# F-0002 Sisa token lama pada input

**Masalah.** Teks input memakai #263a4c dan border input #e4e7ec (token lama).

**Standar.** [[Warna]] · [[Field Form]]

**Usulan.** Border #d0d5dd, radius 8px, ink #1f2430. (Perubahan tampilan saja; lihat [[K-0001 Evaluasi tidak mengubah informasi]].)

**Status.** Selesai: diperbaiki di PR https://github.com/tsmodena-web/checklistUnit/pull/2 (merged 2026-11-20).

Terkait: [[Form Service Result]] · [[Evaluasi UI]] · [[2026-W47]]
