import { expect, type Page, test } from "@playwright/test";

async function loginAsAdmin(page: Page) {
  await page.goto("/dashboard/login");

  await page.locator('input[name="email"]').fill(
    String(process.env.ADMIN_LOGIN_TEST),
  );
  await page.locator('input[name="password"]').fill(
    String(process.env.ADMIN_PASSWORD_TEST),
  );

  await page.getByTestId("login-submit").click();

  await expect(page).toHaveURL("/dashboard/home");
}

function formatDateInput(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

test("admin cria turma", async ({ page, browserName }) => {
  const uniqueId = `${browserName}-${Date.now()}`;
  const turmaName = `Turma Teste E2E ${uniqueId}`;
  const vigenciaInicio = new Date();
  const vigenciaFim = new Date();

  vigenciaInicio.setDate(vigenciaInicio.getDate() + 7);
  vigenciaFim.setDate(vigenciaFim.getDate() + 90);

  await loginAsAdmin(page);
  await page.goto("/dashboard/turmas");

  await page.getByRole("button", { name: "Adicionar turma" }).click();

  const turmaForm = page.locator("form").filter({
    has: page.getByRole("button", { name: "Criar turma" }),
  });

  await expect(turmaForm).toBeVisible();

  await turmaForm.locator('input[name="nome"]').fill(turmaName);
  await turmaForm
    .locator('input[name="vigenciaInicio"]')
    .fill(formatDateInput(vigenciaInicio));
  await turmaForm
    .locator('input[name="vigenciaFim"]')
    .fill(formatDateInput(vigenciaFim));

  const modalidadeField = turmaForm.locator("label").filter({
    hasText: "Modalidade",
  });
  await modalidadeField.getByRole("combobox").click();
  await page.getByRole("option").first().click();

  const agendaCards = turmaForm.locator("article");
  const primeiroDia = agendaCards.nth(0);
  const segundoDia = agendaCards.nth(1);

  await primeiroDia.getByRole("combobox").click();
  await page.getByRole("option").nth(0).click();
  await primeiroDia.locator('input[type="time"]').nth(0).fill("09:00");
  await primeiroDia.locator('input[type="time"]').nth(1).fill("10:00");

  await segundoDia.getByRole("combobox").click();
  await page.getByRole("option").nth(1).click();
  await segundoDia.locator('input[type="time"]').nth(0).fill("14:00");
  await segundoDia.locator('input[type="time"]').nth(1).fill("15:00");

  const alunosSection = turmaForm.locator("section").filter({
    hasText: "Alunos disponiveis",
  });
  const professoresSection = turmaForm.locator("section").filter({
    hasText: "Professores disponiveis",
  });

  await alunosSection.getByRole("button").first().click();
  await professoresSection.getByRole("button").first().click();

  await turmaForm.getByRole("button", { name: "Criar turma" }).click();

  await expect(page.getByText(/turma criada com sucesso/i)).toBeVisible();
  await expect(page.getByText(turmaName)).toBeVisible();
});
