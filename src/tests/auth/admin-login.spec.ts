import { test, expect } from "@playwright/test";

test("admin consegue fazer login", async ({ page }) => {
    const email = process.env.ADMIN_LOGIN_TEST;
    const senha = process.env.ADMIN_PASSWORD_TEST;

    if (!email || !senha) {
        throw new Error("Credencias E2E não configuradas")
    };

    console.log(email, senha)

    await page.goto("dashboard/login");

    await page.fill('input[name="email"]', email);
    await page.fill('input[name="password"]', senha);

    await page.getByTestId("login-submit").click();

    await expect(page).toHaveURL("/dashboard/home");
});