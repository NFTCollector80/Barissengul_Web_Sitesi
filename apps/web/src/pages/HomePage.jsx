import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, CheckCircle2, Search, TrendingUp, Megaphone, Key } from 'lucide-react';
import { Button } from '@/components/ui/button';
import LuxuryCard from '@/components/LuxuryCard';
import RegionCard from '@/components/RegionCard';
import ServiceCard from '@/components/ServiceCard';
import EmailSignupForm from '@/components/EmailSignupForm';
import { properties } from '@/data/properties';

// Ana sayfa vitrini boşken (öne çıkan ilan yokken) gösterilen tanıtım bandı.
// Afiş 2.4:1 oranında; mobilde kırpılmadan, kenar boşluğuyla ortalanır.
const HERO_BANNER = 'https://res.cloudinary.com/bl0vsihz/image/upload/f_auto,q_auto,w_2400/v1792566794/Bar%C4%B1%C5%9F_Banner_v2.png';

const HomePage = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  // Filter and sort featured properties
  const featuredProperties = properties.filter(p => p.featured).sort((a, b) => a.order - b.order);

  // Map properties to hero slides format
  const heroSlides = featuredProperties.map(p => ({
    id: p.id,
    image: p.image,
    title: p.title,
    subtitle: `${p.location} • ${p.type} • ${p.status}`,
    price: `${p.price} TL`,
    link: `/property/${p.id}`
  }));

  // Regions Data
  const regions = [{
    name: 'Urla',
    image: 'https://res.cloudinary.com/bl0vsihz/image/upload/f_auto,q_auto,w_600,h_800,c_fill/v1792578806/pexels-efe-uslu-49912686-7621102_URLA.jpg',
    hoverImage: 'https://res.cloudinary.com/bl0vsihz/image/upload/f_auto,q_auto,w_600,h_800,c_fill/v1792578808/pexels-aykut-sertkaya-192429183-11404001_URLA_2.jpg'
  }, {
    name: 'Güzelbahçe',
    image: 'https://res.cloudinary.com/bl0vsihz/image/upload/f_auto,q_auto,w_600,h_800,c_fill/v1792578761/guzelbahce.webp',
    hoverImage: 'https://res.cloudinary.com/bl0vsihz/image/upload/f_auto,q_auto,w_600,h_800,c_fill/v1792578819/Yal%C4%B1__G%C3%BCzelbah%C3%A7e_01.jpg'
  }, {
    name: 'Seferihisar',
    image: 'https://res.cloudinary.com/bl0vsihz/image/upload/f_auto,q_auto,w_600,h_800,c_fill/v1792578795/pexels-hafsa-melike-selen-828527452-35219923_SEFERIHISAR.jpg',
    hoverImage: 'https://res.cloudinary.com/bl0vsihz/image/upload/f_auto,q_auto,w_600,h_800,c_fill/v1792578803/pexels-hobiphotography-34768895_SEFERIHISAR_2.jpg'
  }, {
    name: 'Çeşme',
    image: 'https://res.cloudinary.com/bl0vsihz/image/upload/f_auto,q_auto,w_600,h_800,c_fill/v1792578760/cesme-kapak-4.webp',
    hoverImage: 'https://res.cloudinary.com/bl0vsihz/image/upload/f_auto,q_auto,w_600,h_800,c_fill/v1792578807/pexels-tolga-utangan-1918256535-30098886_CESME.jpg'
  }];

  // Services Data
  const services = [{
    icon: Search,
    title: 'DANIŞMANLIK : Stratejik İhtiyaç ve Strateji Analizi',
    tagline: 'Doğru Adımla Başlamak, Zirveye Ulaştırır.',
    intro: 'Bir gayrimenkul süreci sadece mülk bakmak veya ilan girmekle başlamaz; hedefleri doğru belirlemekle başlar.',
    items: [{
      label: 'Birebir Danışmanlık & Analiz',
      text: 'Önceliklerinizi, bütçenizi, zaman planınızı ve beklentilerinizi detaylıca dinliyoruz.'
    }, {
      label: 'Yol Haritası Oluşturma',
      text: 'Alıcı veya satıcı olmanıza bağlı olarak sürece özel risk ve fırsat analizini çıkarıyoruz.'
    }, {
      label: 'Müşteri/Mülk Eşleştirme',
      text: '25 yıllık kurumsal altyapı ve Keller Williams’ın geniş portföy ağını kullanarak nokta atışı potansiyel alıcı veya mülk profillerini belirliyoruz.'
    }],
    benefit: 'Zaman kaybını sıfıra indirir, doğru hedef kitleye veya doğru mülke ilk günden odaklanmanızı sağlar.'
  }, {
    icon: TrendingUp,
    title: 'DEĞERLEME (Ekspertiz)',
    tagline: 'Afaki Rakamlar Değil, Piyasa Gerçekleri.',
    intro: 'Mülkünüzün değerinin altında satılması kayıp, değerinin çok üzerinde fiyatlanması ise zaman ve prestij kaybıdır.',
    items: [{
      label: 'Karşılaştırmalı Pazar Analizi',
      text: 'Bölgenizdeki emsal satışları, aktif ilanları ve yakın zamanda satılmış mülk verilerini analitik olarak inceliyoruz.'
    }, {
      label: 'Bölgesel ve Gelecek Potansiyeli Analizi',
      text: 'Mülkün bulunduğu lokasyonun prim potansiyelini, imar ve altyapı gelişmelerini hesaba katıyoruz.'
    }, {
      label: 'Optimal Fiyat Stratejisi',
      text: 'Mülkünüzü pazarda en güçlü konuma getirecek, hem rekabetçi hem de hak ettiği değeri kazandıracak doğru satış/alım fiyatını belirliyoruz.'
    }],
    benefit: 'Yanıltıcı beklentilerden uzak, en doğru fiyatla en kısa sürede finansal başarı elde edersiniz.'
  }, {
    icon: Megaphone,
    title: 'ETKİN VE BÜTÜNLEŞİK PAZARLAMA',
    tagline: 'Mülkünüzü Doğru Kitleye, En Etkileyici Şekilde Sunuyoruz.',
    intro: 'İlan portaline eklenen standart bir ilan ile profesyonel pazarlama arasındaki fark, aldığınız tekliflerin kalitesini belirler.',
    items: [{
      label: 'Profesyonel Görsel Prodüksiyon',
      text: 'Mülkünüzün mimari detaylarını ve ruhunu öne çıkaran profesyonel fotoğraf çekimleri, HD video turları ve dron çekimleri hazırlıyoruz.'
    }, {
      label: 'Hedeflenmiş Dijital ve Sosyal Medya Kampanyaları',
      text: 'Mülkünüzü sadece ilan sitelerine koymuyor; sosyal medya ve arama motoru reklamlarıyla doğru demografik yapıdaki alıcılara ulaştırıyoruz.'
    }, {
      label: 'Özel Network & KW Global Ağı',
      text: 'Mülkünüzü Keller Williams’ın binlerce danışmandan oluşan yerel ve uluslararası ağındaki nitelikli alıcı adayı veritabanı ile paylaşıyoruz.'
    }],
    benefit: 'Mülkünüz maksimum görünürlük kazanır, sadece "meraklı" izleyicilere değil, "gerçek alıcılara" erişim sağlanır.'
  }, {
    icon: Key,
    title: 'SATIŞ VE KAPANIŞ: Şeffaf Süreç Yönetimi, Müzakere ve Tapu Devri',
    tagline: 'Sözleşmeden Anahtar Teslimine Kadar Tam Güvence.',
    intro: 'İşin en kritik kısmı, sürecin hukuki ve finansal olarak pürüzsüz tamamlanmasıdır.',
    items: [{
      label: 'Aday Filtreleme ve Müzakere Yönetimi',
      text: 'Teklifleri topluyor, alıcıların finansal yeterliliklerini doğruluyor ve sizin adınıza en avantajlı şartları müzakere ediyoruz.'
    }, {
      label: 'Hukuki ve Bürokrasi Takibi',
      text: 'Tapu, belediye, ekspertiz ve ipotek/kredi süreçlerindeki tüm resmi evrak takibini eksiksiz yürütüyoruz.'
    }, {
      label: 'Güvenli Finans ve Anahtar Teslimi',
      text: 'Ödeme transferlerinin güvenliğini garanti altına alıyor, tapu devri ve mülk teslimi gerçekleşene kadar adım adım yanınızda oluyoruz.'
    }],
    benefit: 'Sürecin getirdiği stres, hukuki riskler ve karmaşık bürokrasi tamamen üzerinizden kalkar; size sadece imzanızı atmak kalır.'
  }];

  // Slider Logic
  useEffect(() => {
    if (heroSlides.length === 0) return;
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);
  const nextSlide = () => setCurrentSlide(prev => (prev + 1) % heroSlides.length);
  const prevSlide = () => setCurrentSlide(prev => (prev - 1 + heroSlides.length) % heroSlides.length);
  const getPropertySpecs = p => {
    const specs = [];
    if (p.size) specs.push({
      label: 'Alan',
      value: `${p.size} m²`
    });
    if (p.landSize && !p.size) specs.push({
      label: 'Arsa',
      value: `${p.landSize} m²`
    });
    if (p.bedrooms) specs.push({
      label: 'Oda',
      value: p.bedrooms
    });
    if (p.bathrooms) specs.push({
      label: 'Banyo',
      value: p.bathrooms
    });
    return specs;
  };
  return <>
      <Helmet>
        <title>Barış Şengül | İzmir Yarımadası Lüks Gayrimenkul</title>
        <meta name="description" content="İzmir Yarımadası'nda butik gayrimenkul danışmanlığı. Urla, Çeşme, Güzelbahçe ve Seferihisar'da premium satılık villalar ve lüks mülkler." />
      </Helmet>

      {/* 1. HERO — vitrin boşsa tanıtım bandı, doluysa slayt */}
      {heroSlides.length === 0 && (
        <section className="relative bg-secondary px-4 py-8 md:px-0 md:py-0">
          <img
            src={HERO_BANNER}
            alt="Barış Şengül — İzmir Yarımadası gayrimenkul danışmanı"
            className="block mx-auto w-full h-auto object-contain object-center md:max-h-[75vh] md:object-cover"
          />
        </section>
      )}

      {heroSlides.length > 0 && (
      <section className="relative h-[100dvh] min-h-[600px] overflow-hidden bg-secondary">
        {heroSlides.length > 0 && heroSlides.map((slide, index) => <div key={slide.id} className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}>
            <div className="absolute inset-0 bg-black/40 z-10" />
            <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
            
            <div className="absolute inset-0 z-20 flex flex-col justify-end pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
              <motion.div initial={{
            opacity: 0,
            y: 30
          }} animate={index === currentSlide ? {
            opacity: 1,
            y: 0
          } : {
            opacity: 0,
            y: 30
          }} transition={{
            duration: 0.8,
            delay: 0.2
          }} className="max-w-2xl">
                <span className="inline-block px-4 py-1 mb-4 border border-primary text-primary text-sm font-medium tracking-widest uppercase backdrop-blur-sm bg-black/20">
                  Öne Çıkan Mülk
                </span>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight" style={{
              fontFamily: 'Playfair Display, serif'
            }}>
                  {slide.title}
                </h2>
                <p className="text-lg md:text-xl text-white/90 mb-6 font-light">
                  {slide.subtitle}
                </p>
                <div className="flex flex-wrap items-center gap-6">
                  <span className="text-3xl font-bold text-primary" style={{
                fontFamily: 'Playfair Display, serif'
              }}>
                    {slide.price}
                  </span>
                  <Button onClick={() => navigate(slide.link)} className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg rounded-none">
                    Mülkü İncele
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>)}

        {/* Navigation Arrows */}
        {heroSlides.length > 1 && <>
            <div className="absolute inset-y-0 left-4 md:left-8 flex items-center z-30">
              <button onClick={prevSlide} className="w-12 h-12 flex items-center justify-center rounded-full bg-black/20 hover:bg-primary text-white backdrop-blur-md transition-all duration-300 border border-white/20 hover:border-primary" aria-label="Önceki">
                <ChevronLeft size={24} />
              </button>
            </div>
            <div className="absolute inset-y-0 right-4 md:right-8 flex items-center z-30">
              <button onClick={nextSlide} className="w-12 h-12 flex items-center justify-center rounded-full bg-black/20 hover:bg-primary text-white backdrop-blur-md transition-all duration-300 border border-white/20 hover:border-primary" aria-label="Sonraki">
                <ChevronRight size={24} />
              </button>
            </div>

            {/* Pagination Dots */}
            <div className="absolute bottom-12 left-0 right-0 flex justify-center gap-3 z-30">
              {heroSlides.map((_, index) => <button key={index} onClick={() => setCurrentSlide(index)} className={`h-2 transition-all duration-300 rounded-full ${index === currentSlide ? 'w-8 bg-primary' : 'w-2 bg-white/50 hover:bg-white/80'}`} aria-label={`Slayt ${index + 1}`} />)}
            </div>
          </>}
      </section>
      )}

      {/* 2. FEATURED LISTINGS — öne çıkan ilan yoksa bölüm gizlenir */}
      {featuredProperties.length > 0 && (
      <section className="luxury-spacing-xl bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.h2 initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4" style={{
            fontFamily: 'Playfair Display, serif'
          }}>
              İzmir Yarımadası'nda Premium Gayrimenkul Portföyü
            </motion.h2>
            <motion.p initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            delay: 0.1
          }} className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Özenle seçilmiş, yüksek standartlara sahip lüks mülklerimizi keşfedin.
            </motion.p>
          </div>

          <div className="luxury-grid">
            {featuredProperties.slice(0, 6).map((property, index) => <motion.div key={property.id} initial={{
            opacity: 0,
            y: 30
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            delay: index * 0.1,
            duration: 0.5
          }}>
                <LuxuryCard image={property.image} price={`${property.price} TL`} propertyType={property.type} location={`${property.location}, İzmir`} specs={getPropertySpecs(property)} onViewDetails={() => navigate(`/property/${property.id}`)} />
              </motion.div>)}
          </div>
          
          <div className="mt-16 text-center">
            <Button variant="outline" size="lg" onClick={() => navigate('/listings')} className="border-primary text-primary hover:bg-primary hover:text-primary-foreground px-10 py-6 text-lg">
              Tüm Portföyü Görüntüle
            </Button>
          </div>
        </div>
      </section>
      )}

      {/* 3. REGION DISCOVERY */}
      <section className="luxury-spacing-xl bg-secondary text-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4" style={{
              fontFamily: 'Playfair Display, serif'
            }}>
                Urla Yarımadası'nı Keşfedin
              </h2>
              <p className="text-white/70 text-lg">
                Her biri kendine özgü karaktere, eşsiz doğaya ve yüksek yaşam standartlarına sahip dört özel bölge.
              </p>
            </div>
            <Button onClick={() => navigate('/izmir-peninsula')} className="bg-primary hover:bg-primary/90 text-primary-foreground shrink-0">
              Bölgeleri İncele
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {regions.map((region, index) => <motion.div key={index} initial={{
            opacity: 0,
            scale: 0.95
          }} whileInView={{
            opacity: 1,
            scale: 1
          }} viewport={{
            once: true
          }} transition={{
            delay: index * 0.1,
            duration: 0.5
          }}>
                <RegionCard backgroundImage={region.image} hoverImage={region.hoverImage} regionName={region.name} onExplore={() => navigate('/izmir-peninsula')} />
              </motion.div>)}
          </div>
        </div>
      </section>

      {/* 4. ABOUT SECTION */}
      <section className="luxury-spacing-xl bg-background overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            {/* Text Content (Left) */}
            <motion.div initial={{
            opacity: 0,
            x: -50
          }} whileInView={{
            opacity: 1,
            x: 0
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.7
          }} className="lg:w-1/2 space-y-6">
              <div className="inline-block px-4 py-1 border border-primary/30 text-primary text-sm font-medium tracking-widest uppercase bg-primary/5 rounded-full mb-2">
                Hakkımda
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-foreground" style={{
              fontFamily: 'Playfair Display, serif'
            }}>
                Barış Şengül
              </h2>
              <h3 className="text-xl text-primary font-medium" style={{
              fontFamily: 'Playfair Display, serif'
            }}>
                25 Yıllık Kurumsal Güç, Gayrimenkulde Doğru Kararlar
              </h3>
              
              <div className="text-muted-foreground space-y-4 leading-relaxed">
                <p>
                  Gayrimenkul süreci yalnızca bir alım-satım işlemi değil; hayatınızın en önemli finansal ve duygusal kararlarından biridir. Bu süreçte doğru adımları atabilmek ise nitelikli bir pazar bilgisi, stratejik pazarlama ve tam bir güven gerektirir. 2023 yılından bu yana, bu birikimi dünyanın en prestijli gayrimenkul markalarından biri olan Keller Williams (KW Orsa) çatısı altında İzmir’e taşıyorum. Satılık, kiralık konut, arsa ve ticari mülk segmentlerinde; karmaşık süreçleri sizin için basitleştiriyor, mülkünüze hak ettiği değeri kazandırıyorum.
                </p>
              </div>

              <ul className="space-y-3 pt-4">
                {['Kişiye Özel Butik Hizmet', 'Şeffaf ve İlkesel Süreç Yönetimi', 'Geniş Yerel Ağ ve Bölge Hakimiyeti', 'Doğru Fiyatlandırma ve Etkin Pazarlama'].map((item, i) => <li key={i} className="flex items-center gap-3 text-foreground font-medium">
                    <CheckCircle2 className="text-primary shrink-0" size={20} />
                    <span>{item}</span>
                  </li>)}
              </ul>

              <div className="pt-6">
                <Button size="lg" onClick={() => navigate('/contact')} className="bg-secondary hover:bg-secondary/90 text-secondary-foreground px-8">
                  Benimle İletişime Geç
                </Button>
              </div>
            </motion.div>

            {/* Image (Right) */}
            <motion.div initial={{
            opacity: 0,
            x: 50
          }} whileInView={{
            opacity: 1,
            x: 0
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.7
          }} className="lg:w-1/2 relative">
              <div className="absolute inset-0 bg-primary/10 transform translate-x-6 translate-y-6 rounded-2xl -z-10" />
              <img src="https://horizons-cdn.hostinger.com/1a0a8da9-6e8d-41ed-a5c6-036232ace7af/56edbe494650fc06d555fa0d1f7f7aa0.png" alt="Barış Şengül - Gayrimenkul Danışmanı" className="w-full h-auto rounded-2xl shadow-2xl object-cover aspect-[4/5]" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* 5. PROFESSIONAL SERVICES */}
      <section className="luxury-spacing-xl bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.h2 initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4" style={{
            fontFamily: 'Playfair Display, serif'
          }}>
              Profesyonel Ekspertiz Hizmeti
            </motion.h2>
            <motion.h3 initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            delay: 0.05
          }} className="text-xl md:text-2xl font-semibold text-primary mb-3" style={{
            fontFamily: 'Playfair Display, serif'
          }}>
              Mülk Alım-Satım Sürecinde Yol Haritanız
            </motion.h3>
            <motion.p initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            delay: 0.1
          }} className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Aşama aşama planlanmış, veriye dayalı ve %100 şeffaf bir süreç yönetimiyle yatırımlarınızı güvence altına alıyoruz.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            {services.map((service, index) => <motion.div key={index} initial={{
            opacity: 0,
            y: 30
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            delay: index * 0.1,
            duration: 0.5
          }} className="h-full">
                <ServiceCard stepNumber={index + 1} icon={service.icon} title={service.title} tagline={service.tagline} intro={service.intro} items={service.items} benefit={service.benefit} />
              </motion.div>)}
          </div>
        </div>
      </section>

      {/* 6. STATISTICS */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 divide-y md:divide-y-0 md:divide-x divide-primary-foreground/20 text-center">
            <motion.div initial={{
            opacity: 0,
            scale: 0.9
          }} whileInView={{
            opacity: 1,
            scale: 1
          }} viewport={{
            once: true
          }} className="pt-8 md:pt-0">
              <div className="text-5xl md:text-6xl font-bold mb-2" style={{
              fontFamily: 'Playfair Display, serif'
            }}>500+</div>
              <div className="text-lg font-medium tracking-wider uppercase opacity-90">Satılan Mülk</div>
            </motion.div>
            <motion.div initial={{
            opacity: 0,
            scale: 0.9
          }} whileInView={{
            opacity: 1,
            scale: 1
          }} viewport={{
            once: true
          }} transition={{
            delay: 0.1
          }} className="pt-8 md:pt-0">
              <div className="text-5xl md:text-6xl font-bold mb-2" style={{
              fontFamily: 'Playfair Display, serif'
            }}>150+</div>
              <div className="text-lg font-medium tracking-wider uppercase opacity-90">Mutlu Müşteri</div>
            </motion.div>
            <motion.div initial={{
            opacity: 0,
            scale: 0.9
          }} whileInView={{
            opacity: 1,
            scale: 1
          }} viewport={{
            once: true
          }} transition={{
            delay: 0.2
          }} className="pt-8 md:pt-0">
              <div className="text-5xl md:text-6xl font-bold mb-2" style={{
              fontFamily: 'Playfair Display, serif'
            }}>25+</div>
              <div className="text-lg font-medium tracking-wider uppercase opacity-90">Yıl Deneyim</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 7. CTA SECTION */}
      <section id="valuation-cta" className="luxury-spacing-xl bg-secondary text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary via-transparent to-transparent" />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.h2 initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6" style={{
          fontFamily: 'Playfair Display, serif'
        }}>
            Mülkünüzün Gerçek Değerini Öğrenmek İster Misiniz?
          </motion.h2>
          <motion.p initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          delay: 0.1
        }} className="text-lg text-white/80 mb-10 max-w-2xl mx-auto">
            İzmir ve çevresindeki mülkünüz için ücretsiz bölge analizi ve profesyonel değerleme raporu almak üzere bugün benimle iletişime geçin.
          </motion.p>
          
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          delay: 0.2
        }} className="mb-12">
            <EmailSignupForm />
          </motion.div>

          <motion.div initial={{
          opacity: 0
        }} whileInView={{
          opacity: 1
        }} viewport={{
          once: true
        }} transition={{
          delay: 0.4
        }} className="flex flex-col sm:flex-row items-center justify-center gap-6 text-white/90">
            <span className="text-sm tracking-widest">WhatsApp Üzerinden Ulaşın:</span>
            <a href="https://wa.me/905332109731" target="_blank" rel="noopener noreferrer" className="text-2xl font-bold text-primary hover:text-primary/80 transition-colors" style={{
            fontFamily: 'Playfair Display, serif'
          }}>
              +90 533 210 97 31
            </a>
          </motion.div>
        </div>
      </section>
    </>;
};
export default HomePage;