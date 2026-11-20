// Shared helpers: load/save/validate config and render index.html from the template.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { FILES, TEMPLATE, OUTPUT, validate as validateCore, render, md } from './core.mjs';

export { FILES, TEMPLATE, OUTPUT, render, md };

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const abs = (rel, root = ROOT) => path.join(root, rel);

export function readJson(rel, root = ROOT) {
  return JSON.parse(fs.readFileSync(abs(rel, root), 'utf8'));
}

// Pretty JSON where short "rows" stay on one line, so git diffs show one item per line.
function hasObject(v) {
  if (Array.isArray(v)) return v.some(hasObject);
  return v !== null && typeof v === 'object';
}
export function fmt(v, ind = 0) {
  if (v === null || typeof v !== 'object') return JSON.stringify(v);
  const pad = '  '.repeat(ind);
  if (Array.isArray(v)) {
    if (!v.length) return '[]';
    const flat = JSON.stringify(v);
    if (!hasObject(v) && flat.length <= 200) return flat;
    return '[\n' + v.map((x) => pad + '  ' + fmt(x, ind + 1)).join(',\n') + '\n' + pad + ']';
  }
  const keys = Object.keys(v);
  if (!keys.length) return '{}';
  return '{\n' + keys.map((k) => pad + '  ' + JSON.stringify(k) + ': ' + fmt(v[k], ind + 1)).join(',\n') + '\n' + pad + '}';
}

export function loadConfig(root = ROOT) {
  const cfg = {};
  for (const [name, rel] of Object.entries(FILES)) cfg[name] = readJson(rel, root);
  return cfg;
}

export function saveConfig(name, value, root = ROOT) {
  if (!FILES[name]) throw new Error(`Unknown config "${name}". Valid: ${Object.keys(FILES).join(', ')}`);
  fs.writeFileSync(abs(FILES[name], root), fmt(value) + '\n');
}

export function validate(cfg, root = ROOT) {
  const r = validateCore(cfg);
  if (!fs.existsSync(abs(TEMPLATE, root))) r.errors.push(`${TEMPLATE} tidak ditemukan`);
  return r;
}

export function build(root = ROOT) {
  const cfg = loadConfig(root);
  const { errors, warnings } = validate(cfg, root);
  if (errors.length) return { ok: false, errors, warnings };
  const html = render(cfg, fs.readFileSync(abs(TEMPLATE, root), 'utf8'));
  const prev = fs.existsSync(abs(OUTPUT, root)) ? fs.readFileSync(abs(OUTPUT, root), 'utf8') : '';
  fs.writeFileSync(abs(OUTPUT, root), html);
  return { ok: true, errors, warnings, changed: prev !== html, bytes: Buffer.byteLength(html) };
}
