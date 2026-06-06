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

test("admin cria professor", async ({ page }) => {
  const uniqueId = Date.now();
  const professorName = `Professor Teste E2E ${uniqueId}`;
  const professorEmail = `professor-${uniqueId}@teste.com`;

  await loginAsAdmin(page);
  await page.goto("/dashboard/professores");

  await page.getByRole("button", { name: "Adicionar professor" }).click();

  const professorForm = page.locator("form").filter({
    has: page.getByRole("button", { name: "Criar professor" }),
  });

  await expect(professorForm).toBeVisible();

  await professorForm.locator('input[name="nome"]').fill(professorName);
  await professorForm.locator('input[name="email"]').fill(professorEmail);
  await professorForm.locator('input[name="telefone"]').fill("11999999999");

  await professorForm.locator("button#materia").click();
  await page.getByRole("option", { name: /Matem/i }).click();

  await professorForm.locator("button#modalidade").click();
  await page.getByRole("option", { name: /Presencial Sede/i }).click();

  await professorForm
    .getByRole("button", { name: "Criar professor" })
    .click();

  await expect(
    page.getByText(/professor criado com sucesso/i),
  ).toBeVisible();
  await expect(page.getByText(professorName)).toBeVisible();
});
