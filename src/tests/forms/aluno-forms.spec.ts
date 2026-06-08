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

test("admin cria aluno", async ({ page }) => {
  const uniqueId = Date.now();
  const alunoName = `Aluno Teste E2E ${uniqueId}`;
  const email = `aluno-${uniqueId}@teste.com`;

  await loginAsAdmin(page);
  await page.goto("/dashboard/alunos");

  await page.getByTestId("addAluno-button").click();

  const alunoForm = page.locator("form").filter({
    has: page.getByRole("button", { name: "Criar aluno" }),
  });

  await expect(alunoForm).toBeVisible();

  await alunoForm.locator('input[name="nome"]').fill(alunoName);
  await alunoForm.locator('input[name="email"]').fill(email);
  await alunoForm.locator('input[name="telefone"]').fill("11999999999");
  await alunoForm.locator('input[name="dataNasc"]').fill("2010-01-01");
  await alunoForm.locator('input[name="escola"]').fill("Escola Teste E2E");
  await alunoForm.locator('input[name="respNome"]').fill("Responsavel Teste");
  await alunoForm.locator('input[name="respTel"]').fill("11988888888");

  await alunoForm.locator("button#serie").click();
  await page.getByRole("option", {
    name: /6.*Ano do Ensino Fundamental/i,
  }).click();

  await alunoForm.locator("button#horasMensais").click();
  await page.getByRole("option", { name: /6 horas mensais/i }).click();

  await alunoForm.getByTestId("aluno-submit").click();

  await expect(page.getByText(/aluno salvo|criado com sucesso/i)).toBeVisible();
  await expect(page.getByText(alunoName)).toBeVisible();
});
