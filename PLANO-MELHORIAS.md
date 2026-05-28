# Plano de melhorias — CRM Alinhatta

Plano construído a partir do estudo diagnóstico. Arquivo único afetado em todos os itens:
`alinhatta-crm.tsx`. Nenhuma mudança de schema no Supabase.

Ordem sugerida de execução: **P0 → P1 → P2**. Cada item é independente e pode ser
commitado separadamente.

---

## P0 — Correções (bugs)

### 1. Bug de timezone no follow-up (salva 1 dia a menos)

**Sintoma observado:** agendar follow-up para 10/06/2026 grava/exibe 09/06/2026.

**Causa raiz — dois lados do mesmo problema (fuso UTC-3):**

- **Gravação:**
  - `formatDate()` (linha 332): `date.toISOString().split('T')[0]` converte pra UTC.
    Às 21h–23h59 de Brasília, o "dia" UTC já virou, então grava a data de amanhã;
    em outros horários o cálculo de diferença de dias fica deslocado.
  - `quickSnoozeFollowup` (linha 795): `base.toISOString().slice(0, 10)` — mesmo
    problema: depois de `setDate(+7)`, o `toISOString` recua o dia conforme o fuso.
- **Exibição:**
  - `new Date('YYYY-MM-DD').toLocaleDateString('pt-BR')` nas linhas 2052, 2238,
    2298, 2299, 2301 — string sem horário é parseada como **meia-noite UTC**, que em
    Brasília é 21h do dia anterior → mostra 1 dia a menos.

**Correção proposta:**

1. Trocar `formatDate` por versão baseada em data local (sem `toISOString`):
   ```js
   const formatDate = (date = new Date()) => {
     const y = date.getFullYear();
     const m = String(date.getMonth() + 1).padStart(2, '0');
     const d = String(date.getDate()).padStart(2, '0');
     return `${y}-${m}-${d}`;
   };
   ```
2. Em `quickSnoozeFollowup`, substituir `base.toISOString().slice(0, 10)` por
   `formatDate(base)`.
3. Criar um helper único de exibição e usá-lo em todos os pontos de display, em vez de
   `new Date(str)`:
   ```js
   const formatDateBR = (str) => {
     if (!str) return '-';
     // datas YYYY-MM-DD: ancorar em meia-noite local
     const s = String(str).length === 10 ? str + 'T00:00:00' : str;
     return new Date(s).toLocaleDateString('pt-BR');
   };
   ```
   Aplicar nas linhas 2052, 2238, 2298, 2299, 2301 (e onde mais houver
   `new Date(...).toLocaleDateString`).

**Verificação:** agendar follow-up para uma data conhecida em horário noturno
(simular relógio ~22h) e conferir que grava e exibe a MESMA data. Conferir o histórico
("Follow-up adiado para …") batendo com o campo.

---

## P1 — Ganhos rápidos de produtividade (atalhos de contato)

### 2. Atalho de WhatsApp (wa.me)

Reaproveita o campo `telefone` já existente — sem novo campo.

- Helper:
  ```js
  const waLink = (telefone) => {
    const digits = (telefone || '').replace(/\D/g, '');
    if (!digits) return null;
    const full = digits.length <= 11 ? '55' + digits : digits; // assume BR se sem DDI
    return `https://wa.me/${full}`;
  };
  ```
- No card (`LeadCard`, ~linha 2037) e na ficha (`ViewLeadDetails`, ~linha 2294):
  quando houver telefone, transformar o texto/ícone num link que abre o WhatsApp em
  nova aba (`target="_blank" rel="noopener noreferrer"`), com `e.stopPropagation()` no
  card pra não abrir o detalhe.
- Affordance: ícone de WhatsApp ou hover sublinhado, `title="Abrir no WhatsApp"`.

**Verificação:** clicar abre `wa.me/55...` com os dígitos corretos; telefone vazio não
vira link; clique no card não dispara o detalhe.

### 3. Telefone e e-mail clicáveis (tel: / mailto:)

- Telefone → `href="tel:+55..."` (ou só os dígitos).
- E-mail → `href="mailto:..."`.
- Mesmos pontos do item 2 (card linhas 2037/2041; ficha linha 2294 e campo de e-mail).
- `stopPropagation` no card.

**Decisão de UX:** no card, telefone pode priorizar WhatsApp (uso mais comum em SDR) e
deixar `tel:`/`mailto:` na ficha de detalhe, pra não poluir. A definir na implementação.

---

## P2 — Robustez e refinamentos de UX

### 4. Feedback ao salvar (erro + estado "salvando…")

Hoje falhas de save em algumas ações só aparecem via `showNotification` pontual.

- Garantir `try/catch` com `showNotification(..., 'error')` em **todos** os fluxos de
  escrita (edição de lead, avançar status, snooze, marcar perdido).
- Estado `salvando` (boolean) no botão de salvar da edição: desabilitar e trocar label
  pra "Salvando…" enquanto a Promise não resolve, evitando duplo-clique.

**Verificação:** simular erro de rede (offline) e confirmar toast de erro; botão não
permite duplo envio.

### 5. Validação/formato da data de follow-up

- Garantir `min` = hoje no `<input type="date">` do follow-up (impede agendar no
  passado por engano) — sem bloquear edição manual de histórico.
- Validar formato antes de gravar; se inválido, toast e não salva.

**Verificação:** tentar data passada → bloqueado/avisado; data válida → grava.

### 6. Filtro/ordenação "mais frios" + ação reativar

- **Filtro/sort "mais frios":** reaproveitar a lógica de estagnação (`isEstagnado` /
  dias sem interação, ~linha 1984) pra um sort "mais frios primeiro" ou um filtro
  "parados há +N dias".
- **Ação reativar:** item no menu ⋮ (`LeadCardMenu`) que registra interação hoje e/ou
  reabre follow-up, tirando o lead do estado "frio". Reusa o padrão dos handlers
  `quick*` já existentes.

**Verificação:** lead parado há semanas aparece no topo do "mais frios"; reativar
zera o contador de estagnação.

### 7. Consistência de capitalização de segmento

- Já existe `normalizeSegmento` (~linha 1262). Centralizar a normalização para que
  exibição, filtros e dashboard usem a MESMA forma canônica, evitando "Serviços" vs
  "serviços" como segmentos distintos.

**Verificação:** dois leads com segmento em caixas diferentes contam como o mesmo no
dashboard e no filtro.

### 8. Affordance de clique no alerta "Atenção!"

- O bloco "Atenção!" (`PipelineView`, ~linha 1520) lista follow-ups atrasados. Adicionar
  `cursor-pointer`, hover e `role="button"` pra deixar claro que clicar leva à lista
  filtrada (reusa `navigateToPipelineFiltered`).

**Verificação:** hover muda o cursor; clique aplica o filtro de atrasados.

### 9. Teste mobile da ficha/edição

- Validar em ~390px: ficha diagnóstica, observações, edição de campos e o menu ⋮ não
  estouram largura nem quebram layout.

**Verificação:** DevTools responsivo a 390px nas telas de lista, detalhe e edição.

---

## Resumo de prioridade

| # | Item | Prioridade | Risco |
|---|------|-----------|-------|
| 1 | Timezone follow-up | P0 | Baixo (lógica isolada) |
| 2 | Atalho WhatsApp | P1 | Baixo |
| 3 | tel:/mailto: | P1 | Baixo |
| 4 | Feedback ao salvar | P2 | Baixo |
| 5 | Validação de data | P2 | Baixo |
| 6 | "Mais frios" + reativar | P2 | Médio (nova ação) |
| 7 | Capitalização segmento | P2 | Médio (toca filtros/dashboard) |
| 8 | Affordance alerta | P2 | Baixo |
| 9 | Teste mobile | P2 | — (verificação) |
