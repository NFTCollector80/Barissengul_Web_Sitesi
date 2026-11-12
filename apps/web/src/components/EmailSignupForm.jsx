import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { submitToFormService } from '@/config/forms';

const EmailSignupForm = () => {
  const [email, setEmail] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Bot tuzağı: gizli alan doldurulduysa sessizce çık.
    if (honeypot) return;

    const trimmed = email.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!trimmed) {
      toast.error('Lütfen e-posta adresinizi girin.');
      return;
    }
    if (!emailRegex.test(trimmed)) {
      toast.error('Lütfen geçerli bir e-posta adresi girin.');
      return;
    }

    setIsLoading(true);
    try {
      await submitToFormService({
        subject: 'Yeni değerleme talebi — barissengul.com',
        replyTo: trimmed,
        fields: {
          form_type: 'Değerleme talebi (ana sayfa)',
          email: trimmed
        }
      });
      toast.success('Teşekkür ederiz! Kısa sürede sizinle iletişime geçeceğiz.');
      setEmail('');
    } catch (error) {
      toast.error(
        error.message === 'FORM_NOT_CONFIGURED'
          ? 'Form şu anda hizmete hazır değil. Lütfen telefon veya WhatsApp ile ulaşın.'
          : 'Gönderilemedi. Lütfen tekrar deneyin veya WhatsApp üzerinden ulaşın.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full">
        <input
          type="text"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
          className="hidden"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
        />
        <Input
          type="email"
          placeholder="Email adresiniz"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-white/90 border-white/20 text-foreground placeholder:text-muted-foreground focus-visible:ring-white h-12"
          disabled={isLoading}
          required
        />
        <Button
          type="submit"
          className="bg-secondary hover:bg-secondary/90 text-secondary-foreground h-12 px-8 font-medium tracking-wide"
          disabled={isLoading}
        >
          {isLoading ? 'Gönderiliyor...' : 'Gönder'}
        </Button>
      </form>

      <p className="mt-3 text-xs text-white/60 leading-relaxed text-center">
        Gönderdiğiniz bilgiler yalnızca talebinize dönüş yapmak amacıyla Barış Şengül tarafından işlenir,
        üçüncü kişilerle paylaşılmaz. KVKK kapsamında bilgilerinizin silinmesini talep edebilirsiniz.
      </p>
    </div>
  );
};

export default EmailSignupForm;