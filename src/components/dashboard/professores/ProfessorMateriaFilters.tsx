"use client";

type ProfessorMateriaFiltersProps = {
  materias: string[];
  selectedMateria: string;
  onSelectMateria: (materia: string) => void;
};

export default function ProfessorMateriaFilters({
  materias,
  selectedMateria,
  onSelectMateria,
}: ProfessorMateriaFiltersProps) {
  return (
    <section className="rounded-2xl border border-gray-200 bg-white px-5 py-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => onSelectMateria("Todas")}
          className={`inline-flex cursor-pointer items-center rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
            selectedMateria === "Todas"
              ? "bg-[#1FA2E1] text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
          }`}
        >
          Todas
        </button>

        {materias.map((materia) => (
          <button
            key={materia}
            type="button"
            onClick={() => onSelectMateria(materia)}
            className={`inline-flex cursor-pointer items-center rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
              selectedMateria === materia
                ? "bg-[#1FA2E1] text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
            }`}
          >
            {materia}
          </button>
        ))}
      </div>
    </section>
  );
};
