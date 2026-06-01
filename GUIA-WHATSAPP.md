# Guia — Alertas de follow-up e relatório diário no WhatsApp

Este recurso faz o CRM **avisar a equipe no WhatsApp** automaticamente:

- **De manhã (8h, horário de Brasília):** lista os follow-ups **vencidos** e os **de hoje**, separados por SDR.
- **No fim do dia (18h):** um **relatório curto** — quantos leads foram movimentados, analisados e conectados no dia, follow-ups em aberto e um retrato do pipeline.

Cada SDR recebe **no próprio número** só os leads em que ele é o `owner`.

> Tudo roda sozinho na Vercel (agendador embutido — *Cron Jobs*). Você só precisa
> configurar uma vez as variáveis abaixo. Sem isso, os avisos **não são enviados**
> (mas nada quebra no resto do sistema).

---

## Visão geral (o que conversa com o quê)

```
Vercel Cron (8h / 18h)  ──►  /api/cron/followup-alerts   ──►  lê o Supabase (tabela leads)
                             /api/cron/daily-report             │
                                                                ▼
                                                   WhatsApp Cloud API (Meta)
                                                                │
                                                                ▼
                                                   WhatsApp de cada SDR
```

---

## Passo 1 — WhatsApp Cloud API (Meta)

1. Acesse <https://developers.facebook.com/> e crie um app do tipo **Business**.
2. Adicione o produto **WhatsApp** ao app.
3. Na tela do WhatsApp você verá:
   - Um **número de telefone de teste** (pode usar no começo) e o **Phone number ID**
     → essa é a variável `WHATSAPP_PHONE_NUMBER_ID`.
   - Um **token de acesso temporário** (vale ~24h, só para testar)
     → variável `WHATSAPP_TOKEN`.
4. **IMPORTANTE — token permanente:** o token de teste expira em 24h. Para produção,
   crie um **Usuário de Sistema** em *Business Settings → System Users*, gere um token
   com as permissões `whatsapp_business_messaging` e `whatsapp_business_management`, e
   use esse token em `WHATSAPP_TOKEN`. Sem isso, os avisos param de funcionar no dia
   seguinte.
5. Para enviar de verdade para os celulares da equipe, registre um **número oficial**
   (não o de teste) e verifique-o. O número de teste só envia para até 5 números
   pré-cadastrados — ótimo para testar, insuficiente para o dia a dia.

---

## Passo 2 — Criar os 2 modelos de mensagem (templates)

Mensagens que o sistema inicia (fora de uma conversa) **precisam de um modelo aprovado
pela Meta**. Crie em *WhatsApp Manager → Modelos de mensagem → Criar modelo*.

Use **categoria `Utilidade` (Utility)** e **idioma `Português (BR)`** nos dois.

### Modelo 1 — nome: `followup_alerta`

Cole exatamente este corpo (as variáveis `{{1}}`…`{{5}}` são preenchidas pelo sistema):

```
Bom dia, {{1}}! ☀️ Aqui estão seus follow-ups no CRM Alinhatta.

🔴 Vencidos ({{2}}): {{4}}
📅 Para hoje ({{3}}): {{5}}

Bora resolver! 💪
```

Ordem das variáveis (o que cada uma significa):
| Variável | Conteúdo | Exemplo p/ aprovação |
|----------|----------|----------------------|
| `{{1}}` | Nome do SDR | Gabriel |
| `{{2}}` | Qtd. de vencidos | 3 |
| `{{3}}` | Qtd. de hoje | 2 |
| `{{4}}` | Lista dos vencidos | Padaria X (venc. 28/05), Loja Y (venc. 30/05) |
| `{{5}}` | Lista dos de hoje | Mercado Z, Auto Center W |

### Modelo 2 — nome: `relatorio_diario`

```
Boa noite, {{1}}! 🌙 Resumo do dia no CRM Alinhatta:

📌 Movimentados hoje: {{2}}
🔎 Analisados: {{3}}
🤝 Conectados: {{4}}
⏰ Follow-ups em aberto: {{5}}

📊 Pipeline: {{6}}
```

| Variável | Conteúdo | Exemplo p/ aprovação |
|----------|----------|----------------------|
| `{{1}}` | Nome do SDR | Gabriel |
| `{{2}}` | Leads movimentados hoje | 8 |
| `{{3}}` | Analisados hoje | 4 |
| `{{4}}` | Conectados hoje | 2 |
| `{{5}}` | Follow-ups em aberto | 5 |
| `{{6}}` | Retrato do pipeline | Novo 12, Qualificado 4, Ganho 1 |

> A aprovação dos modelos costuma levar de alguns minutos a algumas horas.
> Se quiser nomes diferentes para os modelos, defina `WHATSAPP_TEMPLATE_FOLLOWUP`
> e `WHATSAPP_TEMPLATE_REPORT` (veja abaixo) — mas mantenha a **mesma ordem de
> variáveis**, senão o texto sai trocado.

---

## Passo 3 — Chave do Supabase (leitura server-side)

Os crons leem a tabela `leads` no servidor usando a **Service Role key** (que ignora o
RLS). Pegue em *Supabase → Project Settings → API → `service_role` secret*.

→ variável `SUPABASE_SERVICE_ROLE_KEY` (e confirme que `SUPABASE_URL` também está setado).

⚠️ **Nunca** use essa chave no frontend nem a publique em lugar nenhum — ela dá acesso
total ao banco. Aqui ela só vive nas variáveis de ambiente da Vercel.

---

## Passo 4 — Telefones da equipe

Defina o mapa **SDR → telefone** (com DDI `55`, só números). As chaves precisam ser
**idênticas** ao campo `owner` dos leads (ex.: `Gabriel`, `Dacunha`):

```
SDR_PHONES={"Gabriel":"5531999999999","Dacunha":"5531888888888"}
```

Opcional — um ou mais números que recebem o **resumo geral** (todos os SDRs juntos),
separados por vírgula:

```
ADMIN_PHONES=5531999999999
```

---

## Passo 5 — Variáveis na Vercel

Em *Vercel → seu projeto → Settings → Environment Variables*, adicione:

| Variável | Obrigatória? | O que é |
|----------|--------------|---------|
| `SUPABASE_URL` | sim | URL do projeto Supabase (já deve existir) |
| `SUPABASE_SERVICE_ROLE_KEY` | sim | Chave service_role do Supabase |
| `WHATSAPP_TOKEN` | sim | Token (de preferência permanente) da Cloud API |
| `WHATSAPP_PHONE_NUMBER_ID` | sim | Phone number ID do WhatsApp |
| `SDR_PHONES` | sim | Mapa JSON SDR → telefone |
| `CRON_SECRET` | recomendado | Segredo que protege os endpoints de cron |
| `ADMIN_PHONES` | não | Resumo geral para gestão |
| `WHATSAPP_TEMPLATE_LANG` | não | Idioma dos modelos (padrão `pt_BR`) |
| `WHATSAPP_TEMPLATE_FOLLOWUP` | não | Nome do modelo da manhã (padrão `followup_alerta`) |
| `WHATSAPP_TEMPLATE_REPORT` | não | Nome do modelo do fim do dia (padrão `relatorio_diario`) |
| `WHATSAPP_API_VERSION` | não | Versão da Graph API (padrão `v21.0`) |

Depois de salvar, faça um **redeploy** para as variáveis valerem.

---

## Passo 6 — Testar sem disparar mensagem (dry run)

Os endpoints aceitam `?dry=1`: eles **calculam tudo e devolvem em JSON**, mas **não
enviam** nada. Ótimo para conferir antes de soltar pra equipe.

```
https://SEU-DOMINIO/api/cron/followup-alerts?dry=1&secret=SEU_CRON_SECRET
https://SEU-DOMINIO/api/cron/daily-report?dry=1&secret=SEU_CRON_SECRET
```

A resposta mostra, por SDR, quantos vencidos/hoje, os parâmetros que iriam para o
modelo e se há telefone cadastrado. O campo `configured` indica se Supabase e WhatsApp
estão prontos.

Para um **envio real de teste**, é só tirar o `?dry=1` (mantendo o `secret`). Comece com
um número seu em `SDR_PHONES`.

---

## Horários

Definidos em `vercel.json` (em **UTC** — Brasília é UTC−3):

| Job | Cron (UTC) | Horário de Brasília |
|-----|------------|---------------------|
| `followup-alerts` | `0 11 * * *` | 08:00 |
| `daily-report` | `0 21 * * *` | 18:00 |

Para mudar o horário, ajuste o campo `schedule`. Ex.: relatório às 19h → `0 22 * * *`.

> No plano **Hobby** da Vercel os crons rodam **1x por dia** e podem atrasar até ~1h;
> são permitidos **2 crons** (é exatamente o que usamos). Em planos pagos dá pra ser
> mais preciso e frequente.

---

## Como os números do relatório são calculados

- **Movimentados hoje:** leads cujo `updated_at` caiu no dia de hoje (fuso de Brasília).
- **Analisados / Conectados hoje:** leads movimentados hoje que estão no status
  `ANALISADO` / `CONECTADO`.
- **Follow-ups em aberto:** leads ativos (fora de Ganho/Perdido) com `proximoFollowup`
  até hoje (vencidos + de hoje).
- **Pipeline:** contagem por status, só os que têm leads.

---

## Resolução de problemas

- **`configured.whatsapp = false`** → falta `WHATSAPP_TOKEN` ou `WHATSAPP_PHONE_NUMBER_ID`.
- **`configured.supabase = false`** → falta `SUPABASE_URL` ou `SUPABASE_SERVICE_ROLE_KEY`.
- **`error` com `131026` / `template ... does not exist`** → o modelo não foi aprovado
  ainda, o nome não bate, ou o idioma é diferente de `WHATSAPP_TEMPLATE_LANG`.
- **`error` com `re-engagement`/`24h`** → você tentou mandar texto livre fora da janela;
  este recurso usa só modelos aprovados, então confirme que os modelos existem.
- **SDR não recebeu** → o nome em `SDR_PHONES` precisa ser idêntico ao `owner` do lead
  (maiúsculas/acentos contam). Veja `skipped: "sem telefone em SDR_PHONES"` no dry run.
- **Mensagem só sai depois que o SDR responde** → no modo de teste da Meta, só os 5
  números cadastrados recebem. Registre um número oficial para liberar geral.
