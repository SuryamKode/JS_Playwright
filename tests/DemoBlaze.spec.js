const { test,expect } = require("@playwright/test")

test("Print all the items of a kind", async ({page}) =>
{
    await page.goto("https://www.demoblaze.com/index.html")
    await page.locator("#login2").click();
    await page.locator("#loginusername").fill("DeonMatrix")
    await page.locator("#loginpassword").fill("Test123!")
    await page.locator("[onclick='logIn()']").click()
    //await page.waitForLoadState("networkidle")
    await page.locator("//*[contains(text(),'Laptops')]").click()
    //await page.waitForLoadState("networkidle")
    await page.locator(".card-title a").first().waitFor();
    const laptops = await page.locator(".card-title a").allTextContents()
    console.log(laptops)
})

test("Playwright Specail element locators", async ({page}) =>
{
    await page.goto("https://rahulshettyacademy.com/angularpractice")
    await page.getByLabel("Check me out if you Love IceCreams!").click()
    await page.getByLabel("Employed").click()
    await page.getByLabel("Gender").selectOption("Female")
    await page.getByPlaceholder("Password").fill("test123!")
    
    await page.getByRole("button",{name:'Submit'}).click()
    await page.getByText(" The Form has been submitted successfully!.").isVisible()
    await expect(page.getByText(" The Form has been submitted successfully!.")).toBeVisible({timeout:10000})

    await page.getByRole("link",{name:"shop"}).click()

    await page.locator("app-card").filter({hasText:'Blackberry'}).getByRole("button").click()

    
})
