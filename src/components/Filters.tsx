import { STATUS_OPTIONS, PRIORITY_OPTIONS, ORIGIN_OPTIONS, SDR_OPTIONS, SEGMENTOS } from '../utils/constants';

interface FiltersProps {
  filters: {
    status: string;
    prioridade: string;
    segmento: string;
    owner: string;
    origem: string;
  };
  onFiltersChange: (filters: any) => void;
}

export const Filters = ({ filters, onFiltersChange }: FiltersProps) => {
  const handleChange = (key: string, value: string) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  return (
    <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
      <h3 className="text-white font-semibold mb-4">FILTROS</h3>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div>
          <label className="block text-sm text-gray-400 mb-2">Status</label>
          <select
            value={filters.status}
            onChange={(e) => handleChange('status', e.target.value)}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option>Todos</option>
            {STATUS_OPTIONS.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-2">Prioridade</label>
          <select
            value={filters.prioridade}
            onChange={(e) => handleChange('prioridade', e.target.value)}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option>Todas</option>
            {PRIORITY_OPTIONS.map((priority) => (
              <option key={priority} value={priority}>
                {priority}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-2">Segmento</label>
          <select
            value={filters.segmento}
            onChange={(e) => handleChange('segmento', e.target.value)}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option>Todos</option>
            {SEGMENTOS.map((seg) => (
              <option key={seg} value={seg}>
                {seg}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-2">SDR Responsável</label>
          <select
            value={filters.owner}
            onChange={(e) => handleChange('owner', e.target.value)}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option>Todos</option>
            {SDR_OPTIONS.map((sdr) => (
              <option key={sdr} value={sdr}>
                {sdr}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-2">Origem</label>
          <select
            value={filters.origem}
            onChange={(e) => handleChange('origem', e.target.value)}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option>Todas</option>
            {ORIGIN_OPTIONS.map((origin) => (
              <option key={origin} value={origin}>
                {origin}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};
