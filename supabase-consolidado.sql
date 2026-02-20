-- ============================================================
-- CRM ALINHATTA - SQL CONSOLIDADO v2.0
-- Seguro para rodar em banco já existente (IF NOT EXISTS)
-- Execute no SQL Editor do Supabase
-- ============================================================

-- ============================================================
-- 1. GARANTIR ESTRUTURA DA TABELA LEADS
-- ============================================================
-- Adicionar colunas que podem estar faltando (seguro)
ALTER TABLE public.leads
  ADD COLUMN IF NOT EXISTS segmento        TEXT    DEFAULT 'Serviços Gerais',
  ADD COLUMN IF NOT EXISTS contato         TEXT    DEFAULT '',
  ADD COLUMN IF NOT EXISTS cargo           TEXT    DEFAULT '',
  ADD COLUMN IF NOT EXISTS telefone        TEXT    DEFAULT '',
  ADD COLUMN IF NOT EXISTS email           TEXT    DEFAULT '',
  ADD COLUMN IF NOT EXISTS prioridade      TEXT    DEFAULT 'MEDIA',
  ADD COLUMN IF NOT EXISTS status          TEXT    DEFAULT 'NOVO',
  ADD COLUMN IF NOT EXISTS score           INTEGER DEFAULT 0,
  ADD COLUMN IF NOT EXISTS owner           TEXT    DEFAULT '',
  ADD COLUMN IF NOT EXISTS origem          TEXT    DEFAULT 'Manual',
  ADD COLUMN IF NOT EXISTS "pacoteInteresse" TEXT  DEFAULT '',
  ADD COLUMN IF NOT EXISTS valorpotencial  NUMERIC DEFAULT 0,
  ADD COLUMN IF NOT EXISTS "proximoFollowup" TEXT  DEFAULT '',
  ADD COLUMN IF NOT EXISTS tentativas      INTEGER DEFAULT 0,
  ADD COLUMN IF NOT EXISTS dataentrada     TEXT    DEFAULT '',
  ADD COLUMN IF NOT EXISTS historico       JSONB   DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS observacoes     TEXT,
  ADD COLUMN IF NOT EXISTS ficha_diagnostica TEXT,
  ADD COLUMN IF NOT EXISTS updated_by      TEXT,
  ADD COLUMN IF NOT EXISTS updated_at      TIMESTAMPTZ DEFAULT NOW();

-- ============================================================
-- 2. TRIGGER updated_at automático
-- ============================================================
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_leads_updated_at ON public.leads;
CREATE TRIGGER update_leads_updated_at
  BEFORE UPDATE ON public.leads
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ============================================================
-- 3. ÍNDICES para performance
-- ============================================================
CREATE INDEX IF NOT EXISTS idx_leads_status     ON public.leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_owner      ON public.leads(owner);
CREATE INDEX IF NOT EXISTS idx_leads_cnpj       ON public.leads(cnpj);
CREATE INDEX IF NOT EXISTS idx_leads_prioridade ON public.leads(prioridade);
CREATE INDEX IF NOT EXISTS idx_leads_empresa    ON public.leads(empresa);

-- ============================================================
-- 4. TABELA SETTINGS (SDRs, configurações do CRM)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.settings (
  key        TEXT PRIMARY KEY,
  value      JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Inserir SDRs padrão (só se não existir ainda)
INSERT INTO public.settings (key, value)
VALUES ('sdrs', '["Gabriel", "Dacunha"]'::jsonb)
ON CONFLICT (key) DO NOTHING;

-- ============================================================
-- 5. RLS - LEADS (apenas usuários autenticados)
-- ============================================================
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Limpar políticas antigas (evitar conflito)
DROP POLICY IF EXISTS "Permitir leitura pública"          ON public.leads;
DROP POLICY IF EXISTS "Permitir inserção pública"         ON public.leads;
DROP POLICY IF EXISTS "Permitir atualização pública"      ON public.leads;
DROP POLICY IF EXISTS "Permitir exclusão pública"         ON public.leads;
DROP POLICY IF EXISTS "Usuários autenticados podem ler"   ON public.leads;
DROP POLICY IF EXISTS "Usuários autenticados podem inserir" ON public.leads;
DROP POLICY IF EXISTS "Usuários autenticados podem atualizar" ON public.leads;
DROP POLICY IF EXISTS "Usuários autenticados podem deletar"   ON public.leads;
DROP POLICY IF EXISTS "Autenticados podem ler leads"      ON public.leads;
DROP POLICY IF EXISTS "Autenticados podem inserir leads"  ON public.leads;
DROP POLICY IF EXISTS "Autenticados podem atualizar leads" ON public.leads;
DROP POLICY IF EXISTS "Autenticados podem deletar leads"  ON public.leads;

CREATE POLICY "leads_select" ON public.leads FOR SELECT TO authenticated USING (true);
CREATE POLICY "leads_insert" ON public.leads FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "leads_update" ON public.leads FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "leads_delete" ON public.leads FOR DELETE TO authenticated USING (true);

-- ============================================================
-- 6. RLS - SETTINGS
-- ============================================================
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "settings_select" ON public.settings;
DROP POLICY IF EXISTS "settings_insert" ON public.settings;
DROP POLICY IF EXISTS "settings_update" ON public.settings;

CREATE POLICY "settings_select" ON public.settings FOR SELECT TO authenticated USING (true);
CREATE POLICY "settings_insert" ON public.settings FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "settings_update" ON public.settings FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

-- ============================================================
-- 7. TABELA LEAD_HISTORY (auditoria)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.lead_history (
  id         SERIAL       PRIMARY KEY,
  lead_id    TEXT         REFERENCES public.leads(id) ON DELETE CASCADE,
  user_email TEXT         DEFAULT 'EMPTY',
  action     TEXT         DEFAULT 'updated',
  field_changed TEXT,
  old_value  TEXT,
  new_value  TEXT,
  description TEXT        DEFAULT 'Lead atualizado',
  created_at TIMESTAMPTZ  DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_lead_history_lead_id    ON public.lead_history(lead_id);
CREATE INDEX IF NOT EXISTS idx_lead_history_created_at ON public.lead_history(created_at DESC);

ALTER TABLE public.lead_history ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "history_select" ON public.lead_history;
DROP POLICY IF EXISTS "history_insert" ON public.lead_history;

CREATE POLICY "history_select" ON public.lead_history FOR SELECT TO authenticated USING (true);
CREATE POLICY "history_insert" ON public.lead_history FOR INSERT TO authenticated WITH CHECK (true);

-- ============================================================
-- 8. CONFIRMAR USUÁRIOS (para login funcionar)
-- ============================================================
UPDATE auth.users
SET
  email_confirmed_at = COALESCE(email_confirmed_at, NOW()),
  last_sign_in_at    = COALESCE(last_sign_in_at, NOW())
WHERE email IN ('gabriel@alinhatta.com', 'dacunha@alinhatta.com');

-- ============================================================
-- 9. VERIFICAÇÃO FINAL
-- ============================================================
SELECT column_name, data_type
FROM information_schema.columns
WHERE table_name = 'leads' AND table_schema = 'public'
ORDER BY ordinal_position;

SELECT * FROM public.settings;

-- Leads com CNPJ como nome de empresa (para corrigir manualmente):
SELECT id, empresa, cnpj
FROM public.leads
WHERE empresa ~ '^\d{14}$'
   OR empresa ~ '^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$'
ORDER BY id;
