import { useState } from 'react';
import type { FormEvent } from 'react';
import type { Lead } from '../types';
import { STATUS_OPTIONS, PRIORITY_OPTIONS, ORIGIN_OPTIONS, SDR_OPTIONS, SEGMENTOS } from '../utils/constants';
import { validateLeadForm } from '../utils/validation';
import type { FormErrors } from '../utils/validation';
import toast from 'react-hot-toast';

interface LeadModalProps {
  lead?: Lead;
  onClose: () => void;
  onSave: (data: Partial<Lead>) => Promise<void>;
  onDelete?: () => void;
}

export const LeadModal = ({ lead, onClose, onSave, onDelete }: LeadModalProps) => {
  const [formData, setFormData] = useState<Partial<Lead>>(
    lead || {
      cnpj: '',
      empresa: '',
      segmento: '',
      telefone: '',
      email: '',
      status: 'Novo',
      prioridade: 'Média',
      origem: 'Planilha',
      owner: '',
      valorPotencial: 0,
      observacoes: '',
      pacoteInteresse: '',
      dataEntrada: new Date().toISOString().split('T')[0],
    }
  );
  const [errors, setErrors] = useState<FormErrors>({});
  const [saving, setSaving] = useState(false);

  const handleChange = (field: string, value: any) => {
    setFormData({ ...formData, [field]: value });
    // Clear error for this field
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Validate
    const validationErrors = validateLeadForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      toast.error('Corrija os erros no formulário');
      return;
    }

    setSaving(true);
    try {
      // Clean CNPJ (remove formatting)
      const cleanedData = {
        ...formData,
        cnpj: formData.cnpj?.replace(/\D/g, '') || '',
      };
      
      await onSave(cleanedData);
      onClose();
    } catch (error) {
      console.error('Erro ao salvar:', error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gray-800 border-b border-gray-700 p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">
            {lead ? 'Editar Lead' : 'Novo Lead'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-2xl"
          >
            ×
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* CNPJ */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              CNPJ *
            </label>
            <input
              type="text"
              value={formData.cnpj || ''}
              onChange={(e) => handleChange('cnpj', e.target.value)}
              className={`w-full px-4 py-2 bg-gray-700 border ${
                errors.cnpj ? 'border-red-500' : 'border-gray-600'
              } rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="00.000.000/0000-00"
            />
            {errors.cnpj && (
              <p className="text-red-500 text-sm mt-1">{errors.cnpj}</p>
            )}
          </div>

          {/* Empresa */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Empresa *
            </label>
            <input
              type="text"
              value={formData.empresa || ''}
              onChange={(e) => handleChange('empresa', e.target.value)}
              className={`w-full px-4 py-2 bg-gray-700 border ${
                errors.empresa ? 'border-red-500' : 'border-gray-600'
              } rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="Nome da empresa"
            />
            {errors.empresa && (
              <p className="text-red-500 text-sm mt-1">{errors.empresa}</p>
            )}
          </div>

          {/* Segmento */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Segmento
            </label>
            <select
              value={formData.segmento || ''}
              onChange={(e) => handleChange('segmento', e.target.value)}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Selecione...</option>
              {SEGMENTOS.map((seg) => (
                <option key={seg} value={seg}>
                  {seg}
                </option>
              ))}
            </select>
          </div>

          {/* Telefone and Email */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Telefone
              </label>
              <input
                type="text"
                value={formData.telefone || ''}
                onChange={(e) => handleChange('telefone', e.target.value)}
                className={`w-full px-4 py-2 bg-gray-700 border ${
                  errors.telefone ? 'border-red-500' : 'border-gray-600'
                } rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="(00) 00000-0000"
              />
              {errors.telefone && (
                <p className="text-red-500 text-sm mt-1">{errors.telefone}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email
              </label>
              <input
                type="email"
                value={formData.email || ''}
                onChange={(e) => handleChange('email', e.target.value)}
                className={`w-full px-4 py-2 bg-gray-700 border ${
                  errors.email ? 'border-red-500' : 'border-gray-600'
                } rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="email@empresa.com"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>
          </div>

          {/* Status, Priority, Origin */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Status
              </label>
              <select
                value={formData.status || 'Novo'}
                onChange={(e) => handleChange('status', e.target.value)}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {STATUS_OPTIONS.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Prioridade
              </label>
              <select
                value={formData.prioridade || 'Média'}
                onChange={(e) => handleChange('prioridade', e.target.value)}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {PRIORITY_OPTIONS.map((priority) => (
                  <option key={priority} value={priority}>
                    {priority}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Origem
              </label>
              <select
                value={formData.origem || 'Planilha'}
                onChange={(e) => handleChange('origem', e.target.value)}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {ORIGIN_OPTIONS.map((origin) => (
                  <option key={origin} value={origin}>
                    {origin}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Owner */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              SDR Responsável
            </label>
            <select
              value={formData.owner || ''}
              onChange={(e) => handleChange('owner', e.target.value)}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Selecione...</option>
              {SDR_OPTIONS.map((sdr) => (
                <option key={sdr} value={sdr}>
                  {sdr}
                </option>
              ))}
            </select>
          </div>

          {/* Observações */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Observações
            </label>
            <textarea
              value={formData.observacoes || ''}
              onChange={(e) => handleChange('observacoes', e.target.value)}
              rows={3}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Anotações sobre o lead..."
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              disabled={saving}
              className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition disabled:opacity-50"
            >
              {saving ? 'Salvando...' : 'Salvar'}
            </button>

            {lead && onDelete && (
              <button
                type="button"
                onClick={onDelete}
                className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition"
              >
                Excluir
              </button>
            )}

            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-medium transition"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
