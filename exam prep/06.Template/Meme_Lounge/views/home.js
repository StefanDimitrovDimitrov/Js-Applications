import { html } from '../../node_modules/lit-html/lit-html.js';
// import {getFurniture} from '../api/data.js';

const homeTemplate = () => html`
<section id="welcome">
<div id="welcome-container">
    <h1>Welcome To Meme Lounge</h1>
    <img src="/images/welcome-meme.jpg" alt="meme">
    <h2>Login to see our memes right away!</h2>
    <div id="button-div">
        <a href="/login" class="button">Login</a>
        <a href="/register" class="button">Register</a>
    </div>
</div>
</section>
`


export async function homePage(ctx){
    ctx.render(homeTemplate())

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