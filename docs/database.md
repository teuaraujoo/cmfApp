1. USERS
id
name
email
password_hash
role
phone
status
created_at
updated_at

2. ALUNOS
id
user_id
data_nasc
serie
resp_tel
resp_nome
modalidade_id
tempo_aula
horas_semana
tempo_contrato
status
created_at
updated_at

3. PROFESSORES
id
user_id
materia
modalidade_id
created_at
updated_at


4. MODALIDADES
id
tipo

5. TURMAS
id
nome
horas_semana
status
created_at
updated_at

6. TURMA_AGENDA
id
turma_id
dia_semana
horario_inicio
horario_fim
created_at
updated_at

7. TURMA_ALUNOS
id
turma_id
alunos_id
created_at

8. TURMA_PROFESSORES
id
turma_id
professores_id
created_at

9. FREQUENCIA_ALUNO
id
turma_agenda_id
confirmed_at
status

10. FREQUENCIA_PROFESSOR
id
turma_agenda_id
started_at
ended_at
notas

## RELACIONAMENTOS

#### relacionamentos 1:1

users 1:1 alunos
users 1:1 professores

#### relacionamentos 1:N

modalidades 1:N alunos
modalidades 1:N professores
turmas 1:N turma_agenda
turmas 1:N turma_alunos
turmas 1:N turma_professores
turma_agenda 1:N frequencia_aluno
turma_agenda 1:N frequencia_professor
alunos 1:N frequencia_aluno
professores 1:N frequencia_professor

#### relacionamentos N:N

turmas N:N alunos via turma_alunos
turmas N:N professores via turma_professores

## RESUMO

users se relaciona com alunos em 1:1
users se relaciona com professores em 1:1
modalidades se relaciona com alunos em 1:N
modalidades se relaciona com professores em 1:N
turmas se relaciona com turma_agenda em 1:N
turmas se relaciona com turma_alunos em 1:N
turmas se relaciona com turma_professores em 1:N
turmas se relaciona com alunos em N:N por meio de turma_alunos
turmas se relaciona com professores em N:N por meio de turma_professores
turma_agenda se relaciona com frequencia_aluno em 1:N
turma_agenda se relaciona com frequencia_professor em 1:N
alunos se relaciona com frequencia_aluno em 1:N
professores se relaciona com frequencia_professor em 1:N
