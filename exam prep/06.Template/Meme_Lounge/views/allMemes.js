import { html } from '../../node_modules/lit-html/lit-html.js';
import {getMemes} from '../src/data.js';

//${teams.map(teamTemplate)}

const allMemesTemplate = (data) => html`
<section id="meme-feed">
<h1>All Memes</h1>
<div id="memes">
    <!-- Display : All memes in database ( If any ) -->
    ${data.map(memeTemplate)}
    <!-- Display : If there are no memes in database -->
    ${data.length == 0 ? html`<p class="no-memes">No memes in database.</p>`: ''}
</div>
</section>
`
const memeTemplate = (data) => html`
<div class="meme">
    <div class="card">
        <div class="info">
            <p class="meme-title">${data.title}</p>
            <img class="meme-image" alt="meme-img" src="${data.imageUrl}">
        </div>
        <div id="data-buttons">
            <a class="button" href=${`/details/${data._id}`}>Details</a>
        </div>
    </div>
</div>
`

export async function allMemesPage(ctx){
    const data = await getMemes();

    ctx.render(allMemesTemplate(data))

    // const searchParam = ctx.querystring.split('=')[1];

    // const data = await getFurniture(searchParam);
    // ctx.render(homeTemplate(data,searchParam, onSearch))

    // function onSearch(event){
    //     const search = encodeURIComponent(document.getElementById('searchInput').value);
    //     ctx.page.redirect('/?search=' + search)
    // }

}




// const homeTemplate = (data,search='', onSearch) => html`
// <div class="row space-top">
//     <div class="col-md-12">
//         <h1>Welcome to Furniture System</h1>
//         <p>Select furniture from the catalog to view details.</p>
//     <div style="float:right">
//         <input id="searchInput" name="search" type="text" .value=${search}>
//         <button @click=${onSearch}>Search</button>
//     </div>
//     </div>
// </div>
// <div class="row space-top">
//     ${data.map(itemTemplate)}
// </div>
    
// `