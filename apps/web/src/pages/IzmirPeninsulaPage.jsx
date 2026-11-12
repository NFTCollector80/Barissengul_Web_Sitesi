import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

const IzmirPeninsulaPage = () => {
  const regions = [
    {
      name: 'Urla',
      content: [
        'Urla, İzmir Yarımadası\'nın en çok tercih edilen bölgelerinden biridir. Bağları, butik otelleri, organik çiftlikleri ve sakin yaşam tarzıyla öne çıkar. Deniz kenarındaki balık restoranları, yerel üreticilerin pazarları ve tarihi dokusuyla Urla, hem yaşamak hem de yatırım yapmak için ideal bir bölgedir.',
        'Son yıllarda artan ilgi ile birlikte, Urla\'da gayrimenkul değerleri istikrarlı bir şekilde yükseliyor. Özellikle deniz manzaralı villalar ve bağ evleri, hem yerli hem de yabancı yatırımcıların gözdesi haline gelmiştir. Sakin bir yaşam tarzı arayanlar için mükemmel bir seçenek.'
      ]
    },
    {
      name: 'Güzelbahçe',
      content: [
        'Güzelbahçe, İzmir\'e yakınlığı ve gelişen altyapısıyla dikkat çeken bir bölgedir. Modern yaşam alanları, yeni konut projeleri ve denize yakın konumuyla hem günlük yaşam hem de yatırım açısından cazip fırsatlar sunuyor. Özellikle genç aileler ve şehir merkezine yakın olmak isteyenler için ideal.',
        'Bölgedeki yeni alışveriş merkezleri, okullar ve sağlık tesisleri, Güzelbahçe\'yi yaşanabilir bir alan haline getiriyor. Deniz kenarındaki yürüyüş yolları, parklar ve sosyal alanlar, yaşam kalitesini artırıyor. Yatırım değeri yüksek, gelişmeye devam eden bir bölge.'
      ]
    },
    {
      name: 'Seferihisar',
      content: [
        'Seferihisar, "Sakin Şehir" (Cittaslow) unvanına sahip, doğal güzellikleri ve organik yaşam tarzıyla ünlü bir bölgedir. Deniz kenarındaki koyları, tarihi dokusu ve yerel pazarlarıyla Seferihisar, huzurlu bir yaşam arayanlar için mükemmel bir seçenek. Özellikle emekliler ve doğa severlerin tercihi.',
        'Bölgedeki gayrimenkul yatırımları, hem tatil evi hem de kalıcı yaşam için değerli fırsatlar sunuyor. Denize sıfır arsalar, bağ evleri ve modern villalar, Seferihisar\'ın yatırım potansiyelini artırıyor. Sakin yaşam felsefesi ve doğal güzellikler, bölgeyi benzersiz kılıyor.'
      ]
    },
    {
      name: 'Çeşme',
      content: [
        'Çeşme, İzmir Yarımadası\'nın en lüks ve prestijli bölgesidir. Marina, plajlar, butik oteller ve yüksek kaliteli restoranlarıyla Çeşme, hem tatil hem de kalıcı yaşam için ideal bir destinasyondur. Özellikle yaz aylarında canlanan bölge, yıl boyunca yüksek yaşam standardı sunuyor.',
        'Çeşme\'deki gayrimenkul yatırımları, yüksek getiri potansiyeline sahiptir. Deniz manzaralı lüks villalar, marina yakını daireler ve özel havuzlu konutlar, hem yerli hem de uluslararası yatırımcıların ilgisini çekiyor. Turizm potansiyeli ve yaşam kalitesi, Çeşme\'yi İzmir Yarımadası\'nın incisi yapıyor.'
      ]
    }
  ];

  return (
    <>
      <Helmet>
        <title>İzmir Yarımadası - Barış Şengül Gayrimenkul</title>
        <meta name="description" content="İzmir Yarımadası'nda yaşam ve yatırım rehberi. Urla, Güzelbahçe, Seferihisar ve Çeşme bölgeleri hakkında detaylı bilgi." />
      </Helmet>

      {/* Hero Section */}
      <section className="luxury-spacing bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-foreground mb-6"
            style={{ fontFamily: 'Playfair Display, serif', letterSpacing: '-0.02em' }}
          >
            İzmir Yarımadası'nda Yaşam ve Yatırım
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg text-muted-foreground leading-relaxed max-w-prose mx-auto"
          >
            İzmir Yarımadası, Ege Denizi'nin eşsiz güzelliğini, modern yaşam olanaklarını ve yüksek yatırım potansiyelini bir araya getiren benzersiz bir bölgedir. Urla, Güzelbahçe, Seferihisar ve Çeşme – her biri kendine özgü karaktere sahip dört özel bölge, farklı yaşam tarzları ve yatırım fırsatları sunuyor.
          </motion.p>
        </div>
      </section>

      {/* Regions Content */}
      <section className="luxury-spacing-lg bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {regions.map((region, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
                {region.name}
              </h2>
              <div className="space-y-4">
                {region.content.map((paragraph, pIndex) => (
                  <p key={pIndex} className="text-base md:text-lg text-muted-foreground leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="luxury-spacing-lg bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
              İzmir Yarımadası'nda Hayalinizdeki Mülkü Bulun
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-prose mx-auto">
              Urla, Güzelbahçe, Seferihisar veya Çeşme'de size en uygun mülkü bulmak için buradayım. Hemen iletişime geçin veya mevcut listelere göz atın.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/listings">
                <Button size="lg" className="bg-accent hover:bg-accent/90 text-white active:scale-95">
                  Listeleri Gör
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="outline" className="border-accent text-accent hover:bg-accent hover:text-white active:scale-95">
                  Benimle İletişime Geç
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default IzmirPeninsulaPage;