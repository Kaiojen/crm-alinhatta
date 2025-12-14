// React e hooks estão disponíveis globalmente via UMD
const { useState, useEffect, createElement } = React;
// Garantir que React.createElement está disponível
if (typeof React === 'undefined') {
  console.error('React não está disponível!');
}

// Criar componentes de ícones SVG simples (compatível com React)
// Usar função nomeada para garantir que seja um componente válido
function createIcon(paths) {
  const IconComponent = function(props) {
    if (!props) props = {};
    const size = props.size || props.width || props.height || 24;
    const className = props.className || '';
    const style = props.style || {};
    
    // Filtrar props que não devem ser passadas para o SVG
    const svgProps = {
      width: size,
      height: size,
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: 'currentColor',
      strokeWidth: 2,
      strokeLinecap: 'round',
      strokeLinejoin: 'round'
    };
    
    // Adicionar className e style se fornecidos
    if (className) svgProps.className = className;
    if (style && Object.keys(style).length > 0) svgProps.style = style;
    
    // Adicionar outras props (exceto size, width, height)
    Object.keys(props).forEach(key => {
      if (!['size', 'width', 'height', 'className', 'style'].includes(key)) {
        svgProps[key] = props[key];
      }
    });
    
    // Criar elementos path - usar React.createElement com spread do array
    const pathElements = [];
    for (let i = 0; i < paths.length; i++) {
      pathElements.push(React.createElement('path', { key: i, d: paths[i] }));
    }
    
    // Passar array de children diretamente (React aceita array como children)
    return React.createElement('svg', svgProps, pathElements);
  };
  
  // Garantir que é uma função válida
  IconComponent.displayName = 'Icon';
  return IconComponent;
}

// Ícones SVG do Lucide (criados manualmente como componentes React)
// Garantir que cada ícone seja uma função válida
const Search = createIcon(['M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z']);
const Phone = createIcon(['M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z']);
const Mail = createIcon(['M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z', 'M22 6l-10 7L2 6']);
const Calendar = createIcon(['M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z', 'M17 21v-8H7v8', 'M7 3v5h8']);
const TrendingUp = createIcon(['M23 6l-9.5 9.5-5-5L1 18', 'M17 6h6v6']);
const Filter = createIcon(['M22 3H2l8 9.46V19l4 2v-8.54L22 3z']);
const Plus = createIcon(['M12 5v14', 'M5 12h14']);
const X = createIcon(['M18 6L6 18', 'M6 6l12 12']);
const Edit2 = createIcon(['M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7', 'M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z']);
const Save = createIcon(['M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z', 'M17 21v-8H7v8', 'M7 3v5h8']);
const ArrowLeft = createIcon(['M19 12H5', 'M12 19l-7-7 7-7']);
const BarChart3 = createIcon(['M12 20V10', 'M18 20V4', 'M6 20v-4']);
const AlertCircle = createIcon(['M12 8v4', 'M12 16h.01', 'M21 12a9 9 0 11-18 0 9 9 0 0118 0z']);
const Upload = createIcon(['M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4', 'M17 8l-5-5-5 5', 'M12 3v12']);

// Verificar se os ícones são funções válidas
if (typeof window !== 'undefined') {
  window.__ICONS_READY__ = typeof Search === 'function' && typeof Phone === 'function';
}

// Estilos globais customizados para Alinhatta - Dark Mode
// Verifica se está no browser antes de manipular DOM (SSR-safe)
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = `
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@600;700;800;900&family=Open+Sans:wght@400;500;600;700&display=swap');
  
  :root {
    --primary: #1a7b60;
    --primary-dark: #155a45;
    --secondary: #12a37a;
    --accent: #f4d298;
    --accent-hover: #efd3a2;
    --accent-dark: #d9c37a;
    --bg-dark: #0f1419;
    --bg-dark-secondary: #1a1f26;
    --bg-dark-card: #1e252b;
    --text-light: #ffffff;
    --text-gray: #a0aec0;
    --text-gray-light: #cbd5e0;
    --border-dark: #2d3748;
  }
  
  body {
    background-color: var(--bg-dark) !important;
    color: var(--text-light) !important;
  }
  
  .bg-primary { background-color: var(--primary) !important; }
  .bg-primary-dark { background-color: var(--primary-dark) !important; }
  .bg-secondary { background-color: var(--secondary) !important; }
  .bg-accent { background-color: var(--accent) !important; }
  .bg-accent-dark { background-color: var(--accent-dark) !important; }
  .bg-neutral-light { background-color: var(--bg-dark-secondary) !important; }
  .bg-neutral-50 { background-color: var(--bg-dark-card) !important; }
  .bg-white { background-color: var(--bg-dark-card) !important; }
  .bg-gray-50 { background-color: var(--bg-dark-secondary) !important; }
  .bg-gray-100 { background-color: var(--bg-dark-card) !important; }
  .bg-gray-200 { background-color: var(--border-dark) !important; }
  
  .text-primary { color: var(--primary) !important; }
  .text-secondary { color: var(--secondary) !important; }
  .text-accent { color: var(--accent) !important; }
  .text-neutral-dark { color: var(--text-light) !important; }
  .text-neutral-text { color: var(--text-gray) !important; }
  .text-gray-500 { color: var(--text-gray) !important; }
  .text-gray-600 { color: var(--text-gray-light) !important; }
  .text-gray-700 { color: var(--text-gray-light) !important; }
  .text-gray-800 { color: var(--text-light) !important; }
  
  .border-primary { border-color: var(--primary) !important; }
  .border-secondary { border-color: var(--secondary) !important; }
  .border-accent { border-color: var(--accent) !important; }
  .border-gray-200 { border-color: var(--border-dark) !important; }
  .border-gray-300 { border-color: var(--border-dark) !important; }
  
  .hover\\:bg-primary-dark:hover { background-color: var(--primary-dark) !important; }
  .hover\\:bg-accent-dark:hover { background-color: var(--accent-dark) !important; }
  .hover\\:bg-gray-50:hover { background-color: var(--bg-dark-card) !important; }
  .hover\\:bg-gray-100:hover { background-color: var(--bg-dark-secondary) !important; }
  
  .focus\\:ring-primary:focus {
    --tw-ring-color: var(--primary) !important;
  }
  
  input, select, textarea {
    background-color: var(--bg-dark-secondary) !important;
    color: var(--text-light) !important;
    border-color: var(--border-dark) !important;
  }
  
  input:focus, select:focus, textarea:focus {
    background-color: var(--bg-dark-card) !important;
    border-color: var(--primary) !important;
  }
  
  .shadow {
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.3), 0 1px 2px 0 rgba(0, 0, 0, 0.4) !important;
  }
  
  .shadow-lg {
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -2px rgba(0, 0, 0, 0.3) !important;
  }
`;
  document.head.appendChild(style);
}

const STATUS_OPTIONS = [
  { value: 'NOVO', label: '🆕 Novo', color: 'bg-blue-900/30 text-blue-300 border-blue-600' },
  { value: 'CONTATO_INICIAL', label: '📞 Contato Inicial', color: 'bg-yellow-900/30 text-yellow-300 border-yellow-600' },
  { value: 'DIAGNOSTICO_AGENDADO', label: '📋 Diagnóstico Agendado', color: 'bg-purple-900/30 text-purple-300 border-purple-600' },
  { value: 'QUALIFICADO', label: '💎 Qualificado', color: 'bg-green-900/30 text-green-300 border-green-600' },
  { value: 'PROPOSTA_ENVIADA', label: '📄 Proposta Enviada', color: 'bg-orange-900/30 text-orange-300 border-orange-600' },
  { value: 'GANHO', label: '✅ Ganho', color: 'bg-emerald-900/30 text-emerald-300 border-emerald-600' },
  { value: 'PERDIDO', label: '❌ Perdido', color: 'bg-red-900/30 text-red-300 border-red-600' }
];

const PRIORIDADE_OPTIONS = [
  { value: 'ALTA', label: '🔴 Alta', color: 'bg-red-900/30 border-red-600 text-red-300' },
  { value: 'MEDIA', label: '🟡 Média', color: 'bg-yellow-900/30 border-yellow-600 text-yellow-300' },
  { value: 'BAIXA', label: '🟢 Baixa', color: 'bg-green-900/30 border-green-600 text-green-300' }
];

const PACOTES = ['Starter', 'Pro', 'Premium', 'Avulso'];
const SEGMENTOS_INICIAIS = ['Construção', 'TI', 'Saúde', 'Serviços', 'Fornecimento', 'Médico-Hospitalar', 'Serviços Gerais'];
const SDRS = ['SDR 1', 'SDR 2', 'SDR 3']; // Lista de SDRs disponíveis
const ORIGENS_LEAD = [
  'Planilha',
  'Indicação',
  'Tráfego Pago',
  'Site/Formulário',
  'LinkedIn',
  'WhatsApp',
  'Email Marketing',
  'Evento',
  'Outro'
];

// ============================================
// FUNÇÕES UTILITÁRIAS (fora do componente)
// ============================================

// Formatação de CNPJ
const formatCNPJ = (cnpj) => {
  if (!cnpj) return '';
  const numbers = cnpj.replace(/\D/g, '');
  if (numbers.length === 14) {
    return numbers.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, '$1.$2.$3/$4-$5');
  }
  return cnpj;
};

// Máscara de CNPJ enquanto digita
const maskCNPJ = (value) => {
  const numbers = value.replace(/\D/g, '');
  if (numbers.length <= 2) return numbers;
  if (numbers.length <= 5) return `${numbers.slice(0, 2)}.${numbers.slice(2)}`;
  if (numbers.length <= 8) return `${numbers.slice(0, 2)}.${numbers.slice(2, 5)}.${numbers.slice(5)}`;
  if (numbers.length <= 12) return `${numbers.slice(0, 2)}.${numbers.slice(2, 5)}.${numbers.slice(5, 8)}/${numbers.slice(8)}`;
  return `${numbers.slice(0, 2)}.${numbers.slice(2, 5)}.${numbers.slice(5, 8)}/${numbers.slice(8, 12)}-${numbers.slice(12, 14)}`;
};

// Máscara de telefone
const maskPhone = (value) => {
  const numbers = value.replace(/\D/g, '');
  if (numbers.length <= 10) {
    return numbers.replace(/^(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3').replace(/-$/, '');
  }
  return numbers.replace(/^(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3').replace(/-$/, '');
};

// Validação de CNPJ com dígito verificador
const validateCNPJ = (cnpj) => {
  const numbers = cnpj.replace(/\D/g, '');
  
  // Verifica tamanho
  if (numbers.length !== 14) return false;
  
  // Verifica se todos os dígitos são iguais (CNPJ inválido)
  if (/^(\d)\1+$/.test(numbers)) return false;
  
  // Validação dos dígitos verificadores
  let length = numbers.length - 2;
  let numbersOnly = numbers.substring(0, length);
  let digits = numbers.substring(length);
  let sum = 0;
  let pos = length - 7;
  
  // Primeiro dígito verificador
  for (let i = length; i >= 1; i--) {
    sum += numbersOnly.charAt(length - i) * pos--;
    if (pos < 2) pos = 9;
  }
  
  let result = sum % 11 < 2 ? 0 : 11 - sum % 11;
  if (result != digits.charAt(0)) return false;
  
  // Segundo dígito verificador
  length = length + 1;
  numbersOnly = numbers.substring(0, length);
  sum = 0;
  pos = length - 7;
  
  for (let i = length; i >= 1; i--) {
    sum += numbersOnly.charAt(length - i) * pos--;
    if (pos < 2) pos = 9;
  }
  
  result = sum % 11 < 2 ? 0 : 11 - sum % 11;
  if (result != digits.charAt(1)) return false;
  
  return true;
};

// Validação de email
const validateEmail = (email) => {
  if (!email) return true; // Email opcional
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

// Storage helper com suporte para API (Vercel) e fallback para localStorage
const storageHelper = {
  // Detectar se está em produção (Vercel)
  isProduction: () => {
    return typeof window !== 'undefined' && 
           (window.location.hostname.includes('vercel.app') || 
            window.location.hostname.includes('vercel.com') ||
            window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1');
  },
  
  get: async (key, isJSON = false) => {
    try {
      // Se estiver em produção, tenta usar API
      if (storageHelper.isProduction()) {
        try {
          const response = await fetch('/api/leads');
          if (response.ok) {
            const data = await response.json();
            if (data.leads && Array.isArray(data.leads)) {
              return { value: isJSON ? JSON.stringify(data.leads) : data.leads };
            }
          }
        } catch (apiError) {
          console.warn('API não disponível, usando localStorage:', apiError);
          // Continua para fallback localStorage
        }
      }
      
      // Tenta usar window.storage se disponível
      if (typeof window !== 'undefined' && window.storage && window.storage.get) {
        const result = await window.storage.get(key, isJSON);
        if (result && result.value) return result;
      }
      
      // Fallback para localStorage
      if (typeof window !== 'undefined' && window.localStorage) {
        const value = localStorage.getItem(key);
        if (value === null) return null;
        return { value: isJSON ? value : JSON.parse(value) };
      }
      
      return null;
    } catch (e) {
      console.error('Erro ao ler storage:', e);
      return null;
    }
  },
  
  set: async (key, value, isJSON = false) => {
    try {
      const dataToSave = isJSON ? value : JSON.stringify(value);
      const leadsArray = isJSON ? JSON.parse(value) : value;
      
      // Se estiver em produção, tenta salvar via API
      if (storageHelper.isProduction()) {
        try {
          const response = await fetch('/api/leads', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ leads: leadsArray })
          });
          
          if (response.ok) {
            const result = await response.json();
            if (result.success) {
              console.log('Dados salvos via API com sucesso');
              return true;
            }
          }
        } catch (apiError) {
          console.warn('Erro ao salvar via API, usando localStorage:', apiError);
          // Continua para fallback localStorage
        }
      }
      
      // Tenta usar window.storage se disponível
      if (typeof window !== 'undefined' && window.storage && window.storage.set) {
        await window.storage.set(key, dataToSave, isJSON);
        return true;
      }
      
      // Fallback para localStorage
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem(key, dataToSave);
        return true;
      }
      
      return false;
    } catch (e) {
      console.error('Erro ao salvar storage:', e);
      return false;
    }
  }
};

const CRMAlinhatta = () => {
  const [view, setView] = useState('pipeline');
  const [leads, setLeads] = useState([]);
  const [selectedLead, setSelectedLead] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('TODOS');
  const [filterPrioridade, setFilterPrioridade] = useState('TODOS');
  const [filterSegmento, setFilterSegmento] = useState('TODOS');
  const [filterOwner, setFilterOwner] = useState('TODOS');
  const [filterOrigem, setFilterOrigem] = useState('TODOS');
  const [sortBy, setSortBy] = useState('dataEntrada'); // dataEntrada, empresa, valorPotencial
  const [sortOrder, setSortOrder] = useState('desc'); // asc, desc
  const [showAddModal, setShowAddModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Carregar leads do storage ao iniciar
  useEffect(() => {
    loadLeads();
  }, []);

  const loadLeads = async () => {
    try {
      const result = await storageHelper.get('alinhatta-leads', true);
      if (result && result.value) {
        setLeads(JSON.parse(result.value));
      } else {
        // Dados iniciais de exemplo
        setLeads([]);
      }
    } catch (error) {
      console.log('Primeira vez usando o sistema, iniciando vazio');
      setLeads([]);
    }
    setIsLoading(false);
  };

  const saveLeads = async (updatedLeads) => {
    try {
      await storageHelper.set('alinhatta-leads', JSON.stringify(updatedLeads), true);
      setLeads(updatedLeads);
    } catch (error) {
      console.error('Erro ao salvar:', error);
      showNotification('Erro ao salvar dados. Tente novamente.', 'error');
    }
  };

  const addLead = (newLead) => {
    // Validar campos obrigatórios
    if (!newLead.owner) {
      showNotification('SDR responsável é obrigatório!', 'error');
      return;
    }

    // Validar CNPJ
    if (!validateCNPJ(newLead.cnpj)) {
      showNotification('CNPJ inválido. Verifique os dígitos verificadores.', 'error');
      return;
    }

    // Verificar duplicatas
    if (checkDuplicate(newLead.cnpj)) {
      showNotification('Este CNPJ já está cadastrado no sistema!', 'error');
      return;
    }

    // Validar email se fornecido
    if (newLead.email && !validateEmail(newLead.email)) {
      showNotification('Email inválido. Verifique o formato.', 'error');
      return;
    }

    const lead = {
      ...newLead,
      cnpj: newLead.cnpj.replace(/\D/g, ''), // Remove formatação
      id: Date.now().toString(),
      owner: newLead.owner || '', // SDR responsável (obrigatório)
      origem: newLead.origem || 'Planilha', // Origem do lead
      dataEntrada: new Date().toISOString().split('T')[0],
      historico: [{
        data: new Date().toISOString().split('T')[0],
        nota: `Lead criado no sistema${newLead.origem ? ` (Origem: ${newLead.origem})` : ''}`
      }]
    };
    saveLeads([...leads, lead]);
    setShowAddModal(false);
    showNotification('Lead adicionado com sucesso!', 'success');
  };

  const updateLead = (updatedLead) => {
    // Validar CNPJ
    if (!validateCNPJ(updatedLead.cnpj)) {
      showNotification('CNPJ inválido. Verifique os dígitos verificadores.', 'error');
      return;
    }

    // Verificar duplicatas (excluindo o próprio lead)
    if (checkDuplicate(updatedLead.cnpj, updatedLead.id)) {
      showNotification('Este CNPJ já está cadastrado em outro lead!', 'error');
      return;
    }

    // Validar email se fornecido
    if (updatedLead.email && !validateEmail(updatedLead.email)) {
      showNotification('Email inválido. Verifique o formato.', 'error');
      return;
    }

    const updated = leads.map(l => {
      if (l.id === updatedLead.id) {
        return {
          ...updatedLead,
          cnpj: updatedLead.cnpj.replace(/\D/g, '') // Remove formatação
        };
      }
      return l;
    });
    saveLeads(updated);
    // Corrigido: setar o lead atualizado, não o array inteiro
    const updatedLeadObj = updated.find(l => l.id === updatedLead.id);
    setSelectedLead(updatedLeadObj);
    showNotification('Lead atualizado com sucesso!', 'success');
  };

  const addInteracao = (leadId, nota) => {
    const lead = leads.find(l => l.id === leadId);
    const updated = {
      ...lead,
      ultimaInteracao: new Date().toISOString().split('T')[0],
      notaUltimaInteracao: nota,
      tentativas: (lead.tentativas || 0) + 1,
      historico: [
        ...(lead.historico || []),
        { data: new Date().toISOString().split('T')[0], nota }
      ]
    };
    updateLead(updated);
  };

  const deleteLead = (leadId) => {
    const lead = leads.find(l => l.id === leadId);
    if (window.confirm(`Tem certeza que deseja excluir o lead "${lead?.empresa}"? Esta ação não pode ser desfeita.`)) {
      const updated = leads.filter(l => l.id !== leadId);
      saveLeads(updated);
      if (selectedLead && selectedLead.id === leadId) {
        setSelectedLead(null);
      }
      showNotification('Lead excluído com sucesso!', 'success');
    }
  };

  // Verificar duplicatas
  const checkDuplicate = (cnpj, excludeId = null) => {
    const numbers = cnpj.replace(/\D/g, '');
    return leads.some(lead => {
      const leadNumbers = lead.cnpj.replace(/\D/g, '');
      return leadNumbers === numbers && lead.id !== excludeId;
    });
  };

  // Sistema de notificações elegante
  const showNotification = (message, type = 'success') => {
    const notification = document.createElement('div');
    const bgColor = type === 'success' ? '#1a7b60' : type === 'error' ? '#dc2626' : '#f59e0b';
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: ${bgColor};
      color: white;
      padding: 16px 24px;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      z-index: 10000;
      font-family: 'Montserrat', sans-serif;
      font-weight: 600;
      animation: slideIn 0.3s ease-out;
      max-width: 400px;
    `;
    notification.textContent = message;
    
    const style = document.createElement('style');
    style.textContent = `
      @keyframes slideIn {
        from {
          transform: translateX(400px);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }
    `;
    document.head.appendChild(style);
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.style.animation = 'slideIn 0.3s ease-out reverse';
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 3000);
  };

  // Exportar dados
  const exportLeads = (format = 'csv') => {
    if (format === 'csv') {
      const headers = ['Empresa', 'CNPJ', 'Segmento', 'SDR Responsável', 'Origem', 'Contato', 'Cargo', 'Telefone', 'Email', 'Status', 'Prioridade', 'Pacote', 'Valor Potencial', 'Data Entrada', 'Última Interação', 'Próximo Follow-up', 'Tentativas'];
      const rows = leads.map(lead => [
        lead.empresa || '',
        formatCNPJ(lead.cnpj) || '',
        lead.segmento || '',
        lead.owner || '',
        lead.origem || '',
        lead.contato || '',
        lead.cargo || '',
        lead.telefone || '',
        lead.email || '',
        lead.status || '',
        lead.prioridade || '',
        lead.pacoteInteresse || '',
        lead.valorPotencial || 0,
        lead.dataEntrada || '',
        lead.ultimaInteracao || '',
        lead.proximoFollowup || '',
        lead.tentativas || 0
      ]);
      
      const csvContent = [
        headers.join(','),
        ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
      ].join('\n');
      
      const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `leads-alinhatta-${new Date().toISOString().split('T')[0]}.csv`;
      link.click();
    } else if (format === 'json') {
      const dataStr = JSON.stringify(leads, null, 2);
      const blob = new Blob([dataStr], { type: 'application/json' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `leads-alinhatta-${new Date().toISOString().split('T')[0]}.json`;
      link.click();
    }
    setShowExportModal(false);
  };

  const importLeadsFromCSV = (csvData) => {
    try {
      // Detectar delimitador (vírgula ou ponto e vírgula)
      const delimiter = csvData.includes(';') ? ';' : ',';
      
      // Parse CSV mais robusto (lida com campos entre aspas)
      const parseCSVLine = (line) => {
        const result = [];
        let current = '';
        let inQuotes = false;
        
        for (let i = 0; i < line.length; i++) {
          const char = line[i];
          if (char === '"') {
            inQuotes = !inQuotes;
          } else if (char === delimiter && !inQuotes) {
            result.push(current.trim());
            current = '';
          } else {
            current += char;
          }
        }
        result.push(current.trim());
        return result;
      };
      
      const lines = csvData.split('\n').filter(line => line.trim());
      if (lines.length < 2) {
        alert('CSV vazio ou sem dados. Verifique o arquivo.');
        return;
      }
      
      const headers = parseCSVLine(lines[0]).map(h => h.trim().replace(/"/g, ''));
      
      // Mapear possíveis nomes de colunas (case insensitive)
      const getColumnIndex = (possibleNames) => {
        for (const name of possibleNames) {
          const index = headers.findIndex(h => 
            h.toLowerCase().includes(name.toLowerCase()) || 
            name.toLowerCase().includes(h.toLowerCase())
          );
          if (index !== -1) return index;
        }
        return -1;
      };
      
      const empresaIndex = getColumnIndex(['Razão Social', 'Razao Social', 'Empresa', 'Nome', 'Nome Fantasia']);
      const cnpjIndex = getColumnIndex(['CNPJ', 'Cnpj', 'cnpj']);
      const segmentoIndex = getColumnIndex(['Segmento', 'Setor', 'Área', 'Area']);
      const scoreIndex = getColumnIndex(['Score', 'Pontuação', 'Pontuacao']);
      const rankIndex = getColumnIndex(['Rank', 'Ranking', 'Posição', 'Posicao']);
      const telefoneIndex = getColumnIndex(['Telefone', 'Tel', 'WhatsApp', 'Whatsapp']);
      const emailIndex = getColumnIndex(['Email', 'E-mail', 'E-mail']); // Removido 'Contato' - risco de importar nome como email
      const contatoIndex = getColumnIndex(['Contato', 'Nome Contato', 'Responsável', 'Responsavel']);
      const cargoIndex = getColumnIndex(['Cargo', 'Função', 'Funcao', 'Posição', 'Posicao']);
      
      const newLeads = [];
      let skipped = 0;
      
      for (let i = 1; i < lines.length; i++) {
        if (!lines[i].trim()) continue;
        
        const values = parseCSVLine(lines[i]).map(v => v.replace(/"/g, '').trim());
        
        // Extrair dados
        const empresa = empresaIndex !== -1 ? values[empresaIndex] : (values[0] || '');
        const cnpj = cnpjIndex !== -1 ? values[cnpjIndex] : (values[1] || '');
        const segmento = segmentoIndex !== -1 ? values[segmentoIndex] : (values[2] || 'Serviços Gerais');
        const scoreValue = scoreIndex !== -1 ? parseFloat(values[scoreIndex]) || 0 : 0;
        const rankValue = rankIndex !== -1 ? parseFloat(values[rankIndex]) || 0 : 0;
        const telefone = telefoneIndex !== -1 ? values[telefoneIndex] : '';
        const email = emailIndex !== -1 ? values[emailIndex] : '';
        const contato = contatoIndex !== -1 ? values[contatoIndex] : '';
        const cargo = cargoIndex !== -1 ? values[cargoIndex] : '';
        
        // Determinar prioridade baseado no score (escala 0-15) ou Rank (fallback)
        // Se Score for 0/vazio, usa Rank: top 10 = ALTA, 11-30 = MÉDIA, resto = BAIXA
        let prioridade = 'MEDIA';
        if (scoreValue > 0) {
          // Usa Score (escala 0-15)
          if (scoreValue >= 12) {
            prioridade = 'ALTA';
          } else if (scoreValue >= 6) {
            prioridade = 'MEDIA';
          } else {
            prioridade = 'BAIXA';
          }
        } else if (rankValue > 0) {
          // Fallback: usa Rank se Score não disponível
          if (rankValue <= 10) {
            prioridade = 'ALTA';
          } else if (rankValue <= 30) {
            prioridade = 'MEDIA';
          } else {
            prioridade = 'BAIXA';
          }
        }
        
        // Validar dados obrigatórios
        if (!empresa || !cnpj) {
          skipped++;
          continue;
        }
        
        const lead = {
          id: Date.now().toString() + '-' + i,
          empresa: empresa,
          cnpj: cnpj.replace(/[^\d]/g, ''), // Remove formatação do CNPJ
          segmento: segmento || 'Serviços Gerais',
          contato: contato || '',
          cargo: cargo || '',
          telefone: telefone || '',
          email: email || '',
          prioridade: prioridade,
          status: 'NOVO',
          owner: '', // Será definido manualmente após importação (obrigatório editar depois)
          origem: 'Planilha', // Origem padrão para imports CSV
          pacoteInteresse: '',
          valorPotencial: 0,
          proximoFollowup: '',
          tentativas: 0,
          dataEntrada: new Date().toISOString().split('T')[0],
          historico: [{
            data: new Date().toISOString().split('T')[0],
            nota: `Lead importado via CSV${scoreValue > 0 ? ` (Score: ${scoreValue})` : ''}`
          }]
        };
        
        newLeads.push(lead);
      }
      
      if (newLeads.length === 0) {
        showNotification(`Nenhum lead válido encontrado no CSV. ${skipped > 0 ? `${skipped} linha(s) foram ignoradas por falta de dados obrigatórios.` : ''}`, 'error');
        return;
      }
      
      // Verificar duplicatas antes de adicionar
      const existingCNPJs = new Set(leads.map(l => l.cnpj.replace(/\D/g, '')));
      const duplicates = [];
      const validLeads = newLeads.filter(lead => {
        const cnpjNumbers = lead.cnpj.replace(/\D/g, '');
        if (existingCNPJs.has(cnpjNumbers)) {
          duplicates.push(lead.empresa);
          return false;
        }
        existingCNPJs.add(cnpjNumbers);
        return true;
      });

      if (validLeads.length === 0) {
        showNotification('Nenhum lead novo foi importado. Todos já existem no sistema ou são inválidos.', 'error');
        return;
      }

      saveLeads([...leads, ...validLeads]);
      setShowImportModal(false);
      
      let message = `${validLeads.length} lead(s) importado(s) com sucesso!`;
      if (duplicates.length > 0) {
        message += ` ${duplicates.length} duplicado(s) ignorado(s).`;
      }
      if (skipped > 0) {
        message += ` ${skipped} linha(s) inválida(s) ignorada(s).`;
      }
      showNotification(message, 'success');
    } catch (error) {
      console.error('Erro ao importar CSV:', error);
      showNotification(`Erro ao importar CSV: ${error.message}. Verifique o formato do arquivo.`, 'error');
    }
  };

  // Filtros e Ordenação
  const filteredAndSortedLeads = leads
    .filter(lead => {
      const searchLower = searchTerm.toLowerCase();
      const matchSearch = 
        lead.empresa.toLowerCase().includes(searchLower) ||
        lead.cnpj.replace(/\D/g, '').includes(searchTerm.replace(/\D/g, '')) ||
        (lead.contato && lead.contato.toLowerCase().includes(searchLower)) ||
        (lead.email && lead.email.toLowerCase().includes(searchLower)) ||
        (lead.telefone && lead.telefone.includes(searchTerm)) ||
        (lead.segmento && lead.segmento.toLowerCase().includes(searchLower)) ||
        (lead.cargo && lead.cargo.toLowerCase().includes(searchLower));
      const matchStatus = filterStatus === 'TODOS' || lead.status === filterStatus;
      const matchPrioridade = filterPrioridade === 'TODOS' || lead.prioridade === filterPrioridade;
      const matchSegmento = filterSegmento === 'TODOS' || lead.segmento === filterSegmento;
      const matchOwner = filterOwner === 'TODOS' || lead.owner === filterOwner;
      const matchOrigem = filterOrigem === 'TODOS' || lead.origem === filterOrigem;
      return matchSearch && matchStatus && matchPrioridade && matchSegmento && matchOwner && matchOrigem;
    })
    .sort((a, b) => {
      let aValue, bValue;
      
      if (sortBy === 'empresa') {
        aValue = a.empresa?.toLowerCase() || '';
        bValue = b.empresa?.toLowerCase() || '';
      } else if (sortBy === 'valorPotencial') {
        aValue = a.valorPotencial || 0;
        bValue = b.valorPotencial || 0;
      } else if (sortBy === 'dataEntrada') {
        aValue = a.dataEntrada || '';
        bValue = b.dataEntrada || '';
      } else {
        aValue = a[sortBy] || '';
        bValue = b[sortBy] || '';
      }
      
      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
      } else {
        return aValue < bValue ? 1 : aValue > bValue ? -1 : 0;
      }
    });

  // Gerar lista de segmentos dinamicamente (combina iniciais + segmentos dos leads)
  const getSegmentos = () => {
    const segmentosFromLeads = [...new Set(leads.map(l => l.segmento).filter(Boolean))];
    const allSegmentos = [...new Set([...SEGMENTOS_INICIAIS, ...segmentosFromLeads])];
    return allSegmentos.sort();
  };

  const SEGMENTOS = getSegmentos();

  // Métricas
  const metrics = {
    total: leads.length,
    novos: leads.filter(l => l.status === 'NOVO').length,
    ganhos: leads.filter(l => l.status === 'GANHO').length,
    perdidos: leads.filter(l => l.status === 'PERDIDO').length,
    emNegociacao: leads.filter(l => l.status === 'PROPOSTA_ENVIADA').length,
    valorPipeline: leads.filter(l => ['QUALIFICADO', 'PROPOSTA_ENVIADA'].includes(l.status))
                        .reduce((sum, l) => sum + (l.valorPotencial || 0), 0),
    followupsHoje: leads.filter(l => l.proximoFollowup === new Date().toISOString().split('T')[0]).length
  };

  if (isLoading) {
    return (
      <div className="min-h-screen" style={{ backgroundColor: '#0f1419' }} className="flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-300">Carregando CRM...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0f1419' }}>
      {/* Header */}
      <header className="bg-gradient-to-r from-primary to-secondary text-white shadow-lg" style={{ backgroundColor: '#0f1419' }}>
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src="logo.svg" alt="Alinhatta Logo" className="w-12 h-12" style={{ filter: 'brightness(0) invert(1)' }} />
              <div>
                <h1 className="text-2xl font-bold" style={{ fontFamily: 'Montserrat, sans-serif' }}>ALINHATTA CRM</h1>
                <p className="text-gray-300 text-sm">Sistema de Gestão de Leads</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setView('pipeline')}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  view === 'pipeline' ? 'bg-primary text-white' : 'bg-primary-dark/50 text-white hover:bg-primary-dark'
                }`}
                style={{ fontFamily: 'Montserrat, sans-serif' }}
              >
                Pipeline
              </button>
              <button
                onClick={() => setView('dashboard')}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  view === 'dashboard' ? 'bg-primary text-white' : 'bg-primary-dark/50 text-white hover:bg-primary-dark'
                }`}
                style={{ fontFamily: 'Montserrat, sans-serif' }}
              >
                Dashboard
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        {view === 'pipeline' && !selectedLead && (
          <PipelineView
            leads={filteredAndSortedLeads}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            filterStatus={filterStatus}
            setFilterStatus={setFilterStatus}
            filterPrioridade={filterPrioridade}
            setFilterPrioridade={setFilterPrioridade}
            filterSegmento={filterSegmento}
            setFilterSegmento={setFilterSegmento}
            filterOwner={filterOwner}
            setFilterOwner={setFilterOwner}
            filterOrigem={filterOrigem}
            setFilterOrigem={setFilterOrigem}
            sortBy={sortBy}
            setSortBy={setSortBy}
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
            onSelectLead={setSelectedLead}
            onAddLead={() => setShowAddModal(true)}
            onImportLeads={() => setShowImportModal(true)}
            onExportLeads={() => setShowExportModal(true)}
            metrics={metrics}
            segmentos={SEGMENTOS}
          />
        )}

        {view === 'pipeline' && selectedLead && (
          <LeadDetailView
            lead={selectedLead}
            onBack={() => setSelectedLead(null)}
            onUpdate={updateLead}
            onAddInteracao={addInteracao}
            onDelete={deleteLead}
            formatCNPJ={formatCNPJ}
          />
        )}

        {view === 'dashboard' && (
          <DashboardView leads={leads} metrics={metrics} segmentos={SEGMENTOS} />
        )}
      </main>

      {/* Add Lead Modal */}
      {showAddModal && (
        <AddLeadModal
          onClose={() => setShowAddModal(false)}
          onAdd={addLead}
          segmentos={SEGMENTOS}
        />
      )}

      {/* Import CSV Modal */}
      {showImportModal && (
        <ImportCSVModal
          onClose={() => setShowImportModal(false)}
          onImport={importLeadsFromCSV}
          existingLeads={leads}
        />
      )}

      {/* Export Modal */}
      {showExportModal && (
        <ExportModal
          onClose={() => setShowExportModal(false)}
          onExport={exportLeads}
        />
      )}
    </div>
  );
};

const PipelineView = ({ leads, searchTerm, setSearchTerm, filterStatus, setFilterStatus, filterPrioridade, setFilterPrioridade, filterSegmento, setFilterSegmento, filterOwner, setFilterOwner, filterOrigem, setFilterOrigem, sortBy, setSortBy, sortOrder, setSortOrder, onSelectLead, onAddLead, onImportLeads, onExportLeads, metrics, segmentos }) => {
  const followupsHoje = leads.filter(l => l.proximoFollowup === new Date().toISOString().split('T')[0]);
  const followupsAtrasados = leads.filter(l => l.proximoFollowup && l.proximoFollowup < new Date().toISOString().split('T')[0]);

  return (
    <div className="space-y-6">
      {/* Alertas */}
      {(followupsHoje.length > 0 || followupsAtrasados.length > 0) && (
        <div className="border-l-4 border-red-500 p-4 rounded" style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)' }}>
          <div className="flex items-start">
            <AlertCircle className="w-5 h-5 text-red-400 mr-3 mt-0.5" />
            <div>
              <h3 className="font-semibold text-red-300" style={{ fontFamily: 'Montserrat, sans-serif' }}>Atenção!</h3>
              {followupsAtrasados.length > 0 && (
                <p className="text-red-200 text-sm">🔴 {followupsAtrasados.length} follow-up(s) atrasado(s)</p>
              )}
              {followupsHoje.length > 0 && (
                <p className="text-yellow-200 text-sm">🟡 {followupsHoje.length} follow-up(s) para hoje</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Métricas Rápidas */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <MetricCard title="Total Leads" value={metrics.total} icon="📊" />
        <MetricCard title="Novos" value={metrics.novos} icon="🆕" />
        <MetricCard title="Em Negociação" value={metrics.emNegociacao} icon="💼" />
        <MetricCard title="Ganhos" value={metrics.ganhos} icon="✅" color="text-primary" />
      </div>

      {/* Busca e Filtros */}
      <div className="rounded-lg shadow p-4 space-y-4" style={{ backgroundColor: '#1e252b', borderTop: '4px solid #1a7b60' }}>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Buscar por empresa, CNPJ ou contato..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <button
            onClick={onImportLeads}
            className="bg-accent text-neutral-dark px-4 py-2 rounded-lg hover:bg-accent-dark transition flex items-center justify-center gap-2 font-bold"
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            <Upload className="w-5 h-5" />
            Importar
          </button>
          <button
            onClick={onExportLeads}
            className="bg-secondary text-white px-4 py-2 rounded-lg hover:opacity-90 transition flex items-center justify-center gap-2 font-bold"
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            <BarChart3 className="w-5 h-5" />
            Exportar
          </button>
          <button
            onClick={onAddLead}
            className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark transition flex items-center justify-center gap-2 font-bold"
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            <Plus className="w-5 h-5" />
            Novo Lead
          </button>
        </div>

        <div className="flex flex-wrap gap-2">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
          >
            <option value="TODOS">Todos os Status</option>
            {STATUS_OPTIONS.map(s => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>

          <select
            value={filterPrioridade}
            onChange={(e) => setFilterPrioridade(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
          >
            <option value="TODOS">Todas as Prioridades</option>
            {PRIORIDADE_OPTIONS.map(p => (
              <option key={p.value} value={p.value}>{p.label}</option>
            ))}
          </select>

          <select
            value={filterSegmento}
            onChange={(e) => setFilterSegmento(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
          >
            <option value="TODOS">Todos os Segmentos</option>
            {segmentos.map(seg => (
              <option key={seg} value={seg}>{seg}</option>
            ))}
          </select>

          <select
            value={filterOwner}
            onChange={(e) => setFilterOwner(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
          >
            <option value="TODOS">Todos os SDRs</option>
            {SDRS.map(sdr => (
              <option key={sdr} value={sdr}>{sdr}</option>
            ))}
          </select>

          <select
            value={filterOrigem}
            onChange={(e) => setFilterOrigem(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
          >
            <option value="TODOS">Todas as Origens</option>
            {ORIGENS_LEAD.map(origem => (
              <option key={origem} value={origem}>{origem}</option>
            ))}
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
          >
            <option value="dataEntrada">Ordenar por: Data</option>
            <option value="empresa">Ordenar por: Empresa</option>
            <option value="valorPotencial">Ordenar por: Valor</option>
            <option value="status">Ordenar por: Status</option>
          </select>

          <button
            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition flex items-center gap-2"
            title={sortOrder === 'asc' ? 'Crescente' : 'Decrescente'}
          >
            {sortOrder === 'asc' ? '↑' : '↓'}
          </button>
        </div>
      </div>

      {/* Lista de Leads */}
      <div className="space-y-3">
        {leads.length === 0 ? (
          <div className="rounded-lg shadow p-12 text-center" style={{ backgroundColor: '#1e252b' }}>
            <p className="text-gray-300 text-lg mb-4">Nenhum lead cadastrado ainda</p>
            <button
              onClick={onAddLead}
              className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition inline-flex items-center gap-2"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              <Plus className="w-5 h-5" />
              Adicionar Primeiro Lead
            </button>
          </div>
        ) : leads.length > 0 && leads.filter(l => 
            l.empresa.toLowerCase().includes(searchTerm.toLowerCase()) ||
            l.cnpj.includes(searchTerm) ||
            (l.contato && l.contato.toLowerCase().includes(searchTerm.toLowerCase()))
          ).filter(l => filterStatus === 'TODOS' || l.status === filterStatus)
          .filter(l => filterPrioridade === 'TODOS' || l.prioridade === filterPrioridade).length === 0 ? (
          <div className="rounded-lg shadow p-8 text-center" style={{ backgroundColor: '#1e252b' }}>
            <p className="text-gray-300">Nenhum lead encontrado com os filtros aplicados</p>
          </div>
        ) : (
          leads
            .filter(l => 
              l.empresa.toLowerCase().includes(searchTerm.toLowerCase()) ||
              l.cnpj.includes(searchTerm) ||
              (l.contato && l.contato.toLowerCase().includes(searchTerm.toLowerCase()))
            )
            .filter(l => filterStatus === 'TODOS' || l.status === filterStatus)
            .filter(l => filterPrioridade === 'TODOS' || l.prioridade === filterPrioridade)
            .map(lead => (
              <LeadCard key={lead.id} lead={lead} onClick={() => onSelectLead(lead)} />
            ))
        )}
      </div>
    </div>
  );
};

const LeadCard = ({ lead, onClick }) => {
  const status = STATUS_OPTIONS.find(s => s.value === lead.status);
  const prioridade = PRIORIDADE_OPTIONS.find(p => p.value === lead.prioridade);
  const isFollowupHoje = lead.proximoFollowup === new Date().toISOString().split('T')[0];
  const isFollowupAtrasado = lead.proximoFollowup && lead.proximoFollowup < new Date().toISOString().split('T')[0];

  return (
    <div
      onClick={onClick}
      className={`rounded-lg shadow hover:shadow-lg transition cursor-pointer p-4 border-l-4 ${
        isFollowupAtrasado ? 'border-red-500' : isFollowupHoje ? 'border-accent' : 'border-primary'
      }`}
      style={{ backgroundColor: '#1e252b' }}
    >
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <h3 className="font-bold text-lg text-neutral-dark" style={{ fontFamily: 'Montserrat, sans-serif' }}>{lead.empresa}</h3>
          <p className="text-sm text-neutral-text">{lead.segmento}</p>
          {lead.owner && (
            <p className="text-xs text-primary font-medium mt-1">👤 {lead.owner}</p>
          )}
        </div>
        <div className="flex flex-col items-end gap-2">
          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${status?.color}`}>
            {status?.label}
          </span>
          <span className={`px-2 py-1 rounded text-xs font-medium border ${prioridade?.color}`}>
            {prioridade?.label}
          </span>
          {lead.origem && (
            <span className="px-2 py-1 rounded text-xs font-medium bg-accent text-neutral-dark">
              📍 {lead.origem}
            </span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm text-neutral-text mb-3">
        <div className="flex items-center gap-2">
          <Phone className="w-4 h-4" />
          <span>{lead.telefone || 'Sem telefone'}</span>
        </div>
        <div className="flex items-center gap-2">
          <Mail className="w-4 h-4" />
          <span className="truncate">{lead.email || 'Sem email'}</span>
        </div>
      </div>

      {lead.proximoFollowup && (
        <div className={`flex items-center gap-2 text-sm ${
          isFollowupAtrasado ? 'text-red-600 font-medium' : isFollowupHoje ? 'text-accent font-medium' : 'text-neutral-text'
        }`}>
          <Calendar className="w-4 h-4" />
          <span>
            {isFollowupAtrasado ? '🔴 Atrasado: ' : isFollowupHoje ? '🟡 Hoje: ' : 'Próximo follow-up: '}
            {new Date(lead.proximoFollowup).toLocaleDateString('pt-BR')}
          </span>
        </div>
      )}

      {lead.notaUltimaInteracao && (
        <p className="text-sm text-neutral-text mt-2 italic truncate">"{lead.notaUltimaInteracao}"</p>
      )}
    </div>
  );
};

const LeadDetailView = ({ lead, onBack, onUpdate, onAddInteracao, formatCNPJ }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedLead, setEditedLead] = useState(lead);
  const [novaInteracao, setNovaInteracao] = useState('');

  const handleSave = () => {
    onUpdate(editedLead);
    setIsEditing(false);
  };

  const handleAddInteracao = () => {
    if (novaInteracao.trim()) {
      onAddInteracao(lead.id, novaInteracao);
      setNovaInteracao('');
    }
  };

  const status = STATUS_OPTIONS.find(s => s.value === lead.status);

  return (
    <div className="space-y-6">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-primary hover:text-primary-dark font-medium"
      >
        <ArrowLeft className="w-5 h-5" />
        Voltar para Pipeline
      </button>

      <div className="rounded-lg shadow-lg p-6" style={{ backgroundColor: '#1e252b' }}>
        <div className="flex justify-between items-start mb-6">
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-gray-200 mb-2">{lead.empresa}</h2>
            <p className="text-gray-300">CNPJ: {formatCNPJ(lead.cnpj)}</p>
            <p className="text-gray-300">{lead.segmento}</p>
          </div>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition flex items-center gap-2"
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            {isEditing ? <Save className="w-4 h-4" /> : <Edit2 className="w-4 h-4" />}
            {isEditing ? 'Salvar' : 'Editar'}
          </button>
        </div>

        {isEditing ? (
          <EditLeadForm lead={editedLead} onChange={setEditedLead} onSave={handleSave} />
        ) : (
          <ViewLeadDetails lead={lead} />
        )}

        {/* Nova Interação */}
        <div className="mt-8 border-t pt-6">
          <h3 className="text-xl font-bold text-gray-200 mb-4">Registrar Nova Interação</h3>
          <div className="flex gap-2">
            <input
              type="text"
              value={novaInteracao}
              onChange={(e) => setNovaInteracao(e.target.value)}
              placeholder="Ex: Cliente pediu mais informações sobre Pacote Pro..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
              onKeyPress={(e) => e.key === 'Enter' && handleAddInteracao()}
            />
            <button
              onClick={handleAddInteracao}
              className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark transition"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              Adicionar
            </button>
          </div>
        </div>

        {/* Histórico */}
        {lead.historico && lead.historico.length > 0 && (
          <div className="mt-8 border-t pt-6">
            <h3 className="text-xl font-bold text-gray-200 mb-4">Histórico de Interações</h3>
            <div className="space-y-3">
              {[...lead.historico].reverse().map((item, idx) => (
                <div key={idx} className="p-4 rounded-lg" style={{ backgroundColor: '#1a1f26' }}>
                  <p className="text-sm text-gray-400 mb-1">
                    {new Date(item.data).toLocaleDateString('pt-BR')}
                  </p>
                  <p className="text-gray-200">{item.nota}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const ViewLeadDetails = ({ lead }) => {
  const status = STATUS_OPTIONS.find(s => s.value === lead.status);
  const prioridade = PRIORIDADE_OPTIONS.find(p => p.value === lead.prioridade);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <DetailField label="SDR Responsável" value={lead.owner || 'Não atribuído'} icon={<span className="text-primary">👤</span>} />
      <DetailField label="Origem do Lead" value={lead.origem || '-'} icon={<span className="text-secondary">📍</span>} />
      <DetailField label="Status" value={status?.label} icon={null} />
      <DetailField label="Prioridade" value={prioridade?.label} icon={null} />
      <DetailField label="Contato Principal" value={lead.contato} icon={null} />
      <DetailField label="Cargo" value={lead.cargo} icon={null} />
      <DetailField label="Telefone" value={lead.telefone} icon={<Phone className="w-4 h-4" />} />
      <DetailField label="Email" value={lead.email} icon={<Mail className="w-4 h-4" />} />
      <DetailField label="Pacote de Interesse" value={lead.pacoteInteresse} icon={null} />
      <DetailField label="Valor Potencial" value={lead.valorPotencial ? `R$ ${lead.valorPotencial.toLocaleString('pt-BR')}` : '-'} icon={null} />
      <DetailField label="Última Interação" value={lead.ultimaInteracao ? new Date(lead.ultimaInteracao).toLocaleDateString('pt-BR') : '-'} icon={null} />
      <DetailField label="Próximo Follow-up" value={lead.proximoFollowup ? new Date(lead.proximoFollowup).toLocaleDateString('pt-BR') : '-'} icon={null} />
      <DetailField label="Nº de Tentativas" value={lead.tentativas || 0} icon={null} />
      <DetailField label="Data de Entrada" value={lead.dataEntrada ? new Date(lead.dataEntrada).toLocaleDateString('pt-BR') : '-'} icon={null} />
      {lead.notaUltimaInteracao && (
        <div className="md:col-span-2">
          <DetailField label="Última Nota" value={lead.notaUltimaInteracao} />
        </div>
      )}
    </div>
  );
};

const DetailField = ({ label, value, icon = null }) => (
  <div>
    <p className="text-sm text-gray-400 mb-1">{label}</p>
    <div className="flex items-center gap-2">
      {icon}
      <p className="text-gray-200 font-medium">{value || '-'}</p>
    </div>
  </div>
);

const EditLeadForm = ({ lead, onChange, onSave }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div>
      <label className="block text-sm font-medium text-gray-300 mb-1">
        SDR Responsável <span className="text-red-500">*</span>
      </label>
      <select
        value={lead.owner || ''}
        onChange={(e) => onChange({ ...lead, owner: e.target.value })}
        required
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
      >
        <option value="">Selecione um SDR...</option>
        {SDRS.map(sdr => (
          <option key={sdr} value={sdr}>{sdr}</option>
        ))}
      </select>
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-300 mb-1">Origem do Lead</label>
      <select
        value={lead.origem || ''}
        onChange={(e) => onChange({ ...lead, origem: e.target.value })}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
      >
        <option value="">Selecione...</option>
        {ORIGENS_LEAD.map(origem => (
          <option key={origem} value={origem}>{origem}</option>
        ))}
      </select>
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-300 mb-1">Status</label>
      <select
        value={lead.status}
        onChange={(e) => onChange({ ...lead, status: e.target.value })}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
      >
        {STATUS_OPTIONS.map(s => (
          <option key={s.value} value={s.value}>{s.label}</option>
        ))}
      </select>
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-300 mb-1">Prioridade</label>
      <select
        value={lead.prioridade}
        onChange={(e) => onChange({ ...lead, prioridade: e.target.value })}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
      >
        {PRIORIDADE_OPTIONS.map(p => (
          <option key={p.value} value={p.value}>{p.label}</option>
        ))}
      </select>
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-300 mb-1">Contato Principal</label>
      <input
        type="text"
        value={lead.contato || ''}
        onChange={(e) => onChange({ ...lead, contato: e.target.value })}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
      />
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-300 mb-1">Cargo</label>
      <input
        type="text"
        value={lead.cargo || ''}
        onChange={(e) => onChange({ ...lead, cargo: e.target.value })}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
      />
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-300 mb-1">Telefone</label>
      <input
        type="text"
        value={lead.telefone || ''}
        onChange={(e) => {
          const masked = maskPhone(e.target.value);
          onChange({ ...lead, telefone: masked });
        }}
        maxLength={15}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
      />
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
      <input
        type="email"
        value={lead.email || ''}
        onChange={(e) => onChange({ ...lead, email: e.target.value })}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
      />
      {lead.email && !validateEmail(lead.email) && (
        <p className="text-red-500 text-xs mt-1">Email inválido</p>
      )}
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-300 mb-1">Pacote de Interesse</label>
      <select
        value={lead.pacoteInteresse || ''}
        onChange={(e) => onChange({ ...lead, pacoteInteresse: e.target.value })}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
      >
        <option value="">Selecione...</option>
        {PACOTES.map(p => (
          <option key={p} value={p}>{p}</option>
        ))}
      </select>
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-300 mb-1">Valor Potencial (R$)</label>
      <input
        type="number"
        value={lead.valorPotencial || ''}
        onChange={(e) => onChange({ ...lead, valorPotencial: parseFloat(e.target.value) || 0 })}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
      />
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-300 mb-1">Próximo Follow-up</label>
      <input
        type="date"
        value={lead.proximoFollowup || ''}
        onChange={(e) => onChange({ ...lead, proximoFollowup: e.target.value })}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
      />
    </div>
    <div className="md:col-span-2">
      <button
        onClick={onSave}
        className="w-full bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition font-medium"
        style={{ fontFamily: 'Montserrat, sans-serif' }}
      >
        Salvar Alterações
      </button>
    </div>
  </div>
);

const DashboardView = ({ leads, metrics, segmentos }) => {
  const statusDistribution = STATUS_OPTIONS.map(status => ({
    label: status.label,
    count: leads.filter(l => l.status === status.value).length,
    color: status.color
  }));

  const segmentoDistribution = segmentos.map(seg => ({
    label: seg,
    count: leads.filter(l => l.segmento === seg).length
  })).filter(s => s.count > 0);

  const ownerDistribution = SDRS.map(sdr => ({
    label: sdr,
    count: leads.filter(l => l.owner === sdr).length
  })).filter(s => s.count > 0);

  const origemDistribution = ORIGENS_LEAD.map(origem => ({
    label: origem,
    count: leads.filter(l => l.origem === origem).length
  })).filter(s => s.count > 0);

  const taxaConversao = leads.length > 0 
    ? ((metrics.ganhos / leads.length) * 100).toFixed(1)
    : 0;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-200">Dashboard de Métricas</h2>

      {/* Métricas Principais */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <MetricCard 
          title="Total de Leads" 
          value={metrics.total} 
          icon="📊" 
          subtitle="No pipeline"
        />
        <MetricCard 
          title="Taxa de Conversão" 
          value={`${taxaConversao}%`} 
          icon="📈" 
          subtitle={`${metrics.ganhos} ganhos`}
          color="text-primary"
        />
        <MetricCard 
          title="Em Negociação" 
          value={metrics.emNegociacao} 
          icon="💼" 
          subtitle="Propostas enviadas"
          color="text-orange-600"
        />
        <MetricCard 
          title="Valor Pipeline" 
          value={`R$ ${(metrics.valorPipeline / 1000).toFixed(0)}k`} 
          icon="💰" 
          subtitle="Potencial total"
          color="text-emerald-600"
        />
      </div>

      {/* Status Distribution */}
      <div className="rounded-lg shadow p-6" style={{ backgroundColor: '#1e252b' }}>
        <h3 className="text-xl font-bold text-gray-200 mb-4">Distribuição por Status</h3>
        <div className="space-y-3">
          {statusDistribution.map((status, idx) => (
            <div key={idx} className="flex items-center gap-4">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${status.color} w-48`}>
                {status.label}
              </span>
              <div className="flex-1 bg-gray-200 rounded-full h-8 relative overflow-hidden">
                <div 
                  className="bg-primary h-full rounded-full flex items-center justify-end pr-3 text-white text-sm font-medium transition-all"
                  style={{ width: `${leads.length > 0 ? (status.count / leads.length) * 100 : 0}%` }}
                >
                  {status.count > 0 && status.count}
                </div>
              </div>
              <span className="text-gray-600 font-medium w-16 text-right">
                {leads.length > 0 ? ((status.count / leads.length) * 100).toFixed(0) : 0}%
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Segmentos */}
      {segmentoDistribution.length > 0 && (
        <div className="rounded-lg shadow p-6" style={{ backgroundColor: '#1e252b' }}>
          <h3 className="text-xl font-bold text-gray-800 mb-4">Leads por Segmento</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {segmentoDistribution.map((seg, idx) => (
              <div key={idx} className="p-4 rounded-lg flex justify-between items-center" style={{ backgroundColor: '#1a1f26' }}>
                <span className="font-medium text-gray-200">{seg.label}</span>
                <span className="bg-primary text-white px-3 py-1 rounded-full font-bold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  {seg.count}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Distribuição por SDR */}
      {ownerDistribution.length > 0 && (
        <div className="rounded-lg shadow p-6" style={{ backgroundColor: '#1e252b' }}>
          <h3 className="text-xl font-bold text-gray-800 mb-4">Leads por SDR</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {ownerDistribution.map((owner, idx) => (
              <div key={idx} className="bg-gradient-to-br from-primary to-secondary text-white p-4 rounded-lg flex justify-between items-center">
                <span className="font-medium" style={{ fontFamily: 'Montserrat, sans-serif' }}>👤 {owner.label}</span>
                <span className="bg-white text-primary px-3 py-1 rounded-full font-bold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  {owner.count}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Distribuição por Origem */}
      {origemDistribution.length > 0 && (
        <div className="rounded-lg shadow p-6" style={{ backgroundColor: '#1e252b' }}>
          <h3 className="text-xl font-bold text-gray-800 mb-4">Leads por Origem</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {origemDistribution.map((origem, idx) => (
              <div key={idx} className="bg-accent p-4 rounded-lg flex justify-between items-center">
                <span className="font-medium text-neutral-dark">📍 {origem.label}</span>
                <span className="bg-primary text-white px-3 py-1 rounded-full font-bold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  {origem.count}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Performance Semanal */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-medium">Novos Leads</h4>
            <span className="text-3xl">🆕</span>
          </div>
          <p className="text-3xl font-bold">{metrics.novos}</p>
          <p className="text-blue-100 text-sm">Aguardando primeiro contato</p>
        </div>

        <div className="bg-gradient-to-br from-primary to-secondary text-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-medium" style={{ fontFamily: 'Montserrat, sans-serif' }}>Vitórias</h4>
            <span className="text-3xl">✅</span>
          </div>
          <p className="text-3xl font-bold" style={{ fontFamily: 'Montserrat, sans-serif' }}>{metrics.ganhos}</p>
          <p className="text-white text-sm opacity-90">Contratos fechados</p>
        </div>

        <div className="bg-gradient-to-br from-red-500 to-red-600 text-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-medium">Perdidos</h4>
            <span className="text-3xl">❌</span>
          </div>
          <p className="text-3xl font-bold">{metrics.perdidos}</p>
          <p className="text-red-100 text-sm">Oportunidades não convertidas</p>
        </div>
      </div>

      {/* Alertas */}
      <div className="rounded-lg shadow p-6" style={{ backgroundColor: '#1e252b' }}>
        <h3 className="text-xl font-bold text-gray-800 mb-4">Alertas de Follow-up</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
            <p className="text-yellow-800 font-medium">Follow-ups Hoje</p>
            <p className="text-3xl font-bold text-yellow-600">{metrics.followupsHoje}</p>
          </div>
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
            <p className="text-red-800 font-medium">Follow-ups Atrasados</p>
            <p className="text-3xl font-bold text-red-600">
              {leads.filter(l => l.proximoFollowup && l.proximoFollowup < new Date().toISOString().split('T')[0]).length}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const MetricCard = ({ title, value, icon, subtitle, color = "text-gray-200" }) => (
  <div className="rounded-lg shadow p-6" style={{ backgroundColor: '#1e252b' }}>
    <div className="flex items-center justify-between mb-2">
      <p className="text-sm text-gray-300">{title}</p>
      <span className="text-2xl">{icon}</span>
    </div>
    <p className={`text-3xl font-bold ${color}`}>{value}</p>
    {subtitle && <p className="text-sm text-gray-400 mt-1">{subtitle}</p>}
  </div>
);

const AddLeadModal = ({ onClose, onAdd, segmentos }) => {
  const [formData, setFormData] = useState({
    empresa: '',
    cnpj: '',
    segmento: '',
    contato: '',
    cargo: '',
    telefone: '',
    email: '',
    owner: '', // SDR responsável (obrigatório)
    origem: 'Planilha', // Origem do lead
    prioridade: 'MEDIA',
    status: 'NOVO',
    pacoteInteresse: '',
    valorPotencial: 0,
    proximoFollowup: '',
    tentativas: 0
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.empresa && formData.cnpj) {
      onAdd(formData);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white">
          <h3 className="text-2xl font-bold text-gray-800">Adicionar Novo Lead</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Empresa * <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.empresa}
                onChange={(e) => setFormData({ ...formData, empresa: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                placeholder="Razão Social da empresa"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                CNPJ <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.cnpj}
                onChange={(e) => {
                  const masked = maskCNPJ(e.target.value);
                  setFormData({ ...formData, cnpj: masked });
                }}
                maxLength={18}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                placeholder="00.000.000/0000-00"
              />
              {formData.cnpj && !validateCNPJ(formData.cnpj) && (
                <p className="text-red-500 text-xs mt-1">CNPJ inválido. Verifique os dígitos verificadores.</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                SDR Responsável <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.owner}
                onChange={(e) => setFormData({ ...formData, owner: e.target.value })}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
              >
                <option value="">Selecione um SDR...</option>
                {SDRS.map(sdr => (
                  <option key={sdr} value={sdr}>{sdr}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Origem do Lead</label>
              <select
                value={formData.origem}
                onChange={(e) => setFormData({ ...formData, origem: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
              >
                {ORIGENS_LEAD.map(origem => (
                  <option key={origem} value={origem}>{origem}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Segmento</label>
              <select
                value={formData.segmento}
                onChange={(e) => setFormData({ ...formData, segmento: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
              >
                <option value="">Selecione...</option>
                {segmentos.map(seg => (
                  <option key={seg} value={seg}>{seg}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Contato Principal</label>
              <input
                type="text"
                value={formData.contato}
                onChange={(e) => setFormData({ ...formData, contato: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                placeholder="Nome do decisor"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Cargo</label>
              <input
                type="text"
                value={formData.cargo}
                onChange={(e) => setFormData({ ...formData, cargo: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                placeholder="Ex: Diretor Comercial"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Telefone/WhatsApp</label>
              <input
                type="text"
                value={formData.telefone}
                onChange={(e) => {
                  const masked = maskPhone(e.target.value);
                  setFormData({ ...formData, telefone: masked });
                }}
                maxLength={15}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                placeholder="(00) 00000-0000"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                placeholder="contato@empresa.com"
              />
              {formData.email && !validateEmail(formData.email) && (
                <p className="text-red-500 text-xs mt-1">Email inválido</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Prioridade</label>
              <select
                value={formData.prioridade}
                onChange={(e) => setFormData({ ...formData, prioridade: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
              >
                {PRIORIDADE_OPTIONS.map(p => (
                  <option key={p.value} value={p.value}>{p.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Pacote de Interesse</label>
              <select
                value={formData.pacoteInteresse}
                onChange={(e) => setFormData({ ...formData, pacoteInteresse: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
              >
                <option value="">Selecione...</option>
                {PACOTES.map(p => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Valor Potencial (R$)</label>
              <input
                type="number"
                value={formData.valorPotencial}
                onChange={(e) => setFormData({ ...formData, valorPotencial: parseFloat(e.target.value) || 0 })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                placeholder="1800"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Primeiro Follow-up</label>
              <input
                type="date"
                value={formData.proximoFollowup}
                onChange={(e) => setFormData({ ...formData, proximoFollowup: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          <div className="mt-6 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition font-medium"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition font-medium"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              Adicionar Lead
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const ExportModal = ({ onClose, onExport }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center" style={{ borderTop: '4px solid #1a7b60' }}>
          <h3 className="text-2xl font-bold text-primary" style={{ fontFamily: 'Montserrat, sans-serif' }}>Exportar Leads</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          <p className="text-neutral-text mb-4">Escolha o formato de exportação:</p>
          <div className="flex gap-3">
            <button
              onClick={() => onExport('csv')}
              className="flex-1 bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition font-bold"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              Exportar CSV
            </button>
            <button
              onClick={() => onExport('json')}
              className="flex-1 bg-secondary text-white px-6 py-3 rounded-lg hover:opacity-90 transition font-bold"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              Exportar JSON
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ImportCSVModal = ({ onClose, onImport }) => {
  const [csvText, setCsvText] = useState('');

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setCsvText(event.target.result);
      };
      reader.readAsText(file);
    }
  };

  const handleImport = () => {
    if (csvText.trim()) {
      onImport(csvText);
    } else {
      alert('Por favor, faça upload de um arquivo CSV');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white" style={{ borderTop: '4px solid #1a7b60' }}>
          <h3 className="text-2xl font-bold text-primary" style={{ fontFamily: 'Montserrat, sans-serif' }}>Importar Leads via CSV</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          <div className="mb-4">
            <p className="text-neutral-text mb-4">
              Faça upload de um arquivo CSV com os seguintes campos:
            </p>
            <div className="bg-neutral-light p-4 rounded-lg mb-4 border-l-4 border-accent">
              <p className="font-bold text-neutral-dark mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>Campos obrigatórios:</p>
              <ul className="list-disc list-inside text-sm text-neutral-text space-y-1">
                <li><strong>CNPJ</strong> - CNPJ da empresa</li>
                <li><strong>Razão Social</strong> - Nome da empresa</li>
                <li><strong>Segmento</strong> - Área de atuação</li>
              </ul>
              <p className="text-xs text-neutral-text mt-3 italic">
                * O sistema irá classificar automaticamente a prioridade baseado no Score (se disponível)
              </p>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-neutral-dark mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Selecionar arquivo CSV
            </label>
            <input
              type="file"
              accept=".csv"
              onChange={handleFileUpload}
              className="w-full px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg focus:ring-2 focus:ring-primary hover:border-primary transition"
            />
          </div>

          {csvText && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-neutral-dark mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Preview do arquivo (primeiras 5 linhas):
              </label>
              <pre className="bg-neutral-light p-4 rounded-lg text-xs overflow-x-auto border-l-4 border-secondary">
                {csvText.split('\n').slice(0, 5).join('\n')}
              </pre>
            </div>
          )}

          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-200 text-neutral-dark px-6 py-3 rounded-lg hover:bg-gray-300 transition font-bold"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              Cancelar
            </button>
            <button
              onClick={handleImport}
              disabled={!csvText}
              className="flex-1 bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition font-bold disabled:bg-gray-300 disabled:cursor-not-allowed"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              Importar Leads
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Tornar disponível globalmente para uso no HTML (sem export default para evitar problemas com Babel)
if (typeof window !== 'undefined') {
    window.CRMAlinhatta = CRMAlinhatta;
} else {
    // Fallback para ambientes não-browser
    globalThis.CRMAlinhatta = CRMAlinhatta;
}