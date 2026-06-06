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

test("admin cria aula pelo calendario", async ({ page }) => {
  const aulaDate = new Date();
  aulaDate.setDate(aulaDate.getDate() + 30);

  await loginAsAdmin(page);
  await page.goto("/dashboard/calendario");

  const calendar = page.locator(".custom-calendar");
  await expect(calendar).toBeVisible();

  await calendar
    .getByRole("button", { name: /adicionar aula/i })
    .click();

  const aulaDialog = page.getByRole("dialog", { name: "Nova aula" });
  const aulaForm = aulaDialog.locator("form");

  await expect(aulaDialog).toBeVisible();

  const alunosSection = aulaForm.locator("section").filter({
    hasText: "Aluno da aula",
  });
  const professoresSection = aulaForm.locator("section").filter({
    hasText: "Professor da aula",
  });

  await alunosSection.getByRole("button").first().click();
  await professoresSection.getByRole("button").first().click();

  const modalidadeField = aulaForm.locator("label").filter({
    hasText: "Modalidade",
  });
  await modalidadeField.getByRole("combobox").click();
  await page.getByRole("option").first().click();

  await aulaForm
    .locator('input[name="data"]')
    .fill(formatDateInput(aulaDate));
  await aulaForm.locator('input[name="horario_inicio"]').fill("12:00");
  await aulaForm.locator('input[name="horario_fim"]').fill("13:00");

  await aulaForm.getByRole("button", { name: "Criar aula" }).click();

  await expect(page.getByText(/aula criada com sucesso/i)).toBeVisible();
  await expect(aulaDialog).toBeHidden();
  await expect(calendar).toBeVisible();
});
