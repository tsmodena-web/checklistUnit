---
type: standard
area: komponen
updated: 2026-11-24
tags: [standard, ui/komponen]
---
# Tombol

## Aturan
- Primer: isi #7839EE, teks putih (5.80:1), radius 8px, bobot 600, hover #6927DA, aktif #5720B7. Satu primer per layar/langkah. Standar v2 mengikuti Legion ([[K-0003 Standar UI mengikuti Legion]]).
- Sekunder: putih, border #D0D5DD, teks #6927DA; bahaya isi: #D92D20 teks putih (4.83:1), hover #B42318; bahaya garis: putih, teks #B42318, border #FDA29B.
- Tinggi sentuh minimal 44px (tombol aksi utama dan navigasi langkah); .btn-sm 34px hanya untuk aksi tersier yang jaraknya lega.
- Ikon di kiri teks, ukuran 1rem. Aksi utama langkah (Lanjut) ditaruh di bar bawah lengket pada mobile.
- Fokus: outline 3px warna primer 35% + offset 2px.
- Bar bawah lengket (aksi Lanjut di mobile) boleh memakai `--ui-elev-3`; tombol sendiri tanpa bayangan.

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
- [[Persetujuan Pemasangan]]: acuan struktur; tombol `.btn.sm` (Glosarium, Alur, Panduan, Simulasi) 34px tinggi (di bawah 44px); CTA `bigcard` besar ungu 104 sampai 106px dengan radius 16px.

Terkait: [[Warna]], [[Aksesibilitas]], [[Pola Mobile]]

Aturan batas: standar hanya menyentuh tampilan, bukan teks/label/config/id/output; lihat [[K-0001 Evaluasi tidak mengubah informasi]]. Ditemukan di review [[2026-W47]].

Cluster: [[Standar UI]]
