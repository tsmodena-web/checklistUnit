// Shared helpers: load/save/validate config and render index.html from the template.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
export const FILES = {
  units: 'config/units.json',
  checklists: 'config/checklists.json',
  survey: 'config/survey.json',
  installation: 'config/installation.json',
  equipment: 'config/equipment.json',
  projects: 'config/projects.json',
  home: 'config/home.json',
};
export const TEMPLATE = 'src/index.template.html';
export const OUTPUT = 'index.html';

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

// ---------- validation ----------
const ID_RE = /^[a-z][a-z0-9_]*$/;
const ICON_RE = /^[a-z0-9-]+$/;
const SURVEY_TYPES = ['select', 'number', 'quantity', 'yesno'];
const isStr = (s) => typeof s === 'string' && s.trim().length > 0;

export function validate(cfg) {
  const errors = [];
  const warnings = [];
  const { units, checklists, survey, installation, projects, home, equipment } = cfg;

  if (!units || typeof units !== 'object' || Array.isArray(units)) errors.push('units: harus object {id: {...}}');
  else {
    for (const [id, u] of Object.entries(units)) {
      if (!ID_RE.test(id)) errors.push(`units.${id}: id harus huruf kecil/angka/underscore, diawali huruf`);
      if (!isStr(u.label)) errors.push(`units.${id}.label kosong`);
      if (!isStr(u.icon) || !ICON_RE.test(u.icon)) errors.push(`units.${id}.icon harus nama Bootstrap Icon (mis. "snow")`);
      if (!Array.isArray(u.prep) || !u.prep.every(isStr)) errors.push(`units.${id}.prep harus array teks`);
    }
    if (!units.ro) errors.push('units.ro wajib ada (form Survey dan Instalasi hanya untuk RO)');
  }

  if (!checklists || typeof checklists !== 'object') errors.push('checklists: harus object {unitId: [[kelompok, item, acuan], ...]}');
  else if (units && typeof units === 'object') {
    for (const id of Object.keys(units)) {
      if (!checklists[id]) errors.push(`checklists.${id}: unit "${id}" belum punya checklist`);
    }
    for (const [id, rows] of Object.entries(checklists)) {
      if (!units[id]) errors.push(`checklists.${id}: tidak ada unit dengan id ini di units.json`);
      if (!Array.isArray(rows) || !rows.length) { errors.push(`checklists.${id}: minimal 1 baris`); continue; }
      rows.forEach((r, i) => {
        if (!Array.isArray(r) || r.length !== 3 || !r.every(isStr)) errors.push(`checklists.${id}[${i}]: harus [kelompok, item, acuan] dan tidak boleh kosong`);
      });
    }
  }

  if (Array.isArray(checklists && checklists.ro) && checklists.ro.length !== 20) {
    errors.push(`checklists.ro: harus tetap 20 baris (sekarang ${checklists.ro.length}). Kode memakai 12 baris inti + 7 filter + 1 baris Informasi Produk; ubah teks boleh, tambah/hapus baris tidak.`);
  }
  if (!Array.isArray(equipment) || !equipment.length) errors.push('equipment: harus array [kelompok, item, acuan]');
  else equipment.forEach((r, i) => {
    if (!Array.isArray(r) || r.length !== 3 || !r.every(isStr)) errors.push(`equipment[${i}]: harus [kelompok, item, acuan] dan tidak boleh kosong`);
    else if (!r.some((x) => x.includes('PAM JAYA'))) warnings.push(`equipment[${i}]: tidak memuat token "PAM JAYA" (diganti otomatis jadi nama project)`);
  });

  if (!Array.isArray(survey)) errors.push('survey: harus array [judulSeksi, [baris...]]');
  else survey.forEach((sec, si) => {
    if (!Array.isArray(sec) || !isStr(sec[0]) || !Array.isArray(sec[1])) { errors.push(`survey[${si}]: harus [judul, [baris...]]`); return; }
    sec[1].forEach((r, ri) => {
      if (!Array.isArray(r) || r.length < 4 || !isStr(r[0])) errors.push(`survey[${si}][${ri}]: baris tidak valid`);
      else if (!SURVEY_TYPES.includes(r[3])) errors.push(`survey[${si}][${ri}] "${r[0]}": tipe "${r[3]}" tidak dikenal (${SURVEY_TYPES.join('/')})`);
      else if (r[3] === 'select' && !(Array.isArray(r[4]) && r[4].length && r[4].every(isStr))) errors.push(`survey[${si}][${ri}] "${r[0]}": tipe select butuh daftar opsi di posisi ke-5`);
    });
  });

  if (!Array.isArray(installation) || !installation.every(isStr) || !installation.length) errors.push('installation: harus array teks, minimal 1');

  if (!Array.isArray(projects)) errors.push('projects: harus array [{id, label}]');
  else {
    const seen = new Set();
    projects.forEach((p, i) => {
      if (!p || !ID_RE.test(p.id || '')) errors.push(`projects[${i}].id tidak valid`);
      else if (['regular', 'other'].includes(p.id)) errors.push(`projects[${i}].id "${p.id}" dipakai sistem`);
      else if (seen.has(p.id)) errors.push(`projects[${i}].id "${p.id}" duplikat`);
      else seen.add(p.id);
      if (!isStr(p && p.label)) errors.push(`projects[${i}].label kosong`);
    });
    for (const needed of ['pam_jaya', 'scb']) {
      if (!projects.some((p) => p.id === needed)) warnings.push(`project "${needed}" tidak ada; migrasi draft lama dan aturan khusus PAM Jaya masih merujuk id ini`);
    }
  }

  if (!home || !Array.isArray(home.intro) || !home.intro.length || !home.intro.every((p) => isStr(p.text))) errors.push('home.intro: harus array paragraf {text, icon?}');
  const q = home && home.quicklink;
  if (q && q.enabled !== false) {
    for (const k of ['icon', 'title', 'subtitle', 'buttonLabel', 'url', 'flowSummary', 'flowAria']) if (!isStr(q[k])) errors.push(`home.quicklink.${k} kosong`);
    if (isStr(q.url) && !/^https:\/\//.test(q.url)) errors.push('home.quicklink.url harus diawali https://');
    const f = q.flow || {};
    for (const k of ['start', 'question', 'yesLabel', 'yes', 'noLabel', 'no']) if (!isStr(f[k])) errors.push(`home.quicklink.flow.${k} kosong`);
  }
  const r = home && home.risk;
  if (r) {
    for (const k of ['icon', 'title', 'subtitle', 'buttonLabel', 'url']) if (!isStr(r[k])) errors.push(`home.risk.${k} kosong`);
    if (isStr(r.url) && !/^https:\/\//.test(r.url)) errors.push('home.risk.url harus diawali https://');
  }
  for (const rel of [TEMPLATE]) if (!fs.existsSync(abs(rel))) errors.push(`${rel} tidak ditemukan`);
  return { errors, warnings };
}

// ---------- rendering ----------
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const jsLit = (v) => JSON.stringify(v).replace(/<\//g, '<\\/').split(String.fromCharCode(0x2028)).join('\\u2028').split(String.fromCharCode(0x2029)).join('\\u2029');

// Tiny markup for config text: **bold**, [label](url). Everything else is escaped.
export function md(text) {
  return esc(text)
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_, label, url) => {
      const u = url.replace(/&amp;/g, '&');
      if (!/^(https:\/\/|#)/.test(u)) return label;
      return u.startsWith('#')
        ? `<a href="${esc(u)}">${label}</a>`
        : `<a href="${esc(u)}" target="_blank" rel="noopener noreferrer">${label}</a>`;
    });
}

function renderIntro(home) {
  return home.intro.map((p, i, a) => {
    const cls = i === a.length - 1 ? 'muted mb-0' : 'muted';
    const icon = p.icon ? `<i class="bi bi-${esc(p.icon)} me-1" aria-hidden="true"></i>` : '';
    return `        <p class="${cls}">${icon}${md(p.text)}</p>`;
  }).join('\n');
}

const FLOW_ICON = {
  wo: '<svg viewBox="0 0 24 24"><rect x="5" y="4" width="14" height="17" rx="2.5"/><path d="M9 4h6v3H9z"/><path d="M8.5 12h7M8.5 16h4.5"/></svg>',
  question: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M9.6 9.6a2.5 2.5 0 1 1 3.5 2.3c-.7.4-1.1.9-1.1 1.7"/><path d="M12 17h.01"/></svg>',
  unit: '<svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="8" rx="2.5"/><path d="M7 9h10"/><path d="M6 16.5c1 1 2 1 3 0s2-1 3 0 2 1 3 0 2-1 3 0"/><path d="M8 20c.8.8 1.6.8 2.4 0"/></svg>',
  list: '<svg viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="3.5"/><path d="m8.5 12.2 2.4 2.4 4.6-5.2"/></svg>',
};

function renderRisk(home) {
  const r = home.risk;
  if (!r) return '';
  return `    <aside class="quicklink risklink" aria-label="${esc(r.title)}">
      <div class="quicklink-head">
        <div><strong><i class="bi bi-${esc(r.icon)} me-1" aria-hidden="true"></i>${esc(r.title)}</strong><span>${md(r.subtitle)}</span></div>
        <a class="btn btn-primary primary" href="${esc(r.url)}" target="_blank" rel="noopener noreferrer"><i class="bi bi-box-arrow-up-right me-1" aria-hidden="true"></i>${esc(r.buttonLabel)}</a>
      </div>
    </aside>`;
}

function renderGuide(home) {
  const q = home.quicklink;
  if (!q || q.enabled === false) return renderRisk(home);
  const f = q.flow;
  return `    <aside class="quicklink" aria-label="${esc(q.title)}">
      <div class="quicklink-head">
        <div><strong><i class="bi bi-${esc(q.icon)} me-1" aria-hidden="true"></i>${esc(q.title)}</strong><span>${md(q.subtitle)}</span></div>
        <a class="btn btn-primary primary" href="${esc(q.url)}" target="_blank" rel="noopener noreferrer"><i class="bi bi-box-arrow-up-right me-1" aria-hidden="true"></i>${esc(q.buttonLabel)}</a>
      </div>
      <details>
        <summary>${esc(q.flowSummary)}</summary>
        <div class="flow" role="group" aria-label="${esc(q.flowAria)}">
          <div class="flow-node start"><span class="flow-ico" aria-hidden="true">${FLOW_ICON.wo}</span><div><span class="flow-cap">Langkah 1</span>${md(f.start)}</div></div>
          <div class="flow-link" aria-hidden="true"></div>
          <div class="flow-node decision"><span class="flow-ico" aria-hidden="true">${FLOW_ICON.question}</span><div><span class="flow-cap">Langkah 2 · Cek kasus</span>${md(f.question)}</div></div>
          <div class="flow-link short" aria-hidden="true"></div>
          <div class="flow-branches">
            <div class="flow-branch"><span class="flow-label yes">${esc(f.yesLabel)}</span>
              <div class="flow-node go"><span class="flow-ico" aria-hidden="true">${FLOW_ICON.unit}</span><div><span class="flow-cap">Buka aplikasi pendingin</span>${md(f.yes)}</div></div></div>
            <div class="flow-branch"><span class="flow-label">${esc(f.noLabel)}</span>
              <div class="flow-node stay"><span class="flow-ico" aria-hidden="true">${FLOW_ICON.list}</span><div><span class="flow-cap">Lanjut di halaman ini</span>${md(f.no)}</div></div></div>
          </div>
        </div>
      </details>
    </aside>
${renderRisk(home)}`;
}

function renderProjectButtons(projects) {
  return projects.map((p) => `\n        <button class="btn btn-outline-secondary" data-action="select-project" data-project="${esc(p.id)}" aria-pressed="false">${esc(p.label)}</button>`).join('');
}

export function render(cfg, template) {
  const swaps = {
    '/*@@MAINT_CHECKLISTS@@*/': jsLit(cfg.checklists),
    '/*@@UNIT_META@@*/': jsLit(cfg.units),
    '/*@@SURVEY_SECTIONS@@*/': jsLit(cfg.survey),
    '/*@@INSTALL_ITEMS@@*/': jsLit(cfg.installation),
    '/*@@PROJECTS@@*/': jsLit(cfg.projects),
    '/*@@PROJECT_EQUIPMENT@@*/': jsLit(cfg.equipment),
    '/*@@RISK_URL@@*/': jsLit((cfg.home.risk && cfg.home.risk.url) || ''),
    '<!--@@HOME_INTRO@@-->': renderIntro(cfg.home),
    '<!--@@HOME_GUIDE@@-->': renderGuide(cfg.home),
    '<!--@@PROJECT_BUTTONS@@-->': renderProjectButtons(cfg.projects),
  };
  let out = template;
  for (const [key, value] of Object.entries(swaps)) {
    if (!out.includes(key)) throw new Error(`Placeholder ${key} tidak ada di template`);
    out = out.split(key).join(value);
  }
  return out;
}

export function build(root = ROOT) {
  const cfg = loadConfig(root);
  const { errors, warnings } = validate(cfg);
  if (errors.length) return { ok: false, errors, warnings };
  const html = render(cfg, fs.readFileSync(abs(TEMPLATE, root), 'utf8'));
  const prev = fs.existsSync(abs(OUTPUT, root)) ? fs.readFileSync(abs(OUTPUT, root), 'utf8') : '';
  fs.writeFileSync(abs(OUTPUT, root), html);
  return { ok: true, errors, warnings, changed: prev !== html, bytes: Buffer.byteLength(html) };
}
