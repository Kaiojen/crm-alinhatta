# 🔧 Como Corrigir o Erro 404 no Vercel

## ✅ Verificação 1: Root Directory

**O problema mais comum!** Seu app está na pasta `crm/`, mas o Vercel pode estar olhando a raiz do repositório.

### Passo a passo:

1. Acesse: https://vercel.com/dashboard
2. Vá no seu projeto **crm-alinhatta**
3. Clique em **Settings** (Configurações)
4. Vá em **General** → **Root Directory**
5. **MUDE para:** `crm`
6. Salve

### Depois disso:

Faça um commit pequeno para forçar novo deploy:

```bash
# Adicione um espaço no README ou crie um arquivo vazio
echo " " >> README.md
git add README.md
git commit -m "chore: forçar novo deploy após ajuste de Root Directory"
git push
```

---

## ✅ Verificação 2: Build & Output Settings

Como este é um **site estático** (não precisa de build), configure assim:

1. Vercel → **Settings** → **Build & Output Settings**

2. Configure:
   - **Build Command:** Deixe **VAZIO** ou `echo "No build needed"`
   - **Output Directory:** `.` (ponto - significa a pasta atual)
   - **Install Command:** `npm install` (ou deixe vazio se não usar npm)

3. Salve

---

## ✅ Verificação 3: Framework Preset

1. Vercel → **Settings** → **General** → **Framework Preset**
2. Selecione: **Other** ou **Static Site**
3. Salve

---

## ✅ Verificação 4: Estrutura de Arquivos

Confirme que estes arquivos estão na pasta `crm/` e no Git:

- ✅ `index.html` (arquivo principal)
- ✅ `alinhatta-crm.tsx` (componente React)
- ✅ `vercel.json` (configuração)
- ✅ `package.json` (dependências)
- ✅ `api/leads.js` (API route)

Para verificar no Git:

```bash
cd crm
git ls-files
```

Todos esses arquivos devem aparecer na lista.

---

## ✅ Verificação 5: Verificar o Deploy Mais Recente

1. Vercel → **Deployments**
2. Clique no deploy **MAIS RECENTE** (não um antigo!)
3. Veja os **Logs** do build
4. Procure por erros ou avisos

---

## 🚀 Solução Rápida (Passo a Passo Completo)

### 1. Ajustar Root Directory

```
Vercel Dashboard → Projeto → Settings → General → Root Directory
Alterar para: crm
Salvar
```

### 2. Ajustar Build Settings

```
Vercel Dashboard → Settings → Build & Output Settings
Build Command: (vazio)
Output Directory: .
Install Command: npm install
Salvar
```

### 3. Forçar Novo Deploy

```bash
cd crm
echo "# Deploy fix" >> README.md
git add README.md
git commit -m "chore: forçar deploy após correções"
git push
```

### 4. Aguardar e Verificar

- Aguarde 1-2 minutos
- Acesse o domínio do Vercel
- Deve funcionar! ✅

---

## ❌ Se AINDA der 404:

### Verifique os Logs do Deploy:

1. Vercel → Deployments → Deploy mais recente → **Logs**
2. Procure por:
   - `Error:`
   - `Warning:`
   - `Cannot find`
   - `404`

### Verifique se o index.html está sendo servido:

No terminal do Vercel (ou localmente):

```bash
# Verificar se index.html existe
ls -la index.html

# Verificar conteúdo
head -20 index.html
```

### Teste Localmente:

```bash
cd crm
python server.py
# Acesse http://localhost:8000
# Se funcionar local, o problema é configuração do Vercel
```

---

## 📝 Checklist Final

- [ ] Root Directory = `crm`
- [ ] Build Command = vazio ou `echo "No build"`
- [ ] Output Directory = `.`
- [ ] Framework Preset = `Other` ou `Static Site`
- [ ] Todos os arquivos estão no Git (`git ls-files`)
- [ ] Novo deploy foi feito após as mudanças
- [ ] Verificou os logs do deploy mais recente

---

## 💡 Dica Extra

Se você tem um repositório na raiz com várias pastas, e o app está em `crm/`, **SEMPRE** configure o Root Directory para `crm` no Vercel.

Caso contrário, o Vercel vai procurar `index.html` na raiz do repositório, e não vai encontrar (porque está em `crm/index.html`).

