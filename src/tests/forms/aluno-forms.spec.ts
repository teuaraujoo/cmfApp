import { test, expect, Page } from "@playwright/test";

async function loginAsAdmin(page: Page) {
  await page.goto("/dashboard/login");

  await page.fill('input[name="email"]', `${process.env.ADMIN_LOGIN_TEST}`);
  await page.fill('input[name="password"]', `${process.env.ADMIN_PASSWORD_TEST}`);

  await page.getByTestId("login-submit").click();

  await expect(page).toHaveURL("/dashboard/home");
}

test("admin cria aluno", async ({ page }) => {
  const email = `aluno-${Date.now()}@teste.com`;

  await loginAsAdmin(page);

  await page.goto("/dashboard/alunos");

  await page.getByTestId("addAluno-button").click();

  await page.fill('input[name="nome"]', "Aluno Teste E2E");
  await page.fill('input[name="email"]', email);
  await page.fill('input[name="dataNasc"]', "2010-01-01");
  await page.fill('input[name="telefone"]', "11999999999");
  await page.fill('input[name="horasSemana"]', "2");
  await page.fill('input[name="tempoAula"]', "60");
  await page.fill('input[name="tempoContrato"]', "12");
  await page.fill('input[name="respNome"]', "Responsavel Teste");
  await page.fill('input[name="respTel"]', "11988888888");

  await page.locator('button#serie').click();
  await page.getByRole("option", {
    name: /6.*Ano do Ensino Fundamental/i,
  }).click();

  await page.locator('button#modalidade').click();
  await page.getByRole("option", {
    name: /Presencial Sede/i,
  }).click();

  await page.getByTestId("aluno-submit").click();

  await expect(page.getByText(/aluno salvo|criado com sucesso/i)).toBeVisible();
  await expect(page.getByText("Aluno Teste E2E")).toBeVisible();
});