---
type: standard
area: pola
updated: 2026-11-20
tags: [standard, ux/mobile]
---
# Pola Mobile

## Aturan
- Desain pertama 390px: tanpa scroll horizontal (diverifikasi, ketiganya lolos), satu kolom, gutter 16px.
- Header kompak dan sticky; bar konteks/langkah menempel di bawahnya; aksi utama (Lanjut) di bar bawah lengket dengan safe-area.
- Grid 2 kolom turun jadi 1 kolom di bawah 560 sampai 700px; tile pilihan menumpuk penuh lebar.
- Tanda tangan di layar penuh dengan rotasi lanskap pada portrait sempit (pola persetujuan).
- Target sentuh 44px; jarak antar target 8px.

## Token / nilai
| Breakpoint | Nilai |
|---|---|
| mobile | <= 560 sampai 600px |
| tablet | <= 700 sampai 900px |
| shell | 1120px |

## Dipakai di
- [[Form Service Result]]: lolos; sticky header di desktop, statis di mobile; daftar unit panjang tanpa pencarian lengket.
- [[Checklist Unit Pendingin]]: bar "Langkah x dari 3" mengambang menutup field (overlap konten pada screenshot step1); tombol aksi atas (Ganti Form/Simpan Draft/Reset) berderet rapat di atas stepper.
- [[Persetujuan Pemasangan]]: lengket konteks + "Lanjut" bar bawah; juga menutup sebagian konten saat full-page.

Terkait: [[Tombol]], [[Indikator Langkah]]

Aturan batas: standar hanya menyentuh tampilan, bukan teks/label/config/id/output; lihat [[K-0001 Evaluasi tidak mengubah informasi]]. Ditemukan di review [[2026-W47]].

Cluster: [[Standar UI]]
