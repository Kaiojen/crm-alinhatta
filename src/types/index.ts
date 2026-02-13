// Lead Type Definition
export interface Lead {
  id: string;
  cnpj: string;
  empresa: string;
  segmento: string;
  telefone: string;
  email: string;
  status: LeadStatus;
  prioridade: LeadPriority;
  origem: LeadOrigin;
  owner: string;
  valorPotencial: number;
  dataEntrada: string;
  proximoFollowup: string;
  historico: HistoricoEntry[];
  observacoes: string;
  pacoteInteresse: string;
  tentativas: number;
  notaUltimaInteracao: string;
  score: number | null;
  fichaDiagnostica: string;
  created_at?: string;
  updated_at?: string;
  updated_by?: string;
  // FASE 3: Campos de automação
  automation_data?: Record<string, any>;
  automation_status?: Record<string, any>;
  metadata?: Record<string, any>;
}

export type LeadStatus =
  | 'Novo'
  | 'Contato Inicial'
  | 'Diagnóstico Agendado'
  | 'Qualificado'
  | 'Proposta Enviada'
  | 'Ganho'
  | 'Perdido';

export type LeadPriority = 'Alta' | 'Média' | 'Baixa';

export type LeadOrigin =
  | 'Planilha'
  | 'Indicação'
  | 'Tráfego Pago'
  | 'Site/Formulário'
  | 'LinkedIn'
  | 'WhatsApp'
  | 'Email Marketing'
  | 'Evento'
  | 'Outro';

export interface HistoricoEntry {
  timestamp: string;
  tipo: 'nota' | 'ligacao' | 'email' | 'reuniao' | 'edicao';
  descricao: string;
  usuario: string;
}

export interface Metrics {
  totalLeads: number;
  novos: number;
  emNegociacao: number;
  ganhos: number;
  perdidos: number;
  valorTotal: number;
  taxaConversao: number;
}

// FASE 3: Integration Types
export interface IntegrationEvent {
  id: string;
  lead_id: string;
  source: string;
  event_type: string;
  payload: Record<string, any>;
  metadata: Record<string, any>;
  status: 'RECEIVED' | 'PROCESSING' | 'COMPLETED' | 'FAILED';
  error_message?: string;
  created_at: string;
  processed_at?: string;
  processing_time_ms?: number;
}

export interface ApiKey {
  id: string;
  name: string;
  key_hash: string;
  source: string;
  permissions: string[];
  rate_limit: number;
  is_active: boolean;
  created_at: string;
  last_used_at?: string;
  expires_at?: string;
}
