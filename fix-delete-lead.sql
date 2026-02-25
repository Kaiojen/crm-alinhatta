-- ============================================================
-- FIX DEFINITIVO: deletar lead (causa raiz = trigger log_lead_changes)
-- Rode APENAS este SQL no SQL Editor do Supabase
-- ============================================================

DROP FUNCTION IF EXISTS public.delete_lead_cascade(TEXT);

CREATE OR REPLACE FUNCTION public.delete_lead_cascade(p_lead_id TEXT)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Desabilitar trigger que tenta logar no lead_history após DELETE
  -- (causa FK 23503 porque o lead já foi deletado quando o trigger dispara)
  ALTER TABLE public.leads DISABLE TRIGGER trigger_log_lead_changes;

  -- Deletar dependências e o lead
  DELETE FROM public.lead_history WHERE lead_id = p_lead_id;
  DELETE FROM public.leads WHERE id = p_lead_id;

  -- Reabilitar trigger
  ALTER TABLE public.leads ENABLE TRIGGER trigger_log_lead_changes;

EXCEPTION WHEN OTHERS THEN
  -- Garantir que o trigger volta ativo mesmo se der erro
  ALTER TABLE public.leads ENABLE TRIGGER trigger_log_lead_changes;
  RAISE;
END;
$$;

GRANT EXECUTE ON FUNCTION public.delete_lead_cascade(TEXT) TO authenticated;
