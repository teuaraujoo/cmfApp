## Usuarios e Acesso

- todo usuario deve ter email unico
- todo usuario deve ter um role valido
- autenticacao e feita no Supabase Auth
- perfil de negocio precisa existir em `public.users`
- usuario inativo nao pode acessar rotas protegidas
- usuario com `must_change_password = true` nao pode acessar funcionalidades protegidas antes de trocar a senha
- apenas admin pode criar e gerenciar usuarios

## Alunos

- todo aluno deve estar vinculado a `public.users`
- aluno deve possuir modalidade
- aluno deve possuir responsavel e telefone quando exigido pelo fluxo de negocio
- aluno nao pode ser vinculado a turma em horario que conflite com outra turma ja existente
- aluno participa de turmas via `turma_alunos`
- aluno pode participar de aulas individuais via `aulas_individuais`

## Professores

- todo professor deve estar vinculado a `public.users`
- professor deve possuir materia
- professor deve possuir modalidade
- professor nao pode ser vinculado a turma em horario que conflite com outra turma ja existente
- professor participa de turmas via `turma_professores`
- professor pode participar de aulas individuais via `aulas_individuais`

## Modalidades

- modalidade deve existir antes de ser vinculada a aluno, professor, turma ou aula individual
- tipo de modalidade deve ser unico

## Turmas

- turma deve possuir nome unico
- turma deve possuir carga horaria semanal
- turma deve possuir vigencia
- vigencia inicial nao pode ser maior que a vigencia final
- turma deve possuir modalidade valida
- turma pode ter varios alunos
- turma pode ter varios professores
- agenda da turma e recorrente por dia da semana

## Agenda da Turma

- cada item deve ter `dia_semana`, `horario_inicio` e `horario_fim`
- horario de inicio deve ser menor que horario de fim
- a propria agenda da turma nao pode ter conflitos internos
- uma turma nao pode conflitar com outra turma no mesmo dia e horario, dentro da vigencia relevante
- no update da turma, a validacao deve ignorar a propria turma nas comparacoes

## Regras de Conflito de Agenda

### Conflito entre itens de agenda

Existe conflito quando:

- `dia_semana` e o mesmo
- `inicio < fimExistente`
- `inicioExistente < fimNovo`

### Conflito com professor

- professor nao pode ficar em duas turmas com horario sobreposto
- a validacao considera:
  - professor informado no payload
  - agenda da nova turma
  - vigencia da turma
  - turmas ja vinculadas ao professor

### Conflito com aluno

- aluno nao pode ficar em duas turmas com horario sobreposto
- a validacao considera:
  - aluno informado no payload
  - agenda da nova turma
  - vigencia da turma
  - turmas ja vinculadas ao aluno

## Aulas Individuais

- aula individual deve ter `aluno_id`, `professor_id`, `modalidade_id`, `started_at` e `ended_at`
- `started_at` deve ser menor que `ended_at`
- professor nao pode ter conflito entre aula individual e outra ocupacao existente
- aluno tambem pode ser validado contra conflito, conforme regra de negocio

## Atualizacao de Turma

- update da entidade principal usa `update`
- update de agenda, alunos e professores usa substituicao do conjunto
- o padrao atual e:
  - `deleteMany`
  - `createMany`
- como essa operacao ocorre em transacao, qualquer falha faz rollback de tudo

## Presenca e Execucao de Aula

### Frequencia do aluno

- frequencia do aluno e vinculada a `turma_agenda`
- aluno so pode registrar presenca se fizer parte da turma

### Frequencia do professor

- professor so pode iniciar/finalizar aula se estiver vinculado a turma
- `started_at` e `ended_at` representam a execucao da aula

## Seguranca e Integridade

- rotas mutaveis validam origem em producao
- login sofre rate limit por email e IP
- mutacoes autenticadas sofrem rate limit por id do usuario ou admin
- criacao de usuario usa compensacao entre Supabase Auth e banco 
- criacao e update de turma dependem de transacao unica no banco
