import LegalDocument from "@/components/legal-document";

const sections = [
  {
    title: "1. Apresentacao",
    paragraphs: [
      "Esta Politica de Privacidade explica como o Curso Matematica Facil trata dados pessoais no contexto de uso da plataforma web de gestao academica e administrativa.",
      "O documento foi elaborado com base no estado atual do projeto, que possui autenticacao, cadastro de usuarios, alunos e professores, modalidades, turmas, agendas, aulas individuais e controles tecnicos de acesso e seguranca.",
    ],
  },
  {
    title: "2. Quem e o controlador dos dados",
    paragraphs: [
      "Controlador: Curso Matematica Facil. CNPJ/CPF: [PREENCHER]. E-mail de contato: [PREENCHER].",
      "Canal para solicitacoes relacionadas a privacidade e LGPD: Encarregado ou canal designado [PREENCHER]. E-mail: [PREENCHER].",
    ],
  },
  {
    title: "3. Quais dados podem ser tratados",
    paragraphs: [
      "De acordo com o repositorio e a modelagem atual, a plataforma pode tratar dados cadastrais, dados especificos de alunos e professores, dados de autenticacao e seguranca, e dados operacionais e academicos.",
    ],
    bullets: [
      "Nome, e-mail, telefone, role, status do cadastro e identificador interno.",
      "Dados de alunos como data de nascimento, serie, modalidade, horas por semana, tempo de contrato, nome e telefone do responsavel.",
      "Dados de professores como materia, modalidade e status operacional.",
      "Dados de autenticacao, sessao, cookies tecnicos, tentativas de acesso, IP e user agent quando disponiveis.",
      "Turmas, agendas, vinculos, aulas individuais, horarios, datas, notas e registros de frequencia.",
    ],
  },
  {
    title: "4. Como os dados sao coletados",
    bullets: [
      "Informacoes fornecidas no processo de matricula ou contratacao.",
      "Informacoes recebidas e lancadas administrativamente pela equipe do curso.",
      "Dados inseridos durante o uso da plataforma.",
      "Dados tecnicos gerados pela autenticacao, sessao e mecanismos de seguranca.",
    ],
  },
  {
    title: "5. Para quais finalidades usamos os dados",
    bullets: [
      "Criar, manter e administrar contas de acesso.",
      "Autenticar usuarios e proteger sessoes.",
      "Diferenciar perfis e permissoes.",
      "Cadastrar e manter alunos, professores, turmas e modalidades.",
      "Organizar agendas semanais e aulas individuais.",
      "Registrar frequencia, acompanhamento e operacao academica.",
      "Permitir comunicacoes operacionais relacionadas ao curso.",
      "Prevenir fraude, abuso, acesso indevido e incidentes de seguranca.",
      "Cumprir obrigacoes legais, regulatorias e contratuais.",
      "Exercer direitos em processos judiciais, administrativos ou arbitrais.",
    ],
  },
  {
    title: "6. Bases legais utilizadas",
    paragraphs: [
      "O tratamento de dados pessoais pode ocorrer, conforme o caso concreto, com fundamento em execucao de contrato, cumprimento de obrigacao legal ou regulatoria, exercicio regular de direitos, protecao da vida quando aplicavel, legitimo interesse e consentimento quando juridicamente necessario.",
      "No contexto atual da plataforma, a base mais recorrente tende a ser a execucao da relacao educacional e administrativa e a gestao do acesso ao sistema, e nao o consentimento como fundamento unico para toda a operacao.",
    ],
  },
  {
    title: "7. Com quem os dados podem ser compartilhados",
    bullets: [
      "Supabase, como fornecedor de autenticacao e componentes tecnicos de sessao.",
      "Upstash Redis, para operacoes de rate limit e protecao contra abuso.",
      "Prestadores de servicos de infraestrutura, hospedagem, suporte tecnico ou seguranca.",
      "Autoridades publicas, orgaos reguladores ou autoridades judiciais quando houver obrigacao legal.",
      "Profissionais e operadores internos autorizados do Curso Matematica Facil, conforme necessidade operacional.",
    ],
  },
  {
    title: "8. Cookies, sessao e tecnologias semelhantes",
    paragraphs: [
      "A plataforma utiliza principalmente cookies e mecanismos tecnicos necessarios para autenticacao e manutencao da sessao.",
      "Conforme a implementacao atual revisada, os cookies de autenticacao sao associados ao fluxo SSR do Supabase, com atributos como httpOnly, secure em producao e sameSite configurado como lax.",
    ],
  },
  {
    title: "9. Seguranca da informacao",
    paragraphs: [
      "O projeto ja apresenta medidas tecnicas relevantes para o seu estagio atual.",
    ],
    bullets: [
      "Autenticacao centralizada via Supabase Auth.",
      "Cookies protegidos de sessao.",
      "Validacao de origem em rotas mutaveis em producao.",
      "Rate limit por e-mail, IP, usuario autenticado ou administrador.",
      "Cabecalhos HTTP de seguranca.",
      "Politica de conteudo configurada em modo report-only.",
      "Segregacao de modulos e validacoes no backend.",
    ],
  },
  {
    title: "10. Retencao e eliminacao de dados",
    paragraphs: [
      "Os dados pessoais sao mantidos pelo tempo necessario para cumprir as finalidades descritas nesta politica, inclusive para execucao da relacao contratual ou educacional, manutencao de historico academico e administrativo, cumprimento de obrigacoes legais, auditoria, seguranca e defesa do controlador.",
      "Quando cabivel e tecnicamente possivel, dados desnecessarios poderao ser eliminados, anonimizados ou bloqueados, respeitadas as hipoteses legais de conservacao.",
    ],
  },
  {
    title: "11. Dados de criancas, adolescentes e responsaveis",
    paragraphs: [
      "Como a operacao do Curso Matematica Facil envolve contexto educacional e o cadastro de nome e telefone de responsaveis, a plataforma pode tratar dados de alunos menores de idade e de seus responsaveis legais.",
      "Nesses casos, o tratamento deve permanecer vinculado a finalidades educacionais, administrativas, de seguranca e de execucao da relacao com o curso, sempre com observancia do melhor interesse do menor e das exigencias legais aplicaveis.",
    ],
  },
  {
    title: "12. Direitos do titular nos termos da LGPD",
    bullets: [
      "Confirmacao da existencia de tratamento.",
      "Acesso aos dados.",
      "Correcao de dados incompletos, inexatos ou desatualizados.",
      "Anonimizacao, bloqueio ou eliminacao de dados desnecessarios, excessivos ou tratados em desconformidade.",
      "Portabilidade, conforme regulamentacao aplicavel.",
      "Eliminacao dos dados tratados com base em consentimento, quando cabivel.",
      "Informacao sobre compartilhamentos realizados.",
      "Informacao sobre a possibilidade de nao fornecer consentimento e suas consequencias, quando essa base legal for utilizada.",
      "Revogacao do consentimento, quando aplicavel.",
    ],
  },
  {
    title: "13. Como exercer seus direitos",
    paragraphs: [
      "Solicitacoes relacionadas a dados pessoais, incluindo acesso, correcao e exclusao quando cabivel, devem ser encaminhadas para o encarregado indicado pelo controlador.",
      "Para protecao do proprio titular, o controlador podera solicitar informacoes adicionais para confirmar a identidade e a legitimidade do pedido antes de processa-lo.",
    ],
  },
  {
    title: "14. Transferencia e operadores",
    paragraphs: [
      "Quando fornecedores tecnologicos forem utilizados para viabilizar autenticacao, sessao, rate limit, armazenamento ou operacao da plataforma, esses terceiros poderao atuar como operadores ou suboperadores, conforme a LGPD e os arranjos contratuais aplicaveis.",
      "O compartilhamento deve ocorrer apenas na extensao necessaria a prestacao do servico ou ao atendimento de obrigacoes legais.",
    ],
  },
  {
    title: "15. Alteracoes desta politica",
    paragraphs: [
      "Esta Politica podera ser atualizada a qualquer momento para refletir mudancas legais, regulatorias, tecnicas ou operacionais.",
      "Sempre que possivel, a data de ultima atualizacao sera ajustada no topo do documento. O uso continuado da plataforma apos a publicacao de uma nova versao podera caracterizar ciencia da versao vigente.",
    ],
  },
] as const;

export default function PoliticaDePrivacidadePage() {
  return (
    <LegalDocument
      title="Politica de Privacidade"
      description="Entenda quais dados a plataforma do Curso Matematica Facil pode tratar, para quais finalidades e quais medidas de seguranca e privacidade ja existem no projeto."
      updatedAt="15 de maio de 2026"
      sections={sections}
    />
  );
}
