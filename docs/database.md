## Visao Geral

O banco principal e PostgreSQL, acessado pelo Prisma. O schema Prisma atual inclui os schemas `auth` e `public`.

- `auth`
  controlado pelo Supabase Auth.
- `public`
  controlado pela aplicacao.

O Prisma Client e gerado em:

- `src/generated/prisma`

## Entidades Principais

### `auth.users`

Tabela de identidade do Supabase Auth.

Uso no projeto:

- login
- sessao
- criacao administrativa de usuarios
- atualizacao de senha
- vinculo com `public.users.auth_user_id`

### `public.users`

Perfil principal da aplicacao.

Campos importantes:

- `id`
- `nome`
- `email`
- `role`
- `tel`
- `status`
- `created_at`
- `updated_at`
- `auth_user_id`
- `must_change_password`

Relacionamentos:

- 1:1 com `alunos`
- 1:1 com `professores`
- N:1 com aulas finalizadas via `aulas_individuais.finished_by`

### `alunos`

Extensao de `public.users` para perfil de aluno.

Campos atuais:

- `id`
- `user_id`
- `data_nasc`
- `serie`
- `resp_tel`
- `resp_nome`
- `tempo_aula`
- `horas_mensais`
- `status`
- `created_at`
- `updated_at`
- `escola`

Observacoes:

- `horas_mensais` substitui o antigo conceito de horas semanais do aluno.
- `escola` foi adicionada ao cadastro do aluno.
- o aluno nao possui mais `modalidade_id` no schema atual.

### `professores`

Extensao de `public.users` para perfil de professor.

Campos atuais:

- `id`
- `user_id`
- `materia`
- `status`
- `created_at`
- `updated_at`

Observacoes:

- o professor nao possui mais `modalidade_id` no schema atual.
- a disciplina/materia do professor e usada em exibicoes de aulas.

### `modalidades`

Tabela de dominio para modalidades de atendimento/aula.

Campos:

- `id`
- `tipo`

Relacionamentos:

- 1:N com `turmas`
- 1:N com `aulas_individuais`

### `turmas`

Agregado de turmas recorrentes.

Campos:

- `id`
- `nome`
- `horas_semana`
- `status`
- `created_at`
- `updated_at`
- `vigencia_inicio`
- `vigencia_fim`
- `modalidade_id`

Relacionamentos:

- 1:N com `turma_agenda`
- 1:N com `turma_alunos`
- 1:N com `turma_professores`
- N:1 com `modalidades`

### `turma_agenda`

Agenda recorrente da turma.

Campos:

- `id`
- `turma_id`
- `dia_semana`
- `horario_inicio`
- `horario_fim`
- `created_at`
- `updated_at`

Observacoes:

- `dia_semana` e numerico.
- `horario_inicio` e `horario_fim` usam tipo `TIME`.
- cada turma pode ter mais de um dia/horario.

### `turma_alunos`

Tabela de relacao entre turmas e alunos.

Campos:

- `id`
- `turma_id`
- `alunos_id`
- `created_at`

### `turma_professores`

Tabela de relacao entre turmas e professores.

Campos:

- `id`
- `turma_id`
- `professores_id`
- `created_at`

### `aulas_individuais`

Aulas com data e horario reais.

Campos atuais:

- `id`
- `aluno_id`
- `professor_id`
- `modalidade_id`
- `started_at`
- `ended_at`
- `created_at`
- `updated_at`
- `notas`
- `encerrada`
- `status`
- `finished_at`
- `finished_by`
- `finished_role`

Status usados no fluxo atual:

- `AGENDADA`
- `EM_ANDAMENTO`
- `PENDENTE_FINALIZACAO`
- `FINALIZADA`

Observacoes:

- `started_at` e `ended_at` usam `TIMESTAMPTZ`.
- `finished_at` registra o momento real de finalizacao.
- `finished_by` referencia `public.users.id`.
- `finished_role` guarda o papel de quem finalizou.
- `encerrada` ainda existe no schema por compatibilidade, mas o fluxo novo deve priorizar `status`.

### `frequencia_aluno`

Registro de presenca/relacao do aluno com aula ou turma.

Campos:

- `id`
- `turma_agenda_id`
- `aluno_id`
- `status`
- `confirmed_at`
- `aula_id`
- `turma_id`

### `frequencia_professor`

Registro de execucao do professor em aula ou turma.

Campos:

- `id`
- `turma_agenda_id`
- `professor_id`
- `started_at`
- `ended_at`
- `notas`
- `aula_id`
- `turma_id`

## Relacionamentos

### 1:1

- `public.users -> alunos`
- `public.users -> professores`
- `auth.users -> public.users`

### 1:N

- `modalidades -> turmas`
- `modalidades -> aulas_individuais`
- `turmas -> turma_agenda`
- `turmas -> turma_alunos`
- `turmas -> turma_professores`
- `alunos -> aulas_individuais`
- `professores -> aulas_individuais`
- `public.users -> aulas_individuais` via `finished_by`

### N:N

- `turmas <-> alunos` via `turma_alunos`
- `turmas <-> professores` via `turma_professores`

## Datas e Horarios

- `turmas.vigencia_inicio` e `turmas.vigencia_fim` usam `DATE`.
- `turma_agenda.horario_inicio` e `turma_agenda.horario_fim` usam `TIME`.
- `aulas_individuais.started_at`, `ended_at`, `created_at`, `updated_at` e `finished_at` usam `TIMESTAMPTZ`.
- conversoes de calendario ficam em `src/server/modules/calendar/calendar-date.utils.ts`.

## Seed e Reset

Scripts atuais:

- `yarn db:seed`
- `yarn db:reset`

Arquivos:

- `prisma/seed.ts`
- `prisma/reset.ts`

Uso:

- popular dados base para desenvolvimento/testes
- resetar tabelas da aplicacao quando necessario
