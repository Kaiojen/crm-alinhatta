import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabaseHelper } from '../lib/supabaseHelper';
import type { Lead, Metrics } from '../types';
import { LeadCard } from '../components/LeadCard';
import { LeadModal } from '../components/LeadModal';
import { Header } from '../components/Header';
import { Filters } from '../components/Filters';
import { MetricsCards } from '../components/MetricsCards';

export default function Dashboard() {
  const { } = useAuth();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filteredLeads, setFilteredLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    status: 'Todos',
    prioridade: 'Todas',
    segmento: 'Todos',
    owner: 'Todos',
    origem: 'Todas',
  });

  useEffect(() => {
    loadLeads();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [leads, searchTerm, filters]);

  const loadLeads = async () => {
    try {
      setLoading(true);
      const data = await supabaseHelper.getLeads();
      setLeads(data);
    } catch (error) {
      console.error('Erro ao carregar leads:', error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...leads];

    // Search
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (lead) =>
          lead.empresa?.toLowerCase().includes(term) ||
          lead.cnpj?.includes(term) ||
          lead.email?.toLowerCase().includes(term) ||
          lead.telefone?.includes(term)
      );
    }

    // Status filter
    if (filters.status !== 'Todos') {
      filtered = filtered.filter((lead) => lead.status === filters.status);
    }

    // Priority filter
    if (filters.prioridade !== 'Todas') {
      filtered = filtered.filter((lead) => lead.prioridade === filters.prioridade);
    }

    // Segment filter
    if (filters.segmento !== 'Todos') {
      filtered = filtered.filter((lead) => lead.segmento === filters.segmento);
    }

    // Owner filter
    if (filters.owner !== 'Todos') {
      filtered = filtered.filter((lead) => lead.owner === filters.owner);
    }

    // Origin filter
    if (filters.origem !== 'Todas') {
      filtered = filtered.filter((lead) => lead.origem === filters.origem);
    }

    setFilteredLeads(filtered);
  };

  const handleAddLead = async (leadData: Partial<Lead>) => {
    try {
      await supabaseHelper.addLead(leadData);
      await loadLeads();
      setShowAddModal(false);
    } catch (error) {
      console.error('Erro ao adicionar lead:', error);
    }
  };

  const handleUpdateLead = async (id: string, updates: Partial<Lead>) => {
    try {
      await supabaseHelper.updateLead(id, updates);
      await loadLeads();
      setSelectedLead(null);
    } catch (error) {
      console.error('Erro ao atualizar lead:', error);
    }
  };

  const handleDeleteLead = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir este lead?')) return;
    
    try {
      await supabaseHelper.deleteLead(id);
      await loadLeads();
      setSelectedLead(null);
    } catch (error) {
      console.error('Erro ao deletar lead:', error);
    }
  };

  const metrics: Metrics = {
    totalLeads: leads.length,
    novos: leads.filter((l) => l.status === 'Novo').length,
    emNegociacao: leads.filter((l) =>
      ['Contato Inicial', 'Diagnóstico Agendado', 'Qualificado', 'Proposta Enviada'].includes(l.status)
    ).length,
    ganhos: leads.filter((l) => l.status === 'Ganho').length,
    perdidos: leads.filter((l) => l.status === 'Perdido').length,
    valorTotal: leads.reduce((sum, l) => sum + (l.valorPotencial || 0), 0),
    taxaConversao:
      leads.length > 0
        ? (leads.filter((l) => l.status === 'Ganho').length / leads.length) * 100
        : 0,
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="text-lg text-gray-200">Carregando...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <Header
        onNewLead={() => setShowAddModal(true)}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />

      <main className="max-w-7xl mx-auto px-4 py-6">
        <MetricsCards metrics={metrics} />

        <Filters filters={filters} onFiltersChange={setFilters} />

        <div className="mt-6">
          <p className="text-gray-400 mb-4">
            {filteredLeads.length} resultado(s)
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredLeads.map((lead) => (
              <LeadCard
                key={lead.id}
                lead={lead}
                onClick={() => setSelectedLead(lead)}
              />
            ))}
          </div>

          {filteredLeads.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              Nenhum lead encontrado
            </div>
          )}
        </div>
      </main>

      {/* Modals */}
      {showAddModal && (
        <LeadModal
          onClose={() => setShowAddModal(false)}
          onSave={handleAddLead}
        />
      )}

      {selectedLead && (
        <LeadModal
          lead={selectedLead}
          onClose={() => setSelectedLead(null)}
          onSave={(data) => handleUpdateLead(selectedLead.id, data)}
          onDelete={() => handleDeleteLead(selectedLead.id)}
        />
      )}
    </div>
  );
}
