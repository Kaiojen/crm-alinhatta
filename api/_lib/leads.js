// Constantes do pipeline (espelham STATUS_OPTIONS de alinhatta-crm.tsx).
export const STATUS_LABELS = {
  NOVO: 'Novo',
  ANALISADO: 'Analisado',
  CONTATO_INICIAL: 'Contato Inicial',
  CONECTADO: 'Conectado',
  QUALIFICADO: 'Qualificado',
  DIAGNOSTICO_AGENDADO: 'Diagnóstico Agendado',
  PROPOSTA_ENVIADA: 'Proposta Enviada',
  NEGOCIACAO: 'Negociação',
  GANHO: 'Ganho',
  PERDIDO: 'Perdido',
};

export const STATUS_ORDER = Object.keys(STATUS_LABELS);

// Status terminais: não geram follow-up nem alerta.
export const TERMINAL = ['GANHO', 'PERDIDO'];

export function isActive(lead) {
  return !TERMINAL.includes(lead?.status);
}

// Nome amigável para exibir o lead na mensagem.
export function leadName(lead) {
  return lead?.empresa || lead?.contato || lead?.id || 'Lead';
}
