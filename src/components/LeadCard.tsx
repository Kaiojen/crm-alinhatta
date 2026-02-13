import type { Lead } from '../types';
import { STATUS_COLORS, PRIORITY_COLORS } from '../utils/constants';
import { formatCNPJ, formatPhone } from '../utils/validation';

interface LeadCardProps {
  lead: Lead;
  onClick: () => void;
}

export const LeadCard = ({ lead, onClick }: LeadCardProps) => {
  return (
    <div
      onClick={onClick}
      className="bg-gray-800 rounded-lg p-4 border border-gray-700 hover:border-blue-500 cursor-pointer transition"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="text-white font-semibold text-lg mb-1 line-clamp-1">
            {lead.empresa || formatCNPJ(lead.cnpj)}
          </h3>
          {lead.segmento && (
            <p className="text-gray-400 text-sm">{lead.segmento}</p>
          )}
        </div>
      </div>

      {/* Status and Priority Badges */}
      <div className="flex gap-2 mb-3">
        <span
          className={`${
            STATUS_COLORS[lead.status]
          } text-white text-xs px-2 py-1 rounded-full`}
        >
          {lead.status}
        </span>
        <span
          className={`${
            PRIORITY_COLORS[lead.prioridade]
          } text-white text-xs px-2 py-1 rounded-full`}
        >
          {lead.prioridade}
        </span>
        <span className="bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded-full">
          {lead.origem}
        </span>
      </div>

      {/* Contact Info */}
      <div className="space-y-2 text-sm">
        {lead.telefone && (
          <div className="flex items-center gap-2 text-gray-300">
            <span>📞</span>
            <span>{formatPhone(lead.telefone)}</span>
          </div>
        )}
        {lead.email ? (
          <div className="flex items-center gap-2 text-gray-300">
            <span>✉️</span>
            <span className="truncate">{lead.email}</span>
          </div>
        ) : (
          <div className="flex items-center gap-2 text-gray-500">
            <span>✉️</span>
            <span>Sem email</span>
          </div>
        )}
      </div>

      {/* Owner */}
      {lead.owner && (
        <div className="mt-3 pt-3 border-t border-gray-700">
          <p className="text-xs text-gray-400">
            <span className="font-semibold">{lead.owner}</span>
          </p>
        </div>
      )}
    </div>
  );
};
