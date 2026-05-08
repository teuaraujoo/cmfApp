## Visao Geral

O projeto e uma aplicacao web em `Next.js 16` com App Router, organizada em camadas de backend dentro de `src/server/modules`. A aplicacao usa `Prisma` para acesso ao PostgreSQL, `Supabase Auth` para autenticacao e sessao, e `Upstash Redis` para rate limit.

## Arquitetura em Camadas

Fluxo principal do backend:

`route -> mdoules -> services -> mapper -> repository`

Responsabilidades:

- `src/app/api`
  define os endpoints HTTP, trata `Request/Response`, autenticacao da rota e tratamento de erro.
- `src/server/modules/*/*.services.ts`
  orquestra o caso de uso e transacoes do Prisma.
- `src/server/modules/*/*.validation.ts`
  concentram validacoes de negocio e integridade.
- `src/server/modules/*/*.repositories.ts`
  fazem leitura e escrita no banco via Prisma.
- `src/server/modules/*/*.mapper.ts`
  convertem payloads e respostas entre API e banco.
- `src/server/helpers`
  concentram helpers transversais de infraestrutura, como rate limit e validacao de origem.
- `src/server/utils`
  concentram funcoes utilitarias pequenas, como comparacao de horario e formatacao de datas/agenda.

## Organizacao Atual de Pastas

### Frontend e rotas

- `src/app`
  App Router do Next.
- `src/app/api`
  endpoints do backend expostos via route handlers.

### Backend modularizado

- `src/server/modules/auth`
  login, logout e troca de senha.
- `src/server/modules/users`
  usuarios, alunos e professores.
- `src/server/modules/modalidades`
  CRUD de modalidades.
- `src/server/modules/turmas`
  CRUD de turmas, agenda e vinculos.
- `src/server/modules/aulas`
  estrutura inicial para aulas individuais.

### Infraestrutura

- `src/libs/prisma.ts`
  inicializacao do client Prisma.
- `src/libs/supabase/server.ts`
  client SSR/server do Supabase com cookies seguros.
- `src/libs/supabase/client.ts`
  client de browser do Supabase.
- `src/libs/supabase/admin.ts`
  client server-only com `service_role`.
- `src/libs/ratelimit.ts`
  configuracao dos limitadores do Upstash.

### Gerado automaticamente

- `src/generated/prisma`
  client Prisma gerado a partir do schema atual.

## Padroes Atuais do Projeto

### 1. Modulos por dominio

Cada dominio principal possui seus proprios arquivos de:

- schema
- repository
- service
- mapper
- validation/rules

Isso reduz acoplamento entre entidades e deixa os endpoints mais previsiveis.

### 2. Services com transacao quando necessario

Fluxos que alteram varias tabelas usam `prisma.$transaction`, por exemplo:

- criacao de usuario
- criacao de turma
- atualizacao de turma

### 3. Create e update por agregados

Em turmas, os relacionamentos `turma_agenda`, `turma_alunos` e `turma_professores` sao tratados como conjuntos. No update, o padrao atual e:

- atualizar `turmas`
- apagar vinculos/agenda antigos
- recriar o conjunto atual com `createMany`

### 4. Validacao de agenda por regras

Conflitos de agenda sao avaliados nas validacoes do modulo de turmas, usando:

- vigencia da turma
- dia da semana
- horario de inicio e fim
- comparacao com outras turmas de alunos e professores

### 5. DTO de resposta via mapper

Os mappers nao servem apenas para create/update. Eles tambem montam respostas prontas para o frontend, evitando que o cliente tenha que juntar dados de varias rotas.

## Autenticacao e Autorizacao

O projeto separa autenticacao de perfil:

- `auth.users`
  identidade e sessao no Supabase.
- `public.users`
  perfil de negocio da aplicacao.

Relacao principal:

- `public.users.auth_user_id -> auth.users.id`

Autorizacao atual:

- sessao validada via Supabase SSR
- role validada no backend
- usuarios com `must_change_password = true` ficam bloqueados nas rotas protegidas

## Seguranca Ja Implementada

- headers de seguranca em `next.config.ts`
- CSP em `Content-Security-Policy-Report-Only`
- validacao de `Origin` em rotas mutaveis
- cookies SSR com `httpOnly`, `secure` por ambiente e `sameSite: 'lax'`
- rate limit com Upstash Redis
- criacao administrativa de usuarios via `service_role`

## Ambiente de Desenvolvimento

O projeto passou a ter configuracao Docker apenas para desenvolvimento:

- `Dockerfile.dev`
- `docker-compose.yml`

Uso atual:

- sobe a app Next em container
- Supabase continua na nuvem
- Upstash continua externo
- banco PostgreSQL nao e executado localmente via Docker