import { getCurrentAppUser } from "@/server/modules/auth/auth.services";
import { ProfileSection } from "@/components/portal/perfil/PortalSection";
import { PortalProfileActions } from "@/components/portal/perfil/PortalProfileActions";
import { User, Mail, Phone, GraduationCap, BookOpen, UserRoundKey, IdCardLanyard, School, Clock, ShieldUser, CalendarFoldIcon } from "lucide-react";
import Badge from "@/components/ui/Badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

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
            value: appUser.alunos?.tempo_aula ? `${appUser.alunos?.tempo_aula}h` : ""
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
            icon: <CalendarFoldIcon />,
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
        <div className="mx-auto flex max-w-3xl flex-col gap-5 px-1 py-2 sm:px-2 sm:py-4">
            <section className="overflow-hidden rounded-[1.8rem] border border-white/70 bg-white p-4 dark:border-white/10 dark:bg-white/[0.06] p-5">
                <div className="flex items-center gap-4">
                    <Avatar className="size-20 border-2 border-white/20 bg-gradient-to-br from-[#1FA2E1] to-[#1fa4e14d]">
                        <AvatarFallback className="bg-transparent text-lg font-semibold tracking-[0.24em] text-white">
                            {appUser.nome
                                .split(" ")
                                .map(nome => nome[0])
                                .slice(0, 2)
                                .join("")}
                        </AvatarFallback>
                    </Avatar>

                    <div className="flex flex-col">
                        <h1 className="text-xl font-semibold text-muted-foreground">
                            {appUser.nome}
                        </h1>

                        <p className="text-sm text-muted-foreground">
                            {appUser.email}
                        </p>

                        <div className="mt-3">
                            <Badge>
                                <GraduationCap className="size-4" />
                                {appUser.role}
                            </Badge>
                        </div>
                    </div>
                </div>
            </section>


            {appUser.role === "PROFESSOR"
                ?
                <>
                    <ProfileSection title="Informações Pessoais" icon={<User className="size-5" />} itens={professorPersonalInfos} />
                    <ProfileSection title="Informações Profissionais" icon={<GraduationCap className="size-5" />} itens={ProfessorAcademicInfos} />
                </>
                :
                <>
                    <ProfileSection title="Informações Pessoais" icon={<User className="size-5" />} itens={alunoPessoalInfos} />
                    <ProfileSection title="Informações Acadêmicas" icon={<BookOpen className="size-5" />} itens={alunoAcademicInfos} />
                </>
            }
            <PortalProfileActions />
        </div>
    )
};
