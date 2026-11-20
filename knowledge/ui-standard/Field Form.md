---
type: standard
area: komponen
updated: 2026-11-20
tags: [standard, ui/komponen]
---
# Field Form

## Aturan
- Input/select/textarea: tinggi min 44 sampai 48px, border 1px #d0d5dd, radius 8px (10px diterima), padding 10px 12px, font 16px, latar putih.
- Label di atas field, 14px / 600, jarak 6px; penanda Wajib kecil berwarna bahaya.
- Fokus: border primer + ring 3px primer 15 sampai 35%. Placeholder muted. Hint di bawah field 13px muted.
- Field tidak pernah hanya dibedakan warna; error pakai teks + ikon.

## Token / nilai
| Properti | Nilai |
|---|---|
| min-height | 44px (48px FSR) |
| border | 1px #d0d5dd |
| radius | 8px |
| font | 16px |
| label | 14px / 600 |

## Dipakai di
- [[Form Service Result]]: input 48px, border #e4e7ec (terlalu pucat, di bawah kontras 3:1), radius 10px; label pencarian disembunyikan visual (`visually-hidden`).
- [[Checklist Unit Pendingin]]: 46px, border #bfcdda, radius 12px, label 14.4px / 800; tanggal memakai bawaan browser.
- [[Persetujuan Pemasangan]]: select 44px, border #d0d5dd, radius 10px, label 14.08px / 600 + badge "Wajib" merah. Paling dekat standar.

Terkait: [[Aksesibilitas]], [[Spasi dan Radius]]

Aturan batas: standar hanya menyentuh tampilan, bukan teks/label/config/id/output; lihat [[K-0001 Evaluasi tidak mengubah informasi]]. Ditemukan di review [[2026-W47]].

Cluster: [[Standar UI]]
