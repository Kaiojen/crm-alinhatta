# Guia de Importação CSV — CRM Alinhatta
**Versão 3.0** | Atualizado com pipeline de 10 etapas, prioridade URGENTE e tags de classificação

---

## Regras Gerais

| Regra | Detalhe |
|---|---|
| **Codificação** | UTF-8 (salvar como UTF-8 no Excel: Arquivo → Salvar Como → CSV UTF-8) |
| **Separador** | Vírgula `,` (padrão CSV) |
| **Primeira linha** | Cabeçalho obrigatório com os nomes das colunas |
| **Linhas vazias** | São ignoradas automaticamente |
| **Campos com vírgula** | Envolver em aspas duplas: `"Empresa, Ltda"` |
| **Obrigatórios** | `CNPJ` e `Empresa` — linhas sem esses campos são descartadas |
| **Case** | O sistema é tolerante a maiúscula/minúscula nos cabeçalhos |

---

## Colunas Aceitas

### Obrigatórias

| Cabeçalho aceito | Campo interno | Obrigatório | Observação |
|---|---|:---:|---|
| `CNPJ` · `Cnpj` · `cnpj` · `CNPJ/CPF` | `cnpj` | **SIM** | Com ou sem pontuação (`00.000.000/0001-00` ou `00000000000100`) |
| `Razão Social` · `Razao Social` · `Empresa` · `Nome Fantasia` · `RazaoSocial` | `empresa` | **SIM** | Nome da empresa |

> Linhas sem CNPJ **ou** sem Empresa são automaticamente ignoradas na importação.

---

### Opcionais — Dados Cadastrais

| Cabeçalho aceito | Campo interno | Padrão | Observação |
|---|---|---|---|
| `Segmento` · `Setor` · `Área` · `Area` | `segmento` | `Serviços Gerais` | Texto livre |
| `Contato` · `Nome Contato` · `Responsável` · `Responsavel` · `Pessoa de Contato` | `contato` | _(vazio)_ | Nome da pessoa de contato |
| `Cargo` · `Função` · `Funcao` | `cargo` | _(vazio)_ | Cargo do contato |
| `Telefone` · `Tel` · `WhatsApp` · `Whatsapp` · `Fone` | `telefone` | _(vazio)_ | Qualquer formato |
| `Email` · `E-mail` · `e-mail` | `email` | _(vazio)_ | Validado pelo sistema |

---

### Opcionais — Classificação e Pipeline

| Cabeçalho aceito | Campo interno | Padrão | Valores aceitos |
|---|---|---|---|
| `Status` · `status` | `status` | `NOVO` | Ver tabela de status abaixo |
| `Prioridade` · `prioridade` | `prioridade` | Auto (via Score/Rank) | `URGENTE` `ALTA` `MEDIA` `BAIXA` |
| `Score` · `Pontuação` · `Pontuacao` | `score` | `0` | Número 0–15 · Define prioridade automática |
| `Rank` · `Ranking` · `Posição` · `Posicao` | _(apenas para cálculo)_ | — | Número inteiro · Fallback se Score = 0 |
| `Tags` · `tags` · `Classificacao` · `Classificação` | `tags` | _(vazio)_ | Ver tabela de tags abaixo |
| `SDR` · `Owner` · `Responsável` · `Responsavel` · `Vendedor` | `owner` | `Não atribuído` | Nome do SDR responsável |
| `Origem` · `Fonte` · `Canal` | `origem` | `Planilha` | Texto livre |

---

### Opcionais — Comercial

| Cabeçalho aceito | Campo interno | Padrão | Observação |
|---|---|---|---|
| `Pacote` · `Plano` · `Produto` · `Interesse` | `pacoteInteresse` | _(vazio)_ | `Starter` `Pro` `Premium` `Avulso` |
| `Valor` · `Valor Potencial` · `ValorPotencial` · `Ticket` | `valorpotencial` | `0` | Número · R$ removido automaticamente · vírgula = decimal |
| `Followup` · `Follow-up` · `Próximo Contato` · `Proximo Contato` · `Data Followup` | `proximoFollowup` | _(vazio)_ | Formato `YYYY-MM-DD` |
| `Data Entrada` · `DataEntrada` · `data_entrada` | `dataentrada` | Data de importação | Formato `YYYY-MM-DD` |
| `Ultima Interacao` · `Última Interação` · `ultima_interacao` | `ultimaInteracao` | _(vazio)_ | Formato `YYYY-MM-DD` |
| `Tentativas` · `tentativas` | `tentativas` | `0` | Número inteiro |
| `Ficha Diagnostica` · `Ficha Diagnóstica` · `ficha_diagnostica` | `ficha_diagnostica` | _(vazio)_ | Texto livre / notas |

---

## Valores de Status (Pipeline)

O campo `Status` no CSV é mapeado para os estágios do pipeline. Se estiver vazio ou inválido, o lead entra como **NOVO**.

| Valor no CSV | Status no CRM | Descrição |
|---|---|---|
| `NOVO` | **Novo** | Lead bruto — entrada padrão |
| `ANALISADO` | **Analisado** | Ficha diagnóstica feita |
| `CONTATO_INICIAL` · `EM_CONTATO` | **Contato Inicial** | Mensagem enviada |
| `CONECTADO` · `RESPONDEU` | **Conectado** | Respondeu ao contato |
| `QUALIFICADO` | **Qualificado** | Confirmou dor + quer conversar |
| `DIAGNOSTICO_AGENDADO` · `REUNIAO_MARCADA` | **Diagnóstico Agendado** | Reunião marcada |
| `PROPOSTA_ENVIADA` | **Proposta Enviada** | Oferta formal enviada |
| `NEGOCIACAO` · `NEGOCIAÇÃO` | **Negociação** | Ajustes/comercial |
| `GANHO` | **Ganho** | Fechado com sucesso |
| `PERDIDO` | **Perdido** | Descartado |

> Qualquer valor não listado acima resulta em status **NOVO**.

---

## Valores de Prioridade

### Hierarquia de prioridade (quem define o valor final):

```
1º CSV traz "Prioridade" explícita  →  usa o valor do CSV  (maior precedência)
2º Score presente (> 0)             →  calcula pela tabela de score
3º Rank presente (> 0)              →  calcula pela tabela de rank
4º Nenhum dos anteriores            →  padrão MEDIA
```

### Tabela de Score (escala 0–15):

| Score | Prioridade atribuída |
|---|---|
| ≥ 14 | **URGENTE** |
| ≥ 10 | **ALTA** |
| ≥ 6  | **MEDIA** |
| < 6  | **BAIXA** |

### Tabela de Rank (posição na lista, menor = melhor):

| Rank | Prioridade atribuída |
|---|---|
| ≤ 5  | **URGENTE** |
| ≤ 10 | **ALTA** |
| ≤ 30 | **MEDIA** |
| > 30 | **BAIXA** |

---

## Tags de Classificação

O campo `Tags` aceita uma ou mais tags separadas por `,` `;` ou `|`.

| Tag | Significado | Exemplo no CSV |
|---|---|---|
| `HVBC` | Alto Volume / Baixa Conversão | `HVBC` |
| `BVMP` | Baixo Volume / Mercado Potente | `BVMP` |
| `DR` | Desclassificação Recorrente | `DR` |
| `INATIVO` | Sem participação | `INATIVO` |

**Múltiplas tags:**
```
Tags
HVBC,DR
BVMP
INATIVO
HVBC,BVMP,DR
```

> Valores inválidos são silenciosamente ignorados. Case insensitive: `hvbc` = `HVBC`.

---

## Exemplo de CSV Completo

```csv
CNPJ,Razão Social,Segmento,Contato,Cargo,Telefone,Email,Score,Rank,Status,Prioridade,Tags,SDR,Origem,Pacote,Valor Potencial,Data Followup,Data Entrada,Tentativas,Ficha Diagnóstica
12.345.678/0001-90,Construtora Alpha Ltda,Construção,João Silva,Diretor,(11) 99999-0001,joao@alpha.com.br,14,1,ANALISADO,,HVBC,Gabriel,LinkedIn,Pro,15000,2026-03-10,2026-02-01,2,"Empresa com dor clara em gestão de fornecedores"
98.765.432/0001-10,TechSolve Sistemas,TI,Maria Oliveira,CEO,(21) 98888-0002,maria@techsolve.com,12,3,QUALIFICADO,,BVMP,Dacunha,Indicação,Premium,28000,2026-03-05,2026-02-10,1,
45.678.901/0001-33,Clínica BemViver,Saúde,Carlos Mendes,Gerente,(31) 97777-0003,carlos@bemviver.com,5,45,CONTATO_INICIAL,,DR,Gabriel,Planilha,Starter,5000,2026-03-15,2026-02-15,4,
11.222.333/0001-44,Distribuidora Norte,Fornecimento,Ana Costa,Sócia,(85) 96666-0004,ana@norte.com,0,0,NOVO,ALTA,INATIVO,Dacunha,WhatsApp,,0,,2026-02-20,0,
```

### O que acontece com cada linha:

| # | Empresa | Prioridade definida por | Resultado |
|---|---|---|---|
| 1 | Construtora Alpha | Score = 14 → **URGENTE** | Tag HVBC, status ANALISADO |
| 2 | TechSolve Sistemas | Score = 12 → **ALTA** | Tag BVMP, status QUALIFICADO |
| 3 | Clínica BemViver | Score = 5 → **BAIXA** | Tag DR, status CONTATO_INICIAL |
| 4 | Distribuidora Norte | CSV explícito → **ALTA** | Tag INATIVO, status NOVO |

---

## Erros Comuns

| Problema | Causa | Solução |
|---|---|---|
| Lead ignorado na importação | CNPJ ou Empresa vazio | Preencher ambos em toda linha |
| Status aparece como "Novo" | Valor do CSV inválido | Usar exatamente os valores da tabela de status |
| Prioridade não calculada | Score = 0 e Rank = 0 | Preencher Score (0–15) ou Rank, ou usar coluna Prioridade |
| Tag não aparece | Valor inválido ou typo | Usar apenas: `HVBC` `BVMP` `DR` `INATIVO` |
| Caractere estranho (Ã, Ç) | Codificação errada | Salvar como **CSV UTF-8** (não "CSV Windows") |
| Vírgula no nome da empresa | Separador conflita | Envolver em aspas: `"Empresa, Ltda"` |
| Data não reconhecida | Formato errado | Usar `YYYY-MM-DD` (ex: `2026-03-15`) |
| Valor monetário zerado | Formato com R$ ou ponto de milhar | `15.000,00` → o sistema remove R$ e converte vírgula decimal |

---

## Template Mínimo (copiar e colar)

```csv
CNPJ,Empresa,Segmento,Contato,Cargo,Telefone,Email,Score,Status,Tags,SDR
00.000.000/0001-00,Nome da Empresa,Construção,Nome Contato,Cargo,(00) 00000-0000,email@empresa.com,10,NOVO,,Gabriel
```

---

*Gerado automaticamente pelo sistema CRM Alinhatta v3.0*
