// API Route para Vercel - Gerenciar Leads
// Vercel Serverless Function

export default async function handler(req, res) {
  // Configurar CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const key = 'alinhatta-leads';

  try {
    // Tentar usar Vercel KV se disponível
    let kv = null;
    try {
      const kvModule = await import('@vercel/kv');
      kv = kvModule.kv;
    } catch (e) {
      console.warn('Vercel KV não disponível, usando fallback');
    }

    if (req.method === 'GET') {
      // Buscar todos os leads
      if (kv) {
        const leads = await kv.get(key);
        return res.status(200).json({ leads: leads || [] });
      } else {
        // Fallback: retornar array vazio se KV não estiver configurado
        return res.status(200).json({ leads: [] });
      }
    }

    if (req.method === 'POST') {
      // Salvar/atualizar leads
      const { leads } = req.body;
      if (!Array.isArray(leads)) {
        return res.status(400).json({ error: 'Leads deve ser um array' });
      }
      
      if (kv) {
        await kv.set(key, leads);
        return res.status(200).json({ success: true, count: leads.length });
      } else {
        // Fallback: retornar sucesso mesmo sem KV (dados ficam no localStorage)
        return res.status(200).json({ success: true, count: leads.length, warning: 'KV não configurado' });
      }
    }

    return res.status(405).json({ error: 'Método não permitido' });
  } catch (error) {
    console.error('Erro na API:', error);
    return res.status(500).json({ error: 'Erro interno do servidor', message: error.message });
  }
}

