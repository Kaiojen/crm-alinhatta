-- ============================================================
-- FIX: DELETAR LEAD (rodar separadamente do SQL consolidado)
-- Cole e execute APENAS este arquivo no SQL Editor do Supabase
-- ============================================================

-- 1. Verificar se lead_history existe e tem dados órfãos
SELECT COUNT(*) AS registros_orfaos
FROM public.lead_history
WHERE lead_id NOT IN (SELECT id FROM public.leads);

-- 2. Limpar registros órfãos
DELETE FROM public.lead_history
WHERE lead_id NOT IN (SELECT id FROM public.leads);

-- 3. Garantir policy DELETE em lead_history
ALTER TABLE public.lead_history ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "history_delete" ON public.lead_history;
CREATE POLICY "history_delete" ON public.lead_history FOR DELETE TO authenticated USING (true);

-- 4. Criar função de delete (SECURITY DEFINER = roda como owner, ignora RLS)
DROP FUNCTION IF EXISTS public.delete_lead_cascade(TEXT);
CREATE OR REPLACE FUNCTION public.delete_lead_cascade(p_lead_id TEXT)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  DELETE FROM public.lead_history WHERE lead_id = p_lead_id;
  DELETE FROM public.leads WHERE id = p_lead_id;
END;
$$;

-- 5. Permitir que authenticated chame a função
GRANT EXECUTE ON FUNCTION public.delete_lead_cascade(TEXT) TO authenticated;

-- 6. Confirmar que a função existe
SELECT proname, prosecdef
FROM pg_proc
WHERE proname = 'delete_lead_cascade';
