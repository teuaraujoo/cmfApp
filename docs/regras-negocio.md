## Usuarios e Acesso

- todo usuario deve ter email unico
- todo usuario deve ter role valido
- roles atuais relevantes: `ADMIN`, `ALUNO`, `PROFESSOR`
- autenticacao e feita pelo Supabase Auth
- perfil de negocio precisa existir em `public.users`
- usuario inativo nao pode acessar funcionalidades protegidas
- usuario com `must_change_password = true` deve trocar a senha antes de usar o sistema
- apenas admin pode gerenciar usuarios, alunos, professores, turmas, modalidades e aulas no dashboard
- professor pode iniciar/finalizar aulas atribuidas a ele quando o fluxo permitir
- usuario nao-admin autenticado deve ser direcionado ao portal

## Senha Provisoria

- usuarios criados pelo admin recebem senha temporaria
- usuarios nao-admin devem trocar a senha no primeiro acesso
- admin pode ser criado com `must_change_password = false`
- apos troca de senha, `public.users.must_change_password` deve ser atualizado para `false`
- a sessao precisa ser atualizada apos a troca

## Alunos

- todo aluno deve estar vinculado a `public.users`
- aluno deve ter dados obrigatorios do perfil
- aluno deve possuir serie
- aluno deve possuir escola
- aluno deve possuir data de nascimento
- aluno deve possuir tempo de aula
- aluno deve possuir horas mensais
- horas mensais representa o pacote contratado no mes
- aluno pode ter responsavel e telefone do responsavel
- telefone do aluno e do responsavel deve ter DDD valido quando informado
- aluno participa de turmas via `turma_alunos`
- aluno participa de aulas individuais via `aulas_individuais`
- aluno nao deve ser vinculado a turma em horario que conflite com outra turma ou aula individual ativa

## Professores

- todo professor deve estar vinculado a `public.users`
- professor deve possuir materia
- professor participa de turmas via `turma_professores`
- professor participa de aulas individuais via `aulas_individuais`
- professor nao deve ser vinculado a turma em horario que conflite com outra turma ou aula individual ativa
- professor so pode iniciar/finalizar aulas individuais atribuidas a ele

## Modalidades

- modalidade deve existir antes de ser vinculada a turma ou aula individual
- `tipo` de modalidade deve ser unico
- modalidade em uso nao deve ser deletada

## Turmas

- turma deve possuir nome unico
- turma deve possuir carga horaria semanal
- turma deve possuir vigencia inicial e final
- vigencia inicial nao pode ser maior que vigencia final
- turma deve possuir modalidade valida
- turma pode ter varios alunos
- turma pode ter varios professores
- agenda da turma e recorrente por dia da semana
- update de turma deve ignorar a propria turma nas validacoes de conflito
- update de turma substitui os conjuntos de agenda, alunos e professores em transacao

## Agenda de Turma

- cada item deve ter:
  - `dia_semana`
  - `horario_inicio`
  - `horario_fim`
- horario de inicio deve ser menor que horario de fim
- a propria agenda da turma nao pode ter conflitos internos
- uma turma nao pode conflitar com outra turma no mesmo dia e horario dentro da vigencia relevante
- a agenda de turma tambem deve ser comparada com aulas individuais ativas dos alunos/professores vinculados

## Regras de Conflito de Horario

Existe conflito quando:

- o dia/periodo e relevante para as duas entidades
- `inicioNovo < fimExistente`
- `inicioExistente < fimNovo`

Aplicacoes:

- turma contra turma
- turma contra aulas individuais de alunos
- turma contra aulas individuais de professores
- aula individual contra aulas individuais de aluno
- aula individual contra aulas individuais de professor
- aula individual contra turmas quando aplicavel

## Aulas Individuais

- aula individual deve ter aluno, professor, modalidade, inicio e fim
- `started_at` deve ser menor que `ended_at`
- aula deve respeitar conflitos de horario do aluno
- aula deve respeitar conflitos de horario do professor
- aula deve respeitar conflitos com turmas quando aplicavel
- aula agendada pode ser excluida
- aula iniciada, pendente ou finalizada nao deve ser excluida pelo fluxo comum
- aula finalizada nao pode ser finalizada novamente

## Status de Aulas

Status atuais:

- `AGENDADA`
- `EM_ANDAMENTO`
- `PENDENTE_FINALIZACAO`
- `FINALIZADA`

Regras:

- aula criada inicia como `AGENDADA`
- aula so pode ser iniciada quando o horario inicial chegou
- aula nao pode ser iniciada apos o horario final
- ao iniciar, status vira `EM_ANDAMENTO`
- aula vencida e nao finalizada deve virar `PENDENTE_FINALIZACAO`
- aula pode ser finalizada em andamento
- aula pode ser finalizada quando estiver pendente de finalizacao
- finalizacao deve registrar `finished_at`, `finished_by` e `finished_role`
- anotacoes da aula sao salvas em `notas` durante a finalizacao

## Cron de Aulas

- cron deve ser protegido por `CRON_SECRET`
- cron verifica aulas com `ended_at <= now`
- cron altera aulas `AGENDADA` ou `EM_ANDAMENTO` para `PENDENTE_FINALIZACAO`
- cron nao altera aulas `FINALIZADA`

## Historico de Aulas

- historico deve priorizar aulas finalizadas
- filtro antigo `encerrada` ainda pode existir por compatibilidade
- o fluxo novo deve priorizar `status`
- historico usa paginacao
- busca pode considerar id, aluno, serie, professor, materia e modalidade

## Calendario

- calendario deve exibir aulas individuais reais
- calendario deve exibir turmas recorrentes por vigencia e agenda semanal
- aulas e turmas devem ter cores distintas
- aulas devem refletir cor/estado conforme status
- turmas sao visualizadas no calendario, nao criadas por ele
- aulas podem ser criadas, finalizadas ou excluidas pelo calendario quando o fluxo permitir

## Portal

- portal sera usado por alunos e professores
- a exibicao deve ser decidida pela role do usuario autenticado
- professor pode ter acoes extras de finalizacao de aula
- aluno deve ter acesso mais focado em leitura/consulta
- a experiencia deve priorizar mobile-first

## Seguranca e Integridade

- rotas mutaveis devem validar CSRF quando chamadas por client
- rotas mutaveis devem validar origem quando aplicavel
- mutacoes administrativas devem exigir `requireAdminUser`
- inicio/finalizacao de aula devem exigir `requireAdminOrProfessor`
- queries server-side protegidas devem passar por arquivos `*.queries.ts`
- criacao de usuario deve compensar falha entre Supabase Auth e banco local
- operacoes multi-tabela devem usar transacao Prisma
- erros de dominio devem usar `AppError`
- route handlers devem usar `handleApiError` quando possivel
