import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Shield, MapPin, TrendingUp, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
const AboutPage = () => {
  const principles = [{
    icon: Shield,
    title: 'Şeffaflık',
    description: 'Her aşamada açık ve dürüst iletişim. Tüm süreçlerde tam şeffaflık ile çalışıyorum.'
  }, {
    icon: MapPin,
    title: 'Yerel Uzmanlık',
    description: 'İzmir Yarımadası\'nın her köşesini bilen, bölgesel pazar dinamiklerini yakından takip eden deneyim.'
  }, {
    icon: TrendingUp,
    title: 'Doğru Fiyatlandırma',
    description: 'Piyasa analizleri ve yerel bilgi birikimiyle, mülkünüzün gerçek değerini belirliyorum.'
  }, {
    icon: Users,
    title: 'Tam Hizmet Rehberliği',
    description: 'İlk görüşmeden tapuya kadar tüm süreçte yanınızdayım. Hukuki ve finansal konularda destek.'
  }];
  return <>
      <Helmet>
        <title>Hakkımda - Barış Şengül Gayrimenkul</title>
        <meta name="description" content="Barış Şengül - İzmir Yarımadası'nda butik gayrimenkul danışmanı. Urla, Güzelbahçe, Seferihisar ve Çeşme'de yerel uzmanlık ve şeffaf hizmet." />
      </Helmet>

      {/* Hero Section */}
      <section className="luxury-spacing bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.6
        }} className="text-4xl md:text-5xl font-bold text-foreground mb-6" style={{
          fontFamily: 'Playfair Display, serif',
          letterSpacing: '-0.02em'
        }}>
            25 Yıllık Kurumsal Güç, Gayrimenkulde Doğru Kararlar
          </motion.h1>
        </div>
      </section>

      {/* About Content */}
      <section className="luxury-spacing-lg bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.6,
          delay: 0.1
        }} className="space-y-6 text-base md:text-lg text-muted-foreground leading-relaxed">
            <p className="text-foreground font-medium">
              Geniş pazar hakimiyeti, analitik fiyatlandırma ve şeffaf süreç yönetimiyle İzmir’deki gayrimenkul işlemlerinize değer katıyorum.
            </p>

            <h3 className="text-2xl font-bold text-foreground pt-2" style={{ fontFamily: 'Playfair Display, serif' }}>
              Gayrimenkul İşlemlerinizde Güvende Olduğunuzu Hissetmelisiniz
            </h3>
            <p>
              Gayrimenkul süreci yalnızca bir alım-satım işlemi değil; hayatınızın en önemli finansal ve duygusal kararlarından biridir. Bu süreçte doğru adımları atabilmek ise nitelikli bir pazar bilgisi, stratejik pazarlama ve tam bir güven gerektirir.
            </p>
            <p>
              Uludağ Üniversitesi İktisat Fakültesi’nden başlayan profesyonel yolculuğumda; Koç Holding, Vodafone Türkiye ve Turkcell gibi sektörünün devi kurumlarında yaklaşık 25 yıl boyunca satış, strateji ve yönetim alanlarında üst düzey sorumluluklar üstlendim. Çeyrek asırlık bu kurumsal tecrübe; bana zorlu müzakereleri başarıyla yönetmeyi, veriye dayalı doğru fiyatlandırma yapmayı ve müşteri memnuniyetini her şeyin üzerinde tutmayı öğretti.
            </p>
            <p>
              2023 yılından bu yana, bu birikimi dünyanın en prestijli gayrimenkul markalarından biri olan Keller Williams (KW Orsa) çatısı altında İzmir’e taşıyorum. Satılık, kiralık konut, arsa ve ticari mülk segmentlerinde; karmaşık süreçleri sizin için basitleştiriyor, mülkünüze hak ettiği değeri kazandırıyorum.
            </p>

            <h3 className="text-2xl font-bold text-foreground pt-2" style={{ fontFamily: 'Playfair Display, serif' }}>
              Neden Benimle Çalışmalısınız?
            </h3>
            <ul className="list-disc pl-6 space-y-3 marker:text-primary">
              <li>
                <strong className="text-foreground font-semibold">Kişiye Özel Butik Hizmet:</strong> Her müşterimin beklentisi farklıdır. Kitlesel çözümler yerine, tamamen sizin finansal hedeflerinize ve ihtiyaçlarınıza özel terzi usulü bir danışmanlık sunuyorum.
              </li>
              <li>
                <strong className="text-foreground font-semibold">Şeffaf ve İlkesel Süreç Yönetimi:</strong> Sürecin ilk gününden tapu teslimine kadar her aşamada açık iletişim kurar, kararlarınızı net veriler ve tam dürüstlük üzerine inşa ederim.
              </li>
              <li>
                <strong className="text-foreground font-semibold">Geniş Yerel Ağ ve Bölge Hakimiyeti:</strong> İzmir ve çevresindeki gayrimenkul dinamiklerini, gelişme potansiyeli olan bölgeleri ve pazar eğilimlerini anlık olarak takip eder, ağımı sizin için harekete geçiririm.
              </li>
              <li>
                <strong className="text-foreground font-semibold">Doğru Fiyatlandırma ve Etkin Pazarlama:</strong> Mülkünüzü pazara sunarken afaki rakamlarla zaman kaybettirmek yerine, analitik ekspertizle doğru fiyatı belirler; dijital ve geleneksel kanallarda nokta atışı pazarlama yaparım.
              </li>
            </ul>

            <blockquote className="border-l-4 border-primary/50 pl-6 py-2 italic text-foreground">
              “Gayrimenkulde başarı, doğru zamanda doğru hamleyi yapmaktır. Hayalinizdeki mülke ulaşmak veya yatırımlarınızı en yüksek kazançla değerlendirmek için yanınızdayım.”
            </blockquote>
          </motion.div>
        </div>
      </section>

      {/* Principles Section */}
      <section className="luxury-spacing-lg bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4" style={{
            fontFamily: 'Playfair Display, serif'
          }}>
              Çalışma Prensipleri
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Her müşteriye özel, güvenilir ve profesyonel hizmet anlayışı
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {principles.map((principle, index) => <motion.div key={index} initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.5,
            delay: index * 0.1
          }}>
                <Card className="luxury-card h-full">
                  <CardContent className="p-8">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-accent/10 rounded-xl">
                        <principle.icon className="text-accent" size={32} />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-foreground mb-3" style={{
                      fontFamily: 'Playfair Display, serif'
                    }}>
                          {principle.title}
                        </h3>
                        <p className="text-muted-foreground leading-relaxed">
                          {principle.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>)}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="luxury-spacing-lg bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.6
        }}>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6" style={{
            fontFamily: 'Playfair Display, serif'
          }}>
              Hayalinizdeki Mülkü Birlikte Bulalım
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-prose mx-auto">
              İzmir Yarımadası'nda gayrimenkul arayışınızda size rehberlik etmek için buradayım. Hemen iletişime geçin, birlikte doğru mülkü bulalım.
            </p>
            <Link to="/contact">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-white active:scale-95">
                Benimle İletişime Geç
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </>;
};
export default AboutPage;