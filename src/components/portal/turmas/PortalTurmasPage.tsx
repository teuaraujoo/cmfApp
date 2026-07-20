"use client";

import { useMemo, useState } from "react";
import { CalendarX } from "lucide-react";
import type { TurmaPortalItem } from "@/@types/turma/turma.types";
import PortalTurmasHeader from "./PortalTurmasHeader";
import PortalTurmasGrid from "./PortalTurmasGrid";

type Props = {
    turmas: TurmaPortalItem[];
};

export default function PortalTurmasPage({
    turmas,
}: Props) {
    const [search, setSearch] = useState("");

    const filteredTurmas = useMemo(() => {

        const value = search
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "");

        return turmas.filter((turma) => {

            const searchable = [
                turma.nome,
                turma.modalidade,
                ...turma.diasSemana
            ]
                .join(" ")
                .toLowerCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "");

            return searchable.includes(value);

        });

    }, [search, turmas]);

    return (
        <main className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-4 py-5">

            <PortalTurmasHeader
                total={filteredTurmas.length}
                search={search}
                onSearchChange={setSearch}
            />

            {!filteredTurmas.length ? (

                <section className="flex min-h-80 flex-col items-center justify-center rounded-3xl border border-dashed border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">

                    <CalendarX className="mb-3 size-10 text-gray-400" />

                    <h2 className="font-semibold">
                        Nenhuma turma encontrada
                    </h2>

                    <p className="mt-2 text-center text-sm text-gray-500">
                        Nenhuma turma corresponde à pesquisa.
                    </p>

                </section>

            ) : (

                <PortalTurmasGrid turmas={filteredTurmas} />

            )}

        </main>
    );
};