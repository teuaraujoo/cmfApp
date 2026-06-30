import { getCurrentAppUser } from "@/server/modules/auth/auth.services";
import { ProfileSection } from "@/components/portal/perfil/PortalSection";
import { User, Mail, Phone, GraduationCap, BookOpen, UserRoundKey, IdCardLanyard, School, Clock, ShieldUser } from "lucide-react";

export type Professor = {
    materia: string;
}

export type Aluno = {
    data_nasc: Date;
    serie: string;
    resp_tel: string | null;
    resp_nome: string | null;
    tempo_aula: number;
    escola: string;
}

export type UserType = {
    nome: string;
    email: string;
    tel: string | null;
    role: string;
    alunos?: Aluno | null
    professores?: Professor | null
}

export default async function PerfilPage() {
    const { appUser } = await getCurrentAppUser();

    const professorPersonalInfos = [
        {
            icon: <IdCardLanyard />,
            label: "Nome",
            value: appUser.nome
        },
        {
            icon: <Mail />,
            label: "Email",
            value: appUser.email
        },
        {
            icon: <Phone />,
            label: "Telefone",
            value: appUser.tel ?? ""
        },
    ];

    const alunoAcademicInfos = [
        {
            icon: <School />,
            label: "Colégio",
            value: appUser.alunos?.escola ?? ""
        },
        {
            icon: <BookOpen />,
            label: "Série",
            value: appUser.alunos?.serie ?? ""
        },
        {
            icon: <Clock />,
            label: "Tempo de aula",
            value: `${appUser.alunos?.tempo_aula}h`
        },
    ]

    const alunoPessoalInfos = [
        {
            icon: <IdCardLanyard />,
            label: "Nome",
            value: appUser.nome
        },
        {
            icon: <Mail />,
            label: "Email",
            value: appUser.email
        },
        {
            icon: <Phone />,
            label: "Telefone",
            value: appUser.tel ?? ""
        },
        {
            icon: <IdCardLanyard />,
            label: "Data de nascimento",
            value: appUser.alunos?.data_nasc.toLocaleDateString("pt-BR") ?? ""
        },
        {
            icon: <ShieldUser />,
            label: "Nome do responsável",
            value: appUser.alunos?.resp_nome ?? ""
        },

        {
            icon: <Phone />,
            label: "Telefone do responsável",
            value: appUser.alunos?.resp_tel ?? ""
        }
    ];

    const ProfessorAcademicInfos = [
        {
            icon: <UserRoundKey />,
            label: "Cargo",
            value: `${appUser.role[0]}${appUser.role.slice(1).toLowerCase()}`
        },
        {
            icon: <BookOpen />,
            label: "Disciplina",
            value: appUser.professores?.materia ?? ""
        }
    ];

    return (
        <div className="mx-auto max-w-3xl space-y-6 p-6">
            {appUser.role === "PROFESSOR"
                ?
                <>
                    <ProfileSection title="Informações Pessoais" icon={<User />} itens={professorPersonalInfos} />
                    <ProfileSection title="Informações Profissionais" icon={<GraduationCap />} itens={ProfessorAcademicInfos} />
                </>
                :
                <>
                    <ProfileSection title="Informações Pessoais" icon={<GraduationCap />} itens={alunoPessoalInfos} />
                    <ProfileSection title="Informações Acadêmicas" icon={<GraduationCap />} itens={alunoAcademicInfos} />

                </>
            }
        </div>
    )
};
