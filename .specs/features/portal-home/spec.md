# Portal Home Specification

## Problem Statement

Alunos e professores precisam de uma area propria para consultar informacoes do curso sem usar o dashboard administrativo. A experiencia principal deve ser mobile-first, com navegacao simples, toque confortavel e visual consistente com o sistema atual.

## Goals

- [ ] Criar a Home inicial do portal em `/portal/home`.
- [ ] Criar uma experiencia mobile-first que tambem funcione bem em tablet e desktop.
- [ ] Exibir informacoes mockadas do usuario, atalhos rapidos e resumo operacional.
- [ ] Criar navegabilidade inicial para paginas placeholder do portal.
- [ ] Manter a implementacao sem queries reais nesta fase.

## Out of Scope

| Feature | Reason |
| --- | --- |
| Dados reais do banco | Esta fase deve usar apenas dados mockados. |
| Regras reais por role | A decisao por role sera aplicada futuramente. |
| Fluxos reais de aulas/turmas/pendencias | As paginas secundarias serao placeholders. |
| Login especifico do portal | O documento cobre apenas a Home e navegacao inicial. |
| Nova biblioteca de UI | Usar componentes existentes, shadcn/ui e Lucide Icons. |

---

## User Stories

### P1: Acessar a Home do portal

**User Story**: Como aluno ou professor, quero acessar uma Home simples no portal para ter uma entrada clara para minhas informacoes principais.

**Why P1**: E o ponto inicial do portal e a base para as demais telas.

**Acceptance Criteria**:

1. WHEN o usuario acessa `/portal/home` THEN o sistema SHALL renderizar a Home do portal sem erro.
2. WHEN a Home renderiza THEN o sistema SHALL usar apenas dados mockados.
3. WHEN a Home renderiza THEN o sistema SHALL nao chamar queries, services ou APIs reais da aplicacao.

**Independent Test**: Acessar `/portal/home` e verificar que a tela aparece com dados mockados.

---

### P1: Exibir cabecalho e card do usuario

**User Story**: Como aluno ou professor, quero ver uma saudacao e meus dados principais para reconhecer rapidamente que estou no meu portal.

**Why P1**: A tela precisa dar contexto imediato ao usuario.

**Acceptance Criteria**:

1. WHEN a Home renderiza THEN o sistema SHALL exibir uma saudacao personalizada como `Bom dia, {nome usuario}` ou `Bem-vindo de volta`.
2. WHEN a Home renderiza THEN o sistema SHALL exibir um card retangular de usuario ocupando a largura disponivel com margens laterais.
3. WHEN o card do usuario renderiza THEN o sistema SHALL exibir nome, telefone, email e icone de usuario.
4. WHEN a tela estiver em mobile THEN o card SHALL manter area de toque e espacamento confortaveis.

**Independent Test**: Abrir a Home em viewport mobile e validar visualmente saudacao e card do usuario.

---

### P1: Exibir acesso rapido

**User Story**: Como aluno ou professor, quero acessar rapidamente as principais areas do portal para navegar com poucos toques.

**Why P1**: Acesso rapido e o principal mecanismo de navegacao da Home.

**Acceptance Criteria**:

1. WHEN a Home renderiza THEN o sistema SHALL exibir a secao `Acesso rapido`.
2. WHEN a secao renderiza THEN o sistema SHALL exibir cards para Aulas, Turmas, Calendario, Historico e Pendencias.
3. WHEN a tela estiver em mobile THEN os cards SHALL aparecer em grade de 2 colunas.
4. WHEN o usuario interage com um card THEN o card SHALL ter feedback visual de hover/active.
5. WHEN cada card renderiza THEN ele SHALL conter icone Lucide e titulo.

**Independent Test**: Abrir a Home, tocar/clicar nos cards e verificar feedback visual e navegabilidade.

---

### P1: Exibir resumo operacional

**User Story**: Como aluno ou professor, quero visualizar indicadores resumidos para entender rapidamente minha situacao no curso.

**Why P1**: O resumo transforma a Home em uma tela util, nao apenas uma lista de links.

**Acceptance Criteria**:

1. WHEN a Home renderiza THEN o sistema SHALL exibir cards para Aulas hoje, Proximas aulas, Pendencias e Turmas ativas.
2. WHEN os cards renderizam THEN eles SHALL ser compactos e responsivos.
3. WHEN a tela muda entre mobile, tablet e desktop THEN os cards SHALL manter boa leitura e espacamento.

**Independent Test**: Validar os quatro cards em viewports mobile, tablet e desktop.

---

### P1: Exibir bottom navigation

**User Story**: Como aluno ou professor em smartphone, quero uma navegacao inferior fixa para alternar entre as principais paginas do portal.

**Why P1**: Bottom navigation e o padrao principal da experiencia mobile-first.

**Acceptance Criteria**:

1. WHEN a Home renderiza THEN o sistema SHALL exibir bottom navigation fixa.
2. WHEN a bottom navigation renderiza THEN ela SHALL conter Home, Turmas e Aulas.
3. WHEN uma rota esta ativa THEN o item correspondente SHALL ficar visualmente destacado.
4. WHEN a tela for mobile THEN a barra SHALL respeitar safe area.
5. WHEN o item Home renderiza THEN ele SHALL ficar centralizado e com icone um pouco maior que os outros itens.

**Independent Test**: Navegar entre Home, Turmas e Aulas usando a bottom navigation.

---

### P1: Criar paginas placeholder

**User Story**: Como usuario, quero conseguir navegar para paginas basicas do portal para validar a estrutura inicial.

**Why P1**: A Home depende de links funcionais.

**Acceptance Criteria**:

1. WHEN o usuario acessa `/portal/aulas` THEN o sistema SHALL exibir uma pagina placeholder com `Ola mundo`.
2. WHEN o usuario acessa `/portal/turmas` THEN o sistema SHALL exibir uma pagina placeholder com `Ola mundo`.
3. WHEN o usuario acessa `/portal/pendencias` THEN o sistema SHALL exibir uma pagina placeholder com `Ola mundo`.
4. WHEN o usuario usa os links da Home THEN as rotas SHALL navegar sem 404.

**Independent Test**: Acessar manualmente cada rota e confirmar o placeholder.

---

### P2: Adaptar para tablet e desktop

**User Story**: Como usuario em tablet ou desktop, quero usar a mesma interface mobile-first sem que a tela pareca quebrada ou esticada.

**Why P2**: O foco e mobile, mas a aplicacao e web e precisa continuar utilizavel em telas maiores.

**Acceptance Criteria**:

1. WHEN a tela for tablet vertical ou horizontal THEN a UI SHALL manter o padrao de app com espacamento maior.
2. WHEN a tela for desktop THEN o conteudo SHALL ficar centralizado e com largura maxima adequada.
3. WHEN a tela for horizontal THEN a UI SHALL adaptar espacamentos e grids sem perder o conceito mobile-first.

**Independent Test**: Testar responsividade em mobile, tablet horizontal e desktop.

---

## Edge Cases

- WHEN a viewport for muito estreita THEN o sistema SHALL evitar overflow horizontal.
- WHEN o usuario toca em itens pequenos THEN os elementos SHALL manter tamanho minimo adequado para toque.
- WHEN a pagina tiver conteudo atras da bottom navigation THEN o sistema SHALL aplicar padding inferior suficiente.
- WHEN uma pagina placeholder abrir THEN a bottom navigation SHALL continuar disponivel se estiver no layout do portal.

---

## Requirement Traceability

| Requirement ID | Story | Phase | Status |
| --- | --- | --- | --- |
| PORTAL-HOME-01 | P1: Acessar a Home do portal | Execute | Verified |
| PORTAL-HOME-02 | P1: Exibir cabecalho e card do usuario | Execute | Verified |
| PORTAL-HOME-03 | P1: Exibir acesso rapido | Execute | Verified |
| PORTAL-HOME-04 | P1: Exibir resumo operacional | Execute | Verified |
| PORTAL-HOME-05 | P1: Exibir bottom navigation | Execute | Verified |
| PORTAL-HOME-06 | P1: Criar paginas placeholder | Execute | Verified |
| PORTAL-HOME-07 | P2: Adaptar para tablet e desktop | Execute | Verified |

**Coverage**: 7 total, 7 mapped to tasks, 0 unmapped.

---

## Success Criteria

- [ ] Usuario consegue acessar `/portal/home` em mobile sem layout quebrado.
- [ ] Usuario consegue navegar para Aulas, Turmas e Pendencias sem 404.
- [ ] Home usa apenas dados mockados.
- [ ] Bottom navigation fica fixa, com estado ativo e safe area.
- [ ] TypeScript e lint focado passam nos arquivos criados.
