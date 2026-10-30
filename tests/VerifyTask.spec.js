import {test, expect} from "@playwright/test";

test("Verificar contenido en algún elemento de la lista", async ({page}) => {

  //Accedemos a la página web
  await page.goto("https://demo.playwright.dev/todomvc/");

  const inputText = page.getByPlaceholder("What needs to be done?"); // Seleccionamos el input por su placeholder.
  
  //Ingresamos una serie de elementos.
  const tareas = [
    "Comprar verduras",
    "Hacer la tarea E2E",
    "Realizar el proyecto en Docker",
    "Leer el libro de Piensa Rápido, Habla Mejor de Matt Abrahams"
  ]
  for (const tarea of tareas) {
      await inputText.fill(tarea);
      await inputText.press("Enter");
  }

  // Verificamos si el número de elementos de la lista coincide con el tamaño 
  // del array de tareas.
  const LISTA = page.locator(".todo-list li");
  await expect(LISTA).toHaveCount(tareas.length);

  // Verificamos si hay una tarea relacionada con Docker.
  const PALABRA = "Docker";
  const expresion_regular = new RegExp(PALABRA, "i");
  await expect(LISTA.filter({ hasText: expresion_regular})).not.toHaveCount(0);
  page.close();
});

