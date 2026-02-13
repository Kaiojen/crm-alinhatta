import type { Metrics } from '../types';

interface MetricsCardsProps {
  metrics: Metrics;
}

export const MetricsCards = ({ metrics }: MetricsCardsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-sm">Total Leads</p>
            <p className="text-3xl font-bold text-white">{metrics.totalLeads}</p>
          </div>
          <div className="text-blue-500 text-3xl">📊</div>
        </div>
      </div>

      <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-sm">Novos</p>
            <p className="text-3xl font-bold text-white">{metrics.novos}</p>
          </div>
          <div className="text-yellow-500 text-3xl">📋</div>
        </div>
      </div>

      <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-sm">Em Negociação</p>
            <p className="text-3xl font-bold text-white">{metrics.emNegociacao}</p>
          </div>
          <div className="text-orange-500 text-3xl">🔥</div>
        </div>
      </div>

      <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-sm">Ganhos</p>
            <p className="text-3xl font-bold text-white">{metrics.ganhos}</p>
          </div>
          <div className="text-green-500 text-3xl">✅</div>
        </div>
      </div>
    </div>
  );
};
