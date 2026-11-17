#!/usr/bin/env node
// Membuat preview/index.html: salinan index.html dengan Bootstrap CSS di-inline,
// supaya bisa dibuka di tempat yang memblokir stylesheet CDN (mis. artifact preview). Tidak dipush.
import fs from 'node:fs';
import path from 'node:path';
import { ROOT, build, OUTPUT } from './lib.mjs';

const r = build();
if (!r.ok) { console.error(r.errors.join('\n')); process.exit(1); }
const html = fs.readFileSync(path.join(ROOT, OUTPUT), 'utf8');
const css = fs.readFileSync(path.join(ROOT, 'node_modules/bootstrap/dist/css/bootstrap.min.css'), 'utf8').replace(/\/\*# sourceMappingURL=.*?\*\//g, '');
const link = /<link[^>]*bootstrap@[^>]*bootstrap\.min\.css[^>]*>/;
if (!link.test(html)) { console.error('Tag <link> Bootstrap tidak ditemukan'); process.exit(1); }
const out = html.replace(link, () => `<style>/* Bootstrap 5.3.8 (inline untuk preview) */\n${css}</style>`).replace(/<title>(.*?)<\/title>/, '<title>$1 (preview)</title>');
fs.mkdirSync(path.join(ROOT, 'preview'), { recursive: true });
fs.writeFileSync(path.join(ROOT, 'preview/index.html'), out);
console.log(`preview/index.html dibuat (${Buffer.byteLength(out)} byte)`);
