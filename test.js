const data = [
    {
        "id": 27,
        "nome": "Turma H",
        "horas_semana": "3.5",
        "status": "ATIVO",
        "created_at": "2026-04-27T13:55:21.835Z",
        "updated_at": "2026-04-27T13:55:21.835Z",
        "turma_agenda": [
            {
                "id": 47,
                "turma_id": 27,
                "dia_semana": 1,
                "horario_inicio": "1970-01-01T08:00:00.000Z",
                "horario_fim": "1970-01-01T09:00:00.000Z",
                "created_at": "2026-04-27T13:55:21.949Z",
                "updated_at": "2026-04-27T13:55:21.949Z"
            },
            {
                "id": 48,
                "turma_id": 27,
                "dia_semana": 3,
                "horario_inicio": "1970-01-01T08:00:00.000Z",
                "horario_fim": "1970-01-01T09:00:00.000Z",
                "created_at": "2026-04-27T13:55:21.949Z",
                "updated_at": "2026-04-27T13:55:21.949Z"
            }
        ]
    },
    {
        "id": 28,
        "nome": "Turma I",
        "horas_semana": "3.5",
        "status": "ATIVO",
        "created_at": "2026-04-27T13:56:19.241Z",
        "updated_at": "2026-04-27T13:56:19.241Z",
        "turma_agenda": [
            {
                "id": 49,
                "turma_id": 28,
                "dia_semana": 1,
                "horario_inicio": "1970-01-01T08:00:00.000Z",
                "horario_fim": "1970-01-01T09:00:00.000Z",
                "created_at": "2026-04-27T13:56:19.325Z",
                "updated_at": "2026-04-27T13:56:19.325Z"
            },
            {
                "id": 50,
                "turma_id": 28,
                "dia_semana": 3,
                "horario_inicio": "1970-01-01T08:00:00.000Z",
                "horario_fim": "1970-01-01T09:00:00.000Z",
                "created_at": "2026-04-27T13:56:19.325Z",
                "updated_at": "2026-04-27T13:56:19.325Z"
            }
        ]
    }
]

const diasSemana = [
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado"
];


function dateToMinutes(time) {
    const date = new Date(time)

    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();

    return hours * 60 + minutes
};

const agendaFlat = data.flatMap(item =>
    item.turma_agenda.map(agenda => ({
        turma_id: item.id,
        dia: diasSemana[agenda.dia_semana],
        inicio: dateToMinutes(agenda.horario_inicio),
        fim: dateToMinutes(agenda.horario_fim)
    })));

// A começa antes de B acabar?
// E B começa antes de A acabar?

function temConflito(a, b) {
    return (
        a.dia === b.dia &&
        a.turma_id !== b.turma_id &&
        a.inicio < b.fim &&
        b.inicio < a.fim
    );
}


console.log(agendaFlat)

for (let i = 0; i < agendaFlat.length; i++) {
    for (let j = i; j < agendaFlat.length; j++) {
        if (temConflito(agendaFlat[i], agendaFlat[j])) {
            console.log('Conflito detectado');
        }
    };
};


const numeros = [5, 4, 3]

console.log(numeros.map(n => console.log(n)));


const turmaGet = {
    "id": 25,
    "nome": "Turma E",
    "horas_semana": "3.5",
    "status": "ATIVO",
    "created_at": "2026-04-27T01:26:31.732Z",
    "updated_at": "2026-04-27T01:26:31.732Z",
    "turma_agenda": [
        {
            "id": 43,
            "turma_id": 25,
            "dia_semana": 1,
            "horario_inicio": "1970-01-01T11:00:00.000Z",
            "horario_fim": "1970-01-01T15:00:00.000Z",
            "created_at": "2026-04-27T01:26:31.805Z",
            "updated_at": "2026-04-27T01:26:31.805Z"
        },
        {
            "id": 44,
            "turma_id": 25,
            "dia_semana": 3,
            "horario_inicio": "1970-01-01T11:00:00.000Z",
            "horario_fim": "1970-01-01T15:00:00.000Z",
            "created_at": "2026-04-27T01:26:31.805Z",
            "updated_at": "2026-04-27T01:26:31.805Z"
        }
    ],
    "turma_alunos": [
        {
            "id": 34,
            "turma_id": 25,
            "alunos_id": 14,
            "created_at": "2026-04-27T01:26:31.960Z"
        },
        {
            "id": 35,
            "turma_id": 25,
            "alunos_id": 16,
            "created_at": "2026-04-27T01:26:31.960Z"
        }
    ],
    "turma_professores": [
        {
            "id": 5,
            "turma_id": 25,
            "professores_id": 5,
            "created_at": "2026-04-27T01:26:32.105Z"
        }
    ]
}

console.log(turmaGet)