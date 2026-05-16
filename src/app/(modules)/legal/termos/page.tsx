import LegalDocument from "@/components/legal-document";

const sections = [
  {
    title: "1. Identificacao da plataforma",
    paragraphs: [
      'O sistema do "Curso Matematica Facil" e uma aplicacao web voltada a gestao academica e administrativa do curso, com recursos de autenticacao, cadastro de usuarios, cadastro de alunos e professores, modalidades, turmas, agenda semanal, aulas individuais e registros vinculados a frequencia e acompanhamento operacional.',
      "Controlador e responsavel pela plataforma: Curso Matematica Facil. CNPJ/CPF: [PREENCHER]. E-mail de contato: [PREENCHER].",
    ],
  },
  {
    title: "2. Aceitacao destes termos",
    paragraphs: [
      "Ao acessar, navegar, autenticar-se ou utilizar a plataforma, o usuario declara que leu, compreendeu e concorda com estes Termos de Uso e com a Politica de Privacidade aplicavel.",
      "Se o usuario nao concordar com estes termos, nao deve utilizar a plataforma.",
    ],
  },
  {
    title: "3. Finalidade e escopo de uso",
    paragraphs: [
      "A plataforma e destinada ao suporte das atividades do Curso Matematica Facil.",
    ],
    bullets: [
      "Autenticacao e controle de acesso.",
      "Administracao de usuarios e perfis.",
      "Organizacao de modalidades, turmas e agendas.",
      "Registro de aulas individuais.",
      "Registro de aulas em turma.",
      "Apoio ao controle academico e administrativo.",
    ],
  },
  {
    title: "4. Quem pode usar a plataforma",
    paragraphs: [
      "Podem utilizar a plataforma apenas pessoas autorizadas pelo Curso Matematica Facil, conforme o perfil de acesso disponibilizado pelo controlador.",
      "No estado atual do projeto, os perfis vinculados sao ADMIN, PROFESSOR e ALUNO. O simples cadastro nao garante acesso irrestrito; o nivel de acesso depende das permissoes habilitadas e das regras tecnicas de cada modulo.",
    ],
  },
  {
    title: "5. Conta, credenciais e primeiro acesso",
    paragraphs: [
      "O acesso depende de conta individual e credenciais pessoais. O usuario deve fornecer dados verdadeiros, manter a confidencialidade da senha, nao compartilhar credenciais e comunicar uso indevido ou suspeita de acesso nao autorizado.",
      "No estado atual do sistema, usuarios podem ser obrigados a trocar a senha provisoria no primeiro acesso antes de utilizar funcionalidades internas.",
    ],
  },
  {
    title: "6. Regras de acesso e uso permitido",
    paragraphs: [
      "O usuario deve utilizar a plataforma apenas para finalidades legitimas, educacionais, academicas, administrativas e operacionais relacionadas ao Curso Matematica Facil.",
    ],
    bullets: [
      "Consultar e operar informacoes conforme o perfil liberado.",
      "Usar a plataforma para apoio a aulas, turmas e gestao interna.",
    ],
  },
  {
    title: "7. Usos proibidos",
    bullets: [
      "Acessar ou tentar acessar areas, contas, APIs ou dados sem autorizacao.",
      "Compartilhar login, senha ou sessao com terceiros.",
      "Contornar restricoes tecnicas, logs, rate limits ou validacoes de seguranca.",
      "Inserir dados falsos, ilicitos, ofensivos ou desnecessarios.",
      "Copiar, extrair, raspar, minerar ou reutilizar dados da plataforma sem base legal e sem autorizacao.",
      "Praticar engenharia reversa, sondagem, ataque automatizado, brute force ou exploracao de vulnerabilidades.",
      "Alterar, sabotar ou interferir no funcionamento da plataforma.",
      "Usar a plataforma em desconformidade com a legislacao aplicavel, incluindo LGPD e Marco Civil da Internet.",
    ],
  },
  {
    title: "8. Permissoes e niveis de acesso",
    paragraphs: [
      "As permissoes sao definidas pelo controlador conforme a funcao do usuario.",
      "No estado atual do projeto, ha separacao de perfis no modelo de dados, o backend privilegia fluxos administrativos e controles internos, e determinados recursos podem ser restritos exclusivamente a administradores.",
      "O controlador podera criar, alterar, restringir, suspender ou remover permissoes quando necessario para seguranca, conformidade, manutencao ou organizacao operacional.",
    ],
  },
  {
    title: "9. Disponibilidade da plataforma",
    paragraphs: [
      "A plataforma e fornecida em esforco continuo de disponibilidade, mas nao ha garantia de funcionamento ininterrupto, livre de falhas ou disponivel em 100 por cento do tempo.",
    ],
    bullets: [
      "Manutencao preventiva ou corretiva.",
      "Atualizacoes tecnicas.",
      "Falhas de rede, terceiros ou infraestrutura.",
      "Medidas de seguranca.",
      "Incidentes operacionais.",
    ],
  },
  {
    title: "10. Seguranca e boas praticas operacionais",
    paragraphs: [
      "O projeto adota medidas tecnicas e organizacionais compativeis com seu estagio atual.",
    ],
    bullets: [
      "Autenticacao via Supabase Auth.",
      "Cookies de sessao com protecoes como httpOnly, sameSite=lax e secure em producao.",
      "Validacoes de origem em rotas mutaveis em producao.",
      "Limitacao de tentativas por identificadores tecnicos e de autenticacao.",
      "Cabecalhos HTTP de seguranca e politica de conteudo em modo de monitoramento.",
    ],
  },
  {
    title: "11. Responsabilidades do usuario",
    bullets: [
      "Usar a plataforma de forma licita e compativel com sua finalidade.",
      "Manter sigilo sobre suas credenciais.",
      "Respeitar a privacidade de alunos, professores, responsaveis e demais titulares.",
      "Observar as orientacoes internas do Curso Matematica Facil.",
    ],
  },
  {
    title: "12. Tratamento de dados pessoais",
    paragraphs: [
      "O uso da plataforma envolve tratamento de dados pessoais nos termos da Politica de Privacidade. O usuario declara ciencia de que determinadas informacoes podem ser tratadas para autenticacao, controle de acesso, gestao academica, registros operacionais, seguranca e cumprimento de obrigacoes legais e contratuais.",
    ],
  },
  {
    title: "13. Suspensao, bloqueio e encerramento de acesso",
    paragraphs: [
      "O controlador podera suspender, limitar ou encerrar o acesso do usuario, com ou sem aviso previo, quando houver violacao destes termos, risco a seguranca da plataforma ou de terceiros, uso indevido, necessidade tecnica, juridica ou administrativa, ou encerramento do vinculo que justificava o acesso.",
      "Quando aplicavel, o controlador podera manter registros e dados necessarios para cumprimento de obrigacoes legais, auditoria, defesa em processos ou apuracao de incidentes.",
    ],
  },
  {
    title: "14. Propriedade intelectual",
    paragraphs: [
      "Salvo disposicao expressa em contrario, pertencem ao Curso Matematica Facil ou a seus licenciantes todos os direitos sobre marca, nome, layout, identidade visual, codigo-fonte, arquitetura, banco de dados, documentacao, fluxos internos e conteudos institucionais disponibilizados na plataforma.",
      "O uso da plataforma nao concede licenca ampla, cessao ou transferencia de direitos de propriedade intelectual.",
    ],
  },
  {
    title: "15. Limitacao de responsabilidade",
    bullets: [
      "Danos decorrentes de uso indevido da conta pelo proprio usuario ou por terceiro com sua credencial.",
      "Indisponibilidades temporarias, falhas de internet ou servicos de terceiros.",
      "Decisoes tomadas com base em dados lancados incorretamente por operadores autorizados.",
      "Prejuizos derivados do descumprimento destes termos ou de orientacoes internas.",
    ],
  },
  {
    title: "16. Alteracoes destes termos",
    paragraphs: [
      "Estes Termos podem ser alterados a qualquer tempo para refletir evolucoes da plataforma, adequacoes legais, mudancas operacionais ou ajustes de seguranca.",
      "Sempre que possivel, a data de atualizacao sera revisada. O uso continuado da plataforma apos a publicacao da nova versao sera considerado aceite da versao vigente.",
    ],
  },
  {
    title: "17. Contato",
    paragraphs: [
      "Assuntos gerais sobre a plataforma: Responsavel [PREENCHER] e e-mail [PREENCHER].",
      "Assuntos de privacidade e dados pessoais: Encarregado [PREENCHER] e e-mail [PREENCHER].",
    ],
  },
  {
    title: "18. Legislacao aplicavel e foro",
    paragraphs: [
      "Estes Termos sao regidos pelas leis da Republica Federativa do Brasil.",
      "Fica eleito o foro da comarca do domicilio do controlador, salvo competencia legal especifica ou regra obrigatoria em sentido diverso.",
    ],
  },
] as const;

export default function TermosDeUsoPage() {
  return (
    <LegalDocument
      title="Termos de Uso"
      description="Leia as regras que orientam o uso da plataforma do Curso Matematica Facil, os perfis de acesso disponiveis e as responsabilidades de cada usuario."
      updatedAt="15 de maio de 2026"
      sections={sections}
    />
  );
}
