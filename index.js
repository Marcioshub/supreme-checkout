const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch({
    headless: false, // change to true for no browser to appear
  });
  const page = await browser.newPage();

  // this example looks for sticky notes inside accessories
  await page.goto("https://www.supremenewyork.com/shop/all/accessories", {
    waitUntil: "domcontentloaded",
  });

  // look for the a tag
  await page.$eval("*css=a >> text='Name Badge Stickers (Pack of 100)'", (e) =>
    e.click()
  );

  // add to cart and go to checkout
  await page.waitForTimeout(800);
  await page.click("input[name='commit']");
  await page.waitForTimeout(800);
  await page.$eval("*css=a >> text='checkout now'", (e) => e.click());

  // fill in required information
  await page.fill("input[name='order[billing_name]']", "John Doe", {
    slowMo: 30,
  });
  await page.fill("input[name='order[email]']", "johnd@gmail.com", {
    slowMo: 30,
  });
  await page.fill("input[name='order[tel]']", "212-525-9954", { slowMo: 30 });
  await page.fill(
    "input[name='order[billing_address]']",
    "1600 Amphitheatre Parkway",
    {
      slowMo: 30,
    }
  );
  await page.fill("input[name='order[billing_address_2]']", "2", {
    slowMo: 30,
  });
  await page.fill("input[name='order[billing_zip]']", "94043", { slowMo: 30 });
  await page.fill("input[name='order[billing_city]']", "Mountain View", {
    slowMo: 30,
  });
  await page.selectOption(
    "select#order_billing_state",
    { label: "CA" },
    { slowMo: 30 }
  );

  await page.fill("input[name='riearmxa']", "1234567890", {
    slowMo: 30,
  });
  await page.type("select[name='credit_card[month]']", "05", {
    slowMo: 30,
  });
  await page.type("select[name='credit_card[year]']", "2022", {
    slowMo: 30,
  });
  await page.type("input[name='credit_card[meknk]']", "023", {
    slowMo: 30,
  });

  // checkbox
  await page.click("label[class='has-checkbox terms']", { slowMo: 30 });

  // finalize payment
  // await page.click("input[name='commit']");

  // take screenshot and close
  await page.waitForTimeout(3000);
  await page.screenshot({ path: `screenshoot.png` });
  await browser.close();
})();
