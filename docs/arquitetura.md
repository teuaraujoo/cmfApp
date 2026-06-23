## Visao Geral

O projeto e uma aplicacao Next.js 16 com App Router. Ele funciona como um sistema full-stack: o frontend fica em `src/app` e `src/components`, enquanto o backend fica em `src/app/api` e `src/server/modules`.

A aplicacao usa Supabase Auth para identidade, PostgreSQL/Supabase Database como banco principal, Prisma para acesso ao banco e Upstash Redis para rate limit.

## Fluxo Geral

Existem dois caminhos principais de dados.

### 1. Requisicoes HTTP pelo client

Usado por formularios, acoes de criacao, edicao, exclusao, inicio/finalizacao de aula e outros fluxos client-side.

Fluxo:

`Client Component -> service client -> apiFetch -> route handler -> service -> validation/mapper -> repository -> Prisma`

Exemplos:

- criar usuario
- editar professor
- criar turma
- criar aula
- finalizar aula
- deletar modalidade

### 2. Queries server-side em paginas do App Router

Usado quando a pagina carrega dados diretamente no servidor.

Fluxo:

`Server Page -> query server-side -> requireAdminUser -> service -> repository -> mapper -> component`

Exemplos:

- listagem de alunos
- listagem de professores
- listagem de turmas
- detalhes de turma
- aulas da semana
- historico de aulas paginado
- perfil do usuario autenticado

## Camadas do Backend

### `src/app/api`

Route handlers HTTP do Next.js.

Responsabilidades:

- ler request
- validar CSRF quando necessario
- chamar guard de autenticacao/autorizacao
- aplicar tratamento central de erro
- devolver `Response.json`

### `src/server/modules/*/*.queries.ts`

Funcoes server-side usadas diretamente por paginas e componentes server.

Responsabilidades:

- chamar `requireAdminUser`
- aplicar rate limit de leitura
- chamar services do dominio

Essas funcoes evitam que paginas server-side chamem services sem autorizacao.

### `src/server/modules/*/*.services.ts`

Casos de uso da aplicacao.

Responsabilidades:

- validar payload com Zod
- executar regras de negocio
- orquestrar transacoes Prisma
- coordenar Supabase Auth quando necessario
- chamar repositories

### `src/server/modules/*/*.repositories.ts`

Acesso direto ao banco via Prisma.

Responsabilidades:

- `findMany`
- `findUnique`
- `create`
- `update`
- `updateMany`
- `delete`
- `groupBy`
- queries com `include`/`select`

### `src/server/modules/*/*.mapper.ts`

Conversao entre formato de API/frontend e formato do banco.

Responsabilidades:

- formatar respostas
- converter datas
- normalizar relacionamentos
- montar payloads Prisma
- remover detalhes desnecessarios antes de retornar ao frontend

### `src/server/modules/*/*.validation.ts`

Regras de negocio e integridade.

Responsabilidades:

- validar conflitos de agenda
- validar existencia de entidades
- validar horarios
- validar regras especificas de turmas e aulas

## Organizacao Atual de Pastas

### Frontend

- `src/app/(modules)/(auth)`
  telas de login, escolha de login e troca de senha.
- `src/app/(modules)/dashboard`
  area administrativa protegida.
- `src/app/(modules)/legal`
  paginas publicas de termos e privacidade.
- `src/app/(modules)/portal`
  base inicial do portal para alunos/professores.
- `src/components/dashboard`
  componentes das paginas administrativas.
- `src/components/auth`
  formularios de autenticacao.
- `src/components/ui`
  componentes reutilizaveis de interface.
- `src/layout`
  sidebar, header e layout principal do dashboard.

### Backend

- `src/server/modules/auth`
- `src/server/modules/users`
- `src/server/modules/modalidades`
- `src/server/modules/turmas`
- `src/server/modules/aulas`
- `src/server/modules/calendar`
- `src/server/modules/form-options`
- `src/server/modules/health`

### Infraestrutura

- `src/server/libs/prisma.ts`
  Prisma Client.
- `src/server/libs/supabase/server.ts`
  Supabase server/SSR com cookies.
- `src/server/libs/supabase/client.ts`
  Supabase browser client.
- `src/server/libs/supabase/admin.ts`
  Supabase service role para criacao administrativa.
- `src/server/libs/ratelimit.ts`
  limitadores Upstash.
- `src/server/security`
  CSRF, origin e rate limit helpers.
- `src/server/error`
  `AppError` e `handleApiError`.

## Autenticacao e Autorizacao

O projeto separa identidade de perfil de negocio:

- `auth.users`
  usuario do Supabase Auth.
- `public.users`
  usuario da aplicacao.

Ligacao:

- `public.users.auth_user_id -> auth.users.id`

Funcoes principais:

- `loginUser`
- `logoutUser`
- `changePassword`
- `getCurrentAppUser`
- `requireAdminUser`
- `requireAdminOrProfessor`

`getCurrentAppUser`, `requireAdminUser` e `requireAdminOrProfessor` usam `cache` do React para reduzir chamadas repetidas dentro da mesma renderizacao/request.

## Proxy de Rotas

Arquivo:

- `src/proxy.ts`

Responsabilidades:

- liberar rotas publicas
- liberar assets e `/api`
- redirecionar usuario sem token para `/`
- redirecionar usuario com senha provisoria para `/change-password`
- impedir usuario nao-admin de acessar `/dashboard`
- redirecionar usuarios nao-admin autenticados para `/portal`
- redirecionar admin autenticado para `/dashboard/home` quando entrar no login administrativo

## Seguranca

Implementacoes atuais:

- headers globais em `next.config.ts`
- CSP ativa via `Content-Security-Policy`
- HSTS em producao
- `Cache-Control: no-store` para `/api`
- validacao de `Origin` em rotas mutaveis
- CSRF assinado por HMAC em mutacoes sensiveis
- rate limit com Upstash Redis
- cookies SSR do Supabase
- `server-only` em arquivos server-side
- tratamento central de erro com `handleApiError`

## Calendario

O calendario administrativo usa FullCalendar no frontend.

Backend:

- `GET /api/calendario?start=ISO&end=ISO`
- `src/server/modules/calendar`

O service busca:

- aulas individuais no periodo
- turmas recorrentes com vigencia no periodo

Depois os mappers convertem esses dados para eventos do calendario.

## Cron

Arquivo:

- `src/app/api/cron/aulas/status/route.ts`

Responsabilidade:

- verificar aulas vencidas
- alterar status de aulas `AGENDADA` ou `EM_ANDAMENTO` para `PENDENTE_FINALIZACAO` quando o horario final ja passou

Protecao:

- header `Authorization: Bearer ${CRON_SECRET}`

Configuracao:

- `vercel.json`

## Padroes Importantes

- services e repositories devem permanecer server-side
- paginas server-side devem usar `*.queries.ts` quando precisarem de dados protegidos
- mutacoes devem validar CSRF e permissao
- responses devem passar por mapper quando forem consumidas pelo frontend
- transacoes Prisma devem ser usadas em fluxos multi-tabela
- updates de agregados de turma usam substituicao do conjunto relacionado
