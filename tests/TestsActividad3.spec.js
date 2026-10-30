import {test, expect} from "@playwright/test";
import { randomInt } from "node:crypto";

test("Estados y Filtros", async ({page}) => {
  page.goto("https://demo.playwright.dev/todomvc/");
  const inputText = page.getByPlaceholder("What needs to be done?"); // Seleccionamos el input por su placeholder.

  // 1 - Creamos la lista de tareas
  const tareas = [
    "Comprar verduras",
    "Hacer la tarea E2E",
    "Realizar el proyecto en Docker",
  ]
  for (const tarea of tareas) {
      await inputText.fill(tarea);
      await inputText.press("Enter");
  }
  
  // 2 - Marcamos una aleatoria como completada.
  const NUMERO_RANDOM = randomInt(tareas.length);
  const TAREA = (await page.locator(".todo-list").getByRole("listitem").all()).at(NUMERO_RANDOM);
  await expect(await TAREA).toBeAttached();
  await TAREA.getByRole('checkbox').setChecked(true);
  
  // 3 - Verificamos si la tarea se encuentra completada.
  await expect(await TAREA.getByRole('checkbox')).toBeChecked({checked : true}); 

  // 4 - Seleccionamos el apartado de Activas y vemos las tareas pendientes.
  await page.getByRole('link', {name: "Active"}).click();
  const PENDIENTES = page.getByTestId('todo-item');
  await expect(PENDIENTES).toHaveCount(tareas.length - 1);
  for (let i = 0; i < await PENDIENTES.count(); i++) {
      const checkbox = PENDIENTES.nth(i).getByRole('checkbox');
      await expect(checkbox).not.toBeChecked();
  }
    
  // 5 - Seleccionamos el apartado de Completados y vemos las tareas completadas.
  await page.getByRole('link', {name: "Completed"}).click();
  const COMPLETADOS = page.getByTestId('todo-item');
  await expect(COMPLETADOS).toHaveCount(1);
  for (let i = 0; i < await COMPLETADOS.count(); i++) {
    const checkbox = COMPLETADOS.nth(i).getByRole('checkbox');
    await expect(checkbox).toBeChecked();
  }

  // 6 - Seleccionamos el apartado de Todas y vemos todas las tareas.
  await page.getByRole('link', {name: "All"}).click();
  await expect(await page.locator(".todo-list").getByRole("listitem")).toHaveCount(tareas.length);

  
  // 7 Verificamos que el contador coincide con el número de tareas no completadas.
  const N_PENDIENTES = await page.getByTestId("todo-count").getByRole("strong").innerText();
  await expect(N_PENDIENTES).not.toBeNaN();

  await expect(await page.locator(".todo-list").getByRole("listitem").filter({
    has: page.getByRole('checkbox', {checked: false})
  })).toHaveCount(parseInt(N_PENDIENTES));

  page.close()

})