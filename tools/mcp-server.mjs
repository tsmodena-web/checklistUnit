#!/usr/bin/env node
// MCP server (stdio) untuk mengubah konfigurasi Form Service Result.
// Setiap perubahan: validasi -> simpan config/*.json -> build ulang index.html.
// Tidak ada yang dipush ke GitHub kecuali tool `publish_git` dipanggil dengan confirm=true.
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';
import { FILES, OUTPUT, ROOT, build, loadConfig, saveConfig, validate } from './lib.mjs';

const server = new McpServer({ name: 'fsr-config', version: '1.0.0' });

const text = (obj) => ({ content: [{ type: 'text', text: typeof obj === 'string' ? obj : JSON.stringify(obj, null, 2) }] });
const fail = (msg) => ({ isError: true, content: [{ type: 'text', text: msg }] });
const clone = (v) => JSON.parse(JSON.stringify(v));
const git = (...args) => execFileSync('git', args, { cwd: ROOT, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).trim();

// Terapkan perubahan ke beberapa file config sekaligus. Tidak ada yang tersimpan kalau validasi gagal.
function apply(changes, summary) {
  const cfg = loadConfig();
  const next = { ...cfg, ...changes };
  const { errors, warnings } = validate(next);
  if (errors.length) return fail('Perubahan DITOLAK, tidak ada yang tersimpan:\n- ' + errors.join('\n- '));
  for (const [name, value] of Object.entries(changes)) saveConfig(name, value);
  const built = build();
  if (!built.ok) return fail('Build gagal setelah menyimpan:\n- ' + built.errors.join('\n- '));
  return text({ ok: true, summary, files: Object.keys(changes).map((n) => FILES[n]), index_html: `${built.bytes} byte`, warnings });
}

const idx = (arr, i, label) => {
  if (!Number.isInteger(i) || i < 0 || i >= arr.length) throw new Error(`${label}: index ${i} di luar rentang 0..${arr.length - 1}`);
  return i;
};
const safe = (fn) => async (args) => { try { return await fn(args); } catch (e) { return fail(String(e.message || e)); } };

// ---------------- baca ----------------
server.registerTool('overview', {
  title: 'Ringkasan konfigurasi',
  description: 'Ringkasan: jumlah item per unit, project, banner home, dan status git. Panggil ini dulu.',
  inputSchema: {},
}, safe(() => {
  const c = loadConfig();
  let status = '';
  try { status = git('status', '--short'); } catch { status = '(git tidak tersedia)'; }
  return text({
    units: Object.fromEntries(Object.entries(c.units).map(([id, u]) => [id, `${u.label} (${c.checklists[id]?.length ?? 0} item)`])),
    projects: c.projects, project_equipment_items: c.equipment.length,
    installation_items: c.installation.length,
    survey: c.survey.map((s) => `${s[0]} (${s[1].length})`),
    quicklink: { enabled: c.home.quicklink?.enabled !== false, title: c.home.quicklink?.title, url: c.home.quicklink?.url },
    git_status: status || 'bersih',
  });
}));

server.registerTool('list_units', { title: 'Daftar unit', description: 'Daftar tipe unit beserta label, ikon, dan alat persiapan.', inputSchema: {} },
  safe(() => text(loadConfig().units)));

server.registerTool('get_checklist', {
  title: 'Lihat checklist unit',
  description: 'Tampilkan semua baris checklist Maintenance sebuah unit, lengkap dengan index. Baris: [kelompok, item, acuan].',
  inputSchema: { unit: z.string().describe('id unit, mis. fridge, ac, ro') },
}, safe(({ unit }) => {
  const rows = loadConfig().checklists[unit];
  if (!rows) return fail(`Unit "${unit}" tidak ditemukan`);
  return text(rows.map((r, i) => ({ index: i, kelompok: r[0], item: r[1], acuan: r[2] })));
}));

server.registerTool('get_home', { title: 'Lihat teks home & panduan', description: 'Isi config home: paragraf intro, banner quicklink, dan flowchart.', inputSchema: {} },
  safe(() => text(loadConfig().home)));

server.registerTool('get_survey', { title: 'Lihat parameter survey', description: 'Seksi dan baris survey lokasi (khusus RO). Baris: [parameter, acuan, satuan, tipe, opsi?].', inputSchema: {} },
  safe(() => text(loadConfig().survey.map((s, si) => ({ section_index: si, judul: s[0], baris: s[1].map((r, ri) => ({ index: ri, row: r })) })))));

server.registerTool('get_installation_items', { title: 'Lihat item instalasi', description: 'Daftar pemeriksaan Instalasi RO dengan index.', inputSchema: {} },
  safe(() => text(loadConfig().installation.map((t, i) => ({ index: i, text: t })))));

server.registerTool('get_project_equipment', { title: 'Lihat kelengkapan project', description: 'Item "Kelengkapan Project" yang ditambahkan ke Maintenance untuk project non-Regular. Token "PAM JAYA" otomatis diganti nama project.', inputSchema: {} },
  safe(() => text(loadConfig().equipment.map((r, i) => ({ index: i, kelompok: r[0], item: r[1], acuan: r[2] })))));

// ---------------- checklist per unit ----------------
const row = { group: z.string().describe('Kelompok, mis. "Pemeriksaan"'), item: z.string().describe('Nama item pengecekan'), standard: z.string().describe('Acuan / standar') };

server.registerTool('add_checklist_item', {
  title: 'Tambah item checklist',
  description: 'Tambah satu baris ke checklist Maintenance sebuah unit. Tidak berlaku untuk unit "ro" (strukturnya terkunci oleh kode).',
  inputSchema: { unit: z.string(), ...row, after_index: z.number().int().optional().describe('Sisipkan setelah index ini. Kosong = di akhir') },
}, safe(({ unit, group, item, standard, after_index }) => {
  const c = loadConfig();
  if (!c.checklists[unit]) return fail(`Unit "${unit}" tidak ditemukan`);
  const rows = clone(c.checklists[unit]);
  const at = after_index === undefined ? rows.length : idx(rows, after_index, 'after_index') + 1;
  rows.splice(at, 0, [group, item, standard]);
  return apply({ checklists: { ...c.checklists, [unit]: rows } }, `Item "${item}" ditambahkan ke ${unit} di index ${at}`);
}));

server.registerTool('update_checklist_item', {
  title: 'Ubah item checklist',
  description: 'Ubah kelompok / item / acuan pada baris index tertentu. Field yang tidak diisi tidak berubah.',
  inputSchema: { unit: z.string(), index: z.number().int(), group: z.string().optional(), item: z.string().optional(), standard: z.string().optional() },
}, safe(({ unit, index, group, item, standard }) => {
  const c = loadConfig(); if (!c.checklists[unit]) return fail(`Unit "${unit}" tidak ditemukan`);
  const rows = clone(c.checklists[unit]); const i = idx(rows, index, 'index'); const r = rows[i];
  rows[i] = [group ?? r[0], item ?? r[1], standard ?? r[2]];
  return apply({ checklists: { ...c.checklists, [unit]: rows } }, `${unit}[${i}] diubah: ${JSON.stringify(r)} -> ${JSON.stringify(rows[i])}`);
}));

server.registerTool('remove_checklist_item', {
  title: 'Hapus item checklist',
  description: 'Hapus baris checklist pada index tertentu. Tidak berlaku untuk unit "ro".',
  inputSchema: { unit: z.string(), index: z.number().int() },
}, safe(({ unit, index }) => {
  const c = loadConfig(); if (!c.checklists[unit]) return fail(`Unit "${unit}" tidak ditemukan`);
  const rows = clone(c.checklists[unit]); const i = idx(rows, index, 'index'); const [gone] = rows.splice(i, 1);
  return apply({ checklists: { ...c.checklists, [unit]: rows } }, `Dihapus ${unit}[${i}]: ${JSON.stringify(gone)}`);
}));

// ---------------- unit ----------------
server.registerTool('add_unit', {
  title: 'Tambah tipe unit',
  description: 'Tambah tipe unit baru. Checklist awal diisi dengan menyalin unit lain (copy_checklist_from) atau dengan daftar items [[kelompok,item,acuan],...].',
  inputSchema: {
    id: z.string().describe('huruf kecil/angka/underscore, mis. "freezer"'), label: z.string(),
    icon: z.string().describe('Nama Bootstrap Icon tanpa "bi-", mis. "snow"'),
    prep: z.array(z.string()).default([]).describe('Alat/persiapan yang ditampilkan di form'),
    copy_checklist_from: z.string().optional(), items: z.array(z.tuple([z.string(), z.string(), z.string()])).optional(),
  },
}, safe(({ id, label, icon, prep, copy_checklist_from, items }) => {
  const c = loadConfig();
  if (c.units[id]) return fail(`Unit "${id}" sudah ada`);
  if (copy_checklist_from && !c.checklists[copy_checklist_from]) return fail(`Unit sumber "${copy_checklist_from}" tidak ditemukan`);
  const rows = items ?? (copy_checklist_from ? clone(c.checklists[copy_checklist_from]) : null);
  if (!rows) return fail('Isi copy_checklist_from atau items');
  return apply({ units: { ...c.units, [id]: { label, icon, prep } }, checklists: { ...c.checklists, [id]: rows } }, `Unit "${label}" (${id}) ditambahkan dengan ${rows.length} item`);
}));

server.registerTool('update_unit', {
  title: 'Ubah tipe unit',
  description: 'Ubah label, ikon, atau daftar persiapan sebuah unit.',
  inputSchema: { id: z.string(), label: z.string().optional(), icon: z.string().optional(), prep: z.array(z.string()).optional() },
}, safe(({ id, label, icon, prep }) => {
  const c = loadConfig(); if (!c.units[id]) return fail(`Unit "${id}" tidak ditemukan`);
  const u = { ...c.units[id], ...(label !== undefined && { label }), ...(icon !== undefined && { icon }), ...(prep !== undefined && { prep }) };
  return apply({ units: { ...c.units, [id]: u } }, `Unit ${id} diubah`);
}));

server.registerTool('remove_unit', {
  title: 'Hapus tipe unit',
  description: 'Hapus tipe unit beserta checklist-nya. Unit "ro" tidak bisa dihapus.',
  inputSchema: { id: z.string() },
}, safe(({ id }) => {
  const c = loadConfig(); if (!c.units[id]) return fail(`Unit "${id}" tidak ditemukan`);
  if (id === 'ro') return fail('Unit "ro" tidak boleh dihapus');
  const units = { ...c.units }; const checklists = { ...c.checklists }; delete units[id]; delete checklists[id];
  return apply({ units, checklists }, `Unit ${id} dihapus`);
}));

// ---------------- project ----------------
server.registerTool('list_projects', { title: 'Daftar project', description: 'Daftar project selain "Regular" dan "Project lainnya".', inputSchema: {} },
  safe(() => text(loadConfig().projects)));

server.registerTool('add_project', {
  title: 'Tambah project',
  description: 'Tambah opsi project standar (muncul sebagai tombol di langkah 3). Memakai aturan umum: checklist unit reguler + item Kelengkapan Project.',
  inputSchema: { id: z.string().describe('mis. "pdam_x"'), label: z.string().describe('Nama tampil, mis. "PDAM X"') },
}, safe(({ id, label }) => {
  const c = loadConfig(); if (c.projects.some((p) => p.id === id)) return fail(`Project "${id}" sudah ada`);
  return apply({ projects: [...c.projects, { id, label }] }, `Project "${label}" ditambahkan`);
}));

server.registerTool('update_project', {
  title: 'Ubah nama project', description: 'Ubah nama tampil project.', inputSchema: { id: z.string(), label: z.string() },
}, safe(({ id, label }) => {
  const c = loadConfig(); if (!c.projects.some((p) => p.id === id)) return fail(`Project "${id}" tidak ditemukan`);
  return apply({ projects: c.projects.map((p) => (p.id === id ? { ...p, label } : p)) }, `Project ${id} -> "${label}"`);
}));

server.registerTool('remove_project', { title: 'Hapus project', description: 'Hapus opsi project. Draft lama dengan project ini tidak lagi bisa dipilih.', inputSchema: { id: z.string() } },
  safe(({ id }) => {
    const c = loadConfig(); if (!c.projects.some((p) => p.id === id)) return fail(`Project "${id}" tidak ditemukan`);
    return apply({ projects: c.projects.filter((p) => p.id !== id) }, `Project ${id} dihapus`);
  }));

server.registerTool('set_project_equipment', {
  title: 'Ganti item kelengkapan project',
  description: 'Ganti SELURUH daftar item Kelengkapan Project. Baris: [kelompok, item, acuan]. Pakai token "PAM JAYA" sebagai pengganti nama project.',
  inputSchema: { rows: z.array(z.tuple([z.string(), z.string(), z.string()])).min(1) },
}, safe(({ rows }) => apply({ equipment: rows }, `Kelengkapan project diganti (${rows.length} item)`)));

// ---------------- home ----------------
server.registerTool('update_home', {
  title: 'Ubah teks home / quicklink / flowchart',
  description: 'Ubah satu nilai di config home lewat path bertitik, mis. "quicklink.title", "quicklink.url", "quicklink.flow.yes", "quicklink.enabled" (true/false), "intro.1.text". Teks mendukung **tebal** dan [label](url).',
  inputSchema: { path: z.string(), value: z.union([z.string(), z.boolean()]) },
}, safe(({ path: p, value }) => {
  const c = loadConfig(); const home = clone(c.home); const keys = p.split('.');
  let node = home;
  for (const k of keys.slice(0, -1)) { if (node[k] === undefined) return fail(`Path "${p}" tidak ada (berhenti di "${k}")`); node = node[k]; }
  const last = keys.at(-1);
  if (!(last in node)) return fail(`Path "${p}" tidak ada. Lihat get_home untuk path yang valid.`);
  const before = node[last]; node[last] = value;
  return apply({ home }, `home.${p}: ${JSON.stringify(before)} -> ${JSON.stringify(value)}`);
}));

// ---------------- instalasi & survey (RO) ----------------
server.registerTool('edit_installation_item', {
  title: 'Edit item instalasi RO',
  description: 'action=add (text, after_index?) | update (index, text) | remove (index).',
  inputSchema: { action: z.enum(['add', 'update', 'remove']), index: z.number().int().optional(), after_index: z.number().int().optional(), text: z.string().optional() },
}, safe(({ action, index, after_index, text: t }) => {
  const list = clone(loadConfig().installation);
  if (action === 'add') { if (!t) return fail('text wajib'); const at = after_index === undefined ? list.length : idx(list, after_index, 'after_index') + 1; list.splice(at, 0, t); }
  if (action === 'update') { if (!t) return fail('text wajib'); list[idx(list, index, 'index')] = t; }
  if (action === 'remove') list.splice(idx(list, index, 'index'), 1);
  return apply({ installation: list }, `Instalasi: ${action} (${list.length} item sekarang)`);
}));

server.registerTool('edit_survey_row', {
  title: 'Edit parameter survey RO',
  description: 'action=add (section_index, row) | update (section_index, index, row) | remove (section_index, index). row = [parameter, acuan, satuan, tipe(select/number/quantity/yesno), opsi?]. Total parameter ikut otomatis.',
  inputSchema: { action: z.enum(['add', 'update', 'remove']), section_index: z.number().int(), index: z.number().int().optional(), row: z.array(z.any()).optional() },
}, safe(({ action, section_index, index, row: r }) => {
  const survey = clone(loadConfig().survey); const sec = survey[idx(survey, section_index, 'section_index')][1];
  if (action === 'add') { if (!r) return fail('row wajib'); sec.push(r); }
  if (action === 'update') { if (!r) return fail('row wajib'); sec[idx(sec, index, 'index')] = r; }
  if (action === 'remove') sec.splice(idx(sec, index, 'index'), 1);
  return apply({ survey }, `Survey seksi ${section_index}: ${action}`);
}));

// ---------------- build, cek, publish ----------------
server.registerTool('validate', { title: 'Validasi config', description: 'Cek semua config tanpa menyimpan apa pun.', inputSchema: {} },
  safe(() => { const r = validate(loadConfig()); return text({ valid: r.errors.length === 0, ...r }); }));

server.registerTool('build', { title: 'Build index.html', description: 'Bangun ulang index.html dari config + template (otomatis dipanggil setelah tiap perubahan).', inputSchema: {} },
  safe(() => { const r = build(); return r.ok ? text(r) : fail(r.errors.join('\n')); }));

server.registerTool('preview_info', {
  title: 'Info file preview',
  description: 'Lokasi dan ukuran index.html hasil build, untuk dibuka di browser atau dipublish sebagai artifact preview sebelum push.',
  inputSchema: {},
}, safe(() => {
  const p = path.join(ROOT, OUTPUT); const s = fs.statSync(p);
  return text({ path: p, bytes: s.size, modified: s.mtime.toISOString(), tip: 'Buka file ini di browser, atau publish sebagai artifact privat untuk review.' });
}));

server.registerTool('git_diff', {
  title: 'Lihat perubahan git',
  description: 'Ringkasan perubahan yang belum di-commit (config, template, index.html).',
  inputSchema: { full: z.boolean().default(false).describe('true = tampilkan diff config/ lengkap') },
}, safe(({ full }) => {
  const stat = git('diff', '--stat', '--', 'config', 'src', 'tools', OUTPUT);
  const body = full ? git('diff', '--', 'config') : '';
  return text(`${stat || '(tidak ada perubahan)'}${body ? '\n\n' + body.slice(0, 12000) : ''}`);
}));

server.registerTool('publish_git', {
  title: 'Commit & push ke GitHub',
  description: 'Commit config/, src/, tools/, index.html lalu push. HARUS confirm=true. Default push ke branch yang sedang aktif; push ke main berarti langsung live di GitHub Pages.',
  inputSchema: {
    message: z.string().min(5).describe('Pesan commit'),
    branch: z.string().optional().describe('Branch tujuan. Default: branch aktif'),
    confirm: z.boolean().describe('Harus true. Tanyakan ke user dulu sebelum mengisi true.'),
  },
}, safe(({ message, branch, confirm }) => {
  if (confirm !== true) return fail('Ditolak: confirm harus true setelah user menyetujui.');
  const current = git('rev-parse', '--abbrev-ref', 'HEAD'); const target = branch ?? current;
  if (target !== current) git('checkout', '-B', target);
  const check = build(); if (!check.ok) return fail('Build gagal, tidak dipush:\n' + check.errors.join('\n'));
  git('add', 'config', 'src', 'tools', 'package.json', '.gitignore', OUTPUT);
  if (!git('status', '--porcelain', '--', 'config', 'src', 'tools', 'package.json', '.gitignore', OUTPUT)) return text('Tidak ada perubahan untuk di-commit.');
  git('commit', '-m', message);
  const out = git('push', '-u', 'origin', target);
  return text({ pushed: true, branch: target, commit: git('rev-parse', '--short', 'HEAD'), output: out || 'ok' });
}));

await server.connect(new StdioServerTransport());
