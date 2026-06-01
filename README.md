# 🎯 CRM Alinhatta - Sistema de Gestão de Leads

Sistema completo de gestão de leads desenvolvido para a Alinhatta.

> 📲 **Avisos no WhatsApp:** o CRM pode mandar, automaticamente, um alerta de
> follow-ups (vencidos e de hoje) pela manhã e um relatório curto no fim do dia,
> por SDR. Configuração em **[GUIA-WHATSAPP.md](GUIA-WHATSAPP.md)**.

## 🚀 Deploy no Vercel

### Passo a Passo do Deploy

1. **Conecte o repositório no Vercel:**
   - Vercel Dashboard → **Add New Project**
   - Selecione o repositório `crm-alinhatta`
   - Framework Preset: **Other** ou **Static Site**
   - Build Command: (deixe vazio)
   - Output Directory: `.` (ponto)
   - Root Directory: `.` (raiz do projeto)

2. **Deploy automático:**
   - O Vercel fará deploy automaticamente após cada push no `main`

3. **Acesse:**
   - O domínio será: `https://crm-alinhatta.vercel.app`

---

## 💻 Desenvolvimento Local

### ⚡ Método Rápido (Windows)

1. **Dê um duplo clique no arquivo:**
   ```
   START_SERVER.bat
   ```

2. **Aguarde a mensagem:**
   ```
   🚀 Servidor CRM Alinhatta iniciado!
   🌐 URL: http://localhost:8000
   ```

3. **Abra seu navegador e acesse:**
   ```
   http://localhost:8000
   ```

### 🐍 Método Alternativo (Python)

```bash
python server.py
```

Acesse: http://localhost:8000

---

## 📋 Funcionalidades

### ✅ Pipeline de Leads
- Visualização completa de todos os leads
- Filtros avançados (Status, Prioridade, Segmento, SDR, Origem)
- Busca por empresa, CNPJ ou contato
- Ordenação por data, empresa ou valor

### ✅ Gestão de Leads
- Adicionar novos leads manualmente
- Editar informações dos leads
- Registrar interações e histórico
- Definir follow-ups
- Excluir leads

### ✅ Importação/Exportação
- Importar leads via CSV
- Exportar dados em CSV ou JSON
- Validação automática de CNPJ
- Classificação de prioridade baseada em Score

### ✅ Dashboard
- Métricas em tempo real
- Distribuição por status
- Análise por segmento
- Performance por SDR
- Análise por origem do lead
- Alertas de follow-ups

---

## 📥 Importação de CSV

### Formato Aceito

**Obrigatórias:**
- `CNPJ` ou `Cnpj`
- `Razão Social` ou `Razao Social` ou `Empresa` ou `Nome`

**Opcionais:**
- `Segmento`, `Score`, `Telefone`, `Email`, `Contato`, `Cargo`

### Exemplo

```csv
CNPJ,Razão Social,Segmento,Score,Telefone,Email,Contato
12.345.678/0001-90,Empresa Exemplo LTDA,Construção,12,(11) 98765-4321,contato@exemplo.com,João Silva
```

---

## 🎨 Design System

### Cores
- **Verde Principal:** `#1a7b60`
- **Verde Secundário:** `#12a37a`
- **Dourado:** `#f4d298`
- **Texto Escuro:** `#221b1b`

### Fontes
- **Títulos:** Montserrat (Bold)
- **Corpo:** Open Sans (Regular)

---

## 📊 Status dos Leads

- 🆕 **Novo** - Lead recém-cadastrado
- 📞 **Contato Inicial** - Primeiro contato realizado
- 📋 **Diagnóstico Agendado** - Reunião agendada
- 💎 **Qualificado** - Lead qualificado para proposta
- 📄 **Proposta Enviada** - Proposta enviada ao cliente
- ✅ **Ganho** - Contrato fechado
- ❌ **Perdido** - Oportunidade perdida

---

## 💾 Armazenamento de Dados

### Desenvolvimento Local
- Dados salvos no **localStorage** do navegador

### Produção (Vercel)
- Opção 1: **Vercel KV** (recomendado)
  - Configure as variáveis de ambiente no Vercel
  - `KV_REST_API_URL` e `KV_REST_API_TOKEN`
- Opção 2: **localStorage** (fallback)
  - Funciona, mas dados não sincronizam entre usuários

---

## 🔧 Estrutura do Projeto

```
CRM Alinhatta/
├── index.html              # Página principal
├── alinhatta-crm.tsx      # Componente React principal
├── logo.svg               # Logo da Alinhatta
├── package.json           # Dependências
├── vercel.json            # Configuração do Vercel
├── api/
│   └── leads.js           # API Route para Vercel KV
├── server.py              # Servidor local (desenvolvimento)
├── START_SERVER.bat       # Inicia servidor no Windows
├── VERIFICAR.bat          # Verifica instalação
└── README.md              # Este arquivo
```

---

## ⚠️ Solução de Problemas

### Erro 404 no Vercel
- ✅ Verifique se o **Root Directory** está como `.` (raiz) no Vercel
- ✅ Verifique se todos os arquivos estão no Git
- ✅ Verifique os Build Logs no Vercel
- ✅ Certifique-se que [vercel.json](vercel.json) está configurado corretamente

### Página não carrega localmente
- ✅ Use um servidor local (não abra `index.html` diretamente)
- ✅ Execute `python server.py` ou `START_SERVER.bat`
- ✅ Verifique sua conexão com internet (dependências CDN)

### CSV não importa
- ✅ Verifique se tem as colunas obrigatórias (CNPJ e Razão Social)
- ✅ Certifique-se que o arquivo está em UTF-8

---

## 📞 Suporte

Para dúvidas ou problemas:
1. Verifique este README
2. Verifique o console do navegador (F12)
3. Verifique os logs do Vercel (se em produção)

---

**Desenvolvido para Alinhatta** 🚀
