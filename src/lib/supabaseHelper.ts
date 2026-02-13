import { supabase } from './supabaseClient';
import type { Lead, HistoricoEntry } from '../types';
import toast from 'react-hot-toast';

export const supabaseHelper = {
  // Buscar todos os leads
  getLeads: async (): Promise<Lead[]> => {
    try {
      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .order('dataEntrada', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (e: any) {
      console.error('Erro ao buscar leads:', e);
      toast.error('Erro ao carregar leads');
      throw e;
    }
  },

  // Adicionar novo lead
  addLead: async (lead: Partial<Lead>): Promise<Lead> => {
    try {
      const { data: user } = await supabase.auth.getUser();
      
      const { data, error } = await supabase
        .from('leads')
        .insert([{
          ...lead,
          updated_by: user.user?.email || 'Sistema'
        }])
        .select()
        .single();

      if (error) throw error;
      toast.success('Lead criado com sucesso!');
      return data;
    } catch (e: any) {
      console.error('Erro ao adicionar lead:', e);
      toast.error(e.message || 'Erro ao criar lead');
      throw e;
    }
  },

  // Atualizar lead existente
  updateLead: async (id: string, updates: Partial<Lead>): Promise<Lead> => {
    try {
      const { data: user } = await supabase.auth.getUser();
      
      const { data, error } = await supabase
        .from('leads')
        .update({
          ...updates,
          updated_by: user.user?.email || 'Sistema'
        })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      toast.success('Lead atualizado com sucesso!');
      return data;
    } catch (e: any) {
      console.error('Erro ao atualizar lead:', e);
      toast.error(e.message || 'Erro ao atualizar lead');
      throw e;
    }
  },

  // Deletar lead
  deleteLead: async (id: string): Promise<void> => {
    try {
      const { error } = await supabase
        .from('leads')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast.success('Lead excluído com sucesso!');
    } catch (e: any) {
      console.error('Erro ao deletar lead:', e);
      toast.error(e.message || 'Erro ao excluir lead');
      throw e;
    }
  },

  // Adicionar entrada ao histórico
  addHistoricoEntry: async (
    leadId: string,
    entry: Omit<HistoricoEntry, 'timestamp' | 'usuario'>
  ): Promise<void> => {
    try {
      const { data: user } = await supabase.auth.getUser();
      
      // Buscar histórico atual
      const { data: lead } = await supabase
        .from('leads')
        .select('historico')
        .eq('id', leadId)
        .single();

      const historico = lead?.historico || [];

      // Adicionar nova entrada
      const newEntry: HistoricoEntry = {
        timestamp: new Date().toISOString(),
        tipo: entry.tipo,
        descricao: entry.descricao,
        usuario: user.user?.email || 'Sistema',
      };

      historico.push(newEntry);

      // Atualizar
      const { error } = await supabase
        .from('leads')
        .update({ 
          historico,
          updated_by: user.user?.email || 'Sistema'
        })
        .eq('id', leadId);

      if (error) throw error;
    } catch (e: any) {
      console.error('Erro ao adicionar histórico:', e);
      throw e;
    }
  },

  // Importar múltiplos leads
  importLeads: async (leads: Partial<Lead>[]): Promise<void> => {
    try {
      const { data: user } = await supabase.auth.getUser();
      
      const leadsWithUser = leads.map(lead => ({
        ...lead,
        updated_by: user.user?.email || 'Sistema'
      }));

      const { error } = await supabase
        .from('leads')
        .insert(leadsWithUser);

      if (error) throw error;
      toast.success(`${leads.length} lead(s) importado(s) com sucesso!`);
    } catch (e: any) {
      console.error('Erro ao importar leads:', e);
      toast.error(e.message || 'Erro ao importar leads');
      throw e;
    }
  },
};
