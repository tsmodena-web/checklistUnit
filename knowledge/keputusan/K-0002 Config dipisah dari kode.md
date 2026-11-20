---
type: decision
id: K-0002
date: 2026-11-20
status: berlaku
tags: [decision, config]
---
# K-0002 Config dipisah dari kode

**Keputusan.** Isi checklist tiap aplikasi disimpan di `config/*.json`; `index.html` dibangun dari `src/index.template.html` lewat `tools/core.mjs`. Logika validasi dan render yang sama dipakai di [[Checklist Config Manager]] untuk preview.

**Akibat.** Tim non-programmer bisa mengubah isi lewat manager; perubahan tampilan dilakukan di template dan dievaluasi lewat [[Evaluasi UI]].

Terkait: [[Aplikasi]], [[K-0001 Evaluasi tidak mengubah informasi]]
