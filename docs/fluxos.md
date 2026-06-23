## Fluxo de Autenticacao

### Login

1. cliente envia email e senha para `POST /api/auth/login`
2. backend valida o payload com Zod
3. backend chama `supabase.auth.signInWithPassword`
4. backend valida se existe perfil local em `public.users`
5. backend bloqueia usuario inativo
6. backend retorna dados do usuario, role, status e `must_change_password`
7. proxy decide o destino conforme role e estado da senha

Destinos principais:

- admin vai para `/dashboard/home`
- usuario nao-admin vai para `/portal`
- usuario com senha provisoria vai para `/change-password`

### Logout

1. cliente chama `POST /api/auth/logout`
2. backend valida usuario atual
3. backend chama `supabase.auth.signOut`
4. cookies de sessao sao invalidados

### Troca obrigatoria de senha

1. usuario entra com senha provisoria
2. proxy redireciona para `/change-password`
3. cliente chama `POST /api/auth/change-password`
4. backend atualiza senha no Supabase Auth
5. backend marca `public.users.must_change_password = false`
6. sessao e atualizada

## Fluxo de CSRF

1. client chama `GET /api/csrf`
2. backend gera token aleatorio
3. backend assina o token com HMAC usando `CSRF_SECRET`
4. token assinado e salvo em cookie `httpOnly`
5. client envia o mesmo token no header `x-csrf-token`
6. rotas mutaveis com `validateCsrfToken` comparam cookie e header
7. assinatura e validada com `timingSafeEqual`

## Fluxo de Criacao de Usuario

1. admin chama `POST /api/users`
2. rota valida CSRF
3. rota exige `requireAdminUser`
4. payload e validado com Zod
5. service valida email unico e dados obrigatorios por role
6. service cria usuario no Supabase Auth com senha temporaria
7. service abre transacao Prisma
8. cria `public.users`
9. cria `alunos` quando `role = ALUNO`
10. cria `professores` quando `role = PROFESSOR`
11. se a transacao local falhar, o usuario criado no Auth e removido

## Fluxo de Atualizacao de Usuario

1. admin chama `PUT /api/users/[id]`
2. rota valida CSRF
3. rota exige `requireAdminUser`
4. service valida existencia do usuario
5. service impede edicao de usuario inativo
6. service impede conflito de email
7. service impede troca de role nesta rota
8. service atualiza Supabase Auth
9. service atualiza `public.users`
10. service atualiza perfil de aluno ou professor conforme role

## Fluxo de Ativacao/Inativacao de Usuario

1. admin chama `PATCH /api/users/[id]`
2. rota exige `requireAdminUser`
3. service busca usuario
4. service altera status em `public.users`
5. service altera status em `alunos` ou `professores` quando aplicavel

## Fluxo de Modalidades

### Criacao

1. admin chama `POST /api/modalidades`
2. rota valida CSRF
3. rota exige `requireAdminUser`
4. service valida payload
5. repository cria modalidade
6. conflito de nome unico retorna erro de dominio

### Atualizacao

1. admin chama `PUT /api/modalidades/[id]`
2. rota valida CSRF
3. rota exige `requireAdminUser`
4. service valida payload
5. repository atualiza modalidade

### Exclusao

1. admin chama `DELETE /api/modalidades/[id]`
2. rota valida CSRF
3. rota exige `requireAdminUser`
4. service verifica se existe
5. se estiver em uso por turma/aula, banco retorna conflito de chave estrangeira
6. service traduz o conflito para erro de negocio

## Fluxo de Criacao de Turma

1. admin chama `POST /api/turmas`
2. rota valida CSRF
3. rota exige `requireAdminUser`
4. payload e validado por `createTurmaSchema`
5. validacoes verificam:
   - nome
   - vigencia
   - modalidade existente
   - agenda interna
   - conflitos com outras turmas
   - conflitos dos alunos com turmas
   - conflitos dos professores com turmas
   - conflitos dos alunos com aulas individuais
   - conflitos dos professores com aulas individuais
6. service abre transacao Prisma
7. cria `turmas`
8. cria `turma_agenda`
9. cria `turma_alunos`
10. cria `turma_professores`
11. `checkCreateManyCount` valida se os registros esperados foram criados

## Fluxo de Atualizacao de Turma

1. admin chama `PUT /api/turmas/[id]`
2. rota valida CSRF
3. rota exige `requireAdminUser`
4. payload e validado
5. validacoes ignoram a propria turma quando necessario
6. service abre transacao Prisma
7. atualiza dados da turma
8. apaga agenda antiga
9. recria agenda
10. apaga vinculos antigos de alunos
11. recria alunos vinculados
12. apaga vinculos antigos de professores
13. recria professores vinculados

Padrao usado:

- `deleteMany`
- `createMany`

## Fluxo de Criacao de Aula Individual

1. admin chama `POST /api/aulas`
2. rota valida CSRF
3. rota exige `requireAdminUser`
4. payload e validado por `createAulasSchema`
5. service valida:
   - aluno existe
   - professor existe
   - modalidade existe
   - `started_at < ended_at`
   - conflito de horario do professor
   - conflito de horario do aluno
   - conflito com turmas quando aplicavel
6. mapper converte payload para formato Prisma
7. repository cria `aulas_individuais`

## Fluxo de Inicio de Aula

1. admin ou professor chama `PATCH /api/aulas/[id]/inicio`
2. rota valida CSRF
3. rota exige `requireAdminOrProfessor`
4. service busca aula
5. se ator for professor, ele so pode iniciar aula atribuida a ele
6. aula nao pode iniciar antes de `started_at`
7. aula nao pode iniciar depois de `ended_at`
8. aula precisa estar `AGENDADA`
9. repository altera status para `EM_ANDAMENTO`

## Fluxo de Finalizacao de Aula

1. admin ou professor chama `PATCH /api/aulas/[id]/finalizacao`
2. rota valida CSRF
3. rota exige `requireAdminOrProfessor`
4. payload aceita `notas`
5. service busca aula
6. se ator for professor, ele so pode finalizar aula atribuida a ele
7. aula `FINALIZADA` nao pode ser finalizada de novo
8. aula pode ser finalizada durante andamento
9. aula pode ser finalizada apos o horario quando estiver pendente
10. mapper monta `notas`, `finished_at`, `finished_by`, `finished_role`, `status`
11. repository atualiza a aula

## Fluxo de Pendencia de Aula por Cron

1. Vercel Cron chama `GET /api/cron/aulas/status`
2. rota valida `Authorization: Bearer ${CRON_SECRET}`
3. service chama `markOverdueAulasAsPending`
4. repository busca aulas com:
   - `ended_at <= now`
   - status em `AGENDADA` ou `EM_ANDAMENTO`
5. status muda para `PENDENTE_FINALIZACAO`

## Fluxo de Historico de Aulas

1. pagina `/dashboard/aulas/historico` recebe `searchParams`
2. pagina normaliza `page` e `search`
3. chama `getAulasHistoricoPaginatedForAdmin`
4. query exige `requireAdminUser`
5. service chama repository paginado
6. repository aplica:
   - filtro por status finalizado/encerrada
   - busca por id, aluno, serie, professor, materia ou modalidade
   - `skip`
   - `take`
   - `orderBy`
7. service retorna `data` e `pagination`

## Fluxo do Calendario

1. FullCalendar calcula intervalo visivel
2. client chama `GET /api/calendario?start=ISO&end=ISO`
3. rota valida o intervalo com Zod
4. query exige admin e rate limit
5. service busca aulas individuais no periodo
6. service busca turmas recorrentes com vigencia no periodo
7. mappers convertem ambos em eventos
8. eventos sao ordenados por data/hora inicial

## Fluxo de Health Check

1. cliente/monitor chama `GET /api/health`
2. rota executa `getApiHealth`
3. service testa aplicacao e banco
4. banco e validado com `SELECT 1` e timeout de 3 segundos
5. resposta indica `healthy` ou `unhealthy`

## Fluxo de Docker em Desenvolvimento

1. primeira execucao: `docker compose up --build`
2. dia a dia: `docker compose up`
3. codigo local e montado por volume
4. Supabase, banco e Upstash continuam externos ao container
