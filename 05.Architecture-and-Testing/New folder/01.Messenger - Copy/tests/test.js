const{chromium} = require('playwright-chromium')
const{expect} = require('chai');
let browser, page;

describe('E2E tests', function() {
    this.timeout(6000)

    before(async () => 
        { browser = await chromium.launch({headless: false, slowMo:500}); 
    });

    after(async () => 
        { await browser.close(); 
    });

    beforeEach(async () => {
         page = await browser.newPage(); 
    });
  
    afterEach(async () => 
        { await page.close(); }); 

    it('test RefreshBtn display all content', async () =>{
        await page.goto('http://localhost:5500/01.Messenger/index.html')

        await page.click('[value=Refresh]')

        await page.waitForSelector('[value=Refresh]');

        const visible = await page.isVisible('textarea')
        expect(visible).to.be.true

        const textContent = await page.$$eval('textarea', (textarea) => textarea.map(s=> s.value))

        expect(textContent[0]).to.contains('Spami')
        expect(textContent[0]).to.contains('George')
        expect(textContent[0]).to.contains('Garry')
    });
    
    it('send messages', async () =>{
        await page.goto('http://localhost:5500/01.Messenger/index.html')

        await page.click('id=author')
        await page.waitForSelector('id=author')
        await page.fill('id=author','Fibunachi')
        await page.click('id=content')
        await page.fill('id=content','1123581321')

        const [request] = await Promise.all([
            page.waitForRequest(request => request.url().includes('/jsonstore/messenger') && request.method() === 'POST'),
            page.click('[value=Send]')
    
        ]);
    
        const data = JSON.parse(request.postData());
        expect(data.author).to.equal('Fibunachi');
        expect(data.content).to.equal('1123581321');
    });

});

