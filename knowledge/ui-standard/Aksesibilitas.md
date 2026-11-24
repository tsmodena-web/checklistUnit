---
type: standard
area: ux/aksesibilitas
updated: 2026-11-24
tags: [standard, ux/aksesibilitas]
---
# Aksesibilitas

## Aturan
- Kontras teks >= 4.5:1; ink #101828 di atas #fff/#F9FAFB (>16:1); muted #667085 (4.97:1 di putih, 4.76:1 di #F9FAFB) hanya untuk teks sekunder >= 13px. Teks putih di atas primer #7839EE 5.80:1 (hover #6927DA 7.23:1) dan di atas bahaya #D92D20 4.83:1 (hover #B42318 6.57:1): lolos AA, tidak perlu tingkat lebih gelap. Teks status memakai tingkat 700 (ok #027A48, peringatan #B54708); #039855 (3.73:1) dan #DC6803 (3.49:1) gagal AA untuk teks, hanya untuk ikon/penanda. Info #1570EF hanya 4.57:1 di putih dan 3.99:1 di latar lembut, jadi teks info memakai #155EEF (4.73:1 di #EFF4FF).
- Fokus tampak jelas (outline 3px primer, offset 2px) di semua kontrol; jangan menghapus outline.
- Target >= 44px; status tidak hanya warna (ikon/teks Berisiko/Waspada/STOP).
- Hormati `prefers-reduced-motion`; ikon dekoratif `aria-hidden`; tombol ikon punya `aria-label`.
- Field punya label terkait; label tersembunyi memakai `visually-hidden`.

## Token / nilai
| Properti | Nilai |
|---|---|
| fokus | outline 3px primer #7839EE 35%, offset 2px |
| target sentuh | 44px |
| teks min | 12px |

## Dipakai di
- [[Form Service Result]]: ada fokus 2px primer; teks 10.56px; tautan kecil 16 sampai 35px tinggi (link teks).
- [[Checklist Unit Pendingin]]: fokus 2px biru rgba .25 (lemah); tidak ada reduced-motion; font tombol 13.3px.
- [[Persetujuan Pemasangan]]: fokus 3px, reduced-motion ada, aria banyak; tombol .btn.sm 34px.

Terkait: [[Field Form]], [[Warna]]

Aturan batas: standar hanya menyentuh tampilan, bukan teks/label/config/id/output; lihat [[K-0001 Evaluasi tidak mengubah informasi]]. Ditemukan di review [[2026-W47]].

Cluster: [[Standar UI]]
