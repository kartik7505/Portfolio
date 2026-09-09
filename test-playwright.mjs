import { chromium } from 'playwright';

(async () => {
  console.log("Starting playwright...");
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('response', async response => {
    if (response.url().includes('/api/contact')) {
      console.log('API Response Status:', response.status());
      try {
        console.log('API Response Body:', await response.text());
      } catch (e) {}
    }
  });

  await page.goto('http://127.0.0.1:8788/');
  
  console.log("Waiting for form...");
  await page.fill('input[name="name"]', 'Kartik Test');
  await page.fill('input[name="email"]', 'kartikk7505@gmail.com');
  await page.fill('textarea[name="message"]', 'This is a test message to debug the API failure.');

  console.log("Submitting form...");
  await page.click('[data-contact-submit]');

  // wait 5 seconds for network
  await page.waitForTimeout(5000);
  
  await browser.close();
  console.log("Done");
})();
