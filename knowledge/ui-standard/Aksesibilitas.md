---
type: standard
area: ux/aksesibilitas
updated: 2026-11-20
tags: [standard, ux/aksesibilitas]
---
# Aksesibilitas

## Aturan
- Kontras teks >= 4.5:1; ink #1f2430 di atas #fff; muted #667085 (4.9:1) hanya untuk teks sekunder >= 13px.
- Fokus tampak jelas (outline 3px primer, offset 2px) di semua kontrol; jangan menghapus outline.
- Target >= 44px; status tidak hanya warna (ikon/teks Berisiko/Waspada/STOP).
- Hormati `prefers-reduced-motion`; ikon dekoratif `aria-hidden`; tombol ikon punya `aria-label`.
- Field punya label terkait; label tersembunyi memakai `visually-hidden`.

## Token / nilai
| Properti | Nilai |
|---|---|
| fokus | outline 3px rgba(ac,.35), offset 2px |
| target sentuh | 44px |
| teks min | 12px |

## Dipakai di
- [[Form Service Result]]: ada fokus 2px primer; teks 10.56px; tautan kecil 16 sampai 35px tinggi (link teks).
- [[Checklist Unit Pendingin]]: fokus 2px biru rgba .25 (lemah); tidak ada reduced-motion; font tombol 13.3px.
- [[Persetujuan Pemasangan]]: fokus 3px, reduced-motion ada, aria banyak; tombol .btn.sm 34px.

Terkait: [[Field Form]], [[Warna]]

Aturan batas: standar hanya menyentuh tampilan, bukan teks/label/config/id/output; lihat [[K-0001 Evaluasi tidak mengubah informasi]]. Ditemukan di review [[2026-W47]].

Cluster: [[Standar UI]]
