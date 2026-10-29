const {test, expect} = require("@playwright/test"); // Importación de funciones del paquete.

test('Verificación del título y URL de página', async ({page}) => {

  await page.goto("https://demo.playwright.dev/todomvc/");

  // Variables
  const pageURL = page.url();
  
  // Aserciones para la comprobación del test.
  await expect(page).toHaveTitle('React • TodoMVC');
  await expect(page).toHaveURL(pageURL);
  await page.close() // Cerramos el conector con la página y liberamos los recursos. Promesas.

})

