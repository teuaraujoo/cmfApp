## Autenticacao e Acesso

### Ja implementado

- login por email e senha
- logout
- troca de senha no primeiro acesso
- bloqueio de rotas protegidas para usuarios com `must_change_password = true`
- controle de acesso por role no backend

### Observacoes

- nao existe signup publico
- criacao de usuarios comuns e administrativa

## Usuarios

### Ja implementado

- listar usuarios
- buscar usuario por id
- criar usuario por admin
- atualizar usuario por admin
- ativar usuario
- inativar usuario

### Inclui

- fluxo de ALUNO
- fluxo de PROFESSOR
- fluxo de ADMIN

## Alunos

### Ja implementado

- listar alunos
- buscar aluno por id de usuario
- total de alunos
- listar turmas do aluno

### Retorno enriquecido

Os dados de aluno sao montados com informacoes de:

- `alunos`
- `public.users`
- modalidade relacionada quando aplicavel

## Professores

### Ja implementado

- listar professores
- buscar professor por id de usuario
- total de professores
- listar turmas do professor

### Retorno enriquecido

Os dados de professor sao montados com informacoes de:

- `professores`
- `public.users`
- `modalidades`

## Modalidades

### Ja implementado

- listar modalidades
- buscar modalidade por id
- criar modalidade
- atualizar modalidade
- deletar modalidade

## Turmas

### Ja implementado

- listar turmas
- buscar turma por id
- criar turma
- atualizar turma
- deletar turma
- listar alunos de uma turma
- listar professores de uma turma

### O que a criacao/atualizacao de turma cobre

- nome
- carga horaria semanal
- vigencia
- modalidade
- agenda recorrente
- vinculo com alunos
- vinculo com professores

### Validacoes importantes ja presentes

- modalidade existente
- vigencia inicial menor ou igual a vigencia final
- horarios validos
- conflito dentro da propria agenda
- conflito de agenda com outras turmas
- conflito de agenda de aluno
- conflito de agenda de professor

## Agenda da Turma

### Ja implementado

- criacao junto com a turma
- recriacao no update da turma
- validacao de conflito por dia da semana e faixa de horario

### Formato atual

Cada item de agenda usa:

- `dia_semana`
- `horario_inicio`
- `horario_fim`

## Aulas Individuais

### Estado atual

- entidade `aulas_individuais` presente no banco
- rotas de `aulas` criadas
- modulo ainda nao finalizado

### Esperado

- criar aula com data real
- excluir aula individual
- consultar agenda semanal com turmas e aulas individuais

## Frequencia

### Estrutura no banco ja existe

- `frequencia_aluno`
- `frequencia_professor`

### Estado atual

- modelagem presente
- fluxo completo ainda nao consolidado nos modules do backend

## Seguranca

### Ja implementado

- headers HTTP de seguranca
- CSP em modo `Report-Only`
- cookies SSR endurecidos
- validacao de origem em rotas mutaveis
- rate limit por:
  - email
  - IP
  - id do usuario autenticado
  - id do admin

## Ambiente de Desenvolvimento

### Ja implementado

- `Dockerfile.dev`
- `docker-compose.yml`
- suporte a `.env` dentro do container

### Fora do Docker

- Supabase
- PostgreSQL principal
- Upstash Redis

## Em evolucao

- modulo de aulas
- fluxos de frequencia
- refinamento do update de turmas
- respostas prontas para calendario do frontend
