import { html } from '../../node_modules/lit-html/lit-html.js';
import {getAllDataCatalog} from '../src/data.js';


const AllDataTemplate = (data) =>html`
<section id="catalog-page" class="content catalogue">
            <h1>All Articles</h1>
            ${data.length == 0 ? html`<h3 class="no-articles">No articles yet</h3>`: data.map(singleItemTemplate)}            
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

export async function allDataPage(ctx){
    const data = await getAllDataCatalog()
    ctx.render(AllDataTemplate(data))
}
