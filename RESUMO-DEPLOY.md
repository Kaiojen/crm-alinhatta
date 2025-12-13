# 📋 Resumo: Deploy no Vercel

## ✅ Respostas Rápidas

### 1. Qual pasta usar no Vercel?
**→ Use a pasta `crm/`**

### 2. Posso deletar `alinhatta-crm/`?
**→ SIM! Pode deletar sem problemas.**

### 3. O sistema está pronto para banco de dados?
**→ PARCIALMENTE:**
- ✅ Código atualizado para detectar produção e usar API
- ✅ API route criada (`api/leads.js`)
- ⚠️ **PRECISA CONFIGURAR** Vercel KV ou outro banco

---

## 🚀 Passos para Deploy

### Passo 1: Deletar pasta desnecessária
```
Delete: alinhatta-crm/
```

### Passo 2: Configurar Vercel KV

1. **No Vercel Dashboard:**
   - Vá em **Storage** > **Create Database**
   - Escolha **KV** (Key-Value)
   - Crie o banco

2. **Adicione variáveis de ambiente:**
   - `KV_REST_API_URL`
   - `KV_REST_API_TOKEN`

### Passo 3: Fazer Deploy

**Opção A - Via GitHub:**
```bash
cd crm
git init
git add .
git commit -m "CRM Alinhatta"
# Conecte ao GitHub e faça push
# Depois conecte no Vercel
```

**Opção B - Via Vercel CLI:**
```bash
cd crm
npm install -g vercel
vercel
```

**Opção C - Via Interface:**
- Arraste a pasta `crm/` para o Vercel
- Configure as variáveis de ambiente
- Deploy!

---

## ⚠️ IMPORTANTE

**Sem configurar o banco de dados:**
- ❌ Dados não serão salvos permanentemente
- ❌ Cada usuário terá seus próprios dados (localStorage)
- ❌ Dados não sincronizam entre usuários

**Com banco de dados configurado:**
- ✅ Dados salvos permanentemente
- ✅ Todos os usuários veem os mesmos dados
- ✅ Sistema pronto para produção

---

## 📁 Estrutura Final

```
crm/
├── index.html          ✅
├── alinhatta-crm.tsx   ✅ (atualizado para usar API)
├── logo.svg            ✅
├── vercel.json         ✅
├── package.json        ✅ (novo)
├── api/
│   └── leads.js        ✅ (novo - API route)
└── README.md           ✅
```

---

## 🎯 Próximo Passo

**Configure o Vercel KV e faça o deploy!**

Se precisar de ajuda com a configuração, me avise!

