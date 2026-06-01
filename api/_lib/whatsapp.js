// Envio de mensagens via WhatsApp Cloud API (oficial da Meta).
// Mensagens iniciadas pelo sistema (fora da janela de 24h) PRECISAM usar
// um "modelo" (template) previamente aprovado no WhatsApp Manager.
const VERSION = process.env.WHATSAPP_API_VERSION || 'v21.0';
const TOKEN = process.env.WHATSAPP_TOKEN;
const PHONE_ID = process.env.WHATSAPP_PHONE_NUMBER_ID;
const LANG = process.env.WHATSAPP_TEMPLATE_LANG || 'pt_BR';

export function whatsappConfigured() {
  return Boolean(TOKEN && PHONE_ID);
}

// Parâmetros de template não podem conter quebras de linha, tabs ou 4+ espaços,
// nem ser vazios. Esta função normaliza para um texto de uma única linha.
export function sanitizeParam(value) {
  const s = String(value == null ? '' : value)
    .replace(/[\n\r\t]+/g, ' ')
    .replace(/\s{2,}/g, ' ')
    .trim();
  return s === '' ? '—' : s;
}

// Envia uma mensagem de template.
// params: array de strings na ordem dos {{1}}, {{2}}, ... do corpo do modelo.
export async function sendTemplate(to, templateName, params = []) {
  if (!whatsappConfigured()) {
    throw new Error('WHATSAPP_TOKEN / WHATSAPP_PHONE_NUMBER_ID não configurados');
  }
  const body = {
    messaging_product: 'whatsapp',
    to: String(to).replace(/\D/g, ''),
    type: 'template',
    template: {
      name: templateName,
      language: { code: LANG },
      components: params.length
        ? [
            {
              type: 'body',
              parameters: params.map((p) => ({ type: 'text', text: sanitizeParam(p) })),
            },
          ]
        : [],
    },
  };

  const res = await fetch(`https://graph.facebook.com/${VERSION}/${PHONE_ID}/messages`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  const json = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(`WhatsApp ${res.status}: ${JSON.stringify(json)}`);
  }
  return json;
}
