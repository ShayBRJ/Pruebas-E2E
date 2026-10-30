import { test, expect } from "@playwright/test";

test("No permitir tareas vacías", async ({ page }) => {
    await page.goto("https://demo.playwright.dev/todomvc/");

    const inputText = page.getByPlaceholder("What needs to be done?");

    // 1 - Intentamos crear una tarea formada por espacios.
    await inputText.fill("     ");
    await inputText.press("Enter");

    // 2 - Comprobamos que no se ha añadido ninguna tarea.
    await expect(page.getByTestId("todo-item")).toHaveCount(0);

    // 3 - Comprobamos que el contador no muestra tareas pendientes.
    await expect(page.getByTestId("todo-count")).toBeHidden();
});
