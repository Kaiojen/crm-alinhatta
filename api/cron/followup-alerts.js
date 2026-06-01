// CRON — Alerta de follow-ups (roda de manhã, ~8h de Brasília).
// Lê os leads no Supabase, separa os follow-ups VENCIDOS e os DE HOJE,
// agrupa por SDR (owner) e dispara um WhatsApp para cada responsável.
//
// Teste manual (sem enviar nada): /api/cron/followup-alerts?dry=1&secret=<CRON_SECRET>
import { fetchLeads, supabaseConfigured } from '../_lib/supabase.js';
import { sendTemplate, whatsappConfigured } from '../_lib/whatsapp.js';
import { getSdrPhones, getAdminPhones, isAuthorized } from '../_lib/config.js';
import { todayBR, shortBR } from '../_lib/dates.js';
import { isActive, leadName } from '../_lib/leads.js';

const TEMPLATE = process.env.WHATSAPP_TEMPLATE_FOLLOWUP || 'followup_alerta';

// Junta itens numa linha só, limitando o tamanho (params de template são curtos).
function joinCapped(items, max = 15) {
  if (!items.length) return 'nenhum';
  if (items.length <= max) return items.join(', ');
  return `${items.slice(0, max).join(', ')} +${items.length - max}`;
}

export default async function handler(req, res) {
  if (!isAuthorized(req)) return res.status(401).json({ error: 'Não autorizado' });
  const dry = req.query?.dry === '1' || req.query?.dry === 'true';

  try {
    const today = todayBR();
    const leads = await fetchLeads();

    // Agrupa follow-ups por owner -> { vencidos: [], hoje: [] }
    const groups = {};
    const ensure = (owner) => (groups[owner] ||= { vencidos: [], hoje: [] });

    for (const lead of leads) {
      if (!isActive(lead)) continue;
      const fu = (lead.proximoFollowup || '').slice(0, 10);
      if (!fu || fu.length !== 10) continue;
      const owner = lead.owner || '(sem responsável)';
      if (fu < today) {
        ensure(owner).vencidos.push(`${leadName(lead)} (venc. ${shortBR(fu)})`);
      } else if (fu === today) {
        ensure(owner).hoje.push(leadName(lead));
      }
    }

    const phones = getSdrPhones();
    const admin = getAdminPhones();
    const results = [];

    // Uma mensagem por SDR
    for (const [owner, g] of Object.entries(groups)) {
      if (g.vencidos.length === 0 && g.hoje.length === 0) continue;
      const params = [
        owner,
        String(g.vencidos.length),
        String(g.hoje.length),
        joinCapped(g.vencidos),
        joinCapped(g.hoje),
      ];
      const phone = phones[owner];
      const entry = {
        owner,
        phone: phone || null,
        vencidos: g.vencidos.length,
        hoje: g.hoje.length,
        params,
      };
      if (!phone) {
        entry.skipped = 'sem telefone em SDR_PHONES';
      } else if (!dry) {
        try {
          entry.sent = await sendTemplate(phone, TEMPLATE, params);
        } catch (e) {
          entry.error = e.message;
        }
      }
      results.push(entry);
    }

    // Resumo geral para o(s) número(s) admin (opcional)
    if (admin.length) {
      const allVenc = Object.entries(groups).flatMap(([o, g]) =>
        g.vencidos.map((v) => `[${o}] ${v}`)
      );
      const allHoje = Object.entries(groups).flatMap(([o, g]) =>
        g.hoje.map((h) => `[${o}] ${h}`)
      );
      if (allVenc.length + allHoje.length > 0) {
        const params = [
          'Equipe',
          String(allVenc.length),
          String(allHoje.length),
          joinCapped(allVenc),
          joinCapped(allHoje),
        ];
        for (const phone of admin) {
          const entry = { owner: 'ADMIN', phone, params };
          if (!dry) {
            try {
              entry.sent = await sendTemplate(phone, TEMPLATE, params);
            } catch (e) {
              entry.error = e.message;
            }
          }
          results.push(entry);
        }
      }
    }

    return res.status(200).json({
      ok: true,
      dry,
      today,
      configured: { supabase: supabaseConfigured(), whatsapp: whatsappConfigured() },
      count: results.length,
      results,
    });
  } catch (e) {
    console.error('followup-alerts erro:', e);
    return res.status(500).json({ ok: false, error: e.message });
  }
}
