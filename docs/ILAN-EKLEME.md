# İlan Ekleme / Düzenleme Kılavuzu

Bu site tek bir kaynaktan beslenir: **`apps/web/src/data/properties.js`**
Buradaki liste, İlanlar sekmesini, ilan detay sayfalarını ve ana sayfadaki vitrini besler.

---

## 1. İki çalışma yolu var

### Yol A — Ben eklerim (en kolay)
Sen bilgileri `docs/ilan-sablonu.json` şablonuna (veya düz mesajla) doldurup bana verirsin.
Ben ilanı dosyaya ekler, önizlemede kontrol eder ve hazır olduğunda haber veririm.

### Yol B — Kendin eklersin (komut ile)
1. `docs/ilan-sablonu.json` dosyasını kopyala, adını `yeni-ilan.json` yap ve doldur.
2. Terminalde çalıştır:

   ```
   npm run ilan-ekle --prefix apps/web -- --file yeni-ilan.json
   ```

3. Araç şunları otomatik yapar:
   - Eksik/hatalı alanları kontrol eder ve hata varsa eklemez.
   - `id` ve `order` numaralarını kendisi verir (çakışma olmaz).
   - Görsel adresi erişilebilir mi diye bakar.
   - Eklemeden önce `properties.js.bak` yedeğini alır.

---

## 2. İlan alanları

| Alan | Zorunlu | Açıklama / Kural |
|---|---|---|
| `title` | ✅ | İlan başlığı |
| `location` | ✅ | Lokasyon. Aşağıdaki listeden biri olmalı (yeni lokasyon eklenecekse bana söyle) |
| `type` | ✅ | `Villa`, `Daire` veya `Arsa` |
| `price` | ✅ | Sadece rakam. `20000000` veya `"20.000.000"` yazabilirsin, "TL" sitede otomatik ekleniyor |
| `status` | ✅ | `Satılık` veya `Kiralık` |
| `image` | ✅ | Kart fotoğrafı (tek URL) |
| `gallery` | ➖ | Detay sayfası fotoğrafları (URL listesi). Boş bırakılırsa `image` kullanılır |
| `bedrooms` | ➖ | Oda, örn. `"3+2"` (arsa için boş bırak) |
| `bathrooms` | ➖ | Banyo sayısı, örn. `2` |
| `size` | ➖ | Alan (m²), örn. `150` |
| `landSize` | ➖ | Arsa (m²), örn. `300` |
| `description` | ➖ | Uzun açıklama. Alt satıra geçmek için `\n` kullan; paragraflar sitede korunur |
| `featured` | ➖ | `true` ise **ana sayfa vitrininde** (slider + vitrin) görünür. Varsayılan `false` |
| `order` | ➖ | Sıra (otomatik verilir) |

**Sabit listeler** (değişirse filtrelere de eklemek gerekir):
- Lokasyon: `Urla`, `Güzelbahçe`, `Seferihisar`, `Çeşme`
- Tip: `Villa`, `Daire`, `Arsa`

---

## 3. Fotoğraf ekleme

- Fotoğrafları **Cloudinary**'ye yükle, çıkan linki `image` / `gallery` alanına koy.
  Örnek: `https://res.cloudinary.com/bl0vsihz/image/upload/v1791894839/MOR07895_10.jpg`
- Yüksek çözünürlüklü dosyaları doğrudan kullanmak siteyi yavaşlatır.
  Cloudinary linkine küçültme parametresi ekleyerek hızlandırabiliriz:
  `.../upload/w_1200,h_800,c_fill/<dosya>.jpg`

---

## 4. Önizleme ve yayın

- **Önizleme:** `npm run dev` (kök klasörde) → http://localhost:3000
  - İlanlar: http://localhost:3000/listings
  - İlan detayı: http://localhost:3000/property/1
- **Yayın:** Bu proje **Hostinger Horizons** üzerinde çalışıyor (`Hostinger Horizons` üretici etiketi ve `.htaccess`'te CDN/`X-Powered-By` ayarları). Buradaki yerel değişikliğin canlı siteye nasıl taşındığı netleşmeden yayın adımına başlamıyoruz — bu konuyu Ali ile konuşacağız.

---

## 5. Bilinen davranışlar

- **Mevcut durum:** ilan listesi **boş** (`export const properties = [];`).
  Kaldırılan 9 ilanın yedeği: `docs/yedek/properties-9-ilan-2026-10-20.js`
- Tüm ilanlar silinirse:
  - İlanlar sayfası "Sonuç Bulunamadı" boş durumunu gösterir (hata vermez).
  - İlan detay linkleri "Mülk Bulunamadı" gösterir.
  - Ana sayfanın üst slayt alanı ve vitrin bölümü **boş** görünür (slayt yoksa alan boş kalır).
- `status` (Satılık/Kiralık) alanı veride var; ana sayfa slayt altyazısında kullanılıyor, ancak ilan kartlarında şu an gösterilmiyor.
