## Visao Geral

Sistema de gerenciamento do Curso Matematica Facil, com foco em:

- autenticacao e controle de acesso
- cadastro de usuarios, alunos e professores
- modalidades
- turmas recorrentes com agenda semanal
- aulas individuais com data real
- presenca e execucao de aulas

## Stack Atual

- Next.js
- React
- TypeScript
- PostgreSQL
- Prisma
- Supabase Auth
- Upstash Redis
- Zod
- Tailwind CSS
- Docker apenas para ambiente de desenvolvimento

## Estado Atual do Projeto

### Backend implementado em maior profundidade

- autenticacao
- usuarios, alunos e professores
- modalidades
- turmas
- validacoes de agenda e conflito
- seguranca de rotas e sessao

### Backend em fase inicial

- `aulas_individuais`
- frequencia
- fluxos completos de execucao de aula

### Frontend

Ainda esta muito inicial. O App Router existe, mas o foco atual do projeto esta na consolidacao do backend e da modelagem de negocio.

## Organizacao Atual

### Pastas principais

- `src/app`
  frontend e route handlers do App Router
- `src/server/modules`
  backend organizado por dominio
- `src/libs`
  clients e integracoes de infraestrutura
- `src/generated/prisma`
  Prisma Client gerado
- `prisma`
  schema Prisma
- `docs`
  documentacao funcional e tecnica

### Modulos do backend

- `auth`
  login, logout e troca de senha
- `users`
  usuarios, alunos e professores
- `modalidades`
  CRUD de modalidades
- `turmas`
  turmas, agenda e relacionamentos
- `aulas`
  estrutura inicial das aulas individuais

## Autenticacao

O sistema usa Supabase Auth, mas mantem os perfis em `public.users`.

### Estrategia atual

- autenticacao no `auth.users`
- perfil da aplicacao em `public.users`
- ligacao por `auth_user_id`
- controle de primeiro acesso por `must_change_password`

### Rotas implementadas

- `POST /api/auth/login`
- `POST /api/auth/logout`
- `POST /api/auth/change-password`

## Seguranca

Ja existe endurecimento basico no projeto:

- headers HTTP de seguranca
- CSP em `Report-Only`
- cookies SSR do Supabase com `httpOnly`, `secure` e `sameSite: 'lax'`
- validacao de `Origin` nas rotas mutaveis
- rate limit com Upstash por email, id do usuario ou id do admin, conforme o endpoint

## Ambiente

### Variaveis de ambiente principais

- `DATABASE_URL`
- `DIRECT_URL`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `UPSTASH_REDIS_REST_URL`
- `UPSTASH_REDIS_REST_TOKEN`
- `APP_ORIGIN`

### Docker de desenvolvimento

Arquivos presentes:

- `Dockerfile.dev`
- `docker-compose.yml`
- `.dockerignore`

Uso atual:

- sobe apenas a aplicacao
- nao sobe Postgres local
- nao sobe Redis local
- Supabase e Upstash continuam externos

## Rotas atualmente presentes

### Autenticacao

- `POST /api/auth/login`
- `POST /api/auth/logout`
- `POST /api/auth/change-password`

### Users

- `GET /api/users`
- `POST /api/users`
- `GET /api/users/[id]`
- `PUT /api/users/[id]`
- `DELETE /api/users/[id]`
- `PATCH /api/users/[id]`

### Alunos

- `GET /api/alunos`
- `GET /api/alunos/total-alunos`
- `GET /api/alunos/[id]`
- `GET /api/alunos/[id]/turmas`

### Professores

- `GET /api/professores`
- `GET /api/professores/total-professores`
- `GET /api/professores/[id]`
- `GET /api/professores/[id]/turmas`

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
- `DELETE /api/aulas/[id]`

Observacao:

As rotas de `aulas` ja existem, mas o modulo ainda nao foi finalizado.

## Padroes Relevantes

- mappers para request e response
- validacao de negocio separada da service
- repositories encapsulando Prisma
- transacoes do Prisma para operacoes multi-tabela
- `deleteMany + createMany` para atualizar relacoes agregadas de turmas