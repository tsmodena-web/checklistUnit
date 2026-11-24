---
type: decision
id: K-0003
date: 2026-11-24
status: berlaku
tags: [decision, ui/standar]
---
# K-0003 Standar UI mengikuti Legion

**Keputusan.** Pemilik meminta standar UI bersama (v2) mengikuti Legion Design System Telkom (https://legion.digitaltelkom.id/). Token di `knowledge/_agen/standar-ui-v1.css` diganti dengan token Legion; nama blok tetap `<style id="standar-ui-v1">` agar kompatibel dengan ketiga aplikasi dan skrip kit. Typografi tidak ditentukan Legion, jadi tetap Inter/system-ui. Aturan K-0001 tidak berubah: hanya tampilan.

## Tabel token lama ke baru
| Token | Lama (v1) | Baru (v2 Legion) |
|---|---|---|
| ink | #1f2430 | #101828 |
| muted | #667085 | #667085 (tetap) |
| line | #e4e7ec | #EAECF0 |
| bg | #f6f7fb | #F9FAFB |
| border field | #d0d5dd | #D0D5DD (tetap) |
| primer | #7c5cf0 | #7839EE |
| primer hover | #5b3fd1 | #6927DA |
| primer aktif | (tidak ada) | #5720B7 |
| primer lembut | #f4f1ff | #F5F3FF |
| border primer | #ddd5fb | #DDD6FE |
| sekunder | (tidak ada) | #155EEF |
| bahaya | #c4321c | #D92D20 (hover #B42318) |
| latar/border bahaya | #fff1ee / #f3b9ae | #FEF3F2 / #FDA29B |
| waspada teks | #7a4a00 | #B54708 |
| waspada latar/border | #fff3d6 / #d99a00 | #FFFAEB / #F79009 |
| info teks | #1e40af | #155EEF |
| info latar/border | #e8f0ff / #7ea2f2 | #EFF4FF / #84ADFF |
| ok | #198754 | #027A48 |
| ok latar/border | #e8f6ee / #6fc69a | #ECFDF3 / #6CE9A6 |
| radius kartu | 10px | 12px |
| radius tombol/field | 8px | 8px (tetap) |
| radius ikon-tile | 9px | 8px |
| bayangan | tidak ada | token elev-1 dan elev-3; dipakai hanya di bar bawah lengket |

Skala penuh Legion (violet 25-900, abu 25-900, sukses/peringatan/error, radius 2/4/6/8/12/16/24) tersedia sebagai variabel `--ui-*`.

## Penyimpangan sengaja
- Latar lembut dan border status (#FEF3F2, #FFFAEB, #EFF4FF, #ECFDF3 dan border-nya) adalah turunan lokal; nilai Legion yang diterima hanya tingkat 500/600/700.
- Teks info memakai #155EEF (biru sekunder Legion), bukan info #1570EF, karena #1570EF hanya 4.57:1 di putih dan 3.99:1 di latar lembut.
- Teks status memakai tingkat 700; #039855 (3.73:1) dan #DC6803 (3.49:1) gagal AA sebagai teks, jadi hanya untuk ikon/penanda.
- Kontras putih di atas primer #7839EE 5.80:1 dan bahaya #D92D20 4.83:1 lolos AA, sehingga tidak perlu tingkat lebih gelap.
- Dipertahankan dari v1: target sentuh 44px, teks minimal 12px, fokus 3px primer 35% offset 2px, font Inter/system-ui, kartu tanpa bayangan.
- Pengecualian v1 tetap: tema warna per mode FSR dan CTA bigcard beranda Persetujuan.

Terkait: [[Warna]] · [[Spasi dan Radius]] · [[Tombol]] · [[Kartu dan Panel]] · [[Aksesibilitas]] · [[K-0001 Evaluasi tidak mengubah informasi]]
