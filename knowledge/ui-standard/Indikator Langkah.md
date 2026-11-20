---
type: standard
area: komponen
updated: 2026-11-20
tags: [standard, ui/komponen]
---
# Indikator Langkah

## Aturan
- Tiga langkah dalam segmen pil: wadah #eef0f5 radius 9 sampai 10px; langkah aktif putih dengan teks primer gelap + nomor lingkaran primer putih; tidak aktif nomor abu, teks muted.
- Tiap langkah tombol (bisa diklik), tinggi min 36px (idealnya 44px), tampil nomor + nama; sticky di bawah header (`--ctx-h` 42px mobile / 46px desktop).
- Posisi dan urutan langkah mengikuti app; nama langkah tidak diubah.

## Token / nilai
| Properti | Nilai |
|---|---|
| wadah | #eef0f5, r9 |
| aktif | #fff, teks #5b3fd1 |
| nomor | 20 sampai 24px bulat |
| font | 12.5px / 600 |

## Dipakai di
- [[Form Service Result]]: tidak ada stepper formulir pada hub; ada daftar 5 langkah vertikal (nomor bulat primer, garis putus) di beranda; stepper di form ikut pola completion-nav.
- [[Checklist Unit Pendingin]]: stepper 3 kolom wadah #edf3f8 radius 14px, nomor 24px, aktif biru, tinggi 48 sampai 56px; font 11.5px/800 (kecil). Sudah dekat standar kecuali warna dan radius.
- [[Persetujuan Pemasangan]]: `step-tab` 36px tinggi, 12.48px; sesuai standar (acuan).

Terkait: [[Pola Mobile]], [[Tombol]]

Aturan batas: standar hanya menyentuh tampilan, bukan teks/label/config/id/output; lihat [[K-0001 Evaluasi tidak mengubah informasi]]. Ditemukan di review [[2026-W47]].

Cluster: [[Standar UI]]
