# Form Service Result — config & MCP

Halaman `index.html` **dibangun** dari config JSON, jadi isi form bisa diubah tanpa menyentuh kode.

```
config/            <- yang diedit (data)
  units.json         tipe unit: label, ikon, alat persiapan
  checklists.json    checklist Maintenance per unit  [kelompok, item, acuan]
  equipment.json     item "Kelengkapan Project"       ("PAM JAYA" = diganti nama project)
  projects.json      tombol project (selain Regular / Project lainnya)
  survey.json        parameter Survey lokasi (RO)
  installation.json  pemeriksaan Instalasi (RO)
  home.json          teks home, banner quicklink, flowchart
src/index.template.html   kode aplikasi (jarang diubah)
tools/build.mjs           config + template  ->  index.html
tools/mcp-server.mjs      MCP server untuk mengedit config lewat Claude
index.html                HASIL build (file yang disajikan GitHub Pages) — jangan diedit manual
```

## Cara pakai tanpa MCP
1. Edit file di `config/`.
2. `npm install` (sekali), lalu `npm run build`. Build menolak config yang tidak valid.
3. Buka `index.html`, cek, lalu commit & push.

Untuk preview di tempat yang memblokir CDN (mis. artifact claude.ai): `npm run preview` membuat `preview/index.html` dengan Bootstrap di-inline (tidak ikut di-commit). Tombol unduh JPG/PDF tidak berfungsi di artifact.

## Cara pakai dengan MCP (disarankan)
Butuh Node 18+. Jalankan sekali di folder repo: `npm install`.

**Claude Code**
```
claude mcp add fsr-config -- node /path/ke/repo/tools/mcp-server.mjs
```

**Claude Desktop** (`claude_desktop_config.json`)
```json
{
  "mcpServers": {
    "fsr-config": {
      "command": "node",
      "args": ["/path/ke/repo/tools/mcp-server.mjs"]
    }
  }
}
```

Contoh perintah ke Claude: *"tambah item 'Cek bocor body' di checklist Kulkas setelah item gasket"*, *"tambah project PDAM X"*, *"ganti judul banner quicklink"*, *"tambah unit Freezer salin dari Kulkas"*.

Setiap perubahan: **validasi → simpan config → build ulang `index.html`**. Tidak ada yang dipush sampai tool `publish_git` dipanggil dengan `confirm=true`. Branch default = branch aktif; push ke `main` berarti langsung live di GitHub Pages, jadi disarankan review di branch/preview dulu.

## Yang terkunci oleh kode (validasi akan menolak)
- Unit `ro` harus tetap **20 baris** (12 inti + 7 filter + 1 Informasi Produk). Teks boleh diubah, tambah/hapus baris tidak.
- Unit `ro` tidak bisa dihapus (Survey dan Instalasi hanya untuk RO).
- Project `pam_jaya` dan `scb` masih dirujuk logika migrasi draft lama.
- Aturan khusus "PAM Jaya + RO" (filter sesuai model) ada di kode, bukan di config.
- Project baru memakai aturan umum: checklist unit reguler + item Kelengkapan Project.
