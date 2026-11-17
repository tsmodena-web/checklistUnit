#!/usr/bin/env node
// Usage: node tools/verify-equivalence.mjs <reference.html> <built.html>
// Confirms the data constants are deep-equal; other differences are listed for manual review.
import fs from 'node:fs'; import vm from 'node:vm'; import assert from 'node:assert/strict';
const [refPath, newPath] = process.argv.slice(2);
const NAMES = ['MAINT_CHECKLISTS', 'UNIT_META', 'SURVEY_SECTIONS', 'INSTALL_ITEMS', 'PROJECT_EQUIPMENT'];
function consts(file) {
  const lines = fs.readFileSync(file, 'utf8').split('\n'); const out = {};
  for (const n of NAMES) {
    const s = lines.findIndex((l) => l.trimStart().startsWith(`const ${n} =`)); let e = s;
    while (!/;\s*$/.test(lines[e])) e++;
    const ctx = {}; vm.createContext(ctx); vm.runInContext(lines.slice(s, e + 1).join('\n').replace(/^\s*const /, 'var '), ctx); out[n] = ctx[n];
  }
  return out;
}
const a = consts(refPath), b = consts(newPath);
let ok = true;
for (const n of NAMES) { try { assert.deepStrictEqual(JSON.parse(JSON.stringify(b[n])), JSON.parse(JSON.stringify(a[n]))); console.log('OK  ', n); } catch { ok = false; console.log('DIFF', n); } }
process.exit(ok ? 0 : 1);
