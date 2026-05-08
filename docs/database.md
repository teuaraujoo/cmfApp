## Visao Geral

O banco principal e PostgreSQL, acessado via Prisma. A autenticacao é separada em dois schemas:

- `auth`
  controlado pelo Supabase Auth.
- `public`
  controlado pela aplicacao.

## Entidades Principais

### `public.users`

Perfil principal do sistema.

Campos importantes:

- `id`
- `nome`
- `email`
- `role`
- `tel`
- `status`
- `auth_user_id`
- `must_change_password`

Observacoes:

- `auth_user_id` referencia `auth.users.id`
- `must_change_password` controla o onboarding de primeiro acesso

### `alunos`

Extensao de `public.users` para perfil de aluno.

Campos importantes:

- `id`
- `user_id`
- `data_nasc`
- `serie`
- `resp_tel`
- `resp_nome`
- `modalidade_id`
- `tempo_aula`
- `horas_semana`
- `tempo_contrato`
- `status`

### `professores`

Extensao de `public.users` para perfil de professor.

Campos importantes:

- `id`
- `user_id`
- `materia`
- `modalidade_id`
- `status`

### `modalidades`

Tabela de dominio para o tipo de modalidade.

Campos:

- `id`
- `tipo`

### `turmas`

Agregado principal de turmas recorrentes.

Campos importantes:

- `id`
- `nome`
- `horas_semana`
- `status`
- `vigencia_inicio`
- `vigencia_fim`
- `modalidade_id`

Observacoes:

- `vigencia_inicio` e `vigencia_fim` sao datas reais de validade da turma
- agenda recorrente nao depende mais apenas de data ficticia

### `turma_agenda`

Representa os horarios recorrentes da turma.

Campos:

- `id`
- `turma_id`
- `dia_semana`
- `horario_inicio`
- `horario_fim`

Observacoes:

- `horario_inicio` e `horario_fim` sao `TIME`
- no backend, a comparacao e feita via conversao controlada para UTC

### `turma_alunos`

Tabela de relacao N:N entre turma e aluno.

Campos:

- `id`
- `turma_id`
- `alunos_id`

### `turma_professores`

Tabela de relacao N:N entre turma e professor.

Campos:

- `id`
- `turma_id`
- `professores_id`

### `aulas_individuais`

Nova entidade adicionada para aulas individuais com data real.

Campos:

- `id`
- `aluno_id`
- `professor_id`
- `modalidade_id`
- `started_at`
- `ended_at`
- `created_at`
- `updated_at`

Observacoes:

- usa `timestamp with time zone`
- serve para agenda real de aulas fora do modelo recorrente de turmas

### `frequencia_aluno`

Presenca do aluno por item de agenda da turma.

Campos:

- `id`
- `turma_agenda_id`
- `aluno_id`
- `status`
- `confirmed_at`

### `frequencia_professor`

Registro de execucao da aula pelo professor.

Campos:

- `id`
- `turma_agenda_id`
- `professor_id`
- `started_at`
- `ended_at`
- `notas`

## Relacionamentos

### 1:1

- `public.users` -> `alunos`
- `public.users` -> `professores`

### 1:N

- `modalidades` -> `alunos`
- `modalidades` -> `professores`
- `modalidades` -> `turmas`
- `modalidades` -> `aulas_individuais`
- `turmas` -> `turma_agenda`
- `turmas` -> `turma_alunos`
- `turmas` -> `turma_professores`
- `turma_agenda` -> `frequencia_aluno`
- `turma_agenda` -> `frequencia_professor`
- `alunos` -> `frequencia_aluno`
- `professores` -> `frequencia_professor`
- `alunos` -> `aulas_individuais`
- `professores` -> `aulas_individuais`

### N:N

- `turmas` <-> `alunos` via `turma_alunos`
- `turmas` <-> `professores` via `turma_professores`

## Regras de Modelagem Relevantes

- `turma_professores` possui unicidade composta por `turma_id + professores_id`
- `turma_agenda` possui unicidade composta por:
  - `turma_id`
  - `dia_semana`
  - `horario_inicio`
  - `horario_fim`
- update de relacoes de turma esta sendo tratado por substituicao do conjunto:
  - `deleteMany`
  - `createMany`

## Observacoes Sobre Tipos de Data

- `vigencia_inicio` e `vigencia_fim` usam `DATE`
- `started_at` e `ended_at` de `aulas_individuais` usam `TIMESTAMPTZ`
- `horario_inicio` e `horario_fim` de `turma_agenda` usam `TIME`
