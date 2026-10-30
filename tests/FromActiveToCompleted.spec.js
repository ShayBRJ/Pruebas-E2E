
import { test, expect } from "@playwright/test";

test("Completar dos tareas desde Active", async ({ page }) => {
    await page.goto("https://demo.playwright.dev/todomvc/");

    const inputText = page.getByPlaceholder("What needs to be done?");

    // 1 - Creamos dos tareas.
    const tareas = [
        "Comprar verduras",
        "Hacer la tarea E2E"
    ];

    for (const tarea of tareas) {
        await inputText.fill(tarea);
        await inputText.press("Enter");
    }

    // 2 - Comprobamos que se han creado las dos tareas.
    await expect(page.getByTestId("todo-item")).toHaveCount(2);

    // 3 - Accedemos a la pestaña de tareas activas.
    await page.getByRole("link", { name: "Active" }).click();

    const ACTIVAS = page.getByTestId("todo-item");

    await expect(ACTIVAS).toHaveCount(2);

    // 4 - Marcamos ambas tareas como completadas.
    for (const tarea of tareas) {
        const ITEM = ACTIVAS.filter({ hasText: tarea });
        await ITEM.getByRole("checkbox").click();
    }

    // 5 - Accedemos a la pestaña Completed.
    await page.getByRole("link", { name: "Completed" }).click();

    const COMPLETADOS = page.getByTestId("todo-item");

    // 6 - Verificamos que aparecen las dos tareas completadas.
    await expect(COMPLETADOS).toHaveCount(2);

    for (const tarea of tareas) {
        const ITEM = COMPLETADOS.filter({ hasText: tarea });

        await expect(ITEM).toBeVisible();
        await expect(ITEM.getByRole("checkbox")).toBeChecked();
    }
});
