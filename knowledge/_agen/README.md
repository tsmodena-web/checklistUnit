---
type: meta
tags: [meta, agen]
---
# Kit agen evaluasi UI

Bahan siap pakai agar agen Sonnet di evaluasi mingguan tidak menulis ulang brief dan skrip setiap minggu. Terkait: [[Evaluasi UI]] · [[Standar UI]] · [[K-0001 Evaluasi tidak mengubah informasi]]

## Isi
- `brief-agen-aplikasi.md` — brief lengkap agen per aplikasi (aturan K-0001, token standar, tugas a–e, format JSON). Ganti `<minggu>`.
- `standar-ui-v1.css` — blok `<style id="standar-ui-v1">` yang harus IDENTIK byte-per-byte di ketiga aplikasi. Ubah hanya di sini, lalu salin ke ketiga repo dalam satu putaran.
- `scripts/verify-script.mjs` — `node verify-script.mjs <id> <template-base> <index-base> <template-baru> <index-baru>`: blok `<script>` identik + deepStrictEqual konstanta data. Exit 0 = lulus.
- `scripts/verify-text-pendingin.py`, `scripts/verify-text-persetujuan.py` — `python3 -I <skrip> <index-base> <index-baru>`: innerText semua layar utama (390 & 1280) + ukuran area output. Baris terakhir `ALL OK`/`ALL True` = lulus.
- `scripts/capture-fsr.py` — `python3 -I capture-fsr.py <index.html> <out.json> [dir-screenshot]`: tangkap innerText + ukuran output semua layar FSR; jalankan untuk BASE dan baru, lalu bandingkan kedua JSON.
- `scripts/screenshots.py` — `python3 -I screenshots.py <dir-out> <fsr-index> <pendingin-index> <persetujuan-index>`: screenshot layar utama ketiga app.
Cap waktu runtime di preview dinormalkan menjadi `<WAKTU>`. Jalankan Python dari `/tmp` dengan `-I`; Chrome di `/usr/bin/google-chrome`.

## Aturan efisiensi agen
1. Satu agen per tugas yang benar-benar perlu; lewati aplikasi yang tidak berubah sejak review terakhir.
2. Brief ke agen berupa path file (`brief-agen-aplikasi.md`) + parameter singkat, bukan menyalin ulang isi.
3. Agen memakai skrip di sini; menulis skrip baru hanya bila layar baru belum tercakup, lalu menyimpannya kembali ke folder ini.
4. Agen mengembalikan JSON ringkas saja, tanpa narasi panjang.
5. BASE untuk verifikasi selalu branch tujuan PR, bukan commit sebelumnya.
