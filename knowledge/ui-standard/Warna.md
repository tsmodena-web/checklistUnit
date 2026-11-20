---
type: standard
area: warna
updated: 2026-11-20
tags: [standard, ui/warna]
---
# Warna

## Aturan
- Satu palet netral + satu warna primer. Acuan terbaik: [[Persetujuan Pemasangan]] (token CSS `--ink/--muted/--line/--bg/--ac*`), sudah ditiru [[Form Service Result]].
- Status memakai pasangan teks/latar/border (bukan warna tunggal): lihat tabel. Warna tidak boleh jadi satu-satunya penanda status (sertakan ikon/teks).
- Warna aksen per mode FSR (hijau Maintenance, oranye Instalasi, biru Survey) boleh tetap sebagai penanda konteks; primer standar tetap ungu untuk hub dan tombol umum.

## Token / nilai
| Token | Nilai |
|---|---|
| ink (teks) | #1f2430 |
| muted | #667085 |
| line (border) | #e4e7ec |
| bg halaman | #f6f7fb |
| permukaan kartu | #ffffff |
| primer `--ac` | #7c5cf0 |
| primer gelap `--ac-d` (hover, teks link) | #5b3fd1 |
| primer lembut `--ac-s` | #f4f1ff |
| border primer `--ac-b` | #ddd5fb |
| bahaya | #c4321c, latar #fff1ee, border #f3b9ae |
| waspada/peringatan | teks #7a4a00, latar #fff3d6, border #d99a00 |
| info | teks #1e40af, latar #e8f0ff, border #7ea2f2 |
| STOP | teks #8f1d0e, latar #ffe7e2, border #c4321c |
| ok | #198754 (teks #0f5c35, latar #e8f6ee, border #6fc69a) |
| border field | #d0d5dd |

## Dipakai di
- [[Form Service Result]]: mengikuti token standar via override di blok akhir CSS; lalu `body[data-theme]` mengganti `--ac` per mode (hijau #1f9d6b / oranye #e07b12 / biru #2f6fed) dan latar halaman ikut berwarna. Status OK/NG pakai Bootstrap #198754/#dc3545 (bukan token). Ada token lama bertumpuk (#263a4c, #0d6efd) di CSS dasar.
- [[Checklist Unit Pendingin]]: menyimpang total: primer biru #0d6efd, ink #263a4c, bg #f5f7fa, header gradien biru tua (#102d43 ke #0a4b86), border #dce6ef/#bfcdda, tombol bahaya #9c3030. Tidak ada token status.
- [[Persetujuan Pemasangan]]: acuan standar.

Terkait: [[Tombol]], [[Aksesibilitas]]

Aturan batas: standar hanya menyentuh tampilan, bukan teks/label/config/id/output; lihat [[K-0001 Evaluasi tidak mengubah informasi]]. Ditemukan di review [[2026-W47]].

Cluster: [[Standar UI]]
