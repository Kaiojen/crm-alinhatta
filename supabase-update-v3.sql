-- ============================================================
-- CRM ALINHATTA - ATUALIZAÇÃO v3.0
-- Novos: coluna tags | pipeline 10 estágios | prioridade URGENTE
-- Seguro para rodar em banco já existente (IF NOT EXISTS / DO NOTHING)
-- Execute no SQL Editor do Supabase
-- ============================================================

-- ============================================================
-- 1. NOVA COLUNA: tags
--    Armazena tags de classificação separadas por vírgula
--    Valores válidos: HVBC, BVMP, DR, INATIVO
--    Exemplo: 'HVBC,DR' ou 'INATIVO' ou '' (vazio = sem tag)
-- ============================================================
ALTER TABLE public.leads
  ADD COLUMN IF NOT EXISTS tags TEXT DEFAULT '';

-- Índice para filtro por tag via LIKE (ex: tags LIKE '%HVBC%')
CREATE INDEX IF NOT EXISTS idx_leads_tags ON public.leads USING gin(to_tsvector('simple', COALESCE(tags, '')));

-- ============================================================
-- 2. VALORES VÁLIDOS — DOCUMENTAÇÃO (sem constraint, flexível)
-- ============================================================
-- status (pipeline de 10 etapas):
--   NOVO               → Lead bruto (entrada padrão)
--   ANALISADO          → Ficha diagnóstica feita
--   CONTATO_INICIAL    → Mensagem enviada
--   CONECTADO          → Respondeu
--   QUALIFICADO        → Confirmou dor + quer conversar
--   DIAGNOSTICO_AGENDADO → Reunião marcada
--   PROPOSTA_ENVIADA   → Oferta formal enviada
--   NEGOCIACAO         → Ajustes/comercial
--   GANHO              → Fechado com sucesso
--   PERDIDO            → Descartado
--
-- prioridade (4 níveis):
--   URGENTE → Ação imediata (score ≥ 14 ou rank ≤ 5)
--   ALTA    → Alta prioridade (score ≥ 10 ou rank ≤ 10)
--   MEDIA   → Prioridade normal (score ≥ 6 ou rank ≤ 30)  [padrão]
--   BAIXA   → Baixa prioridade (score < 6 ou rank > 30)
--
-- tags (multi-valor, separado por vírgula):
--   HVBC    → Alto Volume / Baixa Conversão
--   BVMP    → Baixo Volume / Mercado Potente
--   DR      → Desclassificação Recorrente
--   INATIVO → Sem participação

-- ============================================================
-- 3. CORRIGIR LEADS COM STATUS LEGADO (se houver)
--    Mapeia valores antigos para os novos do pipeline
-- ============================================================
UPDATE public.leads SET status = 'CONTATO_INICIAL' WHERE status = 'EM_CONTATO';
UPDATE public.leads SET status = 'DIAGNOSTICO_AGENDADO' WHERE status = 'REUNIAO_MARCADA';
UPDATE public.leads SET status = 'NEGOCIACAO' WHERE status IN ('NEGOCIAÇÃO', 'NEGOCIAÇÃO');

-- Qualquer status desconhecido vira NOVO
UPDATE public.leads
SET status = 'NOVO'
WHERE status NOT IN (
  'NOVO', 'ANALISADO', 'CONTATO_INICIAL', 'CONECTADO', 'QUALIFICADO',
  'DIAGNOSTICO_AGENDADO', 'PROPOSTA_ENVIADA', 'NEGOCIACAO', 'GANHO', 'PERDIDO'
);

-- Qualquer prioridade desconhecida vira MEDIA
UPDATE public.leads
SET prioridade = 'MEDIA'
WHERE prioridade NOT IN ('URGENTE', 'ALTA', 'MEDIA', 'BAIXA');

-- ============================================================
-- 4. GARANTIR COLUNA tags VAZIA (não NULL) NOS REGISTROS ANTIGOS
-- ============================================================
UPDATE public.leads SET tags = '' WHERE tags IS NULL;

-- ============================================================
-- 5. VERIFICAÇÃO FINAL
-- ============================================================
-- Distribuição de status após migração
SELECT
  status,
  COUNT(*) AS total,
  ROUND(COUNT(*) * 100.0 / NULLIF(SUM(COUNT(*)) OVER (), 0), 1) AS pct
FROM public.leads
GROUP BY status
ORDER BY
  CASE status
    WHEN 'NOVO'                 THEN 1
    WHEN 'ANALISADO'            THEN 2
    WHEN 'CONTATO_INICIAL'      THEN 3
    WHEN 'CONECTADO'            THEN 4
    WHEN 'QUALIFICADO'          THEN 5
    WHEN 'DIAGNOSTICO_AGENDADO' THEN 6
    WHEN 'PROPOSTA_ENVIADA'     THEN 7
    WHEN 'NEGOCIACAO'           THEN 8
    WHEN 'GANHO'                THEN 9
    WHEN 'PERDIDO'              THEN 10
    ELSE 99
  END;

-- Distribuição de prioridade
SELECT prioridade, COUNT(*) AS total
FROM public.leads
GROUP BY prioridade
ORDER BY CASE prioridade WHEN 'URGENTE' THEN 1 WHEN 'ALTA' THEN 2 WHEN 'MEDIA' THEN 3 WHEN 'BAIXA' THEN 4 END;

-- Leads com tags
SELECT tags, COUNT(*) AS total
FROM public.leads
WHERE tags IS NOT NULL AND tags != ''
GROUP BY tags
ORDER BY total DESC;

-- Confirmar coluna tags existe
SELECT column_name, data_type, column_default
FROM information_schema.columns
WHERE table_name = 'leads' AND table_schema = 'public' AND column_name = 'tags';
