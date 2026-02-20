# 📥 Guia de Importação de Leads - CRM Alinhatta

## 🔧 Passo 1: Preparar o Banco de Dados

### Primeiro acesso? Execute este SQL no Supabase:

```sql
-- Adicionar colunas faltantes (arquivo: supabase-add-columns.sql)
ALTER TABLE leads
  ADD COLUMN IF NOT EXISTS owner TEXT DEFAULT '',
  ADD COLUMN IF NOT EXISTS origem TEXT DEFAULT 'Manual',
  ADD COLUMN IF NOT EXISTS "pacoteInteresse" TEXT DEFAULT '',
  ADD COLUMN IF NOT EXISTS valorpotencial NUMERIC DEFAULT 0,
  ADD COLUMN IF NOT EXISTS "proximoFollowup" TEXT DEFAULT '',
  ADD COLUMN IF NOT EXISTS tentativas INTEGER DEFAULT 0,
  ADD COLUMN IF NOT EXISTS historico JSONB DEFAULT '[]'::jsonb;
```

---

## 🧹 Passo 2: Limpar Dados Antigos (se necessário)

Se você já importou dados com problema, limpe antes:

```sql
-- Ver registros atuais
SELECT id, cnpj, empresa, segmento FROM leads ORDER BY id;

-- OPÇÃO 1: Deletar TUDO (cuidado!)
DELETE FROM leads;

-- OPÇÃO 2: Deletar apenas dados ruins (empresa muito longa)
DELETE FROM leads WHERE LENGTH(empresa) > 200;
```

---

## 📋 Passo 3: Preparar o CSV

### Formato esperado:

O CSV deve ter estas colunas (ordem não importa):

- **Rank** - Posição/classificação (opcional)
- **CNPJ** - CNPJ da empresa (obrigatório)
- **Razão Social** - Nome da empresa (obrigatório)
- **Segmento** - Área de atuação (opcional)
- **Score** - Pontuação (opcional)
- **Contato** - Nome do contato (opcional)
- **Telefone** - Telefone (opcional)
- **Email** - Email (opcional)

### Delimitador:

- ✅ **Vírgula (,)** - Recomendado
- ✅ **Ponto e vírgula (;)** - Também funciona

---

## 📤 Passo 4: Importar no CRM

1. Acesse: http://localhost:8000
2. Faça login
3. Clique no botão **"📤 Importar"** (laranja)
4. Selecione seu arquivo CSV
5. Revise os dados na pré-visualização
6. Clique em **"Importar Leads"**

### 🔍 Verificando no Console (F12):

Você deve ver logs assim:

```
🔍 Delimitador detectado: ","
📋 Colunas detectadas (9): ["Rank", "CNPJ", "Razão Social", "Segmento", ...]
📊 Mapeamento de colunas: { empresa: "Razão Social", cnpj: "CNPJ", ... }
📝 Exemplo de linha parseada: ["1", "52.417.549/0001-80", "MM SOLUCOES EM ELETRICA LTDA", ...]
📤 Importando 50 leads novos...
💾 Salvando 50 leads no Supabase...
✅ 50 leads salvos com sucesso!
```

---

## ✅ Passo 5: Verificar Importação

### No CRM:
- Os leads devem aparecer na lista
- Use os filtros para verificar:
  - 📊 Status
  - 🎯 Prioridade
  - 🏢 Segmento

### No Supabase:
1. Vá em **Table Editor** → **leads**
2. Verifique se os dados estão separados corretamente:
   - `empresa` = Nome da empresa (SEM CNPJ misturado)
   - `cnpj` = Apenas números do CNPJ
   - `segmento` = Área de atuação

---

## 🎨 Funcionalidades de Filtragem

### Filtros disponíveis:
- **Status**: Novo, Em Negociação, Ganho, Perdido, etc.
- **Prioridade**: Alta, Média, Baixa
- **Segmento**: Por área de atuação
- **SDR**: Por responsável
- **Origem**: Planilha, Indicação, etc.

### Ordenação:
- 📅 Data de entrada
- 🏭 Nome da empresa
- 💰 Valor potencial
- 📊 Status

### Botão "✕ Limpar Filtros":
- Aparece automaticamente quando há filtros ativos
- Remove todos os filtros de uma vez

---

## ❗ Problemas Comuns

### ❌ Erro: "Could not find the 'pacoteInteresse' column"
**Solução**: Execute o SQL do Passo 1

### ❌ Dados misturados (CNPJ + Empresa + Segmento tudo junto)
**Solução**:
1. Limpe os dados ruins (Passo 2)
2. Verifique o formato do CSV (Passo 3)
3. Importe novamente (Passo 4)
4. Confira os logs no console (F12)

### ❌ Leads não aparecem após importação
**Solução**:
1. Abra o Console (F12)
2. Verifique se há erros em vermelho
3. Recarregue a página (Ctrl + Shift + R)

---

## 📞 Suporte

Se tiver problemas:
1. Abra o Console do navegador (F12)
2. Copie os erros/logs
3. Tire prints da tela
4. Compartilhe para análise
