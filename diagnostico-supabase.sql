-- ============================================================
-- DIAGNÓSTICO: rodar no SQL Editor e enviar resultado completo
-- ============================================================

-- 1. TRIGGERS na tabela leads (pode ter trigger escondido fazendo INSERT em lead_history)
SELECT tgname AS trigger_name,
       proname AS function_name,
       CASE tgtype & 66
         WHEN 2 THEN 'BEFORE'
         WHEN 64 THEN 'INSTEAD OF'
         ELSE 'AFTER'
       END AS timing,
       CASE tgtype & 28
         WHEN 4 THEN 'INSERT'
         WHEN 8 THEN 'DELETE'
         WHEN 16 THEN 'UPDATE'
         WHEN 12 THEN 'INSERT+DELETE'
         WHEN 20 THEN 'INSERT+UPDATE'
         WHEN 24 THEN 'DELETE+UPDATE'
         WHEN 28 THEN 'INSERT+UPDATE+DELETE'
       END AS event
FROM pg_trigger t
JOIN pg_proc p ON t.tgfoid = p.oid
JOIN pg_class c ON t.tgrelid = c.oid
WHERE c.relname = 'leads' AND NOT t.tgisinternal;

-- 2. TODAS as FK que apontam para leads (pode ter outra tabela além de lead_history)
SELECT
  tc.table_name AS tabela_filha,
  kcu.column_name AS coluna_fk,
  tc.constraint_name,
  rc.delete_rule
FROM information_schema.table_constraints tc
JOIN information_schema.key_column_usage kcu
  ON tc.constraint_name = kcu.constraint_name
JOIN information_schema.referential_constraints rc
  ON tc.constraint_name = rc.constraint_name
WHERE tc.constraint_type = 'FOREIGN KEY'
  AND rc.unique_constraint_name IN (
    SELECT constraint_name
    FROM information_schema.table_constraints
    WHERE table_name = 'leads' AND constraint_type IN ('PRIMARY KEY', 'UNIQUE')
  );

-- 3. Verificar se a função delete_lead_cascade existe
SELECT proname, prosecdef AS security_definer
FROM pg_proc
WHERE proname = 'delete_lead_cascade';

-- 4. Testar a função diretamente (com um ID que não existe, para ver o erro sem deletar nada)
SELECT public.delete_lead_cascade('__TESTE_ID_INEXISTENTE__');

-- 5. Verificar lead_history: quantos registros e quais lead_ids existem
SELECT lead_id, COUNT(*) AS total
FROM public.lead_history
GROUP BY lead_id
ORDER BY total DESC
LIMIT 20;

-- 6. Tipo da coluna id em leads
SELECT column_name, data_type, udt_name
FROM information_schema.columns
WHERE table_name = 'leads' AND column_name = 'id';
