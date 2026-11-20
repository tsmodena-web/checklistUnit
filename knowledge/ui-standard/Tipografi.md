---
type: standard
area: tipografi
updated: 2026-11-20
tags: [standard, ui/tipografi]
---
# Tipografi

## Aturan
- Satu keluarga sans: "Inter", "Segoe UI", system-ui, -apple-system, Roboto, sans-serif. Tanpa font eksternal baru.
- Body 15 sampai 16px, line-height 1.5. Input minimal 16px di mobile (mencegah zoom iOS).
- Teks terkecil (hint, badge) tidak di bawah 12px; saat ini ada 10.56px di FSR dan 11.2 sampai 11.5px di dua app lain.

## Token / nilai
| Peran | Nilai |
|---|---|
| Judul halaman h1 | 1.4rem (22.4px) / 700 |
| Judul seksi h2/h3 | 1rem sampai 1.1rem (16 sampai 17.6px) / 700 |
| Brand | 1rem / 700, subjudul .75rem muted |
| Body | 15 sampai 16px / 400 |
| Label field | .88rem (14px) / 600 |
| Hint, muted | .82 sampai .9rem, warna muted |
| Tombol | 600 (.875rem untuk kecil) |
| Kecil (meta, step) | .76 sampai .78rem, jangan lebih kecil |

## Dipakai di
- [[Form Service Result]]: Inter, h1 22.4px, h2 16.8px, body 16px, min 10.56px (terlalu kecil).
- [[Checklist Unit Pendingin]]: system-ui/Arial, h1 clamp 26 sampai 34px / 750, h2 24px, label 14.4px / 800 (lebih berat); tombol jatuh ke Arial 13.33px karena tidak mewarisi font (`button` tanpa `font: inherit`); min 11.5px.
- [[Persetujuan Pemasangan]]: Segoe UI, h1 20.8 sampai 22.4px, body 15px (desktop), min 11.2px.

Terkait: [[Warna]], [[Bahasa Antarmuka]]

Aturan batas: standar hanya menyentuh tampilan, bukan teks/label/config/id/output; lihat [[K-0001 Evaluasi tidak mengubah informasi]]. Ditemukan di review [[2026-W47]].

Cluster: [[Standar UI]]
