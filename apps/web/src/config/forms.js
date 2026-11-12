/**
 * Form gönderim ayarları
 *
 * Web3Forms anahtarı: https://web3forms.com adresinden info@barissengul.com ile
 * ücretsiz kayıt olup Access Key alın. Anahtar gizli değildir; form gönderiminde
 * tarayıcıdan servise gider.
 *
 * AŞAĞIDAKİ SATIRA anahtarını yapıştır. Yapıştırılana kadar formlar kullanıcıya
 * "şu anda hizmete hazır değil" mesajı gösterir (sessizce başarılı görünmez).
 */
export const WEB3FORMS_ACCESS_KEY = 'YOUR_WEB3FORMS_ACCESS_KEY';

const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';

export const isFormsConfigured = () =>
  Boolean(WEB3FORMS_ACCESS_KEY) && !WEB3FORMS_ACCESS_KEY.startsWith('YOUR_');

/**
 * Form verisini Web3Forms servisine gönderir.
 * @param {{ subject: string, replyTo?: string, fields: Record<string, unknown> }} params
 */
export async function submitToFormService({ subject, replyTo, fields }) {
  if (!isFormsConfigured()) {
    throw new Error('FORM_NOT_CONFIGURED');
  }

  const body = {
    access_key: WEB3FORMS_ACCESS_KEY,
    subject,
    from_name: 'barissengul.com',
    ...(replyTo ? { replyto: replyTo } : {}),
    ...fields
  };

  let response;
  try {
    response = await fetch(WEB3FORMS_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(body)
    });
  } catch {
    throw new Error('NETWORK_ERROR');
  }

  const data = await response.json().catch(() => ({}));
  if (!response.ok || data.success === false) {
    throw new Error(data.message || 'SEND_FAILED');
  }
  return data;
}
