#!/usr/bin/env node
/**
 * ilan-ekle.mjs — Yeni ilan ekleme aracı
 *
 * Kullanım:
 *   npm run ilan-ekle --prefix apps/web -- --file yeni-ilan.json
 *
 * Ne yapar:
 *   1) JSON dosyasını okur, zorunlu alanları ve değerleri doğrular.
 *   2) id ve order numaralarını otomatik verir (çakışma olmaz).
 *   3) Görsel adresinin erişilebilir olduğunu kontrol eder.
 *   4) properties.js dosyasının yedeğini alıp ilanı listeye ekler.
 */
import { readFileSync, writeFileSync, copyFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const WEB_ROOT = resolve(__dirname, '..');
const PROPERTIES_PATH = resolve(WEB_ROOT, 'src/data/properties.js');
const LISTINGS_PATH = resolve(WEB_ROOT, 'src/pages/ListingsPage.jsx');

const ALLOWED_TYPES = ['Villa', 'Daire', 'Arsa'];
const ALLOWED_STATUS = ['Satılık', 'Kiralık'];
const REQUIRED = ['title', 'location', 'type', 'price', 'status', 'image'];

const errors = [];
const warnings = [];
const fail = (m) => errors.push(m);

// ---- argümanlar -----------------------------------------------------------
const args = process.argv.slice(2);
const fileArgIdx = args.findIndex((a) => a === '--file');
const inputPath = resolve(process.cwd(), fileArgIdx >= 0 ? args[fileArgIdx + 1] : 'yeni-ilan.json');

if (!existsSync(inputPath)) {
  console.error(`❌ Girdi dosyası bulunamadı: ${inputPath}`);
  console.error('   İpucu: docs/ilan-sablonu.json dosyasını kopyalayıp doldurun, sonra --file ile verin.');
  process.exit(1);
}

let input;
try {
  input = JSON.parse(readFileSync(inputPath, 'utf8'));
} catch (e) {
  console.error(`❌ JSON okunamadı (${inputPath}): ${e.message}`);
  process.exit(1);
}

// ---- sabit listeleri kaynaktan oku ---------------------------------------
function readAllowedLocations() {
  const src = readFileSync(LISTINGS_PATH, 'utf8');
  const m = src.match(/const\s+locations\s*=\s*\[([^\]]*)\]/);
  if (!m) return null;
  return m[1]
    .split(',')
    .map((s) => s.trim().replace(/^['"]|['"]$/g, ''))
    .filter((s) => s && s !== 'Tümü');
}
const allowedLocations = readAllowedLocations();

// ---- doğrulama ------------------------------------------------------------
for (const k of REQUIRED) {
  if (input[k] === undefined || input[k] === null || String(input[k]).trim() === '') {
    fail(`Zorunlu alan eksik: "${k}"`);
  }
}

if (input.type !== undefined && !ALLOWED_TYPES.includes(input.type)) {
  fail(`"type" geçersiz: "${input.type}". İzinli değerler: ${ALLOWED_TYPES.join(', ')}`);
}
if (input.status !== undefined && !ALLOWED_STATUS.includes(input.status)) {
  fail(`"status" geçersiz: "${input.status}". İzinli değerler: ${ALLOWED_STATUS.join(', ')}`);
}
if (input.location !== undefined && allowedLocations && !allowedLocations.includes(input.location)) {
  fail(
    `"location" filtrelere ekli değil: "${input.location}". ` +
      `Mevcut lokasyonlar: ${allowedLocations.join(', ')}`
  );
}

// fiyat: sadece rakam, TR biçimine çevrilir (20000000 -> 20.000.000)
let price;
const digits = String(input.price ?? '').replace(/[^\d]/g, '');
if (!digits) {
  fail(`"price" geçersiz: "${input.price}". Sadece rakam girin (örn. 20000000).`);
} else {
  price = Number(digits).toLocaleString('tr-TR');
}

// sayısal alanlar
const numFields = ['bathrooms', 'size', 'landSize'];
for (const f of numFields) {
  if (input[f] !== undefined && input[f] !== null && input[f] !== '') {
    const n = Number(String(input[f]).replace(/[^\d.]/g, ''));
    if (Number.isNaN(n)) fail(`"${f}" sayı olmalı: "${input[f]}"`);
    else input[f] = n;
  }
}

// galeri
let gallery = Array.isArray(input.gallery) ? input.gallery.filter(Boolean) : [];
if (gallery.length === 0 && input.image) gallery = [input.image];

if (errors.length) {
  console.error('❌ İlan eklenmedi. Düzeltilmesi gerekenler:');
  errors.forEach((e) => console.error('   - ' + e));
  process.exit(1);
}

// ---- id / order -----------------------------------------------------------
const src = readFileSync(PROPERTIES_PATH, 'utf8');
const ids = [...src.matchAll(/\bid:\s*(\d+)/g)].map((m) => Number(m[1]));
const orders = [...src.matchAll(/\border:\s*(\d+)/g)].map((m) => Number(m[1]));
const newId = (ids.length ? Math.max(...ids) : 0) + 1;
const newOrder = input.order !== undefined && input.order !== null ? Number(input.order) : (orders.length ? Math.max(...orders) : 0) + 1;

// ---- görsel kontrolü ------------------------------------------------------
async function checkImage(url) {
  try {
    const res = await fetch(url, { method: 'HEAD', redirect: 'follow' });
    if (!res.ok) {
      warnings.push(`Görsel erişilemedi (HTTP ${res.status}): ${url}`);
      return;
    }
    const len = Number(res.headers.get('content-length') || 0);
    if (len > 1_500_000) {
      warnings.push(
        `Görsel büyük (~${(len / 1024 / 1024).toFixed(1)} MB): ${url}\n` +
          `     Cloudinary küçültme önerisi: .../upload/w_1200,h_800,c_fill/<dosya>`
      );
    }
  } catch (e) {
    warnings.push(`Görsel kontrol edilemedi (${e.message}): ${url}`);
  }
}
await checkImage(input.image);

// ---- nesneyi oluştur ------------------------------------------------------
const S = (v) => JSON.stringify(v);
const lines = ['  {', `    id: ${newId},`];
const put = (k, v, opts = {}) => {
  if (v === undefined) return;
  if (v === null && opts.skipNull) return;
  lines.push(`    ${k}: ${v},`);
};

put('title', S(input.title));
put('location', S(input.location));
put('type', S(input.type));
put('price', S(price));
put('status', S(input.status));
put('image', S(input.image));
lines.push('    gallery: [');
gallery.forEach((g) => lines.push(`      ${S(g)}${gallery.indexOf(g) === gallery.length - 1 ? '' : ','}`));
lines.push('    ],');
if (input.bedrooms !== undefined && input.bedrooms !== null && input.bedrooms !== '') put('bedrooms', S(String(input.bedrooms)));
if (input.bathrooms !== undefined && input.bathrooms !== null) put('bathrooms', input.bathrooms);
if (input.size !== undefined && input.size !== null) put('size', input.size);
if (input.landSize !== undefined && input.landSize !== null) put('landSize', input.landSize);
if (input.description !== undefined && input.description !== null && input.description !== '') put('description', S(input.description));
put('featured', input.featured === true ? 'true' : 'false');
put('order', newOrder);
// son satırdaki virgülü kaldır
lines[lines.length - 1] = lines[lines.length - 1].replace(/,$/, '');
lines.push('  }');
const objText = lines.join('\n');

// ---- yerleştir ------------------------------------------------------------
const endMatch = src.match(/\]\s*;\s*$/);
if (!endMatch) {
  console.error('❌ properties.js sonundaki "];" bulunamadı, dosya beklenen biçimde değil.');
  process.exit(1);
}
let head = src.slice(0, endMatch.index).replace(/\s*$/, '');
const tail = src.slice(endMatch.index);
// Dizi boşsa (head "[" ile bitiyorsa) önceki öğe yoktur; virgül eklenmez.
const hasItems = !head.trimEnd().endsWith('[');
const newSrc = `${head}${hasItems ? ',' : ''}\n${objText}\n${tail}`;

copyFileSync(PROPERTIES_PATH, PROPERTIES_PATH + '.bak');
writeFileSync(PROPERTIES_PATH, newSrc, 'utf8');

// ---- rapor ----------------------------------------------------------------
console.log('✅ İlan eklendi.');
console.log(`   Dosya     : ${PROPERTIES_PATH}`);
console.log(`   id / order: ${newId} / ${newOrder}`);
console.log(`   Başlık    : ${input.title}`);
console.log(`   Fiyat     : ${price} TL   (${input.status})`);
console.log(`   Görsel    : ${gallery.length} adet`);
if (warnings.length) {
  console.log('\n⚠️  Uyarılar:');
  warnings.forEach((w) => console.log('   - ' + w));
}
console.log(`\n   Yedek: ${PROPERTIES_PATH}.bak`);
console.log('   Önizleme: npm run dev  →  http://localhost:3000/listings');
