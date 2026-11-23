---
type: finding
id: F-0035
app: fsr
severity: rendah
area: komponen
status: terbuka
found: 2026-11-23
review: "[[2026-W48]]"
pr: 
tags: [finding, app/fsr, ui/komponen, status/terbuka]
---
# F-0035 CDN Bootstrap tanpa utilitas

**Masalah.** Bootstrap dimuat dari CDN tetapi utilitasnya tidak dipakai, sehingga memuat sumber daya tanpa guna dan bergantung koneksi.

**Standar.** [[Kartu dan Panel]]

**Usulan.** Usulan minggu depan: tinjau pemakaian Bootstrap dan ganti dengan CSS lokal bila aman. (Perubahan tampilan saja; lihat [[K-0001 Evaluasi tidak mengubah informasi]].)

**Status.** Terbuka; tidak diperbaiki otomatis (butuh markup/aset/keputusan desain atau dipantau).

Terkait: [[Form Service Result]] · [[Evaluasi UI]] · [[2026-W48]]
