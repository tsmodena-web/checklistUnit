---
type: standard
area: spasi
updated: 2026-11-20
tags: [standard, ui/spasi]
---
# Spasi dan Radius

## Aturan
- Skala spasi 4/8: 4, 8, 12, 16, 22, 24. Jarak antar kartu 12 sampai 16px; padding kartu 16px (mobile) sampai 20 sampai 22px (desktop).
- Radius: 10px untuk kartu/panel/field besar (`--r`), 8px untuk tombol, field, step-tab; pil 999px. Hindari 6px, 12px, 14 sampai 20px acak.
- Gutter halaman 16px di mobile; lebar konten maks 1120px (shell) atau 920px (form tunggal).
- Bayangan: tidak ada pada kartu; hanya cincin fokus atau hover lembut.

## Token / nilai
| Token | Nilai |
|---|---|
| radius kartu | 10px |
| radius tombol/field | 8px (field boleh 10px) |
| radius ikon-tile | 9px |
| padding kartu | 16px mobile, 20 sampai 22px desktop |
| gap grid | 12px |
| shell | 1120px |

## Dipakai di
- [[Form Service Result]]: 10px kartu, 8px tombol, 6px sisa di CSS dasar (dioverride). Sesuai.
- [[Checklist Unit Pendingin]]: menyimpang: radius 20px kartu, 18px tile, 12px field, 11px tombol, 14px stepper; bayangan 0 8px 30px; padding 22 sampai 26px; border-top 4px biru pada pilihan.
- [[Persetujuan Pemasangan]]: acuan (10px/8px).

Terkait: [[Kartu dan Panel]], [[Tombol]]

Aturan batas: standar hanya menyentuh tampilan, bukan teks/label/config/id/output; lihat [[K-0001 Evaluasi tidak mengubah informasi]]. Ditemukan di review [[2026-W47]].

Cluster: [[Standar UI]]
