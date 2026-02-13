# Configuração de Variáveis de Ambiente no Vercel

## ⚠️ AÇÃO NECESSÁRIA

O deploy foi corrigido com sucesso, mas as **variáveis de ambiente** precisam ser configuradas no Vercel para o CRM funcionar corretamente.

## Variáveis Necessárias

O CRM precisa das seguintes variáveis de ambiente configuradas no Vercel:

1. **VITE_SUPABASE_URL**
   - Valor: URL do seu projeto Supabase
   - Exemplo: `https://tkqgydprypxhduhmzxgv.supabase.co`
   - Onde encontrar: Supabase Dashboard → Settings → API → Project URL

2. **VITE_SUPABASE_ANON_KEY**
   - Valor: Chave anônima/pública do Supabase
   - Exemplo: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`
   - Onde encontrar: Supabase Dashboard → Settings → API → Project API keys → anon/public

## Como Configurar no Vercel

### Opção 1: Via Dashboard Web

1. Acesse: https://vercel.com/gabriels-projects-d61e2e8d/crm-alinhatta/settings/environment-variables

2. Faça login no Vercel (se necessário)

3. Clique em **"Add New"** ou **"Edit"**

4. Adicione cada variável:
   - **Key**: `VITE_SUPABASE_URL`
   - **Value**: [Cole a URL do seu projeto Supabase]
   - **Environments**: Marque Production, Preview e Development

5. Repita para `VITE_SUPABASE_ANON_KEY`

6. Clique em **"Save"**

7. **Importante**: Após salvar, faça um **Redeploy** do projeto:
   - Vá em: Deployments
   - Clique nos 3 pontos do deployment mais recente
   - Selecione "Redeploy"

### Opção 2: Via Vercel CLI

```bash
# Instalar Vercel CLI (se ainda não tiver)
npm i -g vercel

# Login
vercel login

# Navegar até o diretório do projeto
cd /caminho/para/crm-alinhatta

# Adicionar variáveis de ambiente
vercel env add VITE_SUPABASE_URL production
# Cole a URL quando solicitado

vercel env add VITE_SUPABASE_ANON_KEY production
# Cole a chave quando solicitado

# Fazer redeploy
vercel --prod
```

## Verificar Configuração

Após configurar as variáveis:

1. Acesse: https://crm.alinhatta.com.br/
2. A tela de login deve aparecer corretamente
3. Tente fazer login com suas credenciais
4. Se aparecer "Acesso restrito a usuários autorizados", as variáveis ainda não foram configuradas

## Obter Credenciais do Supabase

Se você não tem as credenciais do Supabase:

1. Acesse: https://supabase.com/dashboard/org/xjzwrtwlyytzupramoyh/general
2. Faça login com: gabriel@alinhatta.com
3. Selecione o projeto do CRM
4. Vá em: Settings → API
5. Copie:
   - **Project URL** → use em `VITE_SUPABASE_URL`
   - **anon/public key** → use em `VITE_SUPABASE_ANON_KEY`

## Problemas Comuns

### Erro: "Supabase credentials not found"
- **Causa**: Variáveis de ambiente não configuradas
- **Solução**: Siga os passos acima

### Erro: "Invalid API key"
- **Causa**: Chave incorreta ou expirada
- **Solução**: Verifique se copiou a chave correta do Supabase

### Site mostra "Acesso restrito"
- **Causa**: Variáveis não foram aplicadas ao deployment
- **Solução**: Faça um redeploy após configurar as variáveis

## Notas Importantes

- ⚠️ As variáveis com prefixo `VITE_` são expostas ao navegador (client-side)
- ✅ A chave `anon/public` é segura para uso no frontend
- 🔒 NUNCA use a chave `service_role` no frontend
- 📝 Após qualquer mudança nas variáveis, sempre faça um redeploy

## Status Atual

✅ **Código corrigido e deployado com sucesso**
⚠️ **Variáveis de ambiente precisam ser configuradas manualmente**

Commit de correção: `c957b52a38bf3eaaed6deb5cc839f9b0155b3548`
Deploy ID: `dpl_A8ufnmho2sytEfQEVCNUk5KyrcdR`
Status: READY
URL: https://crm.alinhatta.com.br/
