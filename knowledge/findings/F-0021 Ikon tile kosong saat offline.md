---
type: finding
id: F-0021
app: pendingin
severity: tinggi
area: komponen
status: terbuka
found: 2026-11-20
review: "[[2026-W47]]"
pr: 
tags: [finding, app/pendingin, ui/komponen, status/terbuka]
---
# F-0021 Ikon tile kosong saat offline

**Masalah.** Ikon tile kosong saat offline karena bootstrap-icons dimuat dari CDN.

**Standar.** [[Kartu dan Panel]] · [[Pola Mobile]]

**Usulan.** Self-host atau SVG inline (perlu aset baru). (Perubahan tampilan saja; lihat [[K-0001 Evaluasi tidak mengubah informasi]].)

**Status.** Terbuka; tidak diperbaiki otomatis (butuh aset/JS/teks/keputusan desain).

Terkait: [[Checklist Unit Pendingin]] · [[Evaluasi UI]] · [[2026-W47]]
