---
type: standard
area: komponen
updated: 2026-11-20
tags: [standard, ui/komponen]
---
# Tombol

## Aturan
- Primer: isi #7c5cf0, teks putih, radius 8px, bobot 600, hover #5b3fd1. Satu primer per layar/langkah.
- Sekunder: putih, border #e4e7ec, teks #5b3fd1; bahaya: putih, teks #c4321c, border #f3b9ae.
- Tinggi sentuh minimal 44px (tombol aksi utama dan navigasi langkah); .btn-sm 34px hanya untuk aksi tersier yang jaraknya lega.
- Ikon di kiri teks, ukuran 1rem. Aksi utama langkah (Lanjut) ditaruh di bar bawah lengket pada mobile.
- Fokus: outline 3px warna primer 35% + offset 2px.

## Token / nilai
| Properti | Nilai |
|---|---|
| tinggi | 44px (utama), 34px (kecil, tersier) |
| radius | 8px |
| font | inherit, 600 |
| padding | 8px 16px |

## Dipakai di
- [[Form Service Result]]: primer ungu/hijau mengikuti mode, 44px, 8px. Link ke app lain berupa tombol penuh; baris aksi "Coba simulasi" 44px. Sesuai.
- [[Checklist Unit Pendingin]]: `btn-primary2` biru #0d6efd, `btn-soft`/`btn-danger2` radius 11px, tinggi 44px, tapi font Arial 13.33px (tidak inherit); bar bawah "Langkah 1 dari 3" mengambang dengan bayangan.
- [[Persetujuan Pemasangan]]: acuan; tombol `.btn.sm` (Glosarium, Alur, Panduan, Simulasi) 34px tinggi (di bawah 44px); CTA `bigcard` besar ungu 104 sampai 106px dengan radius 16px.

Terkait: [[Warna]], [[Aksesibilitas]], [[Pola Mobile]]

Aturan batas: standar hanya menyentuh tampilan, bukan teks/label/config/id/output; lihat [[K-0001 Evaluasi tidak mengubah informasi]]. Ditemukan di review [[2026-W47]].

Cluster: [[Standar UI]]
