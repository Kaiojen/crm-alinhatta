// Configuração lida de variáveis de ambiente (definidas no painel da Vercel).

// Mapa de SDR -> telefone. Ex.: SDR_PHONES='{"Gabriel":"5531999999999","Dacunha":"5531888888888"}'
// As chaves devem bater EXATAMENTE com o campo "owner" dos leads.
export function getSdrPhones() {
  try {
    const obj = JSON.parse(process.env.SDR_PHONES || '{}');
    const out = {};
    for (const [nome, tel] of Object.entries(obj)) {
      const digits = String(tel).replace(/\D/g, '');
      if (digits) out[nome] = digits;
    }
    return out;
  } catch {
    return {};
  }
}

// Telefones que recebem o resumo geral (todos os owners). Opcional.
// Ex.: ADMIN_PHONES='5531999999999,5531777777777'
export function getAdminPhones() {
  return (process.env.ADMIN_PHONES || '')
    .split(',')
    .map((s) => s.replace(/\D/g, ''))
    .filter(Boolean);
}

// Protege os endpoints de cron. A Vercel envia "Authorization: Bearer <CRON_SECRET>"
// quando a env CRON_SECRET existe. Para teste manual aceitamos ?secret=<CRON_SECRET>.
// Se CRON_SECRET não estiver definido, não bloqueia (mas configurá-lo é recomendado).
export function isAuthorized(req) {
  const secret = process.env.CRON_SECRET;
  if (!secret) return true;
  const header = req.headers?.authorization || '';
  const querySecret = req.query?.secret;
  return header === `Bearer ${secret}` || querySecret === secret;
}
