---
type: decision
id: K-0001
date: 2026-11-20
status: berlaku
tags: [decision, ui, ux]
---
# K-0001 Evaluasi tidak mengubah informasi

**Keputusan.** Evaluasi UI mingguan hanya mengubah tampilan: CSS, struktur markup, ikon, susunan visual. Informasi yang sudah disetup tetap utuh.

**Yang tidak boleh berubah**
- Teks dan label yang terlihat pengguna, termasuk item checklist, acuan, dan teks form
- Isi `config/`, konstanta data di template, id, nama field, kunci draft (localStorage)
- Isi dan ukuran output JPG/PDF yang diunggah ke sistem

**Cara memastikan.** Sebelum PR dibuka: build berhasil, konstanta data identik dengan sebelum perubahan, dan teks halaman (innerText tiap langkah utama) identik sebelum dan sesudah.

**Alasan.** Isi form sudah divalidasi Technical Support dan dipakai teknisi di lapangan; perubahan isi hanya lewat [[Checklist Config Manager]].

Terkait: [[Evaluasi UI]], [[Standar UI]], [[Konvensi vault]]
