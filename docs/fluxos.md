## Fluxo de Autenticacao

### Login

1. cliente envia email e senha para `POST /api/auth/login`
2. backend usa `supabase.auth.signInWithPassword`
3. backend busca `public.users` pelo `auth_user_id`
4. se o usuario nao existir localmente, a sessao e encerrada
5. se `status != ATIVO`, o acesso e bloqueado
6. a resposta devolve os dados necessarios para o frontend decidir:
   - role
   - status
   - `must_change_password`

### Logout

1. cliente chama `POST /api/auth/logout`
2. backend usa `supabase.auth.signOut`
3. cookies de sessao sao invalidados

### Troca obrigatoria de senha

1. usuario entra com senha provisoria
2. backend retorna `must_change_password = true`
3. frontend deve redirecionar para troca de senha
4. cliente chama `POST /api/auth/change-password`
5. backend atualiza a senha no Supabase Auth
6. backend marca `public.users.must_change_password = false`

## Fluxo de Criacao de Usuario

1. admin autenticado chama `POST /api/users`
2. payload e validado por Zod
3. service valida:
   - email unico
   - dados obrigatorios por role
4. backend cria o usuario no Supabase Auth
5. backend abre transacao no Prisma
6. cria `public.users`
7. se `role = ALUNO`, cria `alunos`
8. se `role = PROFESSOR`, cria `professores`
9. se a parte local falhar, o usuario criado no Auth e removido

## Fluxo de Atualizacao de Usuario

1. admin chama `PUT /api/users/[id]`
2. payload e validado
3. backend verifica:
   - usuario existe
   - email nao conflita com outro usuario
   - role nao esta sendo alterada se o fluxo nao suportar isso
4. backend atualiza o usuario no Supabase Auth
5. backend atualiza `public.users`
6. backend atualiza `alunos` ou `professores` conforme o role

## Fluxo de Ativacao e Inativacao de Usuario

1. admin chama `PATCH /api/users/[id]`
2. backend altera `public.users.status`
3. backend altera o status do perfil relacionado:
   - `alunos`
   - `professores`

## Fluxo de Criacao de Modalidade

1. admin chama `POST /api/modalidades`
2. backend valida o payload
3. repository cria a modalidade

## Fluxo de Criacao de Turma

1. admin chama `POST /api/turmas`
2. payload e validado por `createTurmaSchema`
3. rules validam:
   - nome da turma
   - vigencia
   - modalidade existente
   - conflitos dentro da propria agenda
   - conflitos da agenda com outras turmas
   - conflitos de agenda de alunos
   - conflitos de agenda de professores
4. backend abre transacao
5. cria `turmas`
6. cria `turma_agenda` com `createMany`
7. cria `turma_alunos` com `createMany`
8. cria `turma_professores` com `createMany`
9. se qualquer etapa falhar, a transacao inteira e revertida

## Fluxo de Atualizacao de Turma

1. admin chama `PUT /api/turmas/[id]`
2. payload e validado
3. backend valida as mesmas regras principais do create, ignorando a propria turma nas comparacoes quando necessario
4. backend abre transacao
5. atualiza `turmas`
6. apaga agenda antiga da turma
7. recria `turma_agenda`
8. apaga vinculos antigos de alunos
9. recria `turma_alunos`
10. apaga vinculos antigos de professores
11. recria `turma_professores`

Observacao:

O padrao atual do update de turma e substituir o conjunto relacionado usando:

- `deleteMany`
- `createMany`

## Fluxo de Validacao de Agenda de Turma

### Agenda interna da propria turma

O backend transforma cada item da agenda em uma estrutura de comparacao:

- `dia_semana`
- `inicio`
- `fim`

Depois compara os proprios itens da nova agenda para evitar sobreposicao interna.

### Agenda contra outras turmas

O backend:

1. extrai os `diasSemana` usados na nova agenda
2. busca apenas turmas candidatas por:
   - interseccao de vigencia
   - mesmo `dia_semana`
3. compara os horarios em memoria

### Agenda de alunos e professores

O backend:

1. busca turmas ja vinculadas aos alunos ou professores informados
2. carrega a agenda dessas turmas
3. compara a nova agenda com as agendas existentes

## Fluxo de Listagem de Turmas

O repository ja traz `include` aninhado para:

- `modalidades`
- `turma_agenda`
- `turma_alunos -> alunos -> users`
- `turma_professores -> professores -> users`

Depois o mapper formata a resposta para o frontend, convertendo:

- horarios
- dias da semana
- dados expandidos de aluno/professor

## Fluxo de Aulas Individuais

Estado atual:

- tabela `aulas_individuais` ja existe no schema
- rotas de `aulas` ja existem
- implementacao do modulo ainda esta incompleta

Fluxo esperado:

1. criar aula com `aluno_id`, `professor_id`, `modalidade_id`, `started_at`, `ended_at`
2. validar conflito real de horario do professor
3. persistir a aula individual

## Fluxo do Docker em Desenvolvimento

1. `docker compose up --build` na primeira execucao ou quando mudar Dockerfile/dependencias
2. `docker compose up` no dia a dia
3. codigo e montado por volume local
4. Supabase e Upstash continuam externos ao container
