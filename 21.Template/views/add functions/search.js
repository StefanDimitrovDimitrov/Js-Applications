// import { html } from '../../node_modules/lit-html/lit-html.js';
// import {search} from '../src/data.js';

// // .value=$(queryValue)
// // @click=${onSearch}

// const searchTemplate = (data, onSearch, queryValue) =>html`

// `

// const singleItemTemplate = (data) =>html`

// `

// export async function searchPage(ctx) {
    
//     const queryValue = Number(ctx.querystring.split('=')[1])
//     const data = Number.isNaN(queryValue) ? '' : await search(queryValue)
//     ctx.render(searchTemplate(data, onSearch, queryValue));

//     function onSearch() {
//         const query = Number(document.getElementById('search').value);
//         ctx.page.redirect(`/search?query=` + query)
//     }
// }


//Search steps:

//1. copy paste allItems in new js file. 
//2. Create search template function like allItems Template
//3. in src/data add get search request - recieve search value from the history field
//4. create searchPage function for the page in the app
//5 add the searchPage to the path in the app
//6. create function onSearch()
    //6.1 take the query from the input field
    //6.2 put the query in ctx.page.redirect such as  ctx.page.redirect(`/search?query=` + query)

//6. take the query from the ctx object  using ctx.querystring.split('=')[1] in search Page function
//7. Give the following arguments to searchTemplate( object with the result from search(queryValue), onSearch function and the value ) example ctx.render(searchTemplate(object, onSearch, queryValue));

//see the template above