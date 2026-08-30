const {test, expect} = require('@playwright/test');

test("Browser context test", async function({browser})
{
    const context = await browser.newContext();
    const page = await context.newPage();
    const username = page.locator("[name='username']")
    const signIn = page.locator("[value='Log In']")
    const password = page.locator("[name='password']")
    await page.goto("https://parabank.parasoft.com/parabank/index.htm")
    console.log(await page.title())
    await expect(page).toHaveTitle("ParaBank | Welcome | Online Banking")
    await username.fill("DeonMatri");
    await password.fill("Test123!");
    await signIn.click();
    const errormessage = await page.locator(".error").textContent();
    console.log(errormessage)
    //await expect(page.locator(".error")).toHaveText("could not be verified");
    await expect(page.locator(".error")).toContainText("could not be verified");
    await username.fill("DeonMatrix");
    await password.fill("Test123!");
    await signIn.click();
    console.log(await page.title())


});

test("Page playwright test", async({page})=>
{
    await page.goto("https://google.com")
    console.log(await page.title());

})

test("Demo Blaze Test", async({page})=>
{
    await page.goto("https://www.demoblaze.com/");
    console.log(await page.title())
    await page.locator("#login2").click();
    await page.locator("#loginusername").fill("DeonMatrix")
    await page.locator("#loginpassword").fill("Test123!")
    await page.locator("[onclick='logIn()']").click()

    await page.locator("text='Laptops'").click();
    //await page.locator("//*[contains(text(),'Laptops')]").click();
    //await expect(page.locator("//*[contains(text(),'Laptops')]")).toHaveText("Laptops")
    //await page.getByRole('link', { name: 'Laptops' }).click()
     
    await page.locator(".card-block").first().waitFor()
    await expect(page.locator(".card-block a").first()).toHaveText("Sony vaio i5")

    //const firsteleement = await page.locator("//*[@id='tbodyid']/div[1]/div/div/h4/a").textContent()
    //console.log(firsteleement)
    const allelements = await page.locator(".card-block a").allTextContents()
    console.log(allelements);
    await page.locator("#next2").click();
    await expect(page.locator(".card-block a").first()).toHaveText("Apple monitor 24")
    //const firsteleementnextpage = await page.locator("//*[@id='tbodyid']/div[1]/div/div/h4/a").textContent()
    //console.log(firsteleementnextpage)
    const allelementsnextpage = await page.locator(".card-block a").allTextContents()
    console.log(allelementsnextpage)

    await page.locator("text='Phones'").waitFor()
    await page.locator("text='Phones'").click();

    await expect(page.locator(".card-block a").first()).toHaveText("Samsung galaxy s6")

    await page.locator(".card-block a").first().click()
    const priceofitem = await page.locator("[class='price-container']").textContent();
    console.log(priceofitem)
    //await page.locator("//*[@id='tbodyid']/div[1]/div/div/h4/a").click();

    expect(await page.locator("#tbodyid").locator("a")).toHaveText("Add to cart")

    await page.locator("text='Add to cart'").click();

    await page.on("dialog",dialog=>dialog.accept());

    await page.locator("#cartur").waitFor()
    await page.locator("#cartur").click();


    await expect(await page).toHaveTitle("STORE")

    await page.locator("tbody tr").first().waitFor({timeout:20000})

    await expect(await page.locator("tbody tr td:nth-child(3)").first()).toHaveText(priceofitem.substring(1,4));

    await page.locator(".btn.btn-success").click();

    await page.locator("#name").fill("Deon")

    await page.locator("#country").fill("India")

    await page.locator("#city").fill("Indore")

    await page.locator("#card").fill("012345678910")

    await page.locator("#month").fill("12")

    await page.locator("#year").fill("2026")
    await page.locator("[onclick='purchaseOrder()']").click()

    const purchase_message = await page.locator(".sweet-alert.showSweetAlert.visible > h2")

    await expect(purchase_message).toHaveText("Thank you for your purchase!")

    const orderid = await page.locator(".sweet-alert >p").textContent();
    console.log(orderid)

    //await page.pause()

})

