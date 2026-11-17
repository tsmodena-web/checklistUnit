#!/usr/bin/env node
import { build } from './lib.mjs';
const r = build();
for (const w of r.warnings) console.warn('WARN :', w);
if (!r.ok) { for (const e of r.errors) console.error('ERROR:', e); process.exit(1); }
console.log(`index.html ${r.changed ? 'diperbarui' : 'tidak berubah'} (${r.bytes} byte)`);
