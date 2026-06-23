## Visao Geral

Sistema web do Curso Matematica Facil para gestao administrativa de alunos, professores, modalidades, turmas recorrentes e aulas individuais.

O projeto tambem possui base inicial para um portal de alunos/professores. O dashboard administrativo e a area mais completa da aplicacao; o portal ainda esta em fase inicial no workspace atual.

## Stack Atual

- Next.js 16 com App Router
- React 19
- TypeScript
- Tailwind CSS 4
- Prisma 7
- PostgreSQL/Supabase Database
- Supabase Auth
- Upstash Redis para rate limit
- Zod para validacao de payloads
- FullCalendar para calendario administrativo
- Playwright para testes E2E
- Docker apenas para padronizar ambiente de desenvolvimento

## Areas da Aplicacao

### Publico

- `/`
  home publica/landing.
- `/legal/termos`
  termos de uso.
- `/legal/politica-privacidade`
  politica de privacidade.
- `/choose-login`
  escolha do tipo de login.
- `/login`
  login comum.
- `/dashboard/login`
  login administrativo.
- `/change-password`
  troca obrigatoria de senha no primeiro acesso.

### Dashboard administrativo

Rotas sob `/dashboard` sao protegidas e direcionadas para usuarios `ADMIN`.

Paginas atuais:

- `/dashboard/home`
- `/dashboard/alunos`
- `/dashboard/professores`
- `/dashboard/turmas`
- `/dashboard/turmas/[id]`
- `/dashboard/modalidades`
- `/dashboard/aulas/semana`
- `/dashboard/aulas/pendentes`
- `/dashboard/aulas/historico`
- `/dashboard/calendario`
- `/dashboard/perfil`

### Portal

Rotas sob `/portal` sao a base do futuro portal de alunos/professores.

Estado atual no workspace:

- existe `src/app/(modules)/portal/layout.tsx`
- existe `src/app/(modules)/portal/page.tsx`
- a pagina atual ainda e simples e possui logout
- o proxy redireciona usuarios nao-admin para `/portal`

## Backend Interno

O backend esta dentro do proprio Next.js por route handlers e services server-side.

Pastas principais:

- `src/app/api`
  endpoints HTTP.
- `src/server/modules`
  regras de dominio, services, repositories, mappers e queries server-side.
- `src/server/libs`
  Prisma, Supabase e rate limit.
- `src/server/security`
  helpers de origin, rate limit e CSRF.
- `src/server/error`
  erros padronizados e handler central.

## Modulos Atuais

- `auth`
  login, logout, troca de senha, usuario atual e guards de autorizacao.
- `users`
  usuarios, alunos e professores.
- `modalidades`
  CRUD de modalidades.
- `turmas`
  turmas recorrentes, agenda, alunos e professores vinculados.
- `aulas`
  aulas individuais, semana, historico, pendencias, inicio, finalizacao e cron de status.
- `calendar`
  eventos de aulas individuais e turmas recorrentes para o calendario.
- `form-options`
  opcoes de formularios: alunos ativos, professores ativos e modalidades.
- `health`
  health check da API e banco.

## Rotas de API Atuais

### Auth

- `POST /api/auth/login`
- `POST /api/auth/logout`
- `POST /api/auth/change-password`
- `GET /api/csrf`

### Users, alunos e professores

- `GET /api/users`
- `POST /api/users`
- `GET /api/users/[id]`
- `PUT /api/users/[id]`
- `PATCH /api/users/[id]`
- `DELETE /api/users/[id]`
- `GET /api/alunos`
- `GET /api/alunos/total`
- `GET /api/alunos/[id]`
- `GET /api/alunos/[id]/turmas`
- `GET /api/alunos/[id]/aulas`
- `GET /api/alunos/[id]/aulas/pendentes`
- `GET /api/alunos/[id]/aulas/historico`
- `GET /api/professores`
- `GET /api/professores/total`
- `GET /api/professores/[id]`
- `GET /api/professores/[id]/turmas`
- `GET /api/professores/[id]/aulas`
- `GET /api/professores/[id]/aulas/pendentes`
- `GET /api/professores/[id]/aulas/historico`

### Modalidades

- `GET /api/modalidades`
- `POST /api/modalidades`
- `GET /api/modalidades/[id]`
- `PUT /api/modalidades/[id]`
- `DELETE /api/modalidades/[id]`

### Turmas

- `GET /api/turmas`
- `POST /api/turmas`
- `GET /api/turmas/[id]`
- `PUT /api/turmas/[id]`
- `DELETE /api/turmas/[id]`
- `GET /api/turmas/[id]/alunos`
- `GET /api/turmas/[id]/professores`

### Aulas

- `GET /api/aulas`
- `POST /api/aulas`
- `GET /api/aulas/todas`
- `GET /api/aulas/pendentes`
- `GET /api/aulas/historico?page=1&pageSize=20&search=texto`
- `DELETE /api/aulas/[id]`
- `PATCH /api/aulas/[id]/inicio`
- `PATCH /api/aulas/[id]/finalizacao`

### Calendario, formulario, health e cron

- `GET /api/calendario?start=ISO&end=ISO`
- `GET /api/form-options`
- `GET /api/health`
- `GET /api/cron/aulas/status`

## Seguranca Atual

- proxy de rotas protegidas em `src/proxy.ts`
- dashboard restrito a `ADMIN`
- usuarios nao-admin autenticados sao redirecionados para `/portal`
- usuarios com `must_change_password = true` sao redirecionados para `/change-password`
- `requireAdminUser` para operacoes administrativas
- `requireAdminOrProfessor` para inicio/finalizacao de aula
- `getCurrentAppUser` cacheado por request com `react/cache`
- validacao de `Origin` em rotas mutaveis
- CSRF assinado em mutacoes sensiveis
- rate limit com Upstash por email, IP ou id do usuario
- headers de seguranca e CSP em `next.config.ts`
- `server-only` em services, repositories, queries e helpers server-side relevantes

## Testes e Scripts

Scripts principais:

- `yarn dev`
- `yarn build`
- `yarn lint`
- `yarn test:e2e`
- `yarn test:e2e:ui`
- `yarn db:seed`
- `yarn db:reset`

Testes E2E existentes:

- auth/admin login
- formulario de aluno
- formulario de professor
- formulario de turma
- formulario de aula
- formulario de aula no calendario

## Ambiente de Desenvolvimento

Docker e usado apenas para desenvolvimento.

Arquivos:

- `Dockerfile.dev`
- `docker-compose.yml`
- `.dockerignore`

O container sobe a aplicacao Next.js. Supabase, PostgreSQL e Upstash continuam externos.
