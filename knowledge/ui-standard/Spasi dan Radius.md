---
type: standard
area: spasi
updated: 2026-11-24
tags: [standard, ui/spasi]
---
# Spasi dan Radius

## Aturan
- Skala spasi 4/8: 4, 8, 12, 16, 22, 24. Jarak antar kartu 12 sampai 16px; padding kartu 16px (mobile) sampai 20 sampai 22px (desktop).
- Radius skala Legion 2/4/6/8/12/16/24px. Kartu/panel 12px, tombol/field/step-tab/ikon-tile 8px, pil 999px. Pakai hanya nilai skala; hindari 10, 14, 18, 20px.
- Gutter halaman 16px di mobile; lebar konten maks 1120px (shell) atau 920px (form tunggal).
- Bayangan: tidak ada pada kartu. Token elevation Legion tersedia: `--ui-elev-1` 0 1px 0 rgba(0,0,0,.05) dan `--ui-elev-3` 0 2px 10px rgba(0,0,0,.1), 0 0 2px rgba(0,0,0,.2); dipakai hanya untuk bar bawah lengket bila perlu (elev-3).

## Token / nilai
| Token | Nilai |
|---|---|
| radius kartu/panel | 12px (`--ui-r-card`) |
| radius tombol/field | 8px (`--ui-r-ctl`) |
| radius ikon-tile | 8px (`--ui-r-tile`) |
| skala radius | 2/4/6/8/12/16/24px |
| elevation | elev-1, elev-3 (token; kartu tetap tanpa bayangan) |
| padding kartu | 16px mobile, 20 sampai 22px desktop |
| gap grid | 12px |
| shell | 1120px |

## Dipakai di
- [[Form Service Result]]: kartu 12px, tombol 8px (v2); 6px sisa di CSS dasar (dioverride).
- [[Checklist Unit Pendingin]]: menyimpang dari v2: radius 20px kartu, 18px tile, 12px field, 11px tombol, 14px stepper; bayangan 0 8px 30px; padding 22 sampai 26px; border-top 4px biru pada pilihan.
- [[Persetujuan Pemasangan]]: acuan struktur; radius v1 10px/8px perlu naik ke 12px/8px.

Terkait: [[Kartu dan Panel]], [[Tombol]]

Aturan batas: standar hanya menyentuh tampilan, bukan teks/label/config/id/output; lihat [[K-0001 Evaluasi tidak mengubah informasi]]. Ditemukan di review [[2026-W47]].

Cluster: [[Standar UI]]
