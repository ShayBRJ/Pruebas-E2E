
import { test, expect } from "@playwright/test";

test("Verificar tarea desmarcada", async ({ page }) => {
    await page.goto("https://demo.playwright.dev/todomvc/");

    const inputText = page.getByPlaceholder("What needs to be done?");

    // 1 - Creamos una tarea.
    await inputText.fill("Estudiar Playwright");
    await inputText.press("Enter");

    // 2 - Completamos la tarea.
    const TAREA = page.getByTestId("todo-item");
    const CHECKBOX = TAREA.getByRole("checkbox");

    await CHECKBOX.check();
    await expect(CHECKBOX).toBeChecked();

    // 3 - Accedemos a Completed.
    await page.getByRole("link", { name: "Completed" }).click();
    // 4 - Desmarcamos la tarea.
    await expect(await page.getByRole('list').first().getByRole("listitem")).toHaveCount(1); // Éxito en la prueba porque la lista contiene un elemento
    await CHECKBOX.click();
    await expect(await page.getByRole('list').first().getByRole("listitem")).toHaveCount(1); // Falla porque se cambió el estado y ya no está completada.
    page.close();
});
