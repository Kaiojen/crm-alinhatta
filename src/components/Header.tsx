import { useAuth } from '../contexts/AuthContext';

interface HeaderProps {
  onNewLead: () => void;
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

export const Header = ({ onNewLead, searchTerm, onSearchChange }: HeaderProps) => {
  const { user, signOut } = useAuth();

  return (
    <header className="bg-gray-800 border-b border-gray-700 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-white">ALINHATTA CRM</h1>
            <p className="text-sm text-gray-400">Sistema de Gestão de Leads</p>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-400">{user?.email}</span>
            <button
              onClick={signOut}
              className="px-4 py-2 text-sm text-red-400 hover:bg-red-900/20 rounded-lg transition"
            >
              🚪 Sair
            </button>
          </div>
        </div>

        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Buscar por empresa, CNPJ ou contato..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="flex-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={onNewLead}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition"
          >
            + Novo Lead
          </button>
        </div>
      </div>
    </header>
  );
};
