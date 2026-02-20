-- SQL para adicionar campo de Ficha Diagnóstica na tabela leads
-- Execute este código no SQL Editor do Supabase

-- Adicionar coluna ficha_diagnostica (texto longo para observações)
ALTER TABLE leads
ADD COLUMN IF NOT EXISTS ficha_diagnostica TEXT;

-- Verificar se a coluna foi adicionada
SELECT column_name, data_type
FROM information_schema.columns
WHERE table_name = 'leads'
ORDER BY ordinal_position;
