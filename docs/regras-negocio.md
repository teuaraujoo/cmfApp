 USUÁRIOS E ACESSO
todo usuário deve ter email único
todo usuário deve ter um role definido (admin, aluno, professor)
um usuário só pode ter um perfil ativo
controle de acesso deve respeitar o role

ALUNOS
todo aluno deve estar vinculado a um usuário
aluno deve possuir responsável e telefone
aluno deve estar vinculado a uma modalidade
aluno só pode acessar aulas das turmas em que está vinculado
aluno pode estar em uma ou mais turmas (definição do sistema)

PROFESSORES
todo professor deve estar vinculado a um usuário
professor deve possuir matéria e modalidade
professor pode estar vinculado a várias turmas

MODALIDADES
modalidades devem ser cadastradas previamente
alunos e professores devem possuir modalidade
turmas devem respeitar a modalidade definida

TURMAS
toda turma deve possuir nome e carga horária semanal
uma turma deve ter pelo menos 1 aluno e 1 professor *
uma turma pode ter vários alunos e professores
uma turma pode estar ativa ou inativa

AGENDA DA TURMA
cada turma deve ter dias fixos de aula
cada aula deve possuir horário de início e fim
não pode haver conflito de horário para o mesmo professor
uma turma pode ter mais de um dia de aula por semana

PRESENÇA DO ALUNO
presença está vinculada à aula (turma_agenda)
aluno só pode confirmar presença se estiver vinculado à turma
aluno só pode confirmar presença uma vez por aula
confirmação deve ocorrer antes ou próximo ao início da aula (regra configurável)

EXECUÇÃO DA AULA
professor só pode iniciar aula se estiver vinculado à turma
aula só pode ser iniciada uma vez
aula só pode ser finalizada após iniciar
não é permitido finalizar aula não iniciada
pode haver mais de um professor por aula

FREQUÊNCIA DO PROFESSOR
frequência está vinculada à aula
professor só pode registrar presença nas aulas que participa
início da aula registra horário de início
final da aula registra horário de término




STATUS DA AULA
uma aula só pode estar em um estado por vez:
aguardando
presença confirmada
iniciada
finalizada
a ordem das ações deve ser:
aluno confirma presença
professor inicia aula
professor finaliza aula

VALIDAÇÕES GERAIS
não permitir duplicidade de:
presença
vínculo turma-aluno
vínculo turma-professor
não permitir ações fora de contexto (ex: aluno em turma errada)
todas as ações devem respeitar os vínculos definidos

