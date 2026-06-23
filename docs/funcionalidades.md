## Autenticacao e Acesso

### Implementado

- login por email e senha
- logout
- troca de senha obrigatoria no primeiro acesso
- bloqueio de usuario inativo
- controle de acesso por role
- dashboard restrito a admin
- redirecionamento de usuarios nao-admin para portal
- rotas publicas para home e documentos legais

### Rotas/telas relacionadas

- `/`
- `/choose-login`
- `/login`
- `/dashboard/login`
- `/change-password`
- `/dashboard/home`
- `/portal`

## Dashboard Administrativo

### Implementado

- layout com sidebar e header
- tema claro/escuro
- dropdown de usuario com dados reais
- pagina home com cards, grafico, aulas recentes, aulas pendentes e alunos recentes
- paginas com loading states em rotas do dashboard
- pagina 404 customizada

## Alunos

### Implementado

- listar alunos
- pesquisar alunos no frontend
- criar aluno
- atualizar aluno
- ativar/inativar usuario
- abrir painel de detalhes
- formulario reorganizado por grupos de dados
- mascara de telefone
- campos atuais de aluno:
  - nome
  - email
  - telefone
  - data de nascimento
  - serie
  - escola
  - responsavel
  - telefone do responsavel
  - tempo de aula
  - horas mensais
  - status

### Backend

- `GET /api/alunos`
- `GET /api/alunos/total`
- `GET /api/alunos/[id]`
- `GET /api/alunos/[id]/turmas`
- `GET /api/alunos/[id]/aulas`
- `GET /api/alunos/[id]/aulas/pendentes`
- `GET /api/alunos/[id]/aulas/historico`

## Professores

### Implementado

- listar professores
- pesquisar/filtrar professores
- criar professor
- atualizar professor
- ativar/inativar usuario
- detalhes do professor
- formulario de professor
- teste E2E do formulario de criacao

### Backend

- `GET /api/professores`
- `GET /api/professores/total`
- `GET /api/professores/[id]`
- `GET /api/professores/[id]/turmas`
- `GET /api/professores/[id]/aulas`
- `GET /api/professores/[id]/aulas/pendentes`
- `GET /api/professores/[id]/aulas/historico`

## Modalidades

### Implementado

- listar modalidades
- criar modalidade
- atualizar modalidade
- deletar modalidade
- dialog de confirmacao de exclusao
- cards de modalidades
- tratamento para modalidade em uso

### Backend

- `GET /api/modalidades`
- `POST /api/modalidades`
- `GET /api/modalidades/[id]`
- `PUT /api/modalidades/[id]`
- `DELETE /api/modalidades/[id]`

## Turmas

### Implementado

- listar turmas
- buscar turma por id
- pagina de detalhes da turma
- criar turma
- atualizar turma
- deletar turma
- selecionar alunos por cards
- selecionar professores por cards
- selecionar modalidade
- agenda com multiplos dias e horarios
- calculo de horas semanais a partir da agenda
- filtros por dias da semana no frontend
- exibicao de alunos, professores, modalidade, vigencia e agenda

### Validacoes

- nome
- vigencia
- modalidade existente
- horarios validos
- conflito interno de agenda
- conflito com outras turmas
- conflito de alunos com turmas
- conflito de professores com turmas
- conflito de alunos com aulas individuais
- conflito de professores com aulas individuais

### Backend

- `GET /api/turmas`
- `POST /api/turmas`
- `GET /api/turmas/[id]`
- `PUT /api/turmas/[id]`
- `DELETE /api/turmas/[id]`
- `GET /api/turmas/[id]/alunos`
- `GET /api/turmas/[id]/professores`

## Aulas Individuais

### Implementado

- pagina de aulas da semana
- pagina de aulas pendentes
- pagina de historico de aulas
- historico paginado
- busca no historico
- criar aula
- deletar aula agendada
- iniciar aula
- finalizar aula
- enviar anotacoes na finalizacao
- exibir detalhes da aula
- status visual da aula
- empty state para listagens sem aulas
- restricao para professor finalizar/iniciar apenas aula atribuida a ele

### Status atuais

- `AGENDADA`
- `EM_ANDAMENTO`
- `PENDENTE_FINALIZACAO`
- `FINALIZADA`

### Backend

- `GET /api/aulas`
- `POST /api/aulas`
- `GET /api/aulas/todas`
- `GET /api/aulas/pendentes`
- `GET /api/aulas/historico`
- `DELETE /api/aulas/[id]`
- `PATCH /api/aulas/[id]/inicio`
- `PATCH /api/aulas/[id]/finalizacao`

## Calendario

### Implementado

- pagina `/dashboard/calendario`
- FullCalendar em portugues
- exibicao de aulas individuais
- exibicao de turmas recorrentes
- cores por tipo/status de evento
- range de datas enviado pela URL da requisicao
- criacao de aula a partir do calendario
- detalhes de aulas/turmas no calendario
- finalizacao de aula pelo calendario
- exclusao de aula pelo calendario quando permitido

### Backend

- `GET /api/calendario?start=ISO&end=ISO`

## Form Options

### Implementado

- endpoint para buscar opcoes de formulario
- alunos ativos
- professores ativos
- modalidades
- usado para adiar carregamento de opcoes pesadas ate abrir formularios/dialogs

### Backend

- `GET /api/form-options`

## Perfil

### Implementado

- pagina `/dashboard/perfil`
- dados reais do usuario autenticado
- edicao de nome/email
- atalhos de navegacao
- logout

## Portal

### Estado atual

- rota `/portal`
- layout com `robots: noindex`
- pagina simples com logout
- proxy ja direciona nao-admin para portal

### Em evolucao

- home mobile-first
- navegacao inferior
- telas de aulas/turmas/pendencias para aluno e professor
- exibicao por role

## Health Check

### Implementado

- `GET /api/health`
- status da aplicacao
- status do banco com `SELECT 1`
- tempo de resposta do banco
- uptime
- ambiente

## Cron

### Implementado

- `GET /api/cron/aulas/status`
- protegido por `CRON_SECRET`
- marca aulas vencidas como `PENDENTE_FINALIZACAO`
- configurado em `vercel.json`

## Seguranca

### Implementado

- headers HTTP de seguranca
- CSP ativa
- HSTS em producao
- cookies SSR do Supabase
- validacao de origem
- CSRF assinado
- rate limit com Upstash
- helpers `requireAdminUser` e `requireAdminOrProfessor`
- `server-only` em camadas server-side
- handler central de erro

## Testes

### Implementado

- Playwright configurado
- teste de login admin
- teste de formulario de aluno
- teste de formulario de professor
- teste de formulario de turma
- teste de formulario de aula
- teste de aula no calendario

## Em Evolucao

- portal de alunos/professores
- consolidacao de frequencia de aluno/professor
- refinamento de selects/includes para reduzir carga de queries
- indices de banco para queries mais usadas
- melhoria continua das validacoes de conflito entre turmas e aulas
