-- SQL para adicionar colunas faltantes na tabela leads
-- Execute este código no SQL Editor do Supabase

-- Adicionar colunas que faltam
ALTER TABLE leads
  ADD COLUMN IF NOT EXISTS owner TEXT DEFAULT '',
  ADD COLUMN IF NOT EXISTS origem TEXT DEFAULT 'Manual',
  ADD COLUMN IF NOT EXISTS "pacoteInteresse" TEXT DEFAULT '',
  ADD COLUMN IF NOT EXISTS valorpotencial NUMERIC DEFAULT 0,
  ADD COLUMN IF NOT EXISTS "proximoFollowup" TEXT DEFAULT '',
  ADD COLUMN IF NOT EXISTS tentativas INTEGER DEFAULT 0,
  ADD COLUMN IF NOT EXISTS historico JSONB DEFAULT '[]'::jsonb;

-- Verificar as colunas da tabela
SELECT column_name, data_type, column_default
FROM information_schema.columns
WHERE table_name = 'leads'
ORDER BY ordinal_position;
