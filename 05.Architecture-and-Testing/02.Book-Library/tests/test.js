const{chromium} = require('playwright-chromium')
const{expect} = require('chai');
let browser, page;

function json(data){
    return{
        status:200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }
}


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

    it('Testing: load books', async () =>{
    await page.goto('http://127.0.0.1:5500/02.Book-Library/index.html')

    await page.click('[name=title]')
    await page.waitForSelector('[name=title]')
    await page.fill('[name=title]','1123581321')

    await page.click('[name=author]')
    await page.waitForSelector('[name=author]')
    await page.fill('[name=author]','Fibonachi')

    await page.click('form button')
    await page.waitForSelector('form button')

    await page.click('#loadBooks')
    await page.waitForSelector('#loadBooks');

    const content = await page.content();
    expect(content).to.contains('1123581321');

    })
    
    it('Testing: add book correctly', async () =>{
    await page.goto('http://127.0.0.1:5500/02.Book-Library/index.html')
    
    await page.click('[name=title]')
    await page.waitForSelector('[name=title]')
    await page.fill('[name=title]','1123581321',)

    await page.click('[name=author]')
    await page.waitForSelector('[name=author]')
    await page.fill('[name=author]','Fibonachi',)

    const [request] = await Promise.all([
        page.waitForRequest(request => request.url().includes('/jsonstore/collections/books') && request.method() === 'POST'),
        page.click('form button')

    ]);

    const data = JSON.parse(request.postData());
    expect(data.author).to.equal('Fibonachi');
    expect(data.title).to.equal('1123581321');
});
    
    it('Testing: add book empty fields', async () =>{
        await page.goto('http://127.0.0.1:5500/02.Book-Library/index.html')
    
        await page.click('[name=title]')
        await page.waitForSelector('[name=title]')
        await page.fill('[name=title]','',)
    
        await page.click('[name=author]')
        await page.waitForSelector('[name=author]')
        await page.fill('[name=author]','',)
        page.on('dialog', dialog => dialog.message('All fields are required!'));

    })

    it('Testing: edit book', async () =>{
        await page.goto('http://127.0.0.1:5500/02.Book-Library/index.html')
        
        await page.click('id=loadBooks')
        await page.waitForSelector('id=loadBooks');

        await page.click('text=Edit')
        await page.waitForSelector('text=Edit')

        await page.fill('#editForm [name=title]','Fibonachi')
        await page.waitForSelector('#editForm [name=title]')
        await page.fill('#editForm [name=author]','1123')
        await page.waitForSelector('#editForm [name=author]')
        await page.click('button')

        await page.click('id=loadBooks')
        await page.waitForSelector('id=loadBooks');

        const content = await page.content();
        
        expect(content).to.contains('Fibonachi');
        expect(content).to.contains('1123');

    })
    it('Testing: delete book', async () =>{
        await page.goto('http://127.0.0.1:5500/02.Book-Library/index.html')
        await page.click('#loadBooks');
        await page.waitForSelector('#loadBooks');
        await page.click('#loadBooks')

        await page.waitForSelector('#loadBooks');

        const id = await page.$$eval('tbody tr:last-child', t => t.map(s => s.dataset.id)[0])

        page.on('dialog', dialog => dialog.accept());

        const [request] = await Promise.all([
            page.waitForRequest('http://localhost:3030/jsonstore/collections/books/' + id),
            page.click
            ('tbody:last-child tr:last-child button:text("Delete")')
        ]);

        expect(request.method()).to.equal('DELETE');

    })
})