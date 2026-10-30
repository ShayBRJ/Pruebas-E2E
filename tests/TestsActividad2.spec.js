import {test, expect} from "@playwright/test";
import { exec } from "node:child_process";

test("Creación de una tarea", async ({page}) => {

  await page.goto("https://demo.playwright.dev/todomvc/");
  
  // VARIABLES
  const TAREA = "Hacer la tarea de pruebas E2E con Playwright.";


  // Ingreso una nueva tarea
  await page.fill(".new-todo", TAREA);
  await page.press(".new-todo", "\n");


  // Verifico si existe un elemento en la lista.
  const LISTA = page.locator(".todo-list")
  const NEW_ITEM = LISTA.getByRole("listitem").first();
  expect(((await LISTA.count()).valueOf())).toBe(1);
  await expect(await NEW_ITEM.innerText()).toMatch("Hacer la tarea de pruebas E2E con Playwright.");
  await expect(await NEW_ITEM).toBeVisible();

  // Cerramos el manejador de la página.
  await page.close();

});

test("Tareas consecutivas", async ({page}) => {

  //Accedemos a la página web
  await page.goto("https://demo.playwright.dev/todomvc/");

  const inputText = page.getByPlaceholder("What needs to be done?"); // Seleccionamos el input por su placeholder.
  
  //Ingresamos una serie de elementos.
  const tareas = [
    "Comprar verduras",
    "Hacer la tarea E2E",
    "Realizar el proyecto en Docker",
  ]
  for (const tarea of tareas) {
      await inputText.fill(tarea);
      await inputText.press("Enter");
  }
  const LISTA = page.locator(".todo-list");
  await expect(LISTA).toBeAttached(); // Verificamos que la lista se encuentre en el DOM
  await expect(LISTA.getByRole("listitem")).toHaveCount(3) // Comprobamos que hay tres elementos.
  const items = await LISTA.getByRole("listitem").all();
  for (const item of items) {
    await expect(item).toBeVisible(); //Verificamos que el contenido se muestra.
    expect(tareas.includes(await item.innerText())).toBeTruthy(); // Un item debe corresponder al menos con una tarea del array de tareas.
    }
})


test("Creación tarea vacía", async ({page}) => {

  await page.goto("https://demo.playwright.dev/todomvc/");
  const inputText = page.getByPlaceholder("What needs to be done?"); // Seleccionamos el input por su placeholder.
  await inputText.fill("");
  await inputText.press("Enter");
  const LISTA = page.locator(".todo-list");
  await expect(LISTA).not.toBeAttached(); // No se crea el elemento y por lo tanto no se habilita la lista. 
  page.close()

})

