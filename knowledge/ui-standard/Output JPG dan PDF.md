---
type: standard
area: output
updated: 2026-11-20
tags: [standard, ux/output]
---
# Output JPG dan PDF

## Aturan
- Output adalah pengecualian dari token UI layar: format, ukuran, dan isi tidak boleh diubah ([[K-0001 Evaluasi tidak mengubah informasi]]).
- Kanvas persegi 1280 x 1280 px; JPG lewat html2canvas scale 2 (FSR), PDF lewat jsPDF 240 x 240 mm (FSR); cetak `@page size 1280px 1280px; margin 0`.
- Area output (`.paper`, `#printArea`, `#outputFrame`) berdiri sendiri; CSS tampilan layar tidak boleh menyentuh selektor ini kecuali terbukti tidak mengubah tampilan hasil. Bandingkan hasil sebelum dan sesudah.

## Token / nilai
| Properti | Nilai |
|---|---|
| kanvas | 1280 x 1280 px |
| html2canvas | scale 2, background #fff |
| PDF | jsPDF 240 x 240 mm |
| font output | Arial 12px / 1.35 (paper-body) |
| status output | OK #198754, NG #dc3545 |

## Dipakai di
- [[Form Service Result]]: html2canvas + jsPDF dimuat dari CDN saat ekspor; `@media print` ada 2 versi (A4 portrait dan 1280px).
- [[Checklist Unit Pendingin]]: kanvas 1280x1280 (`.paper-general/.paper-body`), html2canvas dari CDN.
- [[Persetujuan Pemasangan]]: output 1:1 JPG/PDF; cetak 1280px; tanda tangan canvas 1200x420.

Terkait: [[Form Service Result]], [[Aplikasi]]

Aturan batas: standar hanya menyentuh tampilan, bukan teks/label/config/id/output; lihat [[K-0001 Evaluasi tidak mengubah informasi]]. Ditemukan di review [[2026-W47]].

Cluster: [[Standar UI]]
