# 🚀 Deploy no Vercel - Guia Completo

## 📁 Qual Pasta Usar?

### ✅ **USE A PASTA `crm/`**

A pasta `crm/` é a correta para deploy no Vercel porque:
- ✅ Já tem `vercel.json` configurado
- ✅ Sistema standalone que funciona sem build
- ✅ Pronto para produção
- ✅ Mais leve e rápido

### ❌ **NÃO USE `alinhatta-crm/`**

A pasta `alinhatta-crm/` é apenas para desenvolvimento local.

**Você pode deletar `alinhatta-crm/` sem problemas!**

---

## 🗄️ Banco de Dados - IMPORTANTE!

### ⚠️ Situação Atual

O sistema **atualmente usa localStorage**, que:
- ❌ Não funciona em produção com múltiplos usuários
- ❌ Dados ficam apenas no navegador do usuário
- ❌ Não sincroniza entre dispositivos
- ❌ Dados podem ser perdidos

### ✅ Solução: Integrar com Banco de Dados

Para produção no Vercel, você tem 3 opções:

---

## Opção 1: Vercel KV (Recomendado - Mais Fácil)

### Passo 1: Instalar Vercel KV

No terminal, na pasta `crm/`:
```bash
npm init -y
npm install @vercel/kv
```

### Passo 2: Configurar no Vercel

1. Acesse [vercel.com](https://vercel.com)
2. Vá em **Settings** > **Environment Variables**
3. Adicione:
   - `KV_REST_API_URL` (você recebe ao criar KV)
   - `KV_REST_API_TOKEN` (você recebe ao criar KV)
4. No dashboard do Vercel, crie um **KV Database**

### Passo 3: Criar API Route

O arquivo `api/leads.js` já está criado e pronto!

### Passo 4: Atualizar o Frontend

O código do frontend precisa ser atualizado para usar a API ao invés de localStorage.

---

## Opção 2: Supabase (Mais Completo)

### Vantagens:
- ✅ Banco de dados PostgreSQL completo
- ✅ Autenticação de usuários
- ✅ API REST automática
- ✅ Gratuito até 500MB

### Como configurar:
1. Crie conta em [supabase.com](https://supabase.com)
2. Crie um projeto
3. Crie tabela `leads` com os campos necessários
4. Use a API do Supabase no frontend

---

## Opção 3: MongoDB Atlas (Alternativa)

### Vantagens:
- ✅ Banco NoSQL flexível
- ✅ Gratuito até 512MB
- ✅ Fácil de usar

---

## 📝 Próximos Passos

### Para usar Vercel KV (Recomendado):

1. **Deletar pasta `alinhatta-crm/`** (não é necessária)

2. **Instalar dependências na pasta `crm/`:**
   ```bash
   cd crm
   npm init -y
   npm install @vercel/kv
   ```

3. **Criar arquivo `package.json` na pasta `crm/`:**
   ```json
   {
     "name": "crm-alinhatta",
     "version": "1.0.0",
     "dependencies": {
       "@vercel/kv": "^0.2.0"
     }
   }
   ```

4. **Fazer deploy no Vercel:**
   - Conecte o repositório GitHub
   - Ou faça upload da pasta `crm/`
   - Configure as variáveis de ambiente do KV

5. **Atualizar o frontend** para usar a API ao invés de localStorage

---

## 🔧 Arquivos Necessários

### Estrutura Final:
```
crm/
├── index.html
├── alinhatta-crm.tsx
├── logo.svg
├── vercel.json
├── package.json (novo)
├── api/
│   └── leads.js (novo)
└── README.md
```

---

## ⚠️ IMPORTANTE

**Antes de fazer deploy em produção:**
1. ✅ Integrar com banco de dados (KV, Supabase ou MongoDB)
2. ✅ Atualizar o código para usar API ao invés de localStorage
3. ✅ Testar salvamento e carregamento de dados
4. ✅ Configurar variáveis de ambiente no Vercel

**Sem banco de dados, os dados não serão salvos permanentemente!**

---

## 📞 Precisa de Ajuda?

Se quiser, posso:
1. Atualizar o código para usar Vercel KV
2. Criar a integração com Supabase
3. Configurar tudo para você

Só me avisar qual opção prefere!

