import { html } from '../../node_modules/lit-html/lit-html.js';
import {getAllData} from '../src/data.js';

//${data.title}
//${data.content}
//${data.category}

//${data.length == 0 ? html`<h3 class="no-articles">No articles yet</h3>`: data.map(singleItemTemplate)}
//href=${`/details/${data._id}`}

//html`<h3 class="no-articles">No articles yet</h3>`

const homeTemplate = (data) =>html`
        
        <section id="home-page" class="content">
            <h1>Recent Articles</h1>
            <section class="recent js">
                <h2>JavaScript</h2>
                ${data.filter(t => t.category == "JavaScript") == 0 
                ? html`<h3 class="no-articles">No articles yet</h3>` : 
                html`
                <article>
                    <h3>${data.filter(t => t.category == "JavaScript")[0].title}</h3>
                    <p>${data.filter(t => t.category == "JavaScript")[0].content}</p>
                    <a href=${`/details/${data._id}`} class="btn details-btn">Details</a>
                </article>`}
            </section>
            <section class="recent csharp">
                <h2>C#</h2>
                ${data.filter(t => t.category == "C#") == 0 
                ? html`<h3 class="no-articles">No articles yet</h3>` : 
                html`
                <article>
                    <h3>${data.filter(t => t.category == "C#")[0].title}</h3>
                    <p>${data.filter(t => t.category == "C#")[0].content}</p>
                    <a href=${`/details/${data._id}`} class="btn details-btn">Details</a>
                </article>`}
            </section>
            <section class="recent java">
                <h2>Java</h2>
                ${data.filter(t => t.category == "Java") == 0 
                ? html`<h3 class="no-articles">No articles yet</h3>` : 
                html`
                <article>
                    <h3>${data.filter(t => t.category == "Java")[0].title}</h3>
                    <p>${data.filter(t => t.category == "Java")[0].content}</p>
                    <a href=${`/details/${data._id}`} class="btn details-btn">Details</a>
                </article>`}
            </section>
            <section class="recent python">
                <h2>Python</h2>
                ${data.filter(t => t.category == "Python") == 0 
                ? html`<h3 class="no-articles">No articles yet</h3>` : 
                html`
                <article>
                    <h3>${data.filter(t => t.category == "Python")[0].title}</h3>
                    <p>${data.filter(t => t.category == "Python")[0].content}</p>
                    <a href=${`/details/${data._id}`} class="btn details-btn">Details</a>
                </article>`}
            </section>
        </section>`


export async function homePage(ctx){
    const data = await getAllData()
    ctx.render(homeTemplate(data))


}

// {/* <section class="recent python">
// <h2>Python</h2> */            </section>}

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

