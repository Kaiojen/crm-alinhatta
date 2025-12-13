# 🎯 CRM Alinhatta - Sistema de Gestão de Leads

## ✅ O QUE FOI ENTREGUE

### 🎨 Design System Alinhatta
- ✅ Cores da marca aplicadas em todo o sistema
- ✅ Fontes Montserrat (títulos) e Open Sans (corpo)
- ✅ Logo da Alinhatta no header
- ✅ Identidade visual consistente

### 📊 Funcionalidades Implementadas
- ✅ Pipeline de Leads completo
- ✅ Dashboard com métricas em tempo real
- ✅ Sistema de alertas (follow-ups atrasados)
- ✅ Filtros avançados (Status, Prioridade, Busca)
- ✅ Adicionar/Editar leads
- ✅ Histórico de interações
- ✅ Importação de CSV melhorada e robusta

### 🔄 Importador de CSV Aprimorado
- ✅ Detecta automaticamente delimitador (vírgula ou ponto e vírgula)
- ✅ Lida com campos entre aspas
- ✅ Mapeia colunas flexível (aceita variações de nomes)
- ✅ Classifica prioridade automaticamente baseado no Score
- ✅ Validação de dados obrigatórios
- ✅ Mensagens de erro claras

## 📁 Estrutura de Arquivos

```
Alinhatta/
├── alinhatta-crm.tsx          # Componente React principal
├── crm/
│   └── index.html             # HTML standalone para deploy
├── GUIA-INTEGRACAO-CRM.md     # Guia completo de integração
└── README-CRM.md              # Este arquivo
```

## 🚀 Como Usar

### Opção 1: Deploy Direto (Recomendado)

1. **Vercel (Mais Fácil)**
   - Acesse [vercel.com](https://vercel.com)
   - Faça upload da pasta `crm` ou conecte ao GitHub
   - Configure o subdomínio `crm.alinhatta.com.br`

2. **Netlify**
   - Acesse [netlify.com](https://netlify.com)
   - Arraste e solte a pasta `crm`
   - Configure o subdomínio

### Opção 2: Integração com Site Existente

Siga o guia completo em `GUIA-INTEGRACAO-CRM.md`

## 📥 Importação de CSV

### Formato Aceito

O sistema aceita CSV com as seguintes colunas (nomes flexíveis):

**Obrigatórias:**
- `CNPJ` ou `Cnpj`
- `Razão Social` ou `Razao Social` ou `Empresa` ou `Nome`

**Opcionais:**
- `Segmento` ou `Setor` ou `Área`
- `Score` ou `Pontuação` (usado para prioridade automática)
- `Telefone` ou `Tel` ou `WhatsApp`
- `Email` ou `E-mail`
- `Contato` ou `Nome Contato` ou `Responsável`
- `Cargo` ou `Função` ou `Posição`

### Exemplo de CSV

```csv
CNPJ,Razão Social,Segmento,Score,Telefone,Email
12.345.678/0001-90,Empresa Exemplo LTDA,Construção,85,(11) 98765-4321,contato@exemplo.com
98.765.432/0001-10,Outra Empresa SA,TI,72,(21) 91234-5678,info@outra.com
```

### Como Importar

1. Clique em **"Importar CSV"** no pipeline
2. Selecione o arquivo CSV
3. Revise o preview (primeiras 5 linhas)
4. Clique em **"Importar Leads"**
5. Pronto! Os leads serão adicionados automaticamente

## 🎨 Cores da Alinhatta

```css
--primary: #1a7b60        /* Verde principal */
--primary-dark: #155a45  /* Verde escuro */
--secondary: #12a37a      /* Verde secundário */
--accent: #f4d298         /* Dourado */
--neutral-dark: #221b1b   /* Texto escuro */
--neutral-text: #8d7168   /* Texto neutro */
```

## 🔧 Personalização

Para alterar cores, edite as variáveis CSS no início de `alinhatta-crm.tsx` (linhas 9-19).

## 📱 Responsividade

O sistema é totalmente responsivo e funciona em:
- ✅ Desktop
- ✅ Tablet
- ✅ Mobile

## 🔐 Segurança

**Nota:** Atualmente o sistema usa `localStorage` do navegador. Para sincronização entre múltiplos SDRs, será necessário:

1. Backend com banco de dados
2. Autenticação de usuários
3. API REST para sincronização

**Solução temporária:** Os dados são salvos localmente. Para compartilhar entre SDRs, será necessário exportar/importar dados ou implementar backend.

## 🐛 Solução de Problemas

### CSV não importa
- Verifique se tem as colunas obrigatórias (CNPJ e Razão Social)
- Certifique-se que o arquivo está em UTF-8
- Verifique se não há linhas vazias no meio do arquivo

### Cores não aparecem
- Verifique se as fontes do Google estão carregando
- Limpe o cache do navegador (Ctrl+F5)

### Dados não persistem
- Verifique se o navegador permite localStorage
- Não use modo anônimo/privado

## 📞 Próximos Passos

1. ✅ Sistema criado e funcional
2. ✅ Cores da Alinhatta aplicadas
3. ✅ Importador de CSV robusto
4. ⏳ Deploy no subdomínio
5. ⏳ Integração com site institucional
6. ⏳ Importação dos 50 leads
7. ⏳ Treinamento dos SDRs

## 🎉 Status

**Sistema 100% funcional e pronto para uso!**

---

**Desenvolvido para Alinhatta** 🚀

