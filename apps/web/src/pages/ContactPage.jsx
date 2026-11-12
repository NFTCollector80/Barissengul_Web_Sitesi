import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Mail, Phone, MessageCircle, Instagram, Facebook, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';
import { submitToFormService } from '@/config/forms';

const ContactPage = () => {
  const [honeypot, setHoneypot] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
    subscribe: false
  });

  const handleSubmit = async e => {
    e.preventDefault();

    // Bot tuzağı: gizli alan doldurulduysa sessizce çık.
    if (honeypot) return;

    const name = formData.name.trim();
    const phone = formData.phone.trim();
    const email = formData.email.trim();
    const message = formData.message.trim();

    if (!name || !phone || !email || !message) {
      toast.error('Lütfen tüm alanları doldurun');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error('Lütfen geçerli bir e-posta adresi girin');
      return;
    }
    if (phone.replace(/\D/g, '').length < 10) {
      toast.error('Lütfen geçerli bir telefon numarası girin');
      return;
    }

    setIsSubmitting(true);
    try {
      await submitToFormService({
        subject: `Yeni iletişim mesajı — ${name}`,
        replyTo: email,
        fields: {
          form_type: 'İletişim formu',
          name,
          phone,
          email,
          message,
          newsletter: formData.subscribe
            ? 'Evet — yeni listeler hakkında e-posta almak istiyor'
            : 'Hayır'
        }
      });
      toast('Mesajınız alındı. En kısa sürede size dönüş yapacağız');
      setFormData({
        name: '',
        phone: '',
        email: '',
        message: '',
        subscribe: false
      });
    } catch (error) {
      toast.error(
        error.message === 'FORM_NOT_CONFIGURED'
          ? 'Form şu anda hizmete hazır değil. Lütfen telefon veya WhatsApp ile ulaşın.'
          : 'Mesaj gönderilemedi. Lütfen tekrar deneyin veya WhatsApp üzerinden ulaşın.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleCheckboxChange = checked => {
    setFormData({
      ...formData,
      subscribe: checked
    });
  };

  return (
    <>
      <Helmet>
        <title>İletişim - Barış Şengül Gayrimenkul</title>
        <meta name="description" content="Barış Şengül ile iletişime geçin. İzmir Yarımadası'nda gayrimenkul danışmanlığı için telefon, email veya WhatsApp ile ulaşın." />
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
            İletişim
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.6, delay: 0.1 }} 
            className="text-lg text-muted-foreground leading-relaxed max-w-prose mx-auto"
          >
            İzmir Yarımadası'nda gayrimenkul arayışınızda size yardımcı olmak için buradayım. Sorularınız, mülk talepleri veya danışmanlık için benimle iletişime geçebilirsiniz.
          </motion.p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="luxury-spacing-lg bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }} 
              animate={{ opacity: 1, x: 0 }} 
              transition={{ duration: 0.6 }}
            >
              <Card className="luxury-card">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-foreground mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
                    Mesaj Gönderin
                  </h2>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                      type="text"
                      value={honeypot}
                      onChange={(e) => setHoneypot(e.target.value)}
                      className="hidden"
                      tabIndex={-1}
                      autoComplete="off"
                      aria-hidden="true"
                    />
                    <div>
                      <Input type="text" name="name" placeholder="Adınız" value={formData.name} onChange={handleChange} className="bg-background text-foreground" required />
                    </div>
                    <div>
                      <Input type="tel" name="phone" placeholder="Telefon" value={formData.phone} onChange={handleChange} className="bg-background text-foreground" required />
                    </div>
                    <div>
                      <Input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="bg-background text-foreground" required />
                    </div>
                    <div>
                      <Textarea name="message" placeholder="Mesajınız" rows={5} value={formData.message} onChange={handleChange} className="bg-background text-foreground" required />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="subscribe" checked={formData.subscribe} onCheckedChange={handleCheckboxChange} />
                      <label htmlFor="subscribe" className="text-sm text-muted-foreground cursor-pointer">
                        Yeni listeler hakkında email almak istiyorum
                      </label>
                    </div>
                    <Button type="submit" disabled={isSubmitting} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground active:scale-95 disabled:opacity-60">
                      {isSubmitting ? 'Gönderiliyor...' : 'Gönder'}
                    </Button>
                    <p className="text-xs text-muted-foreground leading-relaxed pt-2">
                      Formu göndererek, iletişim bilgilerinizin yalnızca talebinize dönüş yapmak amacıyla
                      Barış Şengül tarafından işlenmesine onay vermiş olursunuz. Bilgileriniz üçüncü kişilerle
                      paylaşılmaz; KVKK kapsamında silinmesini talep edebilirsiniz.
                    </p>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact Information */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }} 
              animate={{ opacity: 1, x: 0 }} 
              transition={{ duration: 0.6, delay: 0.1 }} 
              className="space-y-8"
            >
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
                  İletişim Bilgileri
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-8">
                  Size en uygun iletişim kanalını seçerek benimle iletişime geçebilirsiniz. Tüm sorularınızı yanıtlamak ve size yardımcı olmak için buradayım.
                </p>
              </div>

              <div className="space-y-6">
                <Card className="luxury-card">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-primary/10 rounded-xl">
                        <Phone className="text-primary" size={24} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">Telefon</h3>
                        <a href="tel:+905332109731" className="text-muted-foreground hover:text-primary transition-colors duration-200">
                          +90 533 210 97 31
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="luxury-card">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-primary/10 rounded-xl">
                        <MessageCircle className="text-primary" size={24} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">WhatsApp</h3>
                        <a href="https://wa.me/905332109731" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors duration-200">
                          +90 533 210 97 31
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="luxury-card">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-primary/10 rounded-xl">
                        <Mail className="text-primary" size={24} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">Email</h3>
                        <a href="mailto:info@barissengul.com" className="text-muted-foreground hover:text-primary transition-colors duration-200">
                          info@barissengul.com
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Social Media Section */}
                <Card className="luxury-card">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-foreground mb-4">Sosyal Medya</h3>
                    <div className="flex gap-4">
                      <a 
                        href="https://instagram.com/kw.baris.sengul" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="p-3 bg-muted rounded-xl text-muted-foreground hover:bg-[#C4A47C] hover:text-[#1A1A1A] transition-all duration-300"
                        aria-label="Instagram"
                      >
                        <Instagram size={24} />
                      </a>
                      <a 
                        href="https://facebook.com/kw.baris.sengul" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="p-3 bg-muted rounded-xl text-muted-foreground hover:bg-[#C4A47C] hover:text-[#1A1A1A] transition-all duration-300"
                        aria-label="Facebook"
                      >
                        <Facebook size={24} />
                      </a>
                      <a 
                        href="https://www.linkedin.com/in/baris-sengul" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="p-3 bg-muted rounded-xl text-muted-foreground hover:bg-[#C4A47C] hover:text-[#1A1A1A] transition-all duration-300"
                        aria-label="LinkedIn"
                      >
                        <Linkedin size={24} />
                      </a>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactPage;