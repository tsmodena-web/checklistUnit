---
type: standard
area: komponen
updated: 2026-11-24
tags: [standard, ui/komponen]
---
# Kartu dan Panel

## Aturan
- Kartu: latar putih, border 1px #EAECF0, radius 12px, tanpa bayangan, padding 16 (mobile) / 20 sampai 22 (desktop).
- Kartu pilihan (tile): ikon 36px dalam kotak radius 8px berlatar primer lembut (#F5F3FF), judul 15 sampai 16px / 700, deskripsi 13px muted, meta primer-gelap (#6927DA) 12px. Aktif: border primer #7839EE + latar #F5F3FF + ring 3px primer 12%.
- Panel info/peringatan: latar status lembut + border status + ikon (lihat [[Warna]]).
- Header halaman putih, sticky, border bawah 1px; brand dengan ikon 34px primer radius 8px.
- Bayangan hanya pada bar bawah lengket (`--ui-elev-3`); kartu tanpa bayangan. Standar v2 mengikuti Legion ([[K-0003 Standar UI mengikuti Legion]]).

## Token / nilai
| Properti | Nilai |
|---|---|
| border | 1px #EAECF0 |
| radius | 12px |
| shadow | none (bar bawah lengket: elev-3) |
| tile ikon | 36px / r8 |

## Dipakai di
- [[Form Service Result]]: override v1; perlu naik ke radius 12px; tile 93 sampai 155px; mode berwarna menimbulkan latar halaman berwarna.
- [[Checklist Unit Pendingin]]: menyimpang: kartu radius 20px + bayangan, tile border-top 4px biru radius 18px, header gradien biru gelap tanpa ikon, ikon tile tidak tampil pada render offline (font ikon CDN).
- [[Persetujuan Pemasangan]]: acuan; kartu CTA `bigcard` ungu penuh adalah pengecualian untuk aksi utama beranda.

Terkait: [[Warna]], [[Spasi dan Radius]]

Aturan batas: standar hanya menyentuh tampilan, bukan teks/label/config/id/output; lihat [[K-0001 Evaluasi tidak mengubah informasi]]. Ditemukan di review [[2026-W47]].

Cluster: [[Standar UI]]
