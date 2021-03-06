function solution() {

    function addEventListener() {
        document.getElementById('main').addEventListener('click', e => {
            if (e.target.tagName == 'BUTTON') {
                const profile = e.target.parentNode.parentNode;

                let div = profile.querySelector('.extra');

                div.style.display != 'block' ? div.style.display = 'block' : div.style.display = 'none'
                let isVisible = div.style.display === 'block';

                isVisible ? e.target.textContent = 'Less' : e.target.textContent = 'More'

            }
        })
    }

    async function getData() {


        const url = 'http://localhost:3030/jsonstore/advanced/articles/list';

        const response = await fetch(url);
        const data = await response.json();

        for (const object of data) {
            const urlArt = 'http://localhost:3030/jsonstore/advanced/articles/details/' + object._id
            const responseA = await fetch(urlArt);
            const dataA = await responseA.json();

            createArticle(dataA._id, dataA.title, dataA.content)
        }
    }
    getData()

    function createArticle(idA, title, content) {
        let main = document.getElementById('main')
        const divElement = newE('div', { className: 'accordion' },
            newE('div', { className: 'head' },
                newE('span', {}, title),
                newE('button', { className: 'button', id: idA }, 'More')),
            newE('div', { className: 'extra' },
                newE('p', {}, content)))

        main.appendChild(divElement)
        addEventListener()
    }

    function newE(type, attributes, ...content) {
        const result = document.createElement(type);

        for (let [attr, value] of Object.entries(attributes || {})) {
            result[attr] = value;
        }
        content = content.reduce((a, c) => a.concat(Array.isArray(c) ? c : [c]), []);

        content.forEach(e => {
            if (typeof e == 'string' || typeof e == 'number') {
                const node = document.createTextNode(e);
                result.appendChild(node);
            } else {
                result.appendChild(e);
            }
        });

        return result;

    }

    return addEventListener()
}

solution()
// function toggle() {
//     let btn = document.getElementsByClassName('button')[0];
//     let info = document.getElementById('extra');
//     if(btn.textContent == "More"){
//         info.style.display = "block";
//         btn.innerText = "Less"; //btn.textContent is the same
//     }else{
//         btn.innerHTML = "More";
//         info.style.display = 'none';
//     }
// }
    // [
    //     {"_id":"ee9823ab-c3e8-4a14-b998-8c22ec246bd3","title":"Scalable Vector Graphics"},
    //     {"_id":"fdf00227-084f-48bc-a450-9242a0963f1f","title":"Open standard"},
    //     {"_id":"8cd30492-3c55-4864-a1a2-7870e1694116","title":"Unix"},
    //     {"_id":"9d776e93-bc6f-408c-9ab8-8aad7a5cffc4","title":"ALGOL"}
    // ]
    //}
/* <div class="accordion">
    <div class="head">
        <span>Scalable Vector Graphics</span>
        <button class="button" id="ee9823ab-c3e8-4a14-b998-8c22ec246bd3">More</button>
    </div>
    <div class="extra">
        <p>Scalable Vector Graphics .....</p>
    </div>
</div> */