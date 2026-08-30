const{test,expect} = require('@playwright/test')

test("Handling Dropdown,RadioButton and Checkbox", async ({page})=>
{
    await page.goto("https://testautomationpractice.blogspot.com/")
    const dropdown = await page.locator("#country")
    await dropdown.selectOption("india");
    await dropdown.selectOption({ label:'Japan'})
    //Radio Button
    await page.locator("#male").click()
    console.log(await page.locator("#male").isChecked())
    await expect(page.locator("#male")).toBeChecked()
    //CheckBox
    await page.locator("#sunday").click()
    
    await expect(page.locator("#sunday")).toBeChecked()
    
    await page.locator("#sunday").uncheck()
    //await expect(page.locator("#sunday").isChecked).toBeFalsy
})

test("Handling Blinking test and Windows", async({browser})=>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://testautomationpractice.blogspot.com/")
    const Newtab = await page.locator("//*[contains(text(),'New Tab')]");
   
    const [Newpage] = await Promise.all([
    context.waitForEvent('page'),
    Newtab.click()])
    
    const address = await Newpage.locator("[class='post-title entry-title']").textContent();

    await page.bringToFront();
    await page.locator("//*[contains(text(),'Address:')]").fill(address)

    console.log(await page.locator("//*[contains(text(),'Address:')]").inputValue());

    


})