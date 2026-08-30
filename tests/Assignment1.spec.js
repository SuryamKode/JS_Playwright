const{expect,test}= require('@playwright/test')

async function login(page)
{
    await page.goto("https://eventhub.rahulshettyacademy.com")
    await page.getByPlaceholder("you@email.com").fill("DeonMatrix@gmail.com")
    await page.getByLabel("Password").fill("Test@123")
    await page.locator("#login-btn").click()
    await expect(page.getByText("Browse Events").first().isVisible()).toBeTruthy()
}

async function futureDateValue()
{
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 20);
    const pad = (n) => String(n).padStart(2, "0");

    const yyyy = futureDate.getFullYear();
    const mm = pad(futureDate.getMonth() + 1);
    const dd = pad(futureDate.getDate());
    const hh = pad(futureDate.getHours());
    const min = pad(futureDate.getMinutes());

    return `${yyyy}-${mm}-${dd}T${hh}:${min}`;
}

test("Create an event and buy a ticket", async({page})=>
{
    await login(page);
    var seatsBeforeBooking
    await page.locator("#nav-events").click()
    const eventTitle = "Test Event"+Date.now()
    console.log(eventTitle)
    await page.getByText("Add New Event").click()
    await page.locator("#event-title-input").fill(eventTitle)
    await page.locator("#admin-event-form textarea").fill("Event created as part of the assignments")
    await page.getByLabel("City").fill("Indore")
    await page.getByLabel("Venue").fill("Raja Rao Bahdur Stadium")
   const datevalue = await futureDateValue()
    //await page.locator("[type='datetime-local']").waitFor()
    await page.locator("[type='datetime-local']").fill(datevalue)
    await page.locator("input[id*=price]").fill("50")
    await page.locator("#total-seats").fill("50")
    await page.locator("#add-event-btn").click()
    await expect(page.getByText("Event Created")).toBeVisible() 

    await page.locator("#nav-events").click()
    await expect(page.locator("[data-testid='event-card']").first().isVisible()).toBeTruthy()
    const allEventCards = await page.locator("[data-testid='event-card']")
    console.log(await allEventCards.count())
    for(let i=0;i<await allEventCards.count();++i)
    {
       if(await allEventCards.nth(i).locator("h3").textContent()===eventTitle)
       {
        await expect( allEventCards.nth(i).locator("h3").isVisible({timeout:5000})).toBeTruthy()
        seatsBeforeBooking = await allEventCards.nth(i).locator("span").last().textContent()
        seatsBeforeBooking = (seatsBeforeBooking.split(" "))[0]
        console.log(seatsBeforeBooking)
        await allEventCards.nth(i).locator("#book-now-btn").click()
        break

       }
    }
  await expect(page.locator("#ticket-count")).toHaveText("1")
  await page.locator("#customerName").fill("DeonMatrix")
  await page.locator("#customer-email").fill("DeonMatrix@gmail.com")
  await page.getByPlaceholder("+91 98765 43210").fill("+91 98765 43210")

  await page.locator(".confirm-booking-btn").click()
  

  await expect(page.locator(".booking-ref").first()).toBeVisible()
  const bookingref = await page.locator(".booking-ref").textContent()
  console.log(bookingref)

  await page.locator("#nav-bookings").click()
  await expect(page).toHaveURL(/bookings/)
    const bookingcards = await page.locator("#booking-card")
    await expect(bookingcards.first()).toBeVisible()

    for(let i =0;i<bookingcards.count();++i)
    {
        if(await bookingcards.nth(i).locator("booking-ref").textContent() === bookingref)
        {
            await expect(bookingcards.nth(i)).toBeVisible()
            await expect(bookingcards.nth(i).locator("h3")).toHaveText(eventTitle)
            break
        }
    }
await page.locator("#nav-events").click()
const eventcards = await page.locator("#event-card")
await expect(eventcards.first()).toBeVisible()
for(let i =0; i<eventcards.count();++i)
{
    if(await eventcards.nth(i).locator("h3").textContent()===eventTitle)
    {
        await expect(eventcards.nth(i)).toBeVisible()
        const seatsAfterBooking = ((await eventcards.nth(i).locator("span").last().textContent()).split(" "))[0]
        await expect(seatsAfterBooking===seatsAfterBooking-1).toBeTruthy()
    }
}
await page.pause()

})