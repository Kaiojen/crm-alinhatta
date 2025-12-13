# 🎯 CRM Alinhatta - Sistema de Gestão de Leads

Sistema completo de gestão de leads desenvolvido para a Alinhatta.

## 🚀 Como Iniciar o Sistema

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

4. **Para parar o servidor:**
   - Pressione `Ctrl+C` no terminal

---

### 🐍 Método Alternativo (Python)

1. **Abra um terminal/Prompt de Comando**

2. **Navegue até a pasta crm:**
   ```bash
   cd "C:\Users\SAMSUNG\Desktop\CRM Alinhatta\crm"
   ```

3. **Execute o servidor:**
   ```bash
   python server.py
   ```

4. **Acesse no navegador:**
   ```
   http://localhost:8000
   ```

---

### 📦 Método Alternativo (Node.js)

Se você tem Node.js instalado:

1. **Abra um terminal**

2. **Navegue até a pasta crm:**
   ```bash
   cd "C:\Users\SAMSUNG\Desktop\CRM Alinhatta\crm"
   ```

3. **Execute:**
   ```bash
   npx serve -p 8000
   ```

4. **Acesse a URL mostrada no terminal**

---

## ⚠️ IMPORTANTE

**NÃO abra o arquivo `index.html` diretamente!**

Por questões de segurança do navegador (política CORS), você **precisa usar um servidor local** para executar o CRM.

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

### ✅ Alertas
- Follow-ups para hoje
- Follow-ups atrasados
- Notificações visuais

---

## 📥 Importação de CSV

### Formato Aceito

O sistema aceita CSV com as seguintes colunas (nomes flexíveis):

**Obrigatórias:**
- `CNPJ` ou `Cnpj`
- `Razão Social` ou `Razao Social` ou `Empresa` ou `Nome`

**Opcionais:**
- `Segmento` ou `Setor` ou `Área`
- `Score` ou `Pontuação` (usado para prioridade automática)
- `Rank` ou `Ranking` (usado se Score não disponível)
- `Telefone` ou `Tel` ou `WhatsApp`
- `Email` ou `E-mail`
- `Contato` ou `Nome Contato` ou `Responsável`
- `Cargo` ou `Função` ou `Posição`

### Exemplo de CSV

```csv
CNPJ,Razão Social,Segmento,Score,Telefone,Email,Contato
12.345.678/0001-90,Empresa Exemplo LTDA,Construção,12,(11) 98765-4321,contato@exemplo.com,João Silva
98.765.432/0001-10,Outra Empresa SA,TI,8,(21) 91234-5678,info@outra.com,Maria Santos
```

### Como Importar

1. Clique no botão **"Importar"** no pipeline
2. Selecione o arquivo CSV
3. Revise o preview (primeiras 5 linhas)
4. Clique em **"Importar Leads"**
5. Pronto! Os leads serão adicionados automaticamente

**Nota:** Após importar, você precisará editar cada lead para atribuir um SDR responsável (campo obrigatório).

---

## 🎨 Design System Alinhatta

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

## 🔧 Requisitos

- **Python 3.x** (para o servidor Python)
- **Navegador moderno** (Chrome, Firefox, Edge, Safari)
- **Conexão com internet** (para carregar dependências CDN)

---

## 💾 Armazenamento de Dados

Atualmente, os dados são salvos no **localStorage** do navegador. Isso significa:

- ✅ Dados persistem entre sessões
- ✅ Funciona offline após carregar
- ⚠️ Dados são locais ao navegador/computador
- ⚠️ Não sincroniza entre diferentes dispositivos

**Para sincronização entre múltiplos SDRs:**
- Será necessário implementar backend com banco de dados
- Ou usar exportação/importação manual de dados

---

## 🐛 Solução de Problemas

### ❌ Servidor não inicia

**Problema:** Python não encontrado
- **Solução:** Instale Python 3.x de [python.org](https://www.python.org/downloads/)

### ❌ Página não carrega

**Problema:** Dependências não carregam
- **Solução:** Verifique sua conexão com internet
- **Solução:** Limpe o cache do navegador (Ctrl+F5)

### ❌ CSV não importa

**Problema:** Arquivo inválido
- **Solução:** Verifique se tem as colunas obrigatórias (CNPJ e Razão Social)
- **Solução:** Certifique-se que o arquivo está em UTF-8
- **Solução:** Verifique se não há linhas vazias no meio do arquivo

### ❌ Dados não persistem

**Problema:** localStorage bloqueado
- **Solução:** Não use modo anônimo/privado
- **Solução:** Verifique se o navegador permite localStorage

---

## 📞 Suporte

Para dúvidas ou problemas, verifique:
1. Este README
2. O arquivo `LEIA-ME.txt` na pasta
3. O console do navegador (F12) para erros

---

## 🎉 Status do Sistema

**✅ Sistema 100% funcional e pronto para uso!**

---

**Desenvolvido para Alinhatta** 🚀

