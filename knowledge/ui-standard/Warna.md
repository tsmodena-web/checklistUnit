---
type: standard
area: warna
updated: 2026-11-24
tags: [standard, ui/warna]
---
# Warna

## Aturan
- Standar v2 mengikuti Legion Design System Telkom (https://legion.digitaltelkom.id/): primer violet, netral abu Legion, status sukses/peringatan/error/info Legion. Lihat [[K-0003 Standar UI mengikuti Legion]]. Token di `knowledge/_agen/standar-ui-v1.css` (nama blok `standar-ui-v1` tetap).
- Teks status memakai tingkat 700 (ok #027A48, peringatan #B54708, error #B42318 bila di atas latar lembut); tingkat 600 ok/peringatan (#039855/#DC6803) hanya untuk ikon/penanda karena kontras < 4.5:1. Latar lembut status adalah turunan lokal (Legion tidak memberi nilainya).
- Status memakai pasangan teks/latar/border (bukan warna tunggal): lihat tabel. Warna tidak boleh jadi satu-satunya penanda status (sertakan ikon/teks).
- Warna aksen per mode FSR (hijau Maintenance, oranye Instalasi, biru Survey) boleh tetap sebagai penanda konteks; primer standar tetap ungu untuk hub dan tombol umum.

## Token / nilai
| Token | Nilai (v2 Legion) |
|---|---|
| ink (teks) | #101828 (gray 900) |
| muted | #667085 (gray 500; 4.76:1 di bg) |
| line (border) | #EAECF0 (gray 200) |
| bg halaman | #F9FAFB (gray 50) |
| permukaan kartu | #ffffff |
| primer `--ac` | #7839EE (violet 600; putih di atasnya 5.80:1) |
| primer hover `--ac-d` | #6927DA (violet 700; 7.23:1) |
| primer aktif | #5720B7 (violet 800) |
| primer lembut `--ac-s` | #F5F3FF (violet 50) |
| border primer `--ac-b` | #DDD6FE (violet 200) |
| sekunder | #155EEF (biru 600) |
| bahaya | #D92D20 (4.83:1 dengan putih), hover #B42318, latar #FEF3F2, border #FDA29B |
| waspada/peringatan | teks #B54708, latar #FFFAEB, border #F79009 |
| info | teks #155EEF, latar #EFF4FF, border #84ADFF (info Legion #1570EF hanya 4.57:1 di putih dan 3.99:1 di latar lembut) |
| STOP | teks #B42318, latar #FEF3F2, border #D92D20 |
| ok | teks #027A48 (5.41:1), latar #ECFDF3, border #6CE9A6; penanda #12B76A/#039855 |
| border field | #D0D5DD (gray 300) |

Skala lengkap (violet 25-900, abu 25-900, status 500/600/700) ada sebagai token `--ui-violet-*`, `--ui-gray-*` dst. di CSS standar.

## Dipakai di
- [[Form Service Result]]: mengikuti token standar via override di blok akhir CSS; lalu `body[data-theme]` mengganti `--ac` per mode (hijau #1f9d6b / oranye #e07b12 / biru #2f6fed) dan latar halaman ikut berwarna. Status OK/NG pakai Bootstrap #198754/#dc3545 (bukan token). Ada token lama bertumpuk (#263a4c, #0d6efd) di CSS dasar.
- [[Checklist Unit Pendingin]]: menyimpang total: primer biru #0d6efd, ink #263a4c, bg #f5f7fa, header gradien biru tua (#102d43 ke #0a4b86), border #dce6ef/#bfcdda, tombol bahaya #9c3030. Tidak ada token status.
- [[Persetujuan Pemasangan]]: acuan standar.

Terkait: [[Tombol]], [[Aksesibilitas]]

Aturan batas: standar hanya menyentuh tampilan, bukan teks/label/config/id/output; lihat [[K-0001 Evaluasi tidak mengubah informasi]]. Ditemukan di review [[2026-W47]].

Cluster: [[Standar UI]]
