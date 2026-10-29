import {test, expect} from "@playwright/test";

test("Eliminación de una tarea", async ({page}) => {

  await page.goto("https://demo.playwright.dev/todomvc/");

  const TAREA = "Hacer la tarea de pruebas E2E con Playwright.";

  // Ingreso una nueva tarea
  await page.fill(".new-todo", TAREA);
  await page.press(".new-todo", "\n");

  const ITEM = await page.getByRole("listitem").first();
  await expect(( ITEM.getByTestId("todo-title"))).toHaveText("Hacer la tarea de pruebas E2E con Playwright."); // Verifico que la tarea coincide con el texto que he incluido.

  // Presionar el botón de eliminar
  const BOTON = await ITEM.getByRole("button");
  await expect(BOTON).toBeHidden(); // En primer lugar el botón se encuentra escondido.
  await ITEM.hover();
  expect(BOTON).toBeVisible(); // Al posicionarnos sobre el botón, ahora es visible.
  await BOTON.click();
  await expect(ITEM).toHaveCount(0); // La tarea ha sido eliminada.
  await page.close();
})