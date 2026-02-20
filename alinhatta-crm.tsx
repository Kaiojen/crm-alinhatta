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
const FileText = createIcon(['M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z', 'M14 2v6h6', 'M16 13H8', 'M16 17H8', 'M10 9H8']);
const Briefcase = createIcon(['M16 20V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v16', 'M8 7H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2h-4']);
const CheckCircle = createIcon(['M22 11.08V12a10 10 0 11-5.93-9.14', 'M22 4L12 14.01l-3-3']);
const Users = createIcon(['M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2', 'M9 11a4 4 0 100-8 4 4 0 000 8z', 'M23 21v-2a4 4 0 00-3-3.87', 'M16 3.13a4 4 0 010 7.75']);
const MapPin = createIcon(['M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z', 'M12 13a3 3 0 100-6 3 3 0 000 6z']);
const User = createIcon(['M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2', 'M12 11a4 4 0 100-8 4 4 0 000 8z']);
const Clipboard = createIcon(['M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2', 'M9 2h6v4H9z']);

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
}

const STATUS_OPTIONS = [
  { value: 'NOVO', label: 'Novo', color: 'bg-blue-900/30 text-blue-300 border-blue-600' },
  { value: 'CONTATO_INICIAL', label: 'Contato Inicial', color: 'bg-yellow-900/30 text-yellow-300 border-yellow-600' },
  { value: 'DIAGNOSTICO_AGENDADO', label: 'Diagnóstico Agendado', color: 'bg-purple-900/30 text-purple-300 border-purple-600' },
  { value: 'QUALIFICADO', label: 'Qualificado', color: 'bg-green-900/30 text-green-300 border-green-600' },
  { value: 'PROPOSTA_ENVIADA', label: 'Proposta Enviada', color: 'bg-orange-900/30 text-orange-300 border-orange-600' },
  { value: 'GANHO', label: 'Ganho', color: 'bg-emerald-900/30 text-emerald-300 border-emerald-600' },
  { value: 'PERDIDO', label: 'Perdido', color: 'bg-red-900/30 text-red-300 border-red-600' }
];

const PRIORIDADE_OPTIONS = [
  { value: 'ALTA', label: 'Alta', color: 'bg-red-900/30 border-red-600 text-red-300' },
  { value: 'MEDIA', label: 'Média', color: 'bg-yellow-900/30 border-yellow-600 text-yellow-300' },
  { value: 'BAIXA', label: 'Baixa', color: 'bg-green-900/30 border-green-600 text-green-300' }
];

const PACOTES = ['Starter', 'Pro', 'Premium', 'Avulso'];
const SEGMENTOS_INICIAIS = ['Construção', 'TI', 'Saúde', 'Serviços', 'Fornecimento', 'Médico-Hospitalar', 'Serviços Gerais'];
const SDRS_DEFAULT = ['Gabriel', 'Dacunha'];
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

// Utilitário de formatação de data
const formatDate = (date = new Date()) => date.toISOString().split('T')[0];

// Helper do Supabase - Singleton para evitar múltiplas instâncias
let supabaseClientInstance = null;

const getSupabaseClient = () => {
  // Retornar instância existente se já foi criada
  if (supabaseClientInstance) {
    return supabaseClientInstance;
  }

  if (typeof window === 'undefined' || !window.supabase) {
    console.error('Supabase não está disponível');
    return null;
  }

  const supabaseUrl = window.__SUPABASE_URL__;
  const supabaseKey = window.__SUPABASE_ANON_KEY__;

  if (!supabaseUrl || !supabaseKey) {
    console.error('Chaves do Supabase não configuradas');
    return null;
  }

  // Criar apenas UMA vez e armazenar
  supabaseClientInstance = window.supabase.createClient(supabaseUrl, supabaseKey);
  return supabaseClientInstance;
};

// Helper para operações com leads no Supabase
const supabaseHelper = {
  // Carregar todos os leads
  loadLeads: async () => {
    try {
      const supabase = getSupabaseClient();
      if (!supabase) {
        console.warn('Supabase não disponível, retornando array vazio');
        return [];
      }
      
      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .order('dataentrada', { ascending: false });
      
      if (error) {
        console.error('Erro ao carregar leads:', error);
        return [];
      }
      
      return data || [];
    } catch (e) {
      console.error('Erro ao carregar leads do Supabase:', e);
      return [];
    }
  },
  
  // Adicionar um novo lead
  addLead: async (lead) => {
    try {
      const supabase = getSupabaseClient();
      if (!supabase) {
        throw new Error('Supabase não disponível');
      }

      // Filtrar apenas colunas válidas + id
      const insertData = { id: lead.id };
      supabaseHelper.LEAD_COLUMNS.forEach(col => {
        if (lead[col] !== undefined) insertData[col] = lead[col];
      });

      const { data, error } = await supabase
        .from('leads')
        .insert([insertData])
        .select()
        .single();
      
      if (error) {
        console.error('Erro ao adicionar lead:', error);
        throw error;
      }
      
      return data;
    } catch (e) {
      console.error('Erro ao adicionar lead no Supabase:', e);
      throw e;
    }
  },
  
  // Colunas válidas na tabela leads do Supabase (whitelist)
  // Campos extras do JS (ultimaInteracao, notaUltimaInteracao, etc) são filtrados
  LEAD_COLUMNS: [
    'cnpj', 'empresa', 'segmento', 'contato', 'cargo', 'telefone', 'email',
    'prioridade', 'status', 'score', 'owner', 'origem', 'pacoteInteresse',
    'valorpotencial', 'proximoFollowup', 'tentativas', 'dataentrada',
    'historico', 'observacoes', 'ficha_diagnostica', 'updated_by'
  ],

  // Atualizar um lead existente
  updateLead: async (lead) => {
    try {
      const supabase = getSupabaseClient();
      if (!supabase) {
        throw new Error('Supabase não disponível');
      }

      // Enviar APENAS colunas que existem no Supabase (evita erro 400)
      const updateData = {};
      supabaseHelper.LEAD_COLUMNS.forEach(col => {
        if (lead[col] !== undefined) updateData[col] = lead[col];
      });

      console.log('Atualizando lead:', lead.id, 'Campos enviados:', Object.keys(updateData));

      const { data, error } = await supabase
        .from('leads')
        .update(updateData)
        .eq('id', lead.id)
        .select()
        .single();
      
      if (error) {
        console.error('Erro ao atualizar lead:', error);
        throw error;
      }
      
      return data;
    } catch (e) {
      console.error('Erro ao atualizar lead no Supabase:', e);
      throw e;
    }
  },
  
  // Deletar um lead
  deleteLead: async (leadId) => {
    try {
      const supabase = getSupabaseClient();
      if (!supabase) {
        throw new Error('Supabase não disponível');
      }
      
      const { error } = await supabase
        .from('leads')
        .delete()
        .eq('id', leadId);
      
      if (error) {
        console.error('Erro ao deletar lead:', error);
        throw error;
      }
      
      return true;
    } catch (e) {
      console.error('Erro ao deletar lead no Supabase:', e);
      throw e;
    }
  },
  
  // Salvar múltiplos leads (usado para importação e sincronização)
  saveLeads: async (leads) => {
    try {
      const supabase = getSupabaseClient();
      if (!supabase) {
        throw new Error('Supabase não disponível');
      }

      console.log(`Salvando ${leads.length} leads no Supabase...`);

      // Filtrar apenas colunas válidas do Supabase
      const filteredLeads = leads.map(lead => {
        const filtered = { id: lead.id };
        supabaseHelper.LEAD_COLUMNS.forEach(col => {
          if (lead[col] !== undefined) filtered[col] = lead[col];
        });
        return filtered;
      });

      const { data, error } = await supabase
        .from('leads')
        .insert(filteredLeads)
        .select();

      if (error) {
        console.error('Erro ao salvar leads:', error);
        throw error;
      }

      console.log(`${leads.length} leads salvos com sucesso!`, data);
      return true;
    } catch (e) {
      console.error('Erro ao salvar leads no Supabase:', e);
      throw e;
    }
  }
};

const CRMAlinhatta = () => {
  // Estados de autenticação
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  const [view, setView] = useState('pipeline');
  const [leads, setLeads] = useState([]);
  const [selectedLead, setSelectedLead] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('TODOS');
  const [filterPrioridade, setFilterPrioridade] = useState('TODOS');
  const [filterSegmento, setFilterSegmento] = useState('TODOS');
  const [filterOwner, setFilterOwner] = useState('TODOS');
  const [filterOrigem, setFilterOrigem] = useState('TODOS');
  const [sortBy, setSortBy] = useState('dataentrada'); // dataentrada, empresa, valorpotencial
  const [sortOrder, setSortOrder] = useState('desc'); // asc, desc
  const [showAddModal, setShowAddModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [showSdrsModal, setShowSdrsModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [sdrs, setSdrs] = useState(() => {
    try { return JSON.parse(localStorage.getItem('crm_sdrs') || JSON.stringify(SDRS_DEFAULT)); }
    catch { return SDRS_DEFAULT; }
  });

  // Carregar SDRs do Supabase após login (sobrescreve localStorage)
  useEffect(() => {
    const loadSdrsFromSupabase = async () => {
      const supabase = getSupabaseClient();
      if (!supabase) return;
      try {
        const { data, error } = await supabase
          .from('settings')
          .select('value')
          .eq('key', 'sdrs')
          .single();
        if (!error && Array.isArray(data?.value) && data.value.length > 0) {
          setSdrs(data.value);
          localStorage.setItem('crm_sdrs', JSON.stringify(data.value));
        }
      } catch (e) { /* mantém o localStorage como fallback */ }
    };
    loadSdrsFromSupabase();
  }, []);

  const saveSdrs = async (newSdrs) => {
    setSdrs(newSdrs);
    localStorage.setItem('crm_sdrs', JSON.stringify(newSdrs));
    const supabase = getSupabaseClient();
    if (supabase) {
      await supabase
        .from('settings')
        .upsert({ key: 'sdrs', value: newSdrs, updated_at: new Date().toISOString() }, { onConflict: 'key' });
    }
  };

  // Verificar autenticação ao iniciar
  useEffect(() => {
    checkUser();

    const supabase = getSupabaseClient();
    if (supabase) {
      const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setAuthLoading(false);
      });

      return () => {
        authListener?.subscription?.unsubscribe();
      };
    } else {
      setAuthLoading(false);
    }
  }, []);

  const checkUser = async () => {
    const supabase = getSupabaseClient();
    if (!supabase) {
      setAuthLoading(false);
      return;
    }

    const { data: { session } } = await supabase.auth.getSession();
    setSession(session);
    setUser(session?.user ?? null);
    setAuthLoading(false);
  };

  // Carregar leads do storage ao iniciar (somente se autenticado)
  useEffect(() => {
    if (user) {
      loadLeads();
    }
  }, [user]);

  const loadLeads = async () => {
    try {
      const leadsData = await supabaseHelper.loadLeads();
      setLeads(leadsData);
    } catch (error) {
      console.error('Erro ao carregar leads:', error);
      setLeads([]);
    }
    setIsLoading(false);
  };

  const addLead = async (newLead) => {
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
      dataentrada: formatDate(),
      historico: [{
        data: formatDate(),
        nota: `Lead criado no sistema${newLead.origem ? ` (Origem: ${newLead.origem})` : ''}`
      }]
    };
    
    try {
      await supabaseHelper.addLead(lead);
      setLeads([...leads, lead]);
      setShowAddModal(false);
      showNotification('Lead adicionado com sucesso!', 'success');
    } catch (error) {
      console.error('Erro ao adicionar lead:', error);
      showNotification('Erro ao adicionar lead. Tente novamente.', 'error');
    }
  };

  const updateLead = async (updatedLead) => {
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

    const leadToUpdate = {
      ...updatedLead,
      cnpj: updatedLead.cnpj.replace(/\D/g, '') // Remove formatação
    };
    
    try {
      // C1: usar dado retornado pelo Supabase para manter estado sincronizado com o banco
      const savedLead = await supabaseHelper.updateLead(leadToUpdate);
      const finalLead = savedLead || leadToUpdate;
      const updated = leads.map(l => l.id === updatedLead.id ? finalLead : l);
      setLeads(updated);
      setSelectedLead(finalLead);
      showNotification('Lead atualizado com sucesso!', 'success');
    } catch (error) {
      console.error('Erro ao atualizar lead:', error);
      showNotification('Erro ao atualizar lead. Tente novamente.', 'error');
    }
  };

  // C2: async + await para garantir que a interação seja salva antes de continuar
  // B2: .slice(-100) para limitar o histórico a 100 entradas
  const addInteracao = async (leadId, nota) => {
    const lead = leads.find(l => l.id === leadId);
    const updated = {
      ...lead,
      ultimaInteracao: formatDate(),
      notaUltimaInteracao: nota,
      tentativas: (lead.tentativas || 0) + 1,
      historico: [
        ...(lead.historico || []),
        { data: formatDate(), nota }
      ].slice(-100)
    };
    try {
      await updateLead(updated);
    } catch (error) {
      showNotification('Erro ao registrar interação. Tente novamente.', 'error');
    }
  };

  const deleteLead = async (leadId) => {
    const lead = leads.find(l => l.id === leadId);
    if (window.confirm(`Tem certeza que deseja excluir o lead "${lead?.empresa}"? Esta ação não pode ser desfeita.`)) {
      try {
        await supabaseHelper.deleteLead(leadId);
        const updated = leads.filter(l => l.id !== leadId);
        setLeads(updated);
        if (selectedLead && selectedLead.id === leadId) {
          setSelectedLead(null);
        }
        showNotification('Lead excluído com sucesso!', 'success');
      } catch (error) {
        console.error('Erro ao deletar lead:', error);
        showNotification('Erro ao excluir lead. Tente novamente.', 'error');
      }
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
    // M2: @keyframes slideIn movido para o style global do módulo (evita acúmulo de <style> tags)
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
        lead.valorpotencial || 0,
        lead.dataentrada || '',
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
      link.download = `leads-alinhatta-${formatDate()}.csv`;
      link.click();
    } else if (format === 'json') {
      const dataStr = JSON.stringify(leads, null, 2);
      const blob = new Blob([dataStr], { type: 'application/json' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `leads-alinhatta-${formatDate()}.json`;
      link.click();
    }
    setShowExportModal(false);
  };

  const importLeadsFromCSV = async (csvData) => {
    try {
      // Detectar delimitador de forma mais inteligente
      const firstLine = csvData.split('\n')[0];
      const commaCount = (firstLine.match(/,/g) || []).length;
      const semicolonCount = (firstLine.match(/;/g) || []).length;
      const delimiter = semicolonCount > commaCount ? ';' : ',';

      console.log(`Delimitador detectado: "${delimiter}" (vírgulas: ${commaCount}, ponto-vírgula: ${semicolonCount})`);

      // Parse CSV mais robusto (lida com campos entre aspas e aspas duplas escapadas)
      const parseCSVLine = (line) => {
        const result = [];
        let current = '';
        let inQuotes = false;

        for (let i = 0; i < line.length; i++) {
          const char = line[i];
          const nextChar = line[i + 1];

          // Lidar com aspas duplas escapadas ""
          if (char === '"' && nextChar === '"' && inQuotes) {
            current += '"';
            i++; // Pular próxima aspa
          } else if (char === '"') {
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

      const headers = parseCSVLine(lines[0]).map(h => h.trim().replace(/^"|"$/g, ''));
      console.log(`Colunas detectadas (${headers.length}):`, headers);
      
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
      
      const cnpjIndex = getColumnIndex(['CNPJ', 'Cnpj', 'cnpj', 'CNPJ/CPF']);
      const empresaIndex = getColumnIndex(['Razão Social', 'Razao Social', 'Empresa', 'Nome Fantasia', 'RazaoSocial']);
      const segmentoIndex = getColumnIndex(['Segmento', 'Setor', 'Área', 'Area']);
      const scoreIndex = getColumnIndex(['Score', 'Pontuação', 'Pontuacao']);
      const rankIndex = getColumnIndex(['Rank', 'Ranking', 'Posição', 'Posicao']);
      const telefoneIndex = getColumnIndex(['Telefone', 'Tel', 'WhatsApp', 'Whatsapp', 'Fone']);
      const emailIndex = getColumnIndex(['Email', 'E-mail', 'e-mail']);
      const contatoIndex = getColumnIndex(['Contato', 'Nome Contato', 'Responsável', 'Responsavel', 'Pessoa de Contato']);
      const cargoIndex = getColumnIndex(['Cargo', 'Função', 'Funcao']);
      const origemIndex = getColumnIndex(['Origem', 'Fonte', 'Canal']);
      const ownerIndex = getColumnIndex(['SDR', 'Owner', 'Responsável', 'Responsavel', 'Vendedor']);
      const pacoteIndex = getColumnIndex(['Pacote', 'Plano', 'Produto', 'Interesse']);
      const valorIndex = getColumnIndex(['Valor', 'Valor Potencial', 'ValorPotencial', 'Ticket']);
      const followupIndex = getColumnIndex(['Followup', 'Follow-up', 'Próximo Contato', 'Proximo Contato', 'Data Followup']);

      console.log(`Mapeamento de colunas:`, {
        empresa: empresaIndex >= 0 ? headers[empresaIndex] : 'NÃO ENCONTRADO',
        cnpj: cnpjIndex >= 0 ? headers[cnpjIndex] : 'NÃO ENCONTRADO',
        segmento: segmentoIndex >= 0 ? headers[segmentoIndex] : 'NÃO ENCONTRADO',
        score: scoreIndex >= 0 ? headers[scoreIndex] : 'NÃO ENCONTRADO',
        rank: rankIndex >= 0 ? headers[rankIndex] : 'NÃO ENCONTRADO'
      });

      const newLeads = [];
      let skipped = 0;

      for (let i = 1; i < lines.length; i++) {
        if (!lines[i].trim()) continue;

        const values = parseCSVLine(lines[i]).map(v => v.replace(/^"|"$/g, '').trim());

        // Log primeira linha para debug
        if (i === 1) {
          console.log(`Exemplo de linha parseada (primeira linha):`, values);
          console.log(`   Total de campos: ${values.length}`);
        }

        // Extrair dados
        const cnpj = cnpjIndex !== -1 ? values[cnpjIndex] : '';
        // Empresa: nunca usar fallback cego para values[0] (pode ser CNPJ)
        const empresa = empresaIndex !== -1 ? values[empresaIndex] : '';
        const segmento = segmentoIndex !== -1 ? values[segmentoIndex] : 'Serviços Gerais';
        const scoreValue = scoreIndex !== -1 ? parseFloat(values[scoreIndex]) || 0 : 0;
        const rankValue = rankIndex !== -1 ? parseFloat(values[rankIndex]) || 0 : 0;
        const telefone = telefoneIndex !== -1 ? values[telefoneIndex] : '';
        const email = emailIndex !== -1 ? values[emailIndex] : '';
        const contato = contatoIndex !== -1 ? values[contatoIndex] : '';
        const cargo = cargoIndex !== -1 ? values[cargoIndex] : '';
        const origemCSV = origemIndex !== -1 ? values[origemIndex] : '';
        const ownerCSV = ownerIndex !== -1 ? values[ownerIndex] : '';
        const pacoteCSV = pacoteIndex !== -1 ? values[pacoteIndex] : '';
        const valorCSV = valorIndex !== -1 ? parseFloat(values[valorIndex]?.replace(/[^\d.,]/g, '').replace(',', '.')) || 0 : 0;
        const followupCSV = followupIndex !== -1 ? values[followupIndex] : '';
        
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
          owner: ownerCSV || 'Não atribuído',
          origem: origemCSV || 'Planilha',
          pacoteInteresse: pacoteCSV || '',
          valorpotencial: valorCSV || 0,
          proximoFollowup: followupCSV || '',
          tentativas: 0,
          dataentrada: formatDate(),
          historico: [{
            data: formatDate(),
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

      console.log(`Importando ${validLeads.length} leads novos...`);

      // Salvar APENAS os novos leads no Supabase (não os que já existem!)
      await supabaseHelper.saveLeads(validLeads);

      // Recarregar leads do Supabase para garantir que apareçam na tela
      await loadLeads();

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
      } else if (sortBy === 'valorpotencial') {
        aValue = a.valorpotencial || 0;
        bValue = b.valorpotencial || 0;
      } else if (sortBy === 'dataentrada') {
        aValue = a.dataentrada || '';
        bValue = b.dataentrada || '';
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
  // Normaliza para capitalização correta (primeira letra maiúscula, resto minúsculo)
  const getSegmentos = () => {
    const normalizeSegmento = (seg) => {
      if (!seg) return '';
      // Converte para string, remove espaços extras
      const cleaned = seg.trim();
      // Primeira letra maiúscula, resto minúsculo
      return cleaned.charAt(0).toUpperCase() + cleaned.slice(1).toLowerCase();
    };

    const segmentosFromLeads = leads
      .map(l => normalizeSegmento(l.segmento))
      .filter(Boolean);

    const normalizedIniciais = SEGMENTOS_INICIAIS.map(normalizeSegmento);

    // Remove duplicatas case-insensitive
    const allSegmentos = [...normalizedIniciais, ...segmentosFromLeads];
    const uniqueSegmentos = [...new Set(allSegmentos.map(s => s.toLowerCase()))]
      .map(lower => allSegmentos.find(s => s.toLowerCase() === lower));

    return uniqueSegmentos.sort();
  };

  const SEGMENTOS = getSegmentos();

  // Métricas
  const metrics = {
    total: leads.length,
    novos: leads.filter(l => l.status === 'NOVO').length,
    ganhos: leads.filter(l => l.status === 'GANHO').length,
    perdidos: leads.filter(l => l.status === 'PERDIDO').length,
    emNegociacao: leads.filter(l => l.status === 'PROPOSTA_ENVIADA').length,
    valorPipeline: leads.filter(l => ['QUALIFICADO', 'PROPOSTA_ENVIADA', 'GANHO'].includes(l.status))
                        .reduce((sum, l) => sum + (l.valorpotencial || 0), 0),
    followupsHoje: leads.filter(l => l.proximoFollowup === formatDate()).length
  };

  // Função de logout
  const handleLogout = async () => {
    const supabase = getSupabaseClient();
    if (supabase) {
      await supabase.auth.signOut();
      setUser(null);
      setSession(null);
    }
  };

  // Mostrar loading enquanto verifica autenticação
  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white">Verificando autenticação...</p>
        </div>
      </div>
    );
  }

  // Mostrar login se não estiver autenticado
  if (!user) {
    return <LoginComponent onLogin={() => checkUser()} />;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0f1419' }}>
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
        <div className="max-w-7xl mx-auto px-3 sm:px-4 py-3 sm:py-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
            <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
              <img src="logo.svg" alt="Alinhatta Logo" className="w-10 h-10 sm:w-12 sm:h-12" style={{ filter: 'brightness(0) invert(1)' }} />
              <div>
                <h1 className="text-lg sm:text-2xl font-bold" style={{ fontFamily: 'Montserrat, sans-serif' }}>ALINHATTA CRM</h1>
                <p className="text-gray-300 text-xs sm:text-sm hidden sm:block">Sistema de Gestão de Leads</p>
              </div>
            </div>
            <div className="flex gap-2 w-full sm:w-auto items-center">
              <button
                onClick={() => setView('pipeline')}
                className={`flex-1 sm:flex-none px-3 sm:px-4 py-3 sm:py-2 rounded-lg font-medium transition text-sm sm:text-base ${
                  view === 'pipeline' ? 'bg-primary text-white' : 'bg-primary-dark/50 text-white hover:bg-primary-dark'
                }`}
                style={{ fontFamily: 'Montserrat, sans-serif' }}
              >
                Pipeline
              </button>
              <button
                onClick={() => setView('dashboard')}
                className={`flex-1 sm:flex-none px-3 sm:px-4 py-3 sm:py-2 rounded-lg font-medium transition text-sm sm:text-base ${
                  view === 'dashboard' ? 'bg-primary text-white' : 'bg-primary-dark/50 text-white hover:bg-primary-dark'
                }`}
                style={{ fontFamily: 'Montserrat, sans-serif' }}
              >
                Dashboard
              </button>
              <button
                onClick={() => setShowSdrsModal(true)}
                className="px-3 sm:px-4 py-3 sm:py-2 rounded-lg font-medium transition text-sm sm:text-base bg-primary-dark/50 text-white hover:bg-primary-dark"
                style={{ fontFamily: 'Montserrat, sans-serif' }}
                title="Gerenciar SDRs"
              >
                ⚙️ SDRs
              </button>
              <button
                onClick={handleLogout}
                className="px-3 sm:px-4 py-3 sm:py-2 rounded-lg font-medium transition text-sm sm:text-base bg-red-600 text-white hover:bg-red-700"
                style={{ fontFamily: 'Montserrat, sans-serif' }}
                title="Sair"
              >
                🚪 Sair
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-3 sm:px-4 py-4 sm:py-6">
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
            sdrs={sdrs}
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
            sdrs={sdrs}
          />
        )}

        {view === 'dashboard' && (
          <DashboardView leads={leads} metrics={metrics} segmentos={SEGMENTOS} sdrs={sdrs} />
        )}
      </main>

      {/* Add Lead Modal */}
      {showAddModal && (
        <AddLeadModal
          onClose={() => setShowAddModal(false)}
          onAdd={addLead}
          segmentos={SEGMENTOS}
          sdrs={sdrs}
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

      {/* Manage SDRs Modal */}
      {showSdrsModal && (
        <ManageSdrsModal
          sdrs={sdrs}
          onSave={saveSdrs}
          onClose={() => setShowSdrsModal(false)}
        />
      )}
    </div>
  );
};

const PipelineView = ({ leads, searchTerm, setSearchTerm, filterStatus, setFilterStatus, filterPrioridade, setFilterPrioridade, filterSegmento, setFilterSegmento, filterOwner, setFilterOwner, filterOrigem, setFilterOrigem, sortBy, setSortBy, sortOrder, setSortOrder, onSelectLead, onAddLead, onImportLeads, onExportLeads, metrics, segmentos, sdrs }) => {
  const followupsHoje = leads.filter(l => l.proximoFollowup === formatDate());
  const followupsAtrasados = leads.filter(l => l.proximoFollowup && l.proximoFollowup < formatDate());

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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <MetricCard title="Total Leads" value={metrics.total} icon={<BarChart3 className="w-6 h-6" />} />
        <MetricCard title="Novos" value={metrics.novos} icon={<FileText className="w-6 h-6" />} />
        <MetricCard title="Em Negociação" value={metrics.emNegociacao} icon={<Briefcase className="w-6 h-6" />} />
        <MetricCard title="Ganhos" value={metrics.ganhos} icon={<CheckCircle className="w-6 h-6" />} color="text-primary" />
      </div>

      {/* Busca e Filtros */}
      <div className="rounded-lg shadow p-3 sm:p-4 space-y-3 sm:space-y-4" style={{ backgroundColor: '#1e252b', borderTop: '4px solid #1a7b60' }}>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Buscar por empresa, CNPJ ou contato..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 sm:py-2 h-12 sm:h-auto border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-base"
            />
          </div>
          <div className="grid grid-cols-2 sm:flex gap-2 sm:gap-0">
            <button
              onClick={onImportLeads}
              className="bg-accent text-neutral-dark px-3 sm:px-4 py-3 sm:py-2 rounded-lg hover:bg-accent-dark transition flex items-center justify-center gap-2 font-bold text-sm sm:text-base"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              <Upload className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="hidden sm:inline">Importar</span>
            </button>
            <button
              onClick={onExportLeads}
              className="bg-secondary text-white px-3 sm:px-4 py-3 sm:py-2 rounded-lg hover:opacity-90 transition flex items-center justify-center gap-2 font-bold text-sm sm:text-base"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="hidden sm:inline">Exportar</span>
            </button>
            <button
              onClick={onAddLead}
              className="bg-primary text-white px-4 sm:px-6 py-3 sm:py-2 rounded-lg hover:bg-primary-dark transition flex items-center justify-center gap-2 font-bold text-sm sm:text-base col-span-2 sm:col-span-1"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
              Novo Lead
            </button>
          </div>
        </div>

        {/* Barra de Filtros Profissional */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 space-y-4">
          {/* Header com contador */}
          <div className="flex items-center justify-between border-b border-gray-200 pb-3">
            <div>
              <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Filtros</h3>
              <p className="text-xs text-gray-500 mt-1">
                {leads.length} {leads.length === 1 ? 'resultado' : 'resultados'}
              </p>
            </div>
            {(filterStatus !== 'TODOS' || filterPrioridade !== 'TODOS' || filterSegmento !== 'TODOS' || filterOwner !== 'TODOS' || filterOrigem !== 'TODOS' || searchTerm) && (
              <button
                onClick={() => {
                  setFilterStatus('TODOS');
                  setFilterPrioridade('TODOS');
                  setFilterSegmento('TODOS');
                  setFilterOwner('TODOS');
                  setFilterOrigem('TODOS');
                  setSearchTerm('');
                }}
                className="text-xs text-primary hover:text-primary-dark font-medium transition underline"
              >
                Limpar filtros
              </button>
            )}
          </div>

          {/* Grid de filtros limpo e organizado */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1.5">Status</label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-primary focus:border-primary bg-white hover:border-gray-400 transition"
              >
                <option value="TODOS">Todos</option>
                {STATUS_OPTIONS.map(s => (
                  <option key={s.value} value={s.value}>{s.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1.5">Prioridade</label>
              <select
                value={filterPrioridade}
                onChange={(e) => setFilterPrioridade(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-primary focus:border-primary bg-white hover:border-gray-400 transition"
              >
                <option value="TODOS">Todas</option>
                {PRIORIDADE_OPTIONS.map(p => (
                  <option key={p.value} value={p.value}>{p.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1.5">Segmento</label>
              <select
                value={filterSegmento}
                onChange={(e) => setFilterSegmento(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-primary focus:border-primary bg-white hover:border-gray-400 transition"
              >
                <option value="TODOS">Todos</option>
                {segmentos.map(seg => (
                  <option key={seg} value={seg}>{seg}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1.5">SDR Responsável</label>
              <select
                value={filterOwner}
                onChange={(e) => setFilterOwner(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-primary focus:border-primary bg-white hover:border-gray-400 transition"
              >
                <option value="TODOS">Todos</option>
                {sdrs.map(sdr => (
                  <option key={sdr} value={sdr}>{sdr}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1.5">Origem</label>
              <select
                value={filterOrigem}
                onChange={(e) => setFilterOrigem(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-primary focus:border-primary bg-white hover:border-gray-400 transition"
              >
                <option value="TODOS">Todas</option>
                {ORIGENS_LEAD.map(origem => (
                  <option key={origem} value={origem}>{origem}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Ordenação em linha separada */}
          <div className="flex items-center gap-3 pt-2 border-t border-gray-100">
            <label className="text-xs font-medium text-gray-600">Ordenar por:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-primary focus:border-primary bg-white hover:border-gray-400 transition"
            >
              <option value="dataentrada">Data de Entrada</option>
              <option value="empresa">Empresa</option>
              <option value="valorpotencial">Valor Potencial</option>
              <option value="status">Status</option>
            </select>
            <button
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              className="px-3 py-1.5 text-sm border border-gray-300 rounded-md hover:bg-gray-50 transition"
              title={sortOrder === 'asc' ? 'Ordem Crescente' : 'Ordem Decrescente'}
            >
              {sortOrder === 'asc' ? '↑ A-Z' : '↓ Z-A'}
            </button>
          </div>
        </div>
      </div>

      {/* Lista de Leads */}
      <div className="space-y-3">
        {leads.length === 0 ? (
          <div className="rounded-lg shadow p-12 text-center" style={{ backgroundColor: '#1e252b' }}>
            <p className="text-gray-300 text-lg mb-4">Nenhum lead cadastrado ainda</p>
            <button
              onClick={onAddLead}
              className="bg-primary text-white px-6 py-4 rounded-lg hover:bg-primary-dark transition inline-flex items-center justify-center gap-2 text-base"
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
  const isFollowupHoje = lead.proximoFollowup === formatDate();
  const isFollowupAtrasado = lead.proximoFollowup && lead.proximoFollowup < formatDate();

  return (
    <div
      onClick={onClick}
      className={`rounded-lg shadow hover:shadow-lg transition cursor-pointer p-4 sm:p-5 border-l-4 ${
        isFollowupAtrasado ? 'border-red-500' : isFollowupHoje ? 'border-accent' : 'border-primary'
      }`}
      style={{ backgroundColor: '#1e252b' }}
    >
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <h3 className="font-bold text-lg text-neutral-dark" style={{ fontFamily: 'Montserrat, sans-serif' }}>{lead.empresa}</h3>
          <p className="text-sm text-neutral-text">{lead.segmento}</p>
          {lead.owner && (
            <p className="text-xs text-primary font-medium mt-1">{lead.owner}</p>
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
              {lead.origem}
            </span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-sm text-neutral-text mb-3">
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

const LeadDetailView = ({ lead, onBack, onUpdate, onAddInteracao, onDelete, formatCNPJ, sdrs }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedLead, setEditedLead] = useState(lead);
  const [novaInteracao, setNovaInteracao] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await onUpdate(editedLead);
      setIsEditing(false);
    } finally {
      setIsSaving(false);
    }
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

      <div className="rounded-lg shadow-lg p-4 sm:p-6" style={{ backgroundColor: '#1e252b' }}>
        <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6">
          <div className="flex-1 w-full">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-200 mb-2 break-words">{isEditing ? (editedLead.empresa || lead.empresa) : lead.empresa}</h2>
            <p className="text-gray-300 text-sm sm:text-base break-all">CNPJ: {formatCNPJ(lead.cnpj)}</p>
            <p className="text-gray-300 text-sm sm:text-base">{lead.segmento}</p>
          </div>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="bg-primary text-white px-4 py-3 sm:py-2 rounded-lg hover:bg-primary-dark transition flex items-center justify-center gap-2 w-full sm:w-auto text-base"
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            {isEditing ? <Save className="w-4 h-4" /> : <Edit2 className="w-4 h-4" />}
            {isEditing ? 'Salvar' : 'Editar'}
          </button>
        </div>

        {isEditing ? (
          <EditLeadForm lead={editedLead} onChange={setEditedLead} onSave={handleSave} isSaving={isSaving} sdrs={sdrs} />
        ) : (
          <ViewLeadDetails lead={lead} />
        )}

        {/* Nova Interação */}
        <div className="mt-8 border-t pt-6">
          <h3 className="text-xl font-bold text-gray-200 mb-4">Registrar Nova Interação</h3>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              value={novaInteracao}
              onChange={(e) => setNovaInteracao(e.target.value)}
              placeholder="Ex: Cliente pediu mais informações sobre Pacote Pro..."
              className="flex-1 px-4 py-3 sm:py-2 h-12 sm:h-auto border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary text-base"
              onKeyPress={(e) => e.key === 'Enter' && handleAddInteracao()}
            />
            <button
              onClick={handleAddInteracao}
              className="bg-primary text-white px-6 py-3 sm:py-2 h-12 sm:h-auto rounded-lg hover:bg-primary-dark transition text-base"
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
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
      <DetailField label="SDR Responsável" value={lead.owner || 'Não atribuído'} icon={<User className="w-4 h-4 text-primary" />} />
      <DetailField label="Origem do Lead" value={lead.origem || '-'} icon={<MapPin className="w-4 h-4 text-secondary" />} />
      <DetailField label="Status" value={status?.label} icon={null} />
      <DetailField label="Prioridade" value={prioridade?.label} icon={null} />
      <DetailField label="Contato Principal" value={lead.contato} icon={null} />
      <DetailField label="Cargo" value={lead.cargo} icon={null} />
      <DetailField label="Telefone" value={lead.telefone} icon={<Phone className="w-4 h-4" />} />
      <DetailField label="Email" value={lead.email} icon={<Mail className="w-4 h-4" />} />
      <DetailField label="Pacote de Interesse" value={lead.pacoteInteresse} icon={null} />
      <DetailField label="Valor Potencial" value={lead.valorpotencial ? `R$ ${lead.valorpotencial.toLocaleString('pt-BR')}` : '-'} icon={null} />
      <DetailField label="Última Interação" value={lead.ultimaInteracao ? new Date(lead.ultimaInteracao).toLocaleDateString('pt-BR') : '-'} icon={null} />
      <DetailField label="Próximo Follow-up" value={lead.proximoFollowup ? new Date(lead.proximoFollowup).toLocaleDateString('pt-BR') : '-'} icon={null} />
      <DetailField label="Nº de Tentativas" value={lead.tentativas || 0} icon={null} />
      <DetailField label="Data de Entrada" value={lead.dataentrada ? new Date(lead.dataentrada).toLocaleDateString('pt-BR') : '-'} icon={null} />
      {lead.ficha_diagnostica && (
        <div className="md:col-span-2">
          <div className="p-4 rounded-lg" style={{ backgroundColor: '#1a1f26' }}>
            <p className="text-sm text-gray-400 mb-2 flex items-center gap-2">
              <Clipboard className="w-4 h-4" />
              <strong>Ficha Diagnóstica</strong>
            </p>
            <p className="text-gray-200 whitespace-pre-wrap">{lead.ficha_diagnostica}</p>
          </div>
        </div>
      )}
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

const EditLeadForm = ({ lead, onChange, onSave, isSaving, sdrs }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
    <div className="sm:col-span-2">
      <label className="block text-sm font-medium text-gray-300 mb-1">
        Nome da Empresa (Razão Social)
      </label>
      <input
        type="text"
        value={lead.empresa || ''}
        onChange={(e) => onChange({ ...lead, empresa: e.target.value })}
        placeholder="Razão Social da empresa"
        className="w-full px-4 py-3 sm:py-2 h-12 sm:h-auto border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary text-base"
      />
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-300 mb-1">
        SDR Responsável <span className="text-red-500">*</span>
      </label>
      <select
        value={lead.owner || ''}
        onChange={(e) => onChange({ ...lead, owner: e.target.value })}
        required
        className="w-full px-4 py-3 sm:py-2 h-12 sm:h-auto border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary text-base"
      >
        <option value="">Selecione um SDR...</option>
        {sdrs.map(sdr => (
          <option key={sdr} value={sdr}>{sdr}</option>
        ))}
      </select>
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-300 mb-1">Origem do Lead</label>
      <select
        value={lead.origem || ''}
        onChange={(e) => onChange({ ...lead, origem: e.target.value })}
        className="w-full px-4 py-3 sm:py-2 h-12 sm:h-auto border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary text-base"
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
        className="w-full px-4 py-3 sm:py-2 h-12 sm:h-auto border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary text-base"
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
        className="w-full px-4 py-3 sm:py-2 h-12 sm:h-auto border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary text-base"
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
        className="w-full px-4 py-3 sm:py-2 h-12 sm:h-auto border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary text-base"
      />
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-300 mb-1">Cargo</label>
      <input
        type="text"
        value={lead.cargo || ''}
        onChange={(e) => onChange({ ...lead, cargo: e.target.value })}
        className="w-full px-4 py-3 sm:py-2 h-12 sm:h-auto border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary text-base"
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
        className="w-full px-4 py-3 sm:py-2 h-12 sm:h-auto border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary text-base"
      />
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
      <input
        type="email"
        value={lead.email || ''}
        onChange={(e) => onChange({ ...lead, email: e.target.value })}
        className="w-full px-4 py-3 sm:py-2 h-12 sm:h-auto border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary text-base"
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
        className="w-full px-4 py-3 sm:py-2 h-12 sm:h-auto border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary text-base"
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
        value={lead.valorpotencial || ''}
        onChange={(e) => onChange({ ...lead, valorpotencial: parseFloat(e.target.value) || 0 })}
        className="w-full px-4 py-3 sm:py-2 h-12 sm:h-auto border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary text-base"
      />
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-300 mb-1">Próximo Follow-up</label>
      <input
        type="date"
        value={lead.proximoFollowup || ''}
        onChange={(e) => onChange({ ...lead, proximoFollowup: e.target.value })}
        className="w-full px-4 py-3 sm:py-2 h-12 sm:h-auto border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary text-base"
      />
    </div>
    <div className="sm:col-span-2">
      <label className="block text-sm font-medium text-gray-300 mb-1">Observações</label>
      <textarea
        value={lead.observacoes || ''}
        onChange={(e) => onChange({ ...lead, observacoes: e.target.value })}
        placeholder="Anotações gerais sobre o lead..."
        rows={3}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary text-base resize-y"
        style={{ minHeight: '80px' }}
      />
    </div>
    <div className="sm:col-span-2">
      <label className="block text-sm font-medium text-gray-300 mb-1 flex items-center gap-2">
        <Clipboard className="w-4 h-4" />
        Ficha Diagnóstica
      </label>
      <textarea
        value={lead.ficha_diagnostica || ''}
        onChange={(e) => onChange({ ...lead, ficha_diagnostica: e.target.value })}
        placeholder="Registre aqui informações importantes sobre a empresa, necessidades identificadas, pontos de atenção, etc..."
        rows={6}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary text-base resize-y"
        style={{ minHeight: '120px' }}
      />
      <p className="text-xs text-gray-400 mt-1">
        Use este espaço para documentar informações estratégicas sobre o lead
      </p>
    </div>
    <div className="sm:col-span-2">
      <button
        onClick={onSave}
        disabled={isSaving}
        className="w-full bg-primary text-white px-6 py-4 sm:py-3 rounded-lg hover:bg-primary-dark transition font-medium text-base disabled:opacity-60 disabled:cursor-not-allowed"
        style={{ fontFamily: 'Montserrat, sans-serif' }}
      >
        {isSaving ? 'Salvando...' : 'Salvar Alterações'}
      </button>
    </div>
  </div>
);

const DashboardView = ({ leads, metrics, segmentos, sdrs }) => {
  const statusDistribution = STATUS_OPTIONS.map(status => ({
    label: status.label,
    count: leads.filter(l => l.status === status.value).length,
    color: status.color
  }));

  const segmentoDistribution = segmentos.map(seg => ({
    label: seg,
    count: leads.filter(l => l.segmento === seg).length
  })).filter(s => s.count > 0);

  const ownerDistribution = sdrs.map(sdr => ({
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <MetricCard
          title="Total de Leads"
          value={metrics.total}
          icon={<BarChart3 className="w-6 h-6" />}
          subtitle="No pipeline"
        />
        <MetricCard
          title="Taxa de Conversão"
          value={`${taxaConversao}%`}
          icon={<TrendingUp className="w-6 h-6" />}
          subtitle={`${metrics.ganhos} ganhos`}
          color="text-primary"
        />
        <MetricCard
          title="Em Negociação"
          value={metrics.emNegociacao}
          icon={<Briefcase className="w-6 h-6" />}
          subtitle="Propostas enviadas"
          color="text-orange-600"
        />
        <MetricCard
          title="Valor Pipeline"
          value={metrics.valorPipeline >= 100000 ? `R$ ${(metrics.valorPipeline / 1000).toFixed(1)}k` : metrics.valorPipeline.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          icon={<TrendingUp className="w-6 h-6" />}
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {ownerDistribution.map((owner, idx) => (
              <div key={idx} className="bg-gradient-to-br from-primary to-secondary text-white p-4 rounded-lg flex justify-between items-center">
                <span className="font-medium" style={{ fontFamily: 'Montserrat, sans-serif' }}>{owner.label}</span>
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {origemDistribution.map((origem, idx) => (
              <div key={idx} className="bg-accent p-4 rounded-lg flex justify-between items-center">
                <span className="font-medium text-neutral-dark">{origem.label}</span>
                <span className="bg-primary text-white px-3 py-1 rounded-full font-bold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  {origem.count}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Performance Semanal */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-medium">Novos Leads</h4>
            <FileText className="w-8 h-8" />
          </div>
          <p className="text-3xl font-bold">{metrics.novos}</p>
          <p className="text-blue-100 text-sm">Aguardando primeiro contato</p>
        </div>

        <div className="bg-gradient-to-br from-primary to-secondary text-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-medium" style={{ fontFamily: 'Montserrat, sans-serif' }}>Vitórias</h4>
            <CheckCircle className="w-8 h-8" />
          </div>
          <p className="text-3xl font-bold" style={{ fontFamily: 'Montserrat, sans-serif' }}>{metrics.ganhos}</p>
          <p className="text-white text-sm opacity-90">Contratos fechados</p>
        </div>

        <div className="bg-gradient-to-br from-red-500 to-red-600 text-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-medium">Perdidos</h4>
            <X className="w-8 h-8" />
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
              {leads.filter(l => l.proximoFollowup && l.proximoFollowup < formatDate()).length}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const MetricCard = ({ title, value, icon, subtitle = '', color = "text-gray-200" }) => (
  <div className="rounded-lg shadow p-6" style={{ backgroundColor: '#1e252b' }}>
    <div className="flex items-center justify-between mb-2">
      <p className="text-sm text-gray-300">{title}</p>
      <div className="text-gray-400">{icon}</div>
    </div>
    <p className={`text-3xl font-bold ${color}`}>{value}</p>
    {subtitle && <p className="text-sm text-gray-400 mt-1">{subtitle}</p>}
  </div>
);

const AddLeadModal = ({ onClose, onAdd, segmentos, sdrs }) => {
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
    valorpotencial: 0,
    proximoFollowup: '',
    tentativas: 0
  });
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.empresa && formData.cnpj) {
      setIsSaving(true);
      try {
        await onAdd(formData);
      } finally {
        setIsSaving(false);
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end sm:items-center justify-center z-50 p-0 sm:p-4">
      <div className="bg-white rounded-t-2xl sm:rounded-lg shadow-xl max-w-2xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-y-auto" style={{ maxHeight: '95vh' }}>
        <div className="p-4 sm:p-6 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white z-10">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-800">Adicionar Novo Lead</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition p-2 -mr-2"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 sm:p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Empresa * <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.empresa}
                onChange={(e) => setFormData({ ...formData, empresa: e.target.value })}
                className="w-full px-4 py-3 sm:py-2 h-12 sm:h-auto border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary text-base"
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
                className="w-full px-4 py-3 sm:py-2 h-12 sm:h-auto border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary text-base"
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
                className="w-full px-4 py-3 sm:py-2 h-12 sm:h-auto border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary text-base"
              >
                <option value="">Selecione um SDR...</option>
                {sdrs.map(sdr => (
                  <option key={sdr} value={sdr}>{sdr}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Origem do Lead</label>
              <select
                value={formData.origem}
                onChange={(e) => setFormData({ ...formData, origem: e.target.value })}
                className="w-full px-4 py-3 sm:py-2 h-12 sm:h-auto border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary text-base"
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
                className="w-full px-4 py-3 sm:py-2 h-12 sm:h-auto border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary text-base"
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
                className="w-full px-4 py-3 sm:py-2 h-12 sm:h-auto border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary text-base"
                placeholder="Nome do decisor"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Cargo</label>
              <input
                type="text"
                value={formData.cargo}
                onChange={(e) => setFormData({ ...formData, cargo: e.target.value })}
                className="w-full px-4 py-3 sm:py-2 h-12 sm:h-auto border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary text-base"
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
                className="w-full px-4 py-3 sm:py-2 h-12 sm:h-auto border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary text-base"
                placeholder="(00) 00000-0000"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 sm:py-2 h-12 sm:h-auto border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary text-base"
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
                className="w-full px-4 py-3 sm:py-2 h-12 sm:h-auto border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary text-base"
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
                className="w-full px-4 py-3 sm:py-2 h-12 sm:h-auto border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary text-base"
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
                value={formData.valorpotencial}
                onChange={(e) => setFormData({ ...formData, valorpotencial: parseFloat(e.target.value) || 0 })}
                className="w-full px-4 py-3 sm:py-2 h-12 sm:h-auto border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary text-base"
                placeholder="1800"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Primeiro Follow-up</label>
              <input
                type="date"
                value={formData.proximoFollowup}
                onChange={(e) => setFormData({ ...formData, proximoFollowup: e.target.value })}
                className="w-full px-4 py-3 sm:py-2 h-12 sm:h-auto border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary text-base"
              />
            </div>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-200 text-gray-800 px-6 py-4 sm:py-3 rounded-lg hover:bg-gray-300 transition font-medium text-base"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="flex-1 bg-primary text-white px-6 py-4 sm:py-3 rounded-lg hover:bg-primary-dark transition font-medium text-base disabled:opacity-60 disabled:cursor-not-allowed"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              {isSaving ? 'Salvando...' : 'Adicionar Lead'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const ExportModal = ({ onClose, onExport }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end sm:items-center justify-center z-50 p-0 sm:p-4">
      <div className="bg-white rounded-t-2xl sm:rounded-lg shadow-xl max-w-md w-full">
        <div className="p-4 sm:p-6 border-b border-gray-200 flex justify-between items-center" style={{ borderTop: '4px solid #1a7b60' }}>
          <h3 className="text-xl sm:text-2xl font-bold text-primary" style={{ fontFamily: 'Montserrat, sans-serif' }}>Exportar Leads</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition p-2 -mr-2"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-4 sm:p-6">
          <p className="text-neutral-text mb-4 text-sm sm:text-base">Escolha o formato de exportação:</p>
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => onExport('csv')}
              className="flex-1 bg-primary text-white px-6 py-4 sm:py-3 rounded-lg hover:bg-primary-dark transition font-bold text-base"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              Exportar CSV
            </button>
            <button
              onClick={() => onExport('json')}
              className="flex-1 bg-secondary text-white px-6 py-4 sm:py-3 rounded-lg hover:opacity-90 transition font-bold text-base"
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end sm:items-center justify-center z-50 p-0 sm:p-4">
      <div className="bg-white rounded-t-2xl sm:rounded-lg shadow-xl max-w-2xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-y-auto">
        <div className="p-4 sm:p-6 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white z-10" style={{ borderTop: '4px solid #1a7b60' }}>
          <h3 className="text-xl sm:text-2xl font-bold text-primary" style={{ fontFamily: 'Montserrat, sans-serif' }}>Importar Leads via CSV</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition p-2 -mr-2"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-4 sm:p-6">
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
              className="w-full px-4 py-4 sm:py-2 h-auto border-2 border-dashed border-gray-300 rounded-lg focus:ring-2 focus:ring-primary hover:border-primary transition text-base"
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

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-200 text-neutral-dark px-6 py-4 sm:py-3 rounded-lg hover:bg-gray-300 transition font-bold text-base"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              Cancelar
            </button>
            <button
              onClick={handleImport}
              disabled={!csvText}
              className="flex-1 bg-primary text-white px-6 py-4 sm:py-3 rounded-lg hover:bg-primary-dark transition font-bold disabled:bg-gray-300 disabled:cursor-not-allowed text-base"
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

const ManageSdrsModal = ({ sdrs, onSave, onClose }) => {
  const [list, setList] = useState([...sdrs]);
  const [newName, setNewName] = useState('');

  const handleAdd = () => {
    const trimmed = newName.trim();
    if (trimmed && !list.includes(trimmed)) {
      setList([...list, trimmed]);
      setNewName('');
    }
  };

  const handleRemove = (name) => {
    if (list.length > 1) setList(list.filter(s => s !== name));
  };

  const handleSave = () => {
    onSave(list);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md" style={{ borderTop: '4px solid #1a7b60' }}>
        <div className="p-5 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-xl font-bold text-primary" style={{ fontFamily: 'Montserrat, sans-serif' }}>Gerenciar SDRs</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 p-1"><X className="w-5 h-5" /></button>
        </div>
        <div className="p-5 space-y-4">
          <ul className="space-y-2">
            {list.map(sdr => (
              <li key={sdr} className="flex items-center justify-between bg-gray-50 px-4 py-2 rounded-lg border border-gray-200">
                <span className="font-medium text-gray-800">{sdr}</span>
                <button
                  onClick={() => handleRemove(sdr)}
                  disabled={list.length <= 1}
                  className="text-red-400 hover:text-red-600 disabled:opacity-30 disabled:cursor-not-allowed transition"
                  title="Remover"
                >
                  <X className="w-4 h-4" />
                </button>
              </li>
            ))}
          </ul>
          <div className="flex gap-2">
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
              placeholder="Nome do SDR"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            <button
              onClick={handleAdd}
              disabled={!newName.trim()}
              className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-dark disabled:opacity-40 disabled:cursor-not-allowed transition"
            >
              Adicionar
            </button>
          </div>
        </div>
        <div className="p-5 border-t border-gray-200 flex gap-3">
          <button onClick={onClose} className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition">Cancelar</button>
          <button
            onClick={handleSave}
            className="flex-1 px-4 py-2 bg-primary text-white rounded-lg text-sm font-bold hover:bg-primary-dark transition"
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
};

// Componente de Login
const LoginComponent = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const supabase = getSupabaseClient();
    if (!supabase) {
      setError('Supabase não configurado');
      setLoading(false);
      return;
    }

    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;
        setError('Conta criada! Verifique seu email para confirmar.');
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        onLogin();
      }
    } catch (error) {
      setError(error.message || 'Erro ao autenticar');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-secondary flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            CRM Alinhatta
          </h1>
          <p className="text-neutral-dark" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            {isSignUp ? 'Criar nova conta' : 'Entre para continuar'}
          </p>
        </div>

        <form onSubmit={handleAuth} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-neutral-dark mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="seu@email.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-dark mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Senha
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Mínimo 6 caracteres"
            />
          </div>

          {error && (
            <div className={`p-3 rounded-lg text-sm ${error.includes('criada') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-white py-3 rounded-lg hover:bg-primary-dark transition font-bold disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            {loading ? 'Processando...' : (isSignUp ? 'Criar Conta' : 'Entrar')}
          </button>

          <div className="text-center">
            <button
              type="button"
              onClick={() => {
                setIsSignUp(!isSignUp);
                setError('');
              }}
              className="text-primary hover:underline text-sm"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              {isSignUp ? 'Já tem conta? Entre aqui' : 'Não tem conta? Crie uma'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Tornar disponível globalmente para uso no HTML (sem export default para evitar problemas com Babel)
if (typeof window !== 'undefined') {
    window.CRMAlinhatta = CRMAlinhatta;
    window.LoginComponent = LoginComponent;
} else {
    // Fallback para ambientes não-browser
    globalThis.CRMAlinhatta = CRMAlinhatta;
    globalThis.LoginComponent = LoginComponent;
}