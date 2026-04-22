SISTEMA DE GERENCIAMENTO DE CURSO DE REFORCO E GERENCIAMENTO DE FREQUENCIA

Sistema feito para o Curso Matematica Facil, localizado em Aracaju-SE. O sistema possui cadastro de alunos, turmas e professores. Alem disso, os alunos do curso podem registrar presenca ou ausencia nas aulas e os professores podem marcar inicio e fim da aula.

STACKS

- Next.js
- PostgreSQL
- Prisma
- Supabase Auth
- Tailwind CSS
- Shadcn
- TypeScript

OBJETIVO DESTA DOCUMENTACAO

Este arquivo centraliza o que foi implementado no backend ate agora, especialmente:

- criacao de usuarios por admin
- login
- logout
- troca obrigatoria de senha no primeiro acesso
- bloqueio de rotas protegidas enquanto `must_change_password = true`
- vinculo entre `public.users` e `auth.users`

ARQUITETURA DE AUTENTICACAO

O projeto agora separa autenticacao de perfil de negocio:

- `auth.users`
  responsavel por email, senha, sessao e cookies do Supabase
- `public.users`
  responsavel pelos dados de negocio da aplicacao

RELACAO ENTRE AS TABELAS

- `public.users.auth_user_id -> auth.users.id`
- `public.users.must_change_password`
  controla se o usuario ainda esta usando senha provisoria

REGRAS ATUAIS

- usuarios sao criados pelo admin
- nao existe auto cadastro publico
- o primeiro login pode acontecer com senha provisoria
- enquanto `must_change_password = true`, o usuario fica bloqueado nas rotas protegidas
- as rotas livres para esse usuario sao:
  - login
  - logout
  - change-password

VARIAVEIS DE AMBIENTE NECESSARIAS

- `DATABASE_URL`
- `DIRECT_URL`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

CLIENTS DO SUPABASE

Existem tres clients com responsabilidades diferentes:

1. `src/libs/supabase/client.ts`
   client do browser

2. `src/libs/supabase/server.ts`
   client SSR/server para ler e atualizar sessao por cookies

3. `src/libs/supabase/admin.ts`
   client server-only com `service_role`
   usado para:
   - criar usuarios no Supabase Auth
   - remover usuario do Auth em compensacao de falha

ROTAS DE AUTENTICACAO IMPLEMENTADAS

1. `POST /api/auth/login`
2. `POST /api/auth/logout`
3. `POST /api/auth/change-password`

ROTA DE USUARIOS IMPLEMENTADA

1. `GET /api/users`
   exige admin autenticado e com onboarding concluido
2. `POST /api/users`
   exige admin autenticado e com onboarding concluido

FLUXO DE CRIACAO DE USUARIO PELO ADMIN

1. admin autenticado chama `POST /api/users`
2. payload e validado por `createUserSchema`
3. regras de dominio verificam:
   - email unico
   - dados obrigatorios de aluno
   - dados obrigatorios de professor
4. o backend cria primeiro o usuario em `auth.users` via `adminSupabase.auth.admin.createUser`
5. o retorno do Supabase vem em `authData`
6. `authData.user.id` e salvo em `public.users.auth_user_id`
7. o backend cria:
   - `public.users`
   - `alunos`, se role = `ALUNO`
   - `professores`, se role = `PROFESSOR`
8. se a escrita local falhar depois da criacao no Auth, o backend tenta compensar removendo o usuario no Supabase

OBSERVACAO IMPORTANTE

O objeto `authData` nao vem do frontend. Ele e a resposta do Supabase Auth ao executar `createUser`.

FLUXO DE LOGIN

1. usuario envia email e senha para `POST /api/auth/login`
2. o backend usa `supabase.auth.signInWithPassword`
3. se o login der certo, o backend busca o perfil local em `public.users` via `auth_user_id`
4. se o usuario nao existir em `public.users`, a sessao e encerrada
5. se `status != ATIVO`, a sessao e encerrada
6. a resposta devolve:
   - `id`
   - `auth_user_id`
   - `nome`
   - `email`
   - `role`
   - `status`
   - `must_change_password`

FLUXO DE TROCA DE SENHA NO PRIMEIRO ACESSO

1. usuario faz login com senha provisoria
2. a resposta de login devolve `must_change_password = true`
3. o frontend deve redirecionar obrigatoriamente para a tela de troca de senha
4. o usuario chama `POST /api/auth/change-password`
5. o backend:
   - valida a sessao atual
   - valida `newPassword` e `confirmPassword`
   - chama `supabase.auth.updateUser({ password: newPassword })`
   - atualiza `public.users.must_change_password = false`
6. a partir desse ponto o usuario deixa de ficar bloqueado

FLUXO DE LOGOUT

1. usuario chama `POST /api/auth/logout`
2. o backend executa `supabase.auth.signOut()`
3. a sessao atual e encerrada

BLOQUEIO DE PRIMEIRO ACESSO

O bloqueio foi centralizado em `src/server/helpers/users.helpers.ts`.

HELPERS IMPLEMENTADOS

1. `getCurrentAppUser()`
   faz:
   - le usuario autenticado do Supabase via cookies
   - busca o perfil local em `public.users`
   - valida se o usuario existe
   - valida se `status = ATIVO`

2. `requireOnboardedUser()`
   faz:
   - chama `getCurrentAppUser()`
   - bloqueia se `must_change_password = true`

3. `requireAdminUser()`
   faz:
   - chama `requireOnboardedUser()`
   - valida se `role = ADMIN`

4. `checkPasswordAlreadyChange()`
   faz:
   - lanca erro `403` se `must_change_password = true`

EFEITO PRATICO DESSES HELPERS

- um aluno/professor criado pelo admin entra inicialmente com senha provisoria
- esse usuario consegue fazer login
- mas nao consegue acessar rotas protegidas antes da troca de senha
- isso acontece antes mesmo da validacao de role

MAPPERS IMPLEMENTADOS

Arquivo:

- `src/server/mappers/users.mapper.ts`

Responsabilidades:

- `toPrismaUser`
- `toPrismaAluno`
- `toPrismaProfessor`
- `toUserCreationResponseAdmin`
- `toLoginResponse`
- `toChangePasswordResponse`

Esses mappers evitam montar respostas manualmente em cada service e ajudam a manter o contrato de resposta estavel.

SCHEMAS DE VALIDACAO IMPLEMENTADOS

1. `src/server/schemas/user.schema.ts`
   usado para criacao de usuarios por admin

Campos principais:

- `nome`
- `email`
- `temporary_password`
- `role`
- `tel`
- `aluno`
- `professor`

2. `src/server/schemas/auth.schema.ts`
   usado para:
   - login
   - change-password

VALIDACOES IMPORTANTES

- senha temporaria com minimo de 8 caracteres
- senha temporaria com pelo menos uma letra
- senha temporaria com pelo menos um numero
- nova senha com as mesmas regras

PAYLOADS

CRIACAO DE USUARIO

Para ALUNO:

```json
{
  "nome": "Ana Souza",
  "email": "ana@email.com",
  "temporary_password": "Temp1234",
  "role": "ALUNO",
  "tel": "79999999999",
  "aluno": {
    "data_nasc": "2009-03-15",
    "serie": "9 ano",
    "resp_tel": "79988887777",
    "resp_nome": "Joao Souza",
    "modalidade_id": 1,
    "tempo_aula": 60,
    "horas_semana": 3,
    "tempo_contrato": 6
  }
}
```

Para PROFESSOR:

```json
{
  "nome": "Carlos Lima",
  "email": "carlos@email.com",
  "temporary_password": "Temp1234",
  "role": "PROFESSOR",
  "tel": "79999999999",
  "professor": {
    "materia": "Matematica",
    "modalidade_id": 1
  }
}
```

Para ADMIN:

```json
{
  "nome": "Admin Novo",
  "email": "admin2@email.com",
  "temporary_password": "Temp1234",
  "role": "ADMIN",
  "tel": "79999999999"
}
```

LOGIN

```json
{
  "email": "teste@gmail.com",
  "password": "senha123"
}
```

TROCA DE SENHA

```json
{
  "newPassword": "NovaSenha123",
  "confirmPassword": "NovaSenha123"
}
```

COMO TESTAR A CRIACAO E LISTAGEM DE USUARIOS

Para testar `POST /api/users` e `GET /api/users`, e necessario ter antes um admin funcional.

PASSO A PASSO

1. criar o primeiro admin em `auth.users`
   pode ser pelo painel do Supabase em `Authentication > Users`

2. criar o perfil correspondente em `public.users`
   com:
   - mesmo email
   - `role = ADMIN`
   - `status = ATIVO`
   - `must_change_password = false`
   - `auth_user_id = auth.users.id`

3. fazer login com `POST /api/auth/login`

4. manter os cookies da sessao

5. chamar:
   - `GET /api/users`
   - `POST /api/users`

IMPORTANTE

Sem esse primeiro admin bootstrapado, as rotas administrativas nao podem ser usadas.

PRIMEIRO ADMIN

Atualmente nao existe signup publico. Isso e intencional.

O primeiro admin deve ser criado por bootstrap controlado, por exemplo:

- manualmente no painel do Supabase + insert em `public.users`
- script interno
- rota temporaria protegida por segredo de ambiente

RESUMO DO ESTADO ATUAL

Ja implementado:

- login
- logout
- change-password
- criacao de usuarios por admin
- bloqueio de primeiro acesso
- validacao por role de admin
- integracao entre `auth.users` e `public.users`

Ainda depende de frontend para experiencia completa:

- tela de login
- tela obrigatoria de troca de senha
- redirecionamento por `must_change_password`
- redirecionamento por `role`
