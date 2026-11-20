---
type: standard
area: bahasa
updated: 2026-11-20
tags: [standard, ux/bahasa]
---
# Bahasa Antarmuka

## Aturan
- Bahasa Indonesia, kalimat pendek, kata kerja di awal untuk tombol (Mulai, Lanjut, Unduh). Istilah teknis (RON, WO, STOP) tetap sesuai SOP.
- Teks tidak diubah oleh evaluasi ([[K-0001 Evaluasi tidak mengubah informasi]]); standar ini hanya mencatat pola, perubahan kata lewat [[Checklist Config Manager]].
- Casing: judul Title Case seperlunya, label Sentence case.

## Token / nilai
| Pola | Contoh yang ada |
|---|---|
| tombol utama | Lanjut, Mulai Form Persetujuan, Buka form |
| status | OK / NG / NA; Berisiko / Waspada / STOP |
| peringatan | "Belum disimpan", "Wajib" |

## Dipakai di
- [[Form Service Result]]: campur Title Case dan kalimat; label tombol link panjang.
- [[Checklist Unit Pendingin]]: judul app "Form Service Result" di header padahal halaman Checklist Unit Pendingin (konteks, jangan ubah teks, hanya dicatat); label Inggris "Repair Indoor", "General Check".
- [[Persetujuan Pemasangan]]: konsisten Indonesia; badge "staging" tampil di header.

Terkait: [[Tombol]]

Aturan batas: standar hanya menyentuh tampilan, bukan teks/label/config/id/output; lihat [[K-0001 Evaluasi tidak mengubah informasi]]. Ditemukan di review [[2026-W47]].

Cluster: [[Standar UI]]
