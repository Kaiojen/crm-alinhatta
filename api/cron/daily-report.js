// CRON — Relatório do fim do dia (roda ~18h de Brasília).
// Resumo curto por SDR: leads movimentados hoje, analisados hoje, conectados hoje,
// follow-ups em aberto e um retrato rápido do pipeline.
//
// Teste manual (sem enviar nada): /api/cron/daily-report?dry=1&secret=<CRON_SECRET>
import { fetchLeads, supabaseConfigured } from '../_lib/supabase.js';
import { sendTemplate, whatsappConfigured } from '../_lib/whatsapp.js';
import { getSdrPhones, getAdminPhones, isAuthorized } from '../_lib/config.js';
import { todayBR, dateBR } from '../_lib/dates.js';
import { isActive, STATUS_LABELS, STATUS_ORDER } from '../_lib/leads.js';

const TEMPLATE = process.env.WHATSAPP_TEMPLATE_REPORT || 'relatorio_diario';

// Retrato do pipeline: "Novo 5, Qualificado 3, Ganho 1" (só status com leads).
function pipelineSummary(leads, max = 6) {
  const counts = {};
  for (const l of leads) counts[l.status] = (counts[l.status] || 0) + 1;
  const parts = STATUS_ORDER.filter((s) => counts[s]).map((s) => `${STATUS_LABELS[s]} ${counts[s]}`);
  if (!parts.length) return 'sem leads';
  if (parts.length <= max) return parts.join(', ');
  return `${parts.slice(0, max).join(', ')} …`;
}

// "movimentado hoje" = updated_at caiu no dia de hoje (fuso de Brasília).
function reportFor(leads, today) {
  const movedToday = (l) => dateBR(l.updated_at) === today;
  return {
    movimentados: leads.filter(movedToday).length,
    analisados: leads.filter((l) => l.status === 'ANALISADO' && movedToday(l)).length,
    conectados: leads.filter((l) => l.status === 'CONECTADO' && movedToday(l)).length,
    followupsAbertos: leads.filter((l) => {
      if (!isActive(l)) return false;
      const fu = (l.proximoFollowup || '').slice(0, 10);
      return fu.length === 10 && fu <= today; // vencidos + de hoje
    }).length,
    pipeline: pipelineSummary(leads),
  };
}

export default async function handler(req, res) {
  if (!isAuthorized(req)) return res.status(401).json({ error: 'Não autorizado' });
  const dry = req.query?.dry === '1' || req.query?.dry === 'true';

  try {
    const today = todayBR();
    const leads = await fetchLeads();
    const phones = getSdrPhones();
    const admin = getAdminPhones();
    const results = [];

    // Relatório individual por SDR
    for (const [owner, phone] of Object.entries(phones)) {
      const mine = leads.filter((l) => (l.owner || '') === owner);
      const r = reportFor(mine, today);
      const params = [
        owner,
        String(r.movimentados),
        String(r.analisados),
        String(r.conectados),
        String(r.followupsAbertos),
        r.pipeline,
      ];
      const entry = { owner, phone, ...r, params };
      if (!dry) {
        try {
          entry.sent = await sendTemplate(phone, TEMPLATE, params);
        } catch (e) {
          entry.error = e.message;
        }
      }
      results.push(entry);
    }

    // Relatório geral (todos os leads) para o(s) número(s) admin (opcional)
    if (admin.length) {
      const r = reportFor(leads, today);
      const params = [
        'Equipe',
        String(r.movimentados),
        String(r.analisados),
        String(r.conectados),
        String(r.followupsAbertos),
        r.pipeline,
      ];
      for (const phone of admin) {
        const entry = { owner: 'ADMIN', phone, ...r, params };
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

    return res.status(200).json({
      ok: true,
      dry,
      today,
      configured: { supabase: supabaseConfigured(), whatsapp: whatsappConfigured() },
      count: results.length,
      results,
    });
  } catch (e) {
    console.error('daily-report erro:', e);
    return res.status(500).json({ ok: false, error: e.message });
  }
}
