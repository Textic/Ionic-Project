import { browser, element, by} from 'protractor';

describe('Navigate test', () => {
    beforeEach(async () => {
        await browser.get("/login");
        await browser.sleep(5000);
    });

    // it("El tab 1 se muestra por defecto",()=>{
    //     expect(element(by.css(".tab-selected ion-label")).getText()).toContain("Tab 1");
    // });

    // it("El usuario puede navegar a la pestaña Tab 2",async ()=>{
    //     await element(by.css("[tab=tab2]")).click();
    //     browser.driver.sleep(500);
    //     expect(element(by.css(".tab-selected ion-label")).getText()).toContain("Tab 2");
    // });

    // it("Navigate to Conductor page", async() => {
    //     await element(by.css("[value=driver]")).click();
    //     browser.driver.sleep(5000);
    //     expect(element(by.css("app-root ion-title")).getText()).toContain("Conductor");
    // });

    it("Login", async () => {
        await element(by.css("[type=password]")).sendKeys("dai.gonzalez@duocuc.cl");
        await element(by.css("[type=password]")).sendKeys("123456");
        // element(by.css("ion-button[type=submit]")).click();
        // await element(by.id("mail")).sendKeys("dai.gonzalez@duocuc.cl");
        // await element(by.id("pass")).sendKeys("123456");
        await element(by.css("ion-button[type=submit]")).click();
        expect(element(by.css("ion-title")).getText()).toContain("Iniciar Sesion");
    });
});