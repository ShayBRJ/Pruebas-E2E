import {test, expect} from "@playwright/test";

test("Nueva tarea y coincide con el texto indicado.", async ({page}) => {
  
  await page.goto("https://demo.playwright.dev/todomvc/");
  
  // VARIABLES
  const TAREA = "Hacer la tarea de pruebas E2E con Playwright.";


  // Ingreso una nueva tarea
  await page.fill(".new-todo", TAREA);
  await page.press(".new-todo", "\n");


  // Verifico si existe un elemento en la lista.
  const LISTA = await page.locator(".todo-list")
  const NEW_ITEM = await LISTA.getByRole("listitem").first();
  expect(((await LISTA.count()).valueOf())).toBe(1);
  expect(await NEW_ITEM.innerText()).toMatch("Hacer la tarea de pruebas E2E con Playwright.");

  // Cerramos el manejador de la página.
  await page.close();

})