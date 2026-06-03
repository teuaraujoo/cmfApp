
function getFormString(formData: FormData, field: string) {
  return String(formData.get(field) ?? "").trim();
};

export function getRequiredFormString(formData: FormData, field: string, label: string) {
  const value = getFormString(formData, field);

  if (!value) {
    throw new Error(`${label} é obrigatório.`);
  };
  return value;
};

export function getPositiveNumber(formData: FormData, field: string, label: string) {
  const value = Number(getRequiredFormString(formData, field, label));

  if (!Number.isFinite(value) || value <= 0) {
    throw new Error(`${label} deve ser maior que zero.`);
  };

  return value;
};

export function validateBirthDate(value: string) {
  const birthDate = new Date(`${value}T00:00:00`);

  if (Number.isNaN(birthDate.getTime())) {
    throw new Error("Data de nascimento inválida.");
  };

  if (birthDate > new Date()) {
    throw new Error("Data de nascimento não pode ser futura.");
  };

  return value;
};