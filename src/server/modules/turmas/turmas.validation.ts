import { CreateTurmaBody, CreateTurmaAgendaBody } from "./turmas.shema";
import { AppError } from "@/server/error/app-errors";
import { TurmaRepositories } from "./turmas.repositories";
import { AlunosRepositories, ProfessoresRepositories } from "@/server/modules/users/users.respositories";
import { DateUtils } from "@/server/utils/date-utils";
import { ModalidadeRepositories } from "@/server/modules/modalidades/modalidades.repositories"

type CreateTurmaAlunoPrisma = {
    turma_id: number;
    alunos_id: number;
};

type CreateTurmaProfessorPrisma = {
    turma_id: number;
    professores_id: number;
};

type ScheduleSlot = {
    dia_semana: number;
    inicio: number;
    fim: number;
    turma_id?: number;
};

// map --> chave: number, valor: scheduleslot[array de tipo schedule slot]
type GroupedSchedules = Map<number, ScheduleSlot[]>;
export class TurmaValidation {

    static async validateTurma(data: CreateTurmaBody) {
        const turmaNome = await TurmaRepositories.getByName(data.nome);
        const modalidade = await ModalidadeRepositories.getById(data.modalidade_id);
        const vigenciaInicioDate = new Date(data.vigencia_inicio);
        const vigenciaFimDate = new Date(data.vigencia_fim);
        // const matchAgenda = turma!.turma_agenda.some(item => item.dia_semana === agenda.dia_semana);
        // const compareHours = turma?.turma_agenda[0].horario_inicio !== horarioInicio;

        if (vigenciaInicioDate > vigenciaFimDate) throw new AppError("Vigência inicial não pode ser maior que a final!", 400);

        if (!modalidade) throw new AppError("Modalidade não encontrada!", 400);

        if (turmaNome) throw new AppError("Turma já existente com esse nome!", 400);

        if (!data.vigencia_fim || !data.vigencia_inicio) throw new AppError("Vigência é obrigatória", 400);

        if (!data.modalidade_id) throw new AppError("Modalidade da turma é obrigatória!", 400);

        if (!data.turma_agenda) throw new AppError("Agenda da turma é obrigatória", 400);
    };

    static async validateAgendaItem(agenda: CreateTurmaAgendaBody) {
        const horarioInicio = DateUtils.toTimeUtc(agenda.horario_inicio);
        const horarioFim = DateUtils.toTimeUtc(agenda.horario_fim);

        if (horarioInicio >= horarioFim) throw new AppError("Horário de início é maior ou igual ao horário final!", 400);
    };

    static async validateAgenda(
        newAgenda: CreateTurmaAgendaBody[],
        vigenciaInicio: string,
        vigenciaFim: string,
        turmaId?: number
    ) {
        const vigenciaInicioDate = new Date(vigenciaInicio);
        const vigenciaFimDate = new Date(vigenciaFim);

        const newSchedules = this.buildNewSchedules(newAgenda);

        const groupedNewSchedules = this.groupSchedulesByDay(newSchedules);
        this.assertNoInternalConflicts(
            groupedNewSchedules,
            "A agenda da turma possuo horários conflitantes!"
        );

        const diasSemana = [...new Set(newAgenda.map((item) => item.dia_semana))];

        const candidateTurmas = await TurmaRepositories.findTurmasByAgendaCandidates(
            diasSemana,
            vigenciaInicioDate,
            vigenciaFimDate,
            turmaId
        );

        const currentSchedules = candidateTurmas.flatMap((turma) =>
            turma.turma_agenda.map((agenda) => {
                return this.buildCurrentSchedule(
                    turma.id,
                    agenda.dia_semana,
                    agenda.horario_inicio,
                    agenda.horario_fim,
                )
            }));

        const groupedCurrentSchedules = this.groupSchedulesByDay(currentSchedules);

        this.assertNoConflictsAgainstCurrent(groupedNewSchedules, groupedCurrentSchedules, "Já existe turma cadastrada nesse dia e horário")

        // for (const fresh of newSchedules) {
        //     for (const current of currentSchedules) {
        //         if (this.hasConflit(fresh, current)) {
        //             throw new AppError("Já existe turma cadastrada nesse dia e horário", 400);
        //         };
        //     };
        // };
    };

    static async validateTurmaAlunos(
        alunos: CreateTurmaAlunoPrisma[],
        newAgenda: CreateTurmaAgendaBody[],
        turmaId?: number
    ) {

        if (!newAgenda?.length) throw new AppError("Agenda da turma é obrigatória!", 404);

        const alunosIds = alunos.map(aluno => aluno.alunos_id);
        const findAlunos = await AlunosRepositories.findManyByIds(alunosIds);

        if (!findAlunos || findAlunos.length !== alunosIds.length) throw new AppError("Error ao achar alunos", 400);

        const turmasDosAlunos = await TurmaRepositories.findTurmasByAlunosIds(alunosIds, turmaId);


        const groupedNewSchedules = this.groupSchedulesByDay(
            this.buildNewSchedules(newAgenda)
        );

        const groupedCurrentSchedules = this.groupSchedulesByDay(
            turmasDosAlunos.flatMap((turma) =>
                turma.turma_agenda.map((agenda) =>
                    this.buildCurrentSchedule(
                        turma.id,
                        agenda.dia_semana,
                        agenda.horario_inicio,
                        agenda.horario_fim
                    )
                )
            )
        );

        this.assertNoConflictsAgainstCurrent(
            groupedNewSchedules,
            groupedCurrentSchedules,
            "Aluno já possui turma nessse dia e horário!"
        );
    };

    static async validateTurmaProfessores(
        professores: CreateTurmaProfessorPrisma[],
        newAgenda: CreateTurmaAgendaBody[],
        turmaId?: number
    ) {

        if (!newAgenda?.length) throw new AppError("Agenda da turma é obrigatória!", 404);

        const professoresIds = professores.map(professor => professor.professores_id);
        const findProfessores = await ProfessoresRepositories.findManyByIds(professoresIds);

        if (!findProfessores || findProfessores.length !== professoresIds.length) throw new AppError("Error ao achar professores!", 400);

        const turmasDosProfessores = await TurmaRepositories.findTurmasByProfessoresIds(professoresIds, turmaId);

        const groupedNewSchedules = this.groupSchedulesByDay(
            this.buildNewSchedules(newAgenda)
        );

        const groupedCurrentSchedules = this.groupSchedulesByDay(
            turmasDosProfessores.flatMap((turma) =>
                turma.turma_agenda.map((agenda) =>
                    this.buildCurrentSchedule(
                        turma.id,
                        agenda.dia_semana,
                        agenda.horario_inicio,
                        agenda.horario_fim
                    )
                )
            )
        );

        this.assertNoConflictsAgainstCurrent(
            groupedNewSchedules,
            groupedCurrentSchedules,
            "Professor já possui turma nesse dia e horário!"
        );
    };

    private static buildNewSchedules(
        newAgenda: CreateTurmaAgendaBody[]
    ): ScheduleSlot[] {
        return newAgenda.map((agenda) =>
            this.buildNewSchedule(
                agenda.dia_semana,
                agenda.horario_inicio,
                agenda.horario_fim
            )
        );
    };

    private static buildNewSchedule(
        diaSemana: number,
        inicio: string,
        fim: string
    ): ScheduleSlot {
        return {
            dia_semana: diaSemana,
            inicio: DateUtils.dateToMinutes(DateUtils.toTimeUtc(inicio)),
            fim: DateUtils.dateToMinutes(DateUtils.toTimeUtc(fim)),
        };
    };

    private static buildCurrentSchedule(
        turmaId: number,
        diaSemana: number,
        inicio: Date,
        fim: Date
    ): ScheduleSlot {
        return {
            turma_id: turmaId,
            dia_semana: diaSemana,
            inicio: DateUtils.dateToMinutes(inicio),
            fim: DateUtils.dateToMinutes(fim),
        };
    }

    // agrupa a agenda pelo dia da semana
    private static groupSchedulesByDay(schedules: ScheduleSlot[]): GroupedSchedules {

        const groupedSchedules: GroupedSchedules = new Map(); //map vazio

        // percorre todos os horários e agrupa por dia semana, cada dia possui um array
        for (const schedule of schedules) {
            const currentDaySchedules = groupedSchedules.get(schedule.dia_semana) ?? [];
            currentDaySchedules.push(schedule);

            groupedSchedules.set(schedule.dia_semana, currentDaySchedules);
        };

        // ordena cada dia pelo horario inicial
        for (const [, daySchedules] of groupedSchedules) {
            daySchedules.sort((a, b) => a.inicio - b.inicio);
        };

        return groupedSchedules;
    };

    // conflitos dentro da propia agenda (newAgenda)
    private static assertNoInternalConflicts(
        groupedSchedules: GroupedSchedules,
        message: string
    ) {
        for (const [, daySchedules] of groupedSchedules) {
            for (let index = 1; index < daySchedules.length; index++) {
                const previousSchedule = daySchedules[index - 1];
                const currentSchedule = daySchedules[index];

                if (this.hasConflit(previousSchedule, currentSchedule)) throw new AppError(message, 400);
            };
        };
    };

    // conflitos com a agenda ja existente 
    private static assertNoConflictsAgainstCurrent(
        groupedNewSchedules: GroupedSchedules,
        groupedCurrentSchedules: GroupedSchedules,
        message: string
    ) {
        for (const [diaSemana, newDaySchedules] of groupedNewSchedules) {
            const currentDaySchedules = groupedCurrentSchedules.get(diaSemana);

            if (!currentDaySchedules?.length) continue;

            let newIndex = 0;
            let currentIndex = 0;

            while (
                newIndex < newDaySchedules.length &&
                currentIndex < currentDaySchedules.length
            ) {
                const newSchedule = newDaySchedules[newIndex];
                const currentSchedule = currentDaySchedules[currentIndex]


                if (this.hasConflit(newSchedule, currentSchedule)) throw new AppError(message, 400);

                if (newSchedule.fim <= currentSchedule.inicio) {
                    newIndex++;
                    continue;
                };

                currentIndex++;
            };
        };
    };

    private static hasConflit(
        fresh: Pick<ScheduleSlot, "inicio" | "fim">,
        current: Pick<ScheduleSlot, "inicio" | "fim">
    ) {
        return fresh.inicio < current.fim && current.inicio < fresh.fim
    };
};