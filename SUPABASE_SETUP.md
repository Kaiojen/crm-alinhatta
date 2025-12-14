# Configuração do Supabase para CRM Alinhatta

## 1. Criar Projeto no Supabase

1. Acesse https://supabase.com
2. Crie uma conta ou faça login
3. Crie um novo projeto
4. Anote a **URL do projeto** e a **chave anon/public**

## 2. Criar Tabela `leads`

Execute o seguinte SQL no **SQL Editor** do Supabase:

```sql
-- Criar tabela de leads
CREATE TABLE leads (
  id TEXT PRIMARY KEY,
  cnpj TEXT UNIQUE NOT NULL,
  empresa TEXT NOT NULL,
  segmento TEXT NOT NULL,
  score INTEGER,
  prioridade TEXT,
  status TEXT DEFAULT 'Novo',
  telefone TEXT,
  email TEXT,
  contato TEXT,
  cargo TEXT,
  owner TEXT NOT NULL,
  origem TEXT DEFAULT 'Manual',
  dataEntrada DATE DEFAULT CURRENT_DATE,
  proximoFollowUp DATE,
  valorPotencial NUMERIC,
  observacoes TEXT,
  historico JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Criar índices para melhor performance
CREATE INDEX idx_leads_cnpj ON leads(cnpj);
CREATE INDEX idx_leads_status ON leads(status);
CREATE INDEX idx_leads_owner ON leads(owner);
CREATE INDEX idx_leads_dataEntrada ON leads(dataEntrada DESC);
CREATE INDEX idx_leads_prioridade ON leads(prioridade);

-- Criar função para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc', NOW());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Criar trigger para atualizar updated_at
CREATE TRIGGER update_leads_updated_at BEFORE UPDATE ON leads
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Comentários nas colunas
COMMENT ON TABLE leads IS 'Tabela principal de leads do CRM Alinhatta';
COMMENT ON COLUMN leads.id IS 'ID único do lead (timestamp)';
COMMENT ON COLUMN leads.cnpj IS 'CNPJ da empresa (apenas números)';
COMMENT ON COLUMN leads.empresa IS 'Razão social da empresa';
COMMENT ON COLUMN leads.segmento IS 'Segmento de atuação';
COMMENT ON COLUMN leads.score IS 'Score de qualificação (0-100)';
COMMENT ON COLUMN leads.prioridade IS 'Alta, Média ou Baixa';
COMMENT ON COLUMN leads.status IS 'Status atual do lead no pipeline';
COMMENT ON COLUMN leads.owner IS 'SDR responsável pelo lead';
COMMENT ON COLUMN leads.origem IS 'Origem do lead (Planilha, LinkedIn, etc)';
COMMENT ON COLUMN leads.historico IS 'Array JSON com histórico de interações';
```

## 3. Configurar Row Level Security (RLS)

Para permitir acesso público (apenas para desenvolvimento/demo):

```sql
-- Habilitar RLS
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Política para permitir leitura pública
CREATE POLICY "Permitir leitura pública" ON leads
  FOR SELECT
  USING (true);

-- Política para permitir inserção pública
CREATE POLICY "Permitir inserção pública" ON leads
  FOR INSERT
  WITH CHECK (true);

-- Política para permitir atualização pública
CREATE POLICY "Permitir atualização pública" ON leads
  FOR UPDATE
  USING (true);

-- Política para permitir exclusão pública
CREATE POLICY "Permitir exclusão pública" ON leads
  FOR DELETE
  USING (true);
```

**⚠️ IMPORTANTE PARA PRODUÇÃO:**
Para produção, substitua as políticas acima por políticas baseadas em autenticação:

```sql
-- Remover políticas públicas
DROP POLICY IF EXISTS "Permitir leitura pública" ON leads;
DROP POLICY IF EXISTS "Permitir inserção pública" ON leads;
DROP POLICY IF EXISTS "Permitir atualização pública" ON leads;
DROP POLICY IF EXISTS "Permitir exclusão pública" ON leads;

-- Políticas com autenticação
CREATE POLICY "Usuários autenticados podem ler" ON leads
  FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "Usuários autenticados podem inserir" ON leads
  FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Usuários autenticados podem atualizar" ON leads
  FOR UPDATE
  USING (auth.role() = 'authenticated');

CREATE POLICY "Usuários autenticados podem deletar" ON leads
  FOR DELETE
  USING (auth.role() = 'authenticated');
```

## 4. Atualizar Credenciais no Projeto

### Desenvolvimento Local

Edite o arquivo [index.html](index.html:54):

```javascript
window.__SUPABASE_URL__ = 'SUA_URL_AQUI';
window.__SUPABASE_ANON_KEY__ = 'SUA_CHAVE_ANON_AQUI';
```

### Produção (Vercel)

Configure as variáveis de ambiente no Vercel:

1. Acesse o projeto no Vercel Dashboard
2. Vá em **Settings** → **Environment Variables**
3. Adicione:
   - `SUPABASE_URL` = URL do seu projeto
   - `SUPABASE_ANON_KEY` = Chave anon/public

4. Atualize o [index.html](index.html:54) para usar variáveis de ambiente em produção

## 5. Testar Conexão

1. Execute o servidor local: `python server.py` ou `START_SERVER.bat`
2. Acesse http://localhost:8000
3. Abra o Console do navegador (F12)
4. Adicione um lead de teste
5. Verifique no Supabase Dashboard → Table Editor se o lead foi salvo

## 6. Status dos Leads Suportados

- Novo
- Contato Inicial
- Diagnóstico Agendado
- Qualificado
- Proposta Enviada
- Ganho
- Perdido

## 7. Campos Obrigatórios

- `id` (gerado automaticamente)
- `cnpj` (único)
- `empresa`
- `segmento`
- `owner` (SDR responsável)

## 8. Backup dos Dados

Para fazer backup dos leads:

```sql
-- Exportar como CSV
COPY (SELECT * FROM leads ORDER BY dataEntrada DESC) TO '/tmp/leads_backup.csv' CSV HEADER;

-- Ou use o botão de Export no Table Editor do Supabase
```

## 9. Monitoramento

- **Logs**: Supabase Dashboard → Logs
- **Performance**: Supabase Dashboard → Database → Performance
- **Uso**: Supabase Dashboard → Settings → Usage

## 10. Migração de Dados Existentes

Se você tem dados no localStorage ou em CSV:

1. Use a funcionalidade de **Importar CSV** do CRM
2. Ou execute SQL direto no Supabase:

```sql
INSERT INTO leads (id, cnpj, empresa, segmento, owner, origem, dataEntrada)
VALUES
  ('1', '12345678000190', 'Empresa Teste', 'Construção', 'João Silva', 'Manual', '2024-01-01');
```

---

**Dúvidas?** Consulte a [documentação oficial do Supabase](https://supabase.com/docs)
