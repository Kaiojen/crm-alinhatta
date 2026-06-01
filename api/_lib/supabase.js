// Acesso somente-leitura à tabela `leads` via PostgREST do Supabase.
// Roda apenas no servidor (Vercel Function), então usa a SERVICE ROLE key,
// que ignora o RLS. NUNCA exponha essa chave no frontend.
const URL = process.env.SUPABASE_URL;
const KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;

export function supabaseConfigured() {
  return Boolean(URL && KEY);
}

// Busca os leads com as colunas necessárias para alertas e relatório.
// O volume é pequeno (CRM de equipe enxuta), então trazemos tudo e filtramos em JS.
export async function fetchLeads() {
  if (!supabaseConfigured()) {
    throw new Error('SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY não configurados');
  }
  const cols = 'id,empresa,contato,owner,status,telefone,proximoFollowup,updated_at';
  const url = `${URL}/rest/v1/leads?select=${encodeURIComponent(cols)}`;
  const res = await fetch(url, {
    headers: {
      apikey: KEY,
      Authorization: `Bearer ${KEY}`,
    },
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Supabase ${res.status}: ${body}`);
  }
  return res.json();
}
