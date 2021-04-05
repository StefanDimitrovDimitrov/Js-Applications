import { html } from '../../node_modules/lit-html/lit-html.js';
import {searchData, getAllData} from '../src/data.js';

// .value=$(queryValue)
// @click=${onSearch}

const searchTemplate = (data, onSearch, queryValue) =>html`
        <section id="search-page" class="content">
            <h1>Search</h1>
            <form @submit=${onSearch} id="search-form">
                <p class="field search">
                    <input type="text" placeholder="Search by article title" name="search">
                </p>
                <p class="field submit">
                    <input class="btn submit" type="submit" value="Search">
                </p>
            </form>
            <div class="search-container">
            ${data.length == 0? html`<h3 class="no-articles">No matching articles</h3>` : data.map(singleItemTemplate)}
        </section>
`

const singleItemTemplate = (data) =>html`
<a class="article-preview" href=${`/details/${data._id}`}>
        <article>
            <h3>Topic: <span>${data.title}</span></h3>
            <p>Category: <span>${data.category}</span></p>
        </article>
</a>
`

export async function searchPage(ctx) {

    const queryValue = ctx.querystring.split('=')[1]
    const data = ''
    ctx.render(searchTemplate(data, onSearch));

    async function onSearch(event){
        event.preventDefault()
        const formData = new FormData(event.target)
        const query = formData.get('search').trim()
        const newData = await searchData(query)
        //ctx.page.redirect(`/search?query=` + query)
        ctx.render(searchTemplate(newData))
        
    }
}


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