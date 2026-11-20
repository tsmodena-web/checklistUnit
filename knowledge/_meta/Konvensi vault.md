---
type: meta
tags: [meta]
---
# Konvensi vault

Aturan ini dipakai manusia dan agen evaluasi supaya knowledge tetap rapi dan saling terhubung.

## Struktur folder
| Folder | Isi | Satu catatan = |
|---|---|---|
| `00-MOC/` | Map of Content, pintu masuk tiap cluster | satu topik besar |
| `apps/` | profil tiap aplikasi | satu aplikasi |
| `ui-standard/` | standar UI bersama (token, komponen, pola UX) | satu konsep atomik |
| `reviews/` | laporan evaluasi mingguan | satu minggu (`YYYY-Www`) |
| `findings/` | temuan UI/UX | satu masalah (`F-NNNN judul singkat`) |
| `keputusan/` | keputusan desain dan alasannya | satu keputusan (`K-NNNN judul`) |
| `_templates/` | template catatan baru | — |

## Frontmatter wajib
```yaml
type: app | standard | review | finding | decision | moc | meta
tags: [ui, ux, ...]
```
Field tambahan per tipe ada di `_templates/`.

## Tag (dipakai untuk cluster dan graph view)
- Aplikasi: `#app/fsr`, `#app/pendingin`, `#app/persetujuan`, `#app/manager`
- Bidang: `#ui/warna`, `#ui/tipografi`, `#ui/spasi`, `#ui/komponen`, `#ux/alur`, `#ux/aksesibilitas`, `#ux/mobile`, `#ux/bahasa`, `#ux/output`
- Status temuan: `#status/terbuka`, `#status/di-pr`, `#status/selesai`, `#status/ditolak`

## Tautan
- Tiap catatan menautkan minimal satu MOC dan satu catatan terkait dengan `[[Nama catatan]]`.
- Temuan selalu menautkan: aplikasinya (`[[Form Service Result]]` dll.), standar yang dilanggar (`[[Warna]]` dll.), dan review tempat ditemukan (`[[2026-W48]]`).
- Jangan menghapus catatan. Temuan yang selesai cukup diganti statusnya.

## Batas evaluasi otomatis
Evaluasi hanya boleh mengubah **tampilan** (CSS, struktur markup, ikon). Isi yang sudah disetup tidak boleh berubah: teks, label, item checklist, config, id, kunci draft, format dan isi output JPG/PDF. Lihat [[K-0001 Evaluasi tidak mengubah informasi]].
