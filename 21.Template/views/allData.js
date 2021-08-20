import { html } from '../../node_modules/lit-html/lit-html.js';
// import {getAllData} from '../src/data.js';

// href=${`/details/${data._id}`}
// ${data.length == 0 ? html` ` : data.map(singleItemTemplate)}
const AllDataTemplate = (data) =>html`

`
const singleItemTemplate = (data) =>html`

`

export async function allDataPage(ctx){
    // const data = await getAllData()
    ctx.render(AllDataTemplate(data))

    // const searchParam = ctx.querystring.split('=')[1];

    // const data = await getAllData(searchParam);
    // ctx.render(homeTemplate(data,searchParam, onSearch))

    // function onSearch(event){
    //     const search = encodeURIComponent(document.getElementById('searchInput').value);
    //     ctx.page.redirect('/?search=' + search)
    // }

}
