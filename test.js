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

const data2 = {
    "message": "Turmas encontrados com sucesso!",
    "data": [
        {
            "id": 9,
            "nome": "Turma D",
            "horas_semana": "3.5",
            "status": "ATIVO",
            "created_at": "2026-04-26T15:53:18.957Z",
            "updated_at": "2026-04-26T15:53:18.957Z",
            "vigencia_inicio": null,
            "vigencia_fim": null,
            "turma_agenda": [
                {
                    "id": 11,
                    "turma_id": 9,
                    "dia_semana": 1,
                    "horario_inicio": "1970-01-01T11:00:00.000Z",
                    "horario_fim": "1970-01-01T15:00:00.000Z",
                    "created_at": "2026-04-26T15:53:19.031Z",
                    "updated_at": "2026-04-26T15:53:19.031Z"
                },
                {
                    "id": 12,
                    "turma_id": 9,
                    "dia_semana": 3,
                    "horario_inicio": "1970-01-01T11:00:00.000Z",
                    "horario_fim": "1970-01-01T15:00:00.000Z",
                    "created_at": "2026-04-26T15:53:19.031Z",
                    "updated_at": "2026-04-26T15:53:19.031Z"
                }
            ],
            "turma_alunos": [
                {
                    "id": 12,
                    "turma_id": 9,
                    "alunos_id": 14,
                    "created_at": "2026-04-26T15:53:19.105Z",
                    "alunos": {
                        "id": 14,
                        "user_id": 53,
                        "data_nasc": "2009-03-15T00:00:00.000Z",
                        "serie": "1 ano EM",
                        "resp_tel": "79988887770",
                        "resp_nome": "Joao Souza Atualizado",
                        "modalidade_id": 5,
                        "tempo_aula": 60,
                        "horas_semana": "4",
                        "tempo_contrato": 12,
                        "status": "ATIVO",
                        "created_at": "2026-04-22T20:10:42.422Z",
                        "updated_at": "2026-04-22T20:10:42.422Z",
                        "users": {
                            "id": 53,
                            "nome": "Ana Souza Atualizada",
                            "email": "ana.atualizada@email.com",
                            "role": "ALUNO",
                            "tel": "79999999998",
                            "status": "ATIVO",
                            "created_at": "2026-04-22T20:10:42.348Z",
                            "updated_at": "2026-04-22T20:10:42.348Z",
                            "auth_user_id": "03e7dac6-158b-4dfd-a31a-4bd6483de2be",
                            "must_change_password": true
                        }
                    }
                },
                {
                    "id": 13,
                    "turma_id": 9,
                    "alunos_id": 16,
                    "created_at": "2026-04-26T15:53:19.105Z",
                    "alunos": {
                        "id": 16,
                        "user_id": 55,
                        "data_nasc": "2011-07-22T00:00:00.000Z",
                        "serie": "7° ano",
                        "resp_tel": "85998776655",
                        "resp_nome": "Fernanda Oliveira",
                        "modalidade_id": 5,
                        "tempo_aula": 60,
                        "horas_semana": "4",
                        "tempo_contrato": 12,
                        "status": "ATIVO",
                        "created_at": "2026-04-22T22:04:30.723Z",
                        "updated_at": "2026-04-22T22:04:30.723Z",
                        "users": {
                            "id": 55,
                            "nome": "Pedro Oliveira",
                            "email": "pedro.oliveira@email.com",
                            "role": "ALUNO",
                            "tel": "85992345678",
                            "status": "INATIVO",
                            "created_at": "2026-04-22T22:04:30.654Z",
                            "updated_at": "2026-04-22T22:04:30.654Z",
                            "auth_user_id": "c2db76aa-706c-4e55-bdd1-9fe4cd8ca715",
                            "must_change_password": true
                        }
                    }
                }
            ],
            "turma_professores": [
                {
                    "id": 4,
                    "turma_id": 9,
                    "professores_id": 5,
                    "created_at": "2026-04-26T15:53:19.180Z",
                    "professores": {
                        "id": 5,
                        "user_id": 56,
                        "materia": "Português",
                        "modalidade_id": 5,
                        "status": "ATIVO",
                        "created_at": "2026-04-24T17:57:20.820Z",
                        "updated_at": "2026-04-24T17:57:20.820Z",
                        "users": {
                            "id": 56,
                            "nome": "Fernanda Carvalho",
                            "email": "fernanda.carvalho@email.com",
                            "role": "PROFESSOR",
                            "tel": "71991234567",
                            "status": "ATIVO",
                            "created_at": "2026-04-24T17:57:20.721Z",
                            "updated_at": "2026-04-24T17:57:20.721Z",
                            "auth_user_id": "f2510cea-9781-4340-a1fe-28d508266490",
                            "must_change_password": true
                        }
                    }
                }
            ]
        },
        {
            "id": 25,
            "nome": "Turma E",
            "horas_semana": "3.5",
            "status": "ATIVO",
            "created_at": "2026-04-27T01:26:31.732Z",
            "updated_at": "2026-04-27T01:26:31.732Z",
            "vigencia_inicio": null,
            "vigencia_fim": null,
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
                    "created_at": "2026-04-27T01:26:31.960Z",
                    "alunos": {
                        "id": 14,
                        "user_id": 53,
                        "data_nasc": "2009-03-15T00:00:00.000Z",
                        "serie": "1 ano EM",
                        "resp_tel": "79988887770",
                        "resp_nome": "Joao Souza Atualizado",
                        "modalidade_id": 5,
                        "tempo_aula": 60,
                        "horas_semana": "4",
                        "tempo_contrato": 12,
                        "status": "ATIVO",
                        "created_at": "2026-04-22T20:10:42.422Z",
                        "updated_at": "2026-04-22T20:10:42.422Z",
                        "users": {
                            "id": 53,
                            "nome": "Ana Souza Atualizada",
                            "email": "ana.atualizada@email.com",
                            "role": "ALUNO",
                            "tel": "79999999998",
                            "status": "ATIVO",
                            "created_at": "2026-04-22T20:10:42.348Z",
                            "updated_at": "2026-04-22T20:10:42.348Z",
                            "auth_user_id": "03e7dac6-158b-4dfd-a31a-4bd6483de2be",
                            "must_change_password": true
                        }
                    }
                },
                {
                    "id": 35,
                    "turma_id": 25,
                    "alunos_id": 16,
                    "created_at": "2026-04-27T01:26:31.960Z",
                    "alunos": {
                        "id": 16,
                        "user_id": 55,
                        "data_nasc": "2011-07-22T00:00:00.000Z",
                        "serie": "7° ano",
                        "resp_tel": "85998776655",
                        "resp_nome": "Fernanda Oliveira",
                        "modalidade_id": 5,
                        "tempo_aula": 60,
                        "horas_semana": "4",
                        "tempo_contrato": 12,
                        "status": "ATIVO",
                        "created_at": "2026-04-22T22:04:30.723Z",
                        "updated_at": "2026-04-22T22:04:30.723Z",
                        "users": {
                            "id": 55,
                            "nome": "Pedro Oliveira",
                            "email": "pedro.oliveira@email.com",
                            "role": "ALUNO",
                            "tel": "85992345678",
                            "status": "INATIVO",
                            "created_at": "2026-04-22T22:04:30.654Z",
                            "updated_at": "2026-04-22T22:04:30.654Z",
                            "auth_user_id": "c2db76aa-706c-4e55-bdd1-9fe4cd8ca715",
                            "must_change_password": true
                        }
                    }
                }
            ],
            "turma_professores": [
                {
                    "id": 5,
                    "turma_id": 25,
                    "professores_id": 5,
                    "created_at": "2026-04-27T01:26:32.105Z",
                    "professores": {
                        "id": 5,
                        "user_id": 56,
                        "materia": "Português",
                        "modalidade_id": 5,
                        "status": "ATIVO",
                        "created_at": "2026-04-24T17:57:20.820Z",
                        "updated_at": "2026-04-24T17:57:20.820Z",
                        "users": {
                            "id": 56,
                            "nome": "Fernanda Carvalho",
                            "email": "fernanda.carvalho@email.com",
                            "role": "PROFESSOR",
                            "tel": "71991234567",
                            "status": "ATIVO",
                            "created_at": "2026-04-24T17:57:20.721Z",
                            "updated_at": "2026-04-24T17:57:20.721Z",
                            "auth_user_id": "f2510cea-9781-4340-a1fe-28d508266490",
                            "must_change_password": true
                        }
                    }
                }
            ]
        },
        {
            "id": 26,
            "nome": "Turma F",
            "horas_semana": "3.5",
            "status": "ATIVO",
            "created_at": "2026-04-27T01:38:22.261Z",
            "updated_at": "2026-04-27T01:38:22.261Z",
            "vigencia_inicio": null,
            "vigencia_fim": null,
            "turma_agenda": [
                {
                    "id": 45,
                    "turma_id": 26,
                    "dia_semana": 1,
                    "horario_inicio": "1970-01-01T08:00:00.000Z",
                    "horario_fim": "1970-01-01T12:00:00.000Z",
                    "created_at": "2026-04-27T01:38:22.341Z",
                    "updated_at": "2026-04-27T01:38:22.341Z"
                },
                {
                    "id": 46,
                    "turma_id": 26,
                    "dia_semana": 3,
                    "horario_inicio": "1970-01-01T08:00:00.000Z",
                    "horario_fim": "1970-01-01T12:00:00.000Z",
                    "created_at": "2026-04-27T01:38:22.341Z",
                    "updated_at": "2026-04-27T01:38:22.341Z"
                }
            ],
            "turma_alunos": [
                {
                    "id": 36,
                    "turma_id": 26,
                    "alunos_id": 14,
                    "created_at": "2026-04-27T01:38:22.496Z",
                    "alunos": {
                        "id": 14,
                        "user_id": 53,
                        "data_nasc": "2009-03-15T00:00:00.000Z",
                        "serie": "1 ano EM",
                        "resp_tel": "79988887770",
                        "resp_nome": "Joao Souza Atualizado",
                        "modalidade_id": 5,
                        "tempo_aula": 60,
                        "horas_semana": "4",
                        "tempo_contrato": 12,
                        "status": "ATIVO",
                        "created_at": "2026-04-22T20:10:42.422Z",
                        "updated_at": "2026-04-22T20:10:42.422Z",
                        "users": {
                            "id": 53,
                            "nome": "Ana Souza Atualizada",
                            "email": "ana.atualizada@email.com",
                            "role": "ALUNO",
                            "tel": "79999999998",
                            "status": "ATIVO",
                            "created_at": "2026-04-22T20:10:42.348Z",
                            "updated_at": "2026-04-22T20:10:42.348Z",
                            "auth_user_id": "03e7dac6-158b-4dfd-a31a-4bd6483de2be",
                            "must_change_password": true
                        }
                    }
                },
                {
                    "id": 37,
                    "turma_id": 26,
                    "alunos_id": 16,
                    "created_at": "2026-04-27T01:38:22.496Z",
                    "alunos": {
                        "id": 16,
                        "user_id": 55,
                        "data_nasc": "2011-07-22T00:00:00.000Z",
                        "serie": "7° ano",
                        "resp_tel": "85998776655",
                        "resp_nome": "Fernanda Oliveira",
                        "modalidade_id": 5,
                        "tempo_aula": 60,
                        "horas_semana": "4",
                        "tempo_contrato": 12,
                        "status": "ATIVO",
                        "created_at": "2026-04-22T22:04:30.723Z",
                        "updated_at": "2026-04-22T22:04:30.723Z",
                        "users": {
                            "id": 55,
                            "nome": "Pedro Oliveira",
                            "email": "pedro.oliveira@email.com",
                            "role": "ALUNO",
                            "tel": "85992345678",
                            "status": "INATIVO",
                            "created_at": "2026-04-22T22:04:30.654Z",
                            "updated_at": "2026-04-22T22:04:30.654Z",
                            "auth_user_id": "c2db76aa-706c-4e55-bdd1-9fe4cd8ca715",
                            "must_change_password": true
                        }
                    }
                }
            ],
            "turma_professores": [
                {
                    "id": 6,
                    "turma_id": 26,
                    "professores_id": 5,
                    "created_at": "2026-04-27T01:38:22.635Z",
                    "professores": {
                        "id": 5,
                        "user_id": 56,
                        "materia": "Português",
                        "modalidade_id": 5,
                        "status": "ATIVO",
                        "created_at": "2026-04-24T17:57:20.820Z",
                        "updated_at": "2026-04-24T17:57:20.820Z",
                        "users": {
                            "id": 56,
                            "nome": "Fernanda Carvalho",
                            "email": "fernanda.carvalho@email.com",
                            "role": "PROFESSOR",
                            "tel": "71991234567",
                            "status": "ATIVO",
                            "created_at": "2026-04-24T17:57:20.721Z",
                            "updated_at": "2026-04-24T17:57:20.721Z",
                            "auth_user_id": "f2510cea-9781-4340-a1fe-28d508266490",
                            "must_change_password": true
                        }
                    }
                }
            ]
        },
        {
            "id": 27,
            "nome": "Turma H",
            "horas_semana": "3.5",
            "status": "ATIVO",
            "created_at": "2026-04-27T13:55:21.835Z",
            "updated_at": "2026-04-27T13:55:21.835Z",
            "vigencia_inicio": null,
            "vigencia_fim": null,
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
            ],
            "turma_alunos": [
                {
                    "id": 38,
                    "turma_id": 27,
                    "alunos_id": 14,
                    "created_at": "2026-04-27T13:55:22.188Z",
                    "alunos": {
                        "id": 14,
                        "user_id": 53,
                        "data_nasc": "2009-03-15T00:00:00.000Z",
                        "serie": "1 ano EM",
                        "resp_tel": "79988887770",
                        "resp_nome": "Joao Souza Atualizado",
                        "modalidade_id": 5,
                        "tempo_aula": 60,
                        "horas_semana": "4",
                        "tempo_contrato": 12,
                        "status": "ATIVO",
                        "created_at": "2026-04-22T20:10:42.422Z",
                        "updated_at": "2026-04-22T20:10:42.422Z",
                        "users": {
                            "id": 53,
                            "nome": "Ana Souza Atualizada",
                            "email": "ana.atualizada@email.com",
                            "role": "ALUNO",
                            "tel": "79999999998",
                            "status": "ATIVO",
                            "created_at": "2026-04-22T20:10:42.348Z",
                            "updated_at": "2026-04-22T20:10:42.348Z",
                            "auth_user_id": "03e7dac6-158b-4dfd-a31a-4bd6483de2be",
                            "must_change_password": true
                        }
                    }
                },
                {
                    "id": 39,
                    "turma_id": 27,
                    "alunos_id": 16,
                    "created_at": "2026-04-27T13:55:22.188Z",
                    "alunos": {
                        "id": 16,
                        "user_id": 55,
                        "data_nasc": "2011-07-22T00:00:00.000Z",
                        "serie": "7° ano",
                        "resp_tel": "85998776655",
                        "resp_nome": "Fernanda Oliveira",
                        "modalidade_id": 5,
                        "tempo_aula": 60,
                        "horas_semana": "4",
                        "tempo_contrato": 12,
                        "status": "ATIVO",
                        "created_at": "2026-04-22T22:04:30.723Z",
                        "updated_at": "2026-04-22T22:04:30.723Z",
                        "users": {
                            "id": 55,
                            "nome": "Pedro Oliveira",
                            "email": "pedro.oliveira@email.com",
                            "role": "ALUNO",
                            "tel": "85992345678",
                            "status": "INATIVO",
                            "created_at": "2026-04-22T22:04:30.654Z",
                            "updated_at": "2026-04-22T22:04:30.654Z",
                            "auth_user_id": "c2db76aa-706c-4e55-bdd1-9fe4cd8ca715",
                            "must_change_password": true
                        }
                    }
                }
            ],
            "turma_professores": [
                {
                    "id": 7,
                    "turma_id": 27,
                    "professores_id": 5,
                    "created_at": "2026-04-27T13:55:22.377Z",
                    "professores": {
                        "id": 5,
                        "user_id": 56,
                        "materia": "Português",
                        "modalidade_id": 5,
                        "status": "ATIVO",
                        "created_at": "2026-04-24T17:57:20.820Z",
                        "updated_at": "2026-04-24T17:57:20.820Z",
                        "users": {
                            "id": 56,
                            "nome": "Fernanda Carvalho",
                            "email": "fernanda.carvalho@email.com",
                            "role": "PROFESSOR",
                            "tel": "71991234567",
                            "status": "ATIVO",
                            "created_at": "2026-04-24T17:57:20.721Z",
                            "updated_at": "2026-04-24T17:57:20.721Z",
                            "auth_user_id": "f2510cea-9781-4340-a1fe-28d508266490",
                            "must_change_password": true
                        }
                    }
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
            "vigencia_inicio": null,
            "vigencia_fim": null,
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
            ],
            "turma_alunos": [
                {
                    "id": 40,
                    "turma_id": 28,
                    "alunos_id": 14,
                    "created_at": "2026-04-27T13:56:19.508Z",
                    "alunos": {
                        "id": 14,
                        "user_id": 53,
                        "data_nasc": "2009-03-15T00:00:00.000Z",
                        "serie": "1 ano EM",
                        "resp_tel": "79988887770",
                        "resp_nome": "Joao Souza Atualizado",
                        "modalidade_id": 5,
                        "tempo_aula": 60,
                        "horas_semana": "4",
                        "tempo_contrato": 12,
                        "status": "ATIVO",
                        "created_at": "2026-04-22T20:10:42.422Z",
                        "updated_at": "2026-04-22T20:10:42.422Z",
                        "users": {
                            "id": 53,
                            "nome": "Ana Souza Atualizada",
                            "email": "ana.atualizada@email.com",
                            "role": "ALUNO",
                            "tel": "79999999998",
                            "status": "ATIVO",
                            "created_at": "2026-04-22T20:10:42.348Z",
                            "updated_at": "2026-04-22T20:10:42.348Z",
                            "auth_user_id": "03e7dac6-158b-4dfd-a31a-4bd6483de2be",
                            "must_change_password": true
                        }
                    }
                },
                {
                    "id": 41,
                    "turma_id": 28,
                    "alunos_id": 16,
                    "created_at": "2026-04-27T13:56:19.508Z",
                    "alunos": {
                        "id": 16,
                        "user_id": 55,
                        "data_nasc": "2011-07-22T00:00:00.000Z",
                        "serie": "7° ano",
                        "resp_tel": "85998776655",
                        "resp_nome": "Fernanda Oliveira",
                        "modalidade_id": 5,
                        "tempo_aula": 60,
                        "horas_semana": "4",
                        "tempo_contrato": 12,
                        "status": "ATIVO",
                        "created_at": "2026-04-22T22:04:30.723Z",
                        "updated_at": "2026-04-22T22:04:30.723Z",
                        "users": {
                            "id": 55,
                            "nome": "Pedro Oliveira",
                            "email": "pedro.oliveira@email.com",
                            "role": "ALUNO",
                            "tel": "85992345678",
                            "status": "INATIVO",
                            "created_at": "2026-04-22T22:04:30.654Z",
                            "updated_at": "2026-04-22T22:04:30.654Z",
                            "auth_user_id": "c2db76aa-706c-4e55-bdd1-9fe4cd8ca715",
                            "must_change_password": true
                        }
                    }
                }
            ],
            "turma_professores": [
                {
                    "id": 8,
                    "turma_id": 28,
                    "professores_id": 5,
                    "created_at": "2026-04-27T13:56:19.653Z",
                    "professores": {
                        "id": 5,
                        "user_id": 56,
                        "materia": "Português",
                        "modalidade_id": 5,
                        "status": "ATIVO",
                        "created_at": "2026-04-24T17:57:20.820Z",
                        "updated_at": "2026-04-24T17:57:20.820Z",
                        "users": {
                            "id": 56,
                            "nome": "Fernanda Carvalho",
                            "email": "fernanda.carvalho@email.com",
                            "role": "PROFESSOR",
                            "tel": "71991234567",
                            "status": "ATIVO",
                            "created_at": "2026-04-24T17:57:20.721Z",
                            "updated_at": "2026-04-24T17:57:20.721Z",
                            "auth_user_id": "f2510cea-9781-4340-a1fe-28d508266490",
                            "must_change_password": true
                        }
                    }
                }
            ]
        },
        {
            "id": 29,
            "nome": "Turma J",
            "horas_semana": "3.5",
            "status": "ATIVO",
            "created_at": "2026-04-27T15:00:06.709Z",
            "updated_at": "2026-04-27T15:00:06.709Z",
            "vigencia_inicio": null,
            "vigencia_fim": null,
            "turma_agenda": [
                {
                    "id": 51,
                    "turma_id": 29,
                    "dia_semana": 1,
                    "horario_inicio": "1970-01-01T08:00:00.000Z",
                    "horario_fim": "1970-01-01T09:00:00.000Z",
                    "created_at": "2026-04-27T15:00:06.794Z",
                    "updated_at": "2026-04-27T15:00:06.794Z"
                },
                {
                    "id": 52,
                    "turma_id": 29,
                    "dia_semana": 3,
                    "horario_inicio": "1970-01-01T08:00:00.000Z",
                    "horario_fim": "1970-01-01T09:00:00.000Z",
                    "created_at": "2026-04-27T15:00:06.794Z",
                    "updated_at": "2026-04-27T15:00:06.794Z"
                }
            ],
            "turma_alunos": [
                {
                    "id": 42,
                    "turma_id": 29,
                    "alunos_id": 14,
                    "created_at": "2026-04-27T15:00:06.956Z",
                    "alunos": {
                        "id": 14,
                        "user_id": 53,
                        "data_nasc": "2009-03-15T00:00:00.000Z",
                        "serie": "1 ano EM",
                        "resp_tel": "79988887770",
                        "resp_nome": "Joao Souza Atualizado",
                        "modalidade_id": 5,
                        "tempo_aula": 60,
                        "horas_semana": "4",
                        "tempo_contrato": 12,
                        "status": "ATIVO",
                        "created_at": "2026-04-22T20:10:42.422Z",
                        "updated_at": "2026-04-22T20:10:42.422Z",
                        "users": {
                            "id": 53,
                            "nome": "Ana Souza Atualizada",
                            "email": "ana.atualizada@email.com",
                            "role": "ALUNO",
                            "tel": "79999999998",
                            "status": "ATIVO",
                            "created_at": "2026-04-22T20:10:42.348Z",
                            "updated_at": "2026-04-22T20:10:42.348Z",
                            "auth_user_id": "03e7dac6-158b-4dfd-a31a-4bd6483de2be",
                            "must_change_password": true
                        }
                    }
                },
                {
                    "id": 43,
                    "turma_id": 29,
                    "alunos_id": 16,
                    "created_at": "2026-04-27T15:00:06.956Z",
                    "alunos": {
                        "id": 16,
                        "user_id": 55,
                        "data_nasc": "2011-07-22T00:00:00.000Z",
                        "serie": "7° ano",
                        "resp_tel": "85998776655",
                        "resp_nome": "Fernanda Oliveira",
                        "modalidade_id": 5,
                        "tempo_aula": 60,
                        "horas_semana": "4",
                        "tempo_contrato": 12,
                        "status": "ATIVO",
                        "created_at": "2026-04-22T22:04:30.723Z",
                        "updated_at": "2026-04-22T22:04:30.723Z",
                        "users": {
                            "id": 55,
                            "nome": "Pedro Oliveira",
                            "email": "pedro.oliveira@email.com",
                            "role": "ALUNO",
                            "tel": "85992345678",
                            "status": "INATIVO",
                            "created_at": "2026-04-22T22:04:30.654Z",
                            "updated_at": "2026-04-22T22:04:30.654Z",
                            "auth_user_id": "c2db76aa-706c-4e55-bdd1-9fe4cd8ca715",
                            "must_change_password": true
                        }
                    }
                }
            ],
            "turma_professores": [
                {
                    "id": 9,
                    "turma_id": 29,
                    "professores_id": 5,
                    "created_at": "2026-04-27T15:00:07.105Z",
                    "professores": {
                        "id": 5,
                        "user_id": 56,
                        "materia": "Português",
                        "modalidade_id": 5,
                        "status": "ATIVO",
                        "created_at": "2026-04-24T17:57:20.820Z",
                        "updated_at": "2026-04-24T17:57:20.820Z",
                        "users": {
                            "id": 56,
                            "nome": "Fernanda Carvalho",
                            "email": "fernanda.carvalho@email.com",
                            "role": "PROFESSOR",
                            "tel": "71991234567",
                            "status": "ATIVO",
                            "created_at": "2026-04-24T17:57:20.721Z",
                            "updated_at": "2026-04-24T17:57:20.721Z",
                            "auth_user_id": "f2510cea-9781-4340-a1fe-28d508266490",
                            "must_change_password": true
                        }
                    }
                }
            ]
        },
        {
            "id": 30,
            "nome": "Turma K",
            "horas_semana": "3.5",
            "status": "ATIVO",
            "created_at": "2026-04-27T15:16:16.087Z",
            "updated_at": "2026-04-27T15:16:16.087Z",
            "vigencia_inicio": null,
            "vigencia_fim": null,
            "turma_agenda": [
                {
                    "id": 53,
                    "turma_id": 30,
                    "dia_semana": 1,
                    "horario_inicio": "1970-01-01T08:00:00.000Z",
                    "horario_fim": "1970-01-01T09:00:00.000Z",
                    "created_at": "2026-04-27T15:16:16.160Z",
                    "updated_at": "2026-04-27T15:16:16.160Z"
                },
                {
                    "id": 54,
                    "turma_id": 30,
                    "dia_semana": 3,
                    "horario_inicio": "1970-01-01T08:00:00.000Z",
                    "horario_fim": "1970-01-01T09:00:00.000Z",
                    "created_at": "2026-04-27T15:16:16.160Z",
                    "updated_at": "2026-04-27T15:16:16.160Z"
                }
            ],
            "turma_alunos": [
                {
                    "id": 44,
                    "turma_id": 30,
                    "alunos_id": 14,
                    "created_at": "2026-04-27T15:16:16.301Z",
                    "alunos": {
                        "id": 14,
                        "user_id": 53,
                        "data_nasc": "2009-03-15T00:00:00.000Z",
                        "serie": "1 ano EM",
                        "resp_tel": "79988887770",
                        "resp_nome": "Joao Souza Atualizado",
                        "modalidade_id": 5,
                        "tempo_aula": 60,
                        "horas_semana": "4",
                        "tempo_contrato": 12,
                        "status": "ATIVO",
                        "created_at": "2026-04-22T20:10:42.422Z",
                        "updated_at": "2026-04-22T20:10:42.422Z",
                        "users": {
                            "id": 53,
                            "nome": "Ana Souza Atualizada",
                            "email": "ana.atualizada@email.com",
                            "role": "ALUNO",
                            "tel": "79999999998",
                            "status": "ATIVO",
                            "created_at": "2026-04-22T20:10:42.348Z",
                            "updated_at": "2026-04-22T20:10:42.348Z",
                            "auth_user_id": "03e7dac6-158b-4dfd-a31a-4bd6483de2be",
                            "must_change_password": true
                        }
                    }
                },
                {
                    "id": 45,
                    "turma_id": 30,
                    "alunos_id": 16,
                    "created_at": "2026-04-27T15:16:16.301Z",
                    "alunos": {
                        "id": 16,
                        "user_id": 55,
                        "data_nasc": "2011-07-22T00:00:00.000Z",
                        "serie": "7° ano",
                        "resp_tel": "85998776655",
                        "resp_nome": "Fernanda Oliveira",
                        "modalidade_id": 5,
                        "tempo_aula": 60,
                        "horas_semana": "4",
                        "tempo_contrato": 12,
                        "status": "ATIVO",
                        "created_at": "2026-04-22T22:04:30.723Z",
                        "updated_at": "2026-04-22T22:04:30.723Z",
                        "users": {
                            "id": 55,
                            "nome": "Pedro Oliveira",
                            "email": "pedro.oliveira@email.com",
                            "role": "ALUNO",
                            "tel": "85992345678",
                            "status": "INATIVO",
                            "created_at": "2026-04-22T22:04:30.654Z",
                            "updated_at": "2026-04-22T22:04:30.654Z",
                            "auth_user_id": "c2db76aa-706c-4e55-bdd1-9fe4cd8ca715",
                            "must_change_password": true
                        }
                    }
                }
            ],
            "turma_professores": [
                {
                    "id": 10,
                    "turma_id": 30,
                    "professores_id": 5,
                    "created_at": "2026-04-27T15:16:16.441Z",
                    "professores": {
                        "id": 5,
                        "user_id": 56,
                        "materia": "Português",
                        "modalidade_id": 5,
                        "status": "ATIVO",
                        "created_at": "2026-04-24T17:57:20.820Z",
                        "updated_at": "2026-04-24T17:57:20.820Z",
                        "users": {
                            "id": 56,
                            "nome": "Fernanda Carvalho",
                            "email": "fernanda.carvalho@email.com",
                            "role": "PROFESSOR",
                            "tel": "71991234567",
                            "status": "ATIVO",
                            "created_at": "2026-04-24T17:57:20.721Z",
                            "updated_at": "2026-04-24T17:57:20.721Z",
                            "auth_user_id": "f2510cea-9781-4340-a1fe-28d508266490",
                            "must_change_password": true
                        }
                    }
                }
            ]
        },
        {
            "id": 31,
            "nome": "Turma Z",
            "horas_semana": "3.5",
            "status": "ATIVO",
            "created_at": "2026-04-27T15:16:57.092Z",
            "updated_at": "2026-04-27T15:16:57.092Z",
            "vigencia_inicio": null,
            "vigencia_fim": null,
            "turma_agenda": [
                {
                    "id": 55,
                    "turma_id": 31,
                    "dia_semana": 1,
                    "horario_inicio": "1970-01-01T08:00:00.000Z",
                    "horario_fim": "1970-01-01T09:00:00.000Z",
                    "created_at": "2026-04-27T15:16:57.161Z",
                    "updated_at": "2026-04-27T15:16:57.161Z"
                },
                {
                    "id": 56,
                    "turma_id": 31,
                    "dia_semana": 3,
                    "horario_inicio": "1970-01-01T08:00:00.000Z",
                    "horario_fim": "1970-01-01T09:00:00.000Z",
                    "created_at": "2026-04-27T15:16:57.161Z",
                    "updated_at": "2026-04-27T15:16:57.161Z"
                }
            ],
            "turma_alunos": [
                {
                    "id": 46,
                    "turma_id": 31,
                    "alunos_id": 14,
                    "created_at": "2026-04-27T15:16:57.301Z",
                    "alunos": {
                        "id": 14,
                        "user_id": 53,
                        "data_nasc": "2009-03-15T00:00:00.000Z",
                        "serie": "1 ano EM",
                        "resp_tel": "79988887770",
                        "resp_nome": "Joao Souza Atualizado",
                        "modalidade_id": 5,
                        "tempo_aula": 60,
                        "horas_semana": "4",
                        "tempo_contrato": 12,
                        "status": "ATIVO",
                        "created_at": "2026-04-22T20:10:42.422Z",
                        "updated_at": "2026-04-22T20:10:42.422Z",
                        "users": {
                            "id": 53,
                            "nome": "Ana Souza Atualizada",
                            "email": "ana.atualizada@email.com",
                            "role": "ALUNO",
                            "tel": "79999999998",
                            "status": "ATIVO",
                            "created_at": "2026-04-22T20:10:42.348Z",
                            "updated_at": "2026-04-22T20:10:42.348Z",
                            "auth_user_id": "03e7dac6-158b-4dfd-a31a-4bd6483de2be",
                            "must_change_password": true
                        }
                    }
                },
                {
                    "id": 47,
                    "turma_id": 31,
                    "alunos_id": 16,
                    "created_at": "2026-04-27T15:16:57.301Z",
                    "alunos": {
                        "id": 16,
                        "user_id": 55,
                        "data_nasc": "2011-07-22T00:00:00.000Z",
                        "serie": "7° ano",
                        "resp_tel": "85998776655",
                        "resp_nome": "Fernanda Oliveira",
                        "modalidade_id": 5,
                        "tempo_aula": 60,
                        "horas_semana": "4",
                        "tempo_contrato": 12,
                        "status": "ATIVO",
                        "created_at": "2026-04-22T22:04:30.723Z",
                        "updated_at": "2026-04-22T22:04:30.723Z",
                        "users": {
                            "id": 55,
                            "nome": "Pedro Oliveira",
                            "email": "pedro.oliveira@email.com",
                            "role": "ALUNO",
                            "tel": "85992345678",
                            "status": "INATIVO",
                            "created_at": "2026-04-22T22:04:30.654Z",
                            "updated_at": "2026-04-22T22:04:30.654Z",
                            "auth_user_id": "c2db76aa-706c-4e55-bdd1-9fe4cd8ca715",
                            "must_change_password": true
                        }
                    }
                }
            ],
            "turma_professores": [
                {
                    "id": 11,
                    "turma_id": 31,
                    "professores_id": 5,
                    "created_at": "2026-04-27T15:16:57.439Z",
                    "professores": {
                        "id": 5,
                        "user_id": 56,
                        "materia": "Português",
                        "modalidade_id": 5,
                        "status": "ATIVO",
                        "created_at": "2026-04-24T17:57:20.820Z",
                        "updated_at": "2026-04-24T17:57:20.820Z",
                        "users": {
                            "id": 56,
                            "nome": "Fernanda Carvalho",
                            "email": "fernanda.carvalho@email.com",
                            "role": "PROFESSOR",
                            "tel": "71991234567",
                            "status": "ATIVO",
                            "created_at": "2026-04-24T17:57:20.721Z",
                            "updated_at": "2026-04-24T17:57:20.721Z",
                            "auth_user_id": "f2510cea-9781-4340-a1fe-28d508266490",
                            "must_change_password": true
                        }
                    }
                }
            ]
        },
        {
            "id": 34,
            "nome": "Turma P",
            "horas_semana": "3.5",
            "status": "ATIVO",
            "created_at": "2026-04-27T16:17:07.655Z",
            "updated_at": "2026-04-27T16:17:07.655Z",
            "vigencia_inicio": null,
            "vigencia_fim": null,
            "turma_agenda": [
                {
                    "id": 61,
                    "turma_id": 34,
                    "dia_semana": 2,
                    "horario_inicio": "1970-01-01T08:00:00.000Z",
                    "horario_fim": "1970-01-01T09:00:00.000Z",
                    "created_at": "2026-04-27T16:17:07.719Z",
                    "updated_at": "2026-04-27T16:17:07.719Z"
                },
                {
                    "id": 62,
                    "turma_id": 34,
                    "dia_semana": 5,
                    "horario_inicio": "1970-01-01T08:00:00.000Z",
                    "horario_fim": "1970-01-01T09:00:00.000Z",
                    "created_at": "2026-04-27T16:17:07.719Z",
                    "updated_at": "2026-04-27T16:17:07.719Z"
                }
            ],
            "turma_alunos": [
                {
                    "id": 52,
                    "turma_id": 34,
                    "alunos_id": 14,
                    "created_at": "2026-04-27T16:17:07.849Z",
                    "alunos": {
                        "id": 14,
                        "user_id": 53,
                        "data_nasc": "2009-03-15T00:00:00.000Z",
                        "serie": "1 ano EM",
                        "resp_tel": "79988887770",
                        "resp_nome": "Joao Souza Atualizado",
                        "modalidade_id": 5,
                        "tempo_aula": 60,
                        "horas_semana": "4",
                        "tempo_contrato": 12,
                        "status": "ATIVO",
                        "created_at": "2026-04-22T20:10:42.422Z",
                        "updated_at": "2026-04-22T20:10:42.422Z",
                        "users": {
                            "id": 53,
                            "nome": "Ana Souza Atualizada",
                            "email": "ana.atualizada@email.com",
                            "role": "ALUNO",
                            "tel": "79999999998",
                            "status": "ATIVO",
                            "created_at": "2026-04-22T20:10:42.348Z",
                            "updated_at": "2026-04-22T20:10:42.348Z",
                            "auth_user_id": "03e7dac6-158b-4dfd-a31a-4bd6483de2be",
                            "must_change_password": true
                        }
                    }
                },
                {
                    "id": 53,
                    "turma_id": 34,
                    "alunos_id": 16,
                    "created_at": "2026-04-27T16:17:07.849Z",
                    "alunos": {
                        "id": 16,
                        "user_id": 55,
                        "data_nasc": "2011-07-22T00:00:00.000Z",
                        "serie": "7° ano",
                        "resp_tel": "85998776655",
                        "resp_nome": "Fernanda Oliveira",
                        "modalidade_id": 5,
                        "tempo_aula": 60,
                        "horas_semana": "4",
                        "tempo_contrato": 12,
                        "status": "ATIVO",
                        "created_at": "2026-04-22T22:04:30.723Z",
                        "updated_at": "2026-04-22T22:04:30.723Z",
                        "users": {
                            "id": 55,
                            "nome": "Pedro Oliveira",
                            "email": "pedro.oliveira@email.com",
                            "role": "ALUNO",
                            "tel": "85992345678",
                            "status": "INATIVO",
                            "created_at": "2026-04-22T22:04:30.654Z",
                            "updated_at": "2026-04-22T22:04:30.654Z",
                            "auth_user_id": "c2db76aa-706c-4e55-bdd1-9fe4cd8ca715",
                            "must_change_password": true
                        }
                    }
                }
            ],
            "turma_professores": [
                {
                    "id": 12,
                    "turma_id": 34,
                    "professores_id": 5,
                    "created_at": "2026-04-27T16:17:08.367Z",
                    "professores": {
                        "id": 5,
                        "user_id": 56,
                        "materia": "Português",
                        "modalidade_id": 5,
                        "status": "ATIVO",
                        "created_at": "2026-04-24T17:57:20.820Z",
                        "updated_at": "2026-04-24T17:57:20.820Z",
                        "users": {
                            "id": 56,
                            "nome": "Fernanda Carvalho",
                            "email": "fernanda.carvalho@email.com",
                            "role": "PROFESSOR",
                            "tel": "71991234567",
                            "status": "ATIVO",
                            "created_at": "2026-04-24T17:57:20.721Z",
                            "updated_at": "2026-04-24T17:57:20.721Z",
                            "auth_user_id": "f2510cea-9781-4340-a1fe-28d508266490",
                            "must_change_password": true
                        }
                    }
                },
                {
                    "id": 13,
                    "turma_id": 34,
                    "professores_id": 7,
                    "created_at": "2026-04-27T16:17:08.367Z",
                    "professores": {
                        "id": 7,
                        "user_id": 58,
                        "materia": "Geografia",
                        "modalidade_id": 5,
                        "status": "ATIVO",
                        "created_at": "2026-04-27T16:15:25.964Z",
                        "updated_at": "2026-04-27T16:15:25.964Z",
                        "users": {
                            "id": 58,
                            "nome": "Eduardo Santos",
                            "email": "eduardo.santos@email.com",
                            "role": "PROFESSOR",
                            "tel": "51994567890",
                            "status": "ATIVO",
                            "created_at": "2026-04-27T16:15:25.883Z",
                            "updated_at": "2026-04-27T16:15:25.883Z",
                            "auth_user_id": "641f619c-4567-4e52-ba9f-2519bed4cf42",
                            "must_change_password": true
                        }
                    }
                }
            ]
        },
        {
            "id": 6,
            "nome": "Turma C",
            "horas_semana": "3.5",
            "status": "ATIVO",
            "created_at": "2026-04-26T15:39:02.344Z",
            "updated_at": "2026-04-26T15:39:02.344Z",
            "vigencia_inicio": null,
            "vigencia_fim": null,
            "turma_agenda": [],
            "turma_alunos": [],
            "turma_professores": []
        },
        {
            "id": 35,
            "nome": "Turma Y",
            "horas_semana": "3.5",
            "status": "ATIVO",
            "created_at": "2026-04-28T19:42:45.544Z",
            "updated_at": "2026-04-28T19:42:45.544Z",
            "vigencia_inicio": "2026-05-01T00:00:00.000Z",
            "vigencia_fim": "2026-12-15T00:00:00.000Z",
            "turma_agenda": [
                {
                    "id": 63,
                    "turma_id": 35,
                    "dia_semana": 1,
                    "horario_inicio": "1970-01-01T08:00:00.000Z",
                    "horario_fim": "1970-01-01T12:00:00.000Z",
                    "created_at": "2026-04-28T19:42:46.044Z",
                    "updated_at": "2026-04-28T19:42:46.044Z"
                },
                {
                    "id": 64,
                    "turma_id": 35,
                    "dia_semana": 3,
                    "horario_inicio": "1970-01-01T08:00:00.000Z",
                    "horario_fim": "1970-01-01T12:00:00.000Z",
                    "created_at": "2026-04-28T19:42:46.044Z",
                    "updated_at": "2026-04-28T19:42:46.044Z"
                }
            ],
            "turma_alunos": [
                {
                    "id": 54,
                    "turma_id": 35,
                    "alunos_id": 14,
                    "created_at": "2026-04-28T19:42:46.408Z",
                    "alunos": {
                        "id": 14,
                        "user_id": 53,
                        "data_nasc": "2009-03-15T00:00:00.000Z",
                        "serie": "1 ano EM",
                        "resp_tel": "79988887770",
                        "resp_nome": "Joao Souza Atualizado",
                        "modalidade_id": 5,
                        "tempo_aula": 60,
                        "horas_semana": "4",
                        "tempo_contrato": 12,
                        "status": "ATIVO",
                        "created_at": "2026-04-22T20:10:42.422Z",
                        "updated_at": "2026-04-22T20:10:42.422Z",
                        "users": {
                            "id": 53,
                            "nome": "Ana Souza Atualizada",
                            "email": "ana.atualizada@email.com",
                            "role": "ALUNO",
                            "tel": "79999999998",
                            "status": "ATIVO",
                            "created_at": "2026-04-22T20:10:42.348Z",
                            "updated_at": "2026-04-22T20:10:42.348Z",
                            "auth_user_id": "03e7dac6-158b-4dfd-a31a-4bd6483de2be",
                            "must_change_password": true
                        }
                    }
                },
                {
                    "id": 55,
                    "turma_id": 35,
                    "alunos_id": 16,
                    "created_at": "2026-04-28T19:42:46.408Z",
                    "alunos": {
                        "id": 16,
                        "user_id": 55,
                        "data_nasc": "2011-07-22T00:00:00.000Z",
                        "serie": "7° ano",
                        "resp_tel": "85998776655",
                        "resp_nome": "Fernanda Oliveira",
                        "modalidade_id": 5,
                        "tempo_aula": 60,
                        "horas_semana": "4",
                        "tempo_contrato": 12,
                        "status": "ATIVO",
                        "created_at": "2026-04-22T22:04:30.723Z",
                        "updated_at": "2026-04-22T22:04:30.723Z",
                        "users": {
                            "id": 55,
                            "nome": "Pedro Oliveira",
                            "email": "pedro.oliveira@email.com",
                            "role": "ALUNO",
                            "tel": "85992345678",
                            "status": "INATIVO",
                            "created_at": "2026-04-22T22:04:30.654Z",
                            "updated_at": "2026-04-22T22:04:30.654Z",
                            "auth_user_id": "c2db76aa-706c-4e55-bdd1-9fe4cd8ca715",
                            "must_change_password": true
                        }
                    }
                }
            ],
            "turma_professores": [
                {
                    "id": 14,
                    "turma_id": 35,
                    "professores_id": 7,
                    "created_at": "2026-04-28T19:42:47.897Z",
                    "professores": {
                        "id": 7,
                        "user_id": 58,
                        "materia": "Geografia",
                        "modalidade_id": 5,
                        "status": "ATIVO",
                        "created_at": "2026-04-27T16:15:25.964Z",
                        "updated_at": "2026-04-27T16:15:25.964Z",
                        "users": {
                            "id": 58,
                            "nome": "Eduardo Santos",
                            "email": "eduardo.santos@email.com",
                            "role": "PROFESSOR",
                            "tel": "51994567890",
                            "status": "ATIVO",
                            "created_at": "2026-04-27T16:15:25.883Z",
                            "updated_at": "2026-04-27T16:15:25.883Z",
                            "auth_user_id": "641f619c-4567-4e52-ba9f-2519bed4cf42",
                            "must_change_password": true
                        }
                    }
                }
            ]
        }
    ]
}

const dataF ='1970-01-01T09:00:00.000Z';

function dateToTime(date) {
    const dateSent = new Date(date).toLocaleDateString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'UTC'
    });

    return dateSent.split(',')[1];
};

console.log(dateToTime(dataF))
