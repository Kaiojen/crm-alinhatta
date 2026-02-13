import type { LeadStatus, LeadPriority, LeadOrigin } from '../types';

export const STATUS_OPTIONS: LeadStatus[] = [
  'Novo',
  'Contato Inicial',
  'Diagnóstico Agendado',
  'Qualificado',
  'Proposta Enviada',
  'Ganho',
  'Perdido',
];

export const PRIORITY_OPTIONS: LeadPriority[] = ['Alta', 'Média', 'Baixa'];

export const ORIGIN_OPTIONS: LeadOrigin[] = [
  'Planilha',
  'Indicação',
  'Tráfego Pago',
  'Site/Formulário',
  'LinkedIn',
  'WhatsApp',
  'Email Marketing',
  'Evento',
  'Outro',
];

export const SDR_OPTIONS = ['SDR 1', 'SDR 2', 'SDR 3'];

export const SEGMENTOS = [
  'Tecnologia',
  'Saúde',
  'Educação',
  'Varejo',
  'Serviços',
  'Indústria',
  'Construção',
  'Alimentos',
  'Financeiro',
  'Outro',
];

export const STATUS_COLORS: Record<LeadStatus, string> = {
  'Novo': 'bg-blue-500',
  'Contato Inicial': 'bg-yellow-500',
  'Diagnóstico Agendado': 'bg-purple-500',
  'Qualificado': 'bg-green-500',
  'Proposta Enviada': 'bg-orange-500',
  'Ganho': 'bg-emerald-600',
  'Perdido': 'bg-red-500',
};

export const PRIORITY_COLORS: Record<LeadPriority, string> = {
  'Alta': 'bg-red-500',
  'Média': 'bg-yellow-500',
  'Baixa': 'bg-blue-500',
};
