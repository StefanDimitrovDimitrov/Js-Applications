
const { chromium } = require('playwright-chromium');
const { expect } = require('chai');
let browser, page; // Declare reusable variables
describe('E2E tests', function() {
    this.timeout(6000)

    before(async () => 
        { browser = await chromium.launch({headless: false, slowMo:500}); 
    });

    after(async () => 
        { await browser.close(); 
    });

    beforeEach(async () => 
        { page = await browser.newPage(); 
    });
  
    afterEach(async () => 
        { await page.close(); }); 

    it('to.contains', async () =>{
        await page.goto('http://127.0.0.1:5500/01.%20Accordion/')

        const content = await page.content();
        expect(content).to.contains('Scalable Vector Graphics');
        expect(content).to.contains('Open standard');
        expect(content).to.contains('Unix');
        expect(content).to.contains('ALGOL');
    });
    it('textContent', async () =>{
        await page.goto('http://127.0.0.1:5500/01.%20Accordion/')

        const content = await page.textContent('.accordion .head span');

        expect(content).to.contains('Scalable Vector Graphics');
        
    });
    it("click'text=Something'", async () =>{
        await page.goto('http://127.0.0.1:5500/01.%20Accordion/')

        await page.click('text=More')

        const visible = await page.isVisible('.extra p');
        expect(visible).to.be.true;
    });
    it("query selector chain'", async () =>{
        await page.goto('http://127.0.0.1:5500/01.%20Accordion/')

        await page.click('#main>.accordion:first-child >> text=More')

        await page.waitForSelector('#main>.accordion:first-child >> .extra p')

        await page.click('#main>.accordion:first-child >> text=Less')

        const visible = await page.isVisible('#main>.accordion:first-child >> .extra p');
        expect(visible).to.be.false;
    });
    it("query selector chain'", async () =>{
        await page.goto('http://127.0.0.1:5500/01.Accordion/index.html')

        const titles = await page.$$eval('.accordion .head span', (spans) => spans.map(s=> s.textContent))
        console.log(titles)
        expect(titles).includes('Scalable Vector Graphics')
        expect(titles).includes('Open standard')
        expect(titles).includes('Unix')
        expect(titles).includes('ALGOL')
    });
});
