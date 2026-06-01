// Helpers de data no fuso de Brasília (America/Sao_Paulo).
// O cron da Vercel roda em UTC; aqui convertemos sempre para o "dia" de Brasília
// para que "vencido"/"hoje" batam com o que a equipe vê na tela.
const TZ = 'America/Sao_Paulo';

const ymdFormatter = new Intl.DateTimeFormat('en-CA', {
  timeZone: TZ,
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
});

// Retorna 'YYYY-MM-DD' do "hoje" em Brasília.
export function todayBR(now = new Date()) {
  return ymdFormatter.format(now); // en-CA já formata como YYYY-MM-DD
}

// Converte um timestamp (string ISO ou Date) para 'YYYY-MM-DD' em Brasília.
export function dateBR(value) {
  if (!value) return '';
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return '';
  return ymdFormatter.format(d);
}

// 'YYYY-MM-DD' -> 'DD/MM' (curto, para caber nas listas das mensagens).
export function shortBR(ymd) {
  if (!ymd || ymd.length < 10) return ymd || '';
  const [, m, d] = ymd.split('-');
  return `${d}/${m}`;
}
