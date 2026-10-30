import {test, expect} from "@playwright/test";

test("Edición y Eliminación", async ({page}) => {

  await page.goto("https://demo.playwright.dev/todomvc/");
  const TEXTO_TAREA = "Cocinar lasaña a la carbonara";
  const TEXTINPUT = page.getByPlaceholder("What needs to be done?").first();
  // 1 - Creamos una tarea.
  await TEXTINPUT.fill(TEXTO_TAREA);
  await TEXTINPUT.press("Enter");

  // 2 - Seleccionamos el elemento y hacemos doble clic.
  const TAREA = page.getByRole("listitem").filter({hasText: TEXTO_TAREA});
  await TAREA.dblclick();

  // 3- Modificamos el contenido de la tarea.
  await TAREA.getByRole("textbox", {name: "Edit"}).fill(TEXTO_TAREA + " con queso");

  // 4 - Guardamos los cambios.
  await TAREA.getByRole("textbox", {name: "Edit"}).press("Enter");

  // 5 - Comprobamos que se han efectuados los cambios sobre el texto de la tarea.
  await expect(await TAREA.getByTestId("todo-title").innerText()).not.toBe(TEXTO_TAREA);
  await expect(await TAREA.getByTestId("todo-title").innerText()).toBe(TEXTO_TAREA + " con queso");

  // 6 - Eliminamos la tarea.
  await expect(TAREA).toBeAttached(); // La tarea se encuentra en el árbol DOM.
  await TAREA.hover();
  await expect(await TAREA.getByRole("button")).toBeVisible();
  await TAREA.getByRole("button").click();

  // 7 - Comprobamos que se ha eliminado.
  await expect(TAREA).not.toBeAttached(); // Se ha desacoplado del DOM.
  await expect(TAREA).toHaveCount(0);

  page.close();
})