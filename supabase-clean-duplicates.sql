-- SQL para limpar dados duplicados/ruins na tabela leads
-- Execute este código no SQL Editor do Supabase ANTES de importar novamente

-- 1. Ver todos os registros atuais
SELECT id, cnpj, empresa, segmento FROM leads ORDER BY id;

-- 2. DELETAR TODOS os registros (use com cuidado!)
-- Descomente a linha abaixo se quiser deletar tudo e começar do zero:
-- DELETE FROM leads;

-- 3. OU deletar apenas registros com dados ruins (empresa muito longa indica dados concatenados)
DELETE FROM leads WHERE LENGTH(empresa) > 200;

-- 4. Verificar o que restou
SELECT COUNT(*) as total_registros FROM leads;
