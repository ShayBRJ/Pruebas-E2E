const {test, expect} = require("@playwright/test");

test('Cambio de URL', async ({page}) => {

  await page.goto("https://demo.playwright.dev/todomvc/");

  // Variables
  const pageURL = page.url();
  
  // Aserciones para la comprobación del test.
  await expect(pageURL === "https://demo.playwright.dev/todomvc/").toBeFalsy()
  await page.close() // Cerramos el conector con la página y liberamos los recursos. Promesas.

})