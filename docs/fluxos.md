USERS
Criação
faz:
criar registro em users
precisa tratar:
email único
role válida (admin, aluno, professor)
senha criptografada
depois da criação:
se role = aluno → criar registro em alunos
se role = professor → criar registro em professores

Atualização
faz:
atualizar users
precisa tratar:
validar email único (se alterado)
manter integridade do role
depois da atualização:
se houver dados relacionados → atualizar alunos ou professores

Deleção
faz:
soft delete em users (status)
precisa tratar:
verificar vínculos com aluno/professor
depois da deleção:
desativar registro em alunos ou professores

ALUNOS
Criação
faz:
criar registro em users
criar registro em alunos
precisa tratar:
modalidade válida
dados obrigatórios preenchidos
depois da criação:
aluno disponível para vincular em turma_alunos

Atualização
faz:
atualizar users
atualizar alunos
precisa tratar:
consistência entre dados pessoais e acadêmicos
modalidade válida
depois da atualização:
refletir alterações em telas e vínculos

Deleção
faz:
soft delete em users
soft delete em alunos
precisa tratar:
verificar vínculos em turma_alunos
depois da deleção:
remover ou inativar vínculos em turmas

PROFESSORES
Criação
faz:
criar registro em users
criar registro em professores
precisa tratar:
modalidade válida
matéria válida
depois da criação:
professor disponível para vincular em turma_professores

Atualização
faz:
atualizar users
atualizar professores
precisa tratar:
consistência dos dados
modalidade válida
depois da atualização:
refletir alterações nas turmas vinculadas

Deleção
faz:
soft delete em users
soft delete em professores
precisa tratar:
verificar vínculos em turma_professores
depois da deleção:
remover ou inativar vínculos com turmas

MODALIDADES
Criação
faz:
criar registro em modalidades
precisa tratar:
evitar duplicidade de tipo
depois da criação:
disponível para uso em alunos e professores

Atualização
faz:
atualizar modalidades
precisa tratar:
impacto em alunos e professores vinculados
depois da atualização:
refletir mudança em todos os vínculos

Deleção
faz:
deletar registro em modalidades
precisa tratar:
verificar uso em:
alunos
professores
depois da deleção:
bloquear ou exigir substituição antes da remoção

TURMAS
Criação
faz:
criar registro em turmas
precisa tratar:
validar horas semana
nome da turma
depois da criação:
permitir criação de:
turma_agenda
turma_alunos
turma_professores

Atualização
faz:
atualizar turmas
precisa tratar:
impacto em agenda e vínculos
depois da atualização:
refletir alterações em:
agenda
alunos vinculados
professores vinculados

Deleção
faz:
deletar ou inativar turmas
precisa tratar:
vínculos existentes:
turma_agenda
turma_alunos
turma_professores
frequências
depois da deleção:
remover ou inativar todos os vínculos

TURMA_AGENDA
Criação
faz:
criar registro em turma_agenda
precisa tratar:
turma existente
dia da semana válido
horário válido
depois da criação:
agenda disponível para frequência

Atualização
faz:
atualizar turma_agenda
precisa tratar:
impacto em frequências já registradas
depois da atualização:
refletir alteração no calendário da turma

Deleção
faz:
deletar turma_agenda
precisa tratar:
existência de:
frequencia_aluno
frequencia_professor
depois da deleção:
bloquear ou manter histórico

TURMA_ALUNOS
Criação
faz:
criar vínculo em turma_alunos
precisa tratar:
turma existente
aluno existente
evitar duplicidade
depois da criação:
aluno passa a fazer parte da turma

Atualização
faz:
atualizar vínculo (se houver campos extras)
precisa tratar:
consistência do vínculo
depois da atualização:
refletir alteração no relacionamento

Deleção
faz:
deletar vínculo em turma_alunos
precisa tratar:
impacto em frequências
depois da deleção:
aluno deixa de fazer parte da turma

TURMA_PROFESSORES
Criação
faz:
criar vínculo em turma_professores
precisa tratar:
turma existente
professor existente
evitar duplicidade
depois da criação:
professor passa a atuar na turma

Atualização
faz:
atualizar vínculo (se houver campos extras)
precisa tratar:
consistência do vínculo
depois da atualização:
refletir alteração no relacionamento

Deleção
faz:
deletar vínculo em turma_professores
precisa tratar:
impacto em aulas e frequência
depois da deleção:
professor deixa de atuar na turma

FREQUENCIA_ALUNO
Criação
faz:
criar registro em frequencia_aluno
precisa tratar:
turma_agenda_id válido
aluno pertence à turma
evitar duplicidade de registro
depois da criação:
registrar presença ou ausência

Atualização
faz:
atualizar frequencia_aluno
precisa tratar:
consistência do status
depois da atualização:
refletir alteração no histórico

Deleção
faz:
não recomendado deletar
precisa tratar:
manter histórico
depois da deleção:
preferir atualização ao invés de exclusão

FREQUENCIA_PROFESSOR
Criação
faz:
criar registro em frequencia_professor
precisa tratar:
turma_agenda_id válido
professor pertence à turma
evitar duplicidade
depois da criação:
registrar início da aula

Atualização
faz:
atualizar frequencia_professor
precisa tratar:
preenchimento correto de:
ended_at
notas
depois da atualização:
registrar finalização da aula

Deleção
faz:
não recomendado deletar
precisa tratar:
manter histórico
depois da deleção:
preferir atualização ao invés de exclusão 

