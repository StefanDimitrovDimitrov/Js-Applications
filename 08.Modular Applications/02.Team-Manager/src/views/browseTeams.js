import { html } from '../../node_modules/lit-html/lit-html.js';
import {getTeams} from '../api/data.js';

const browseTemplate = (data, id) => html`
<section id="browse">

    <article class="pad-med">
        <h1>Team Browser</h1>
    </article>
    ${id ? html`
    <article class="layout narrow">
        <div class="pad-small"><a href="/create/:id" class="action cta">Create Team</a></div>
    </article>`: ''}
    ${data.map(article)}
</section>

`
const article = (data) => html`
<article class="layout">
<img src=".${data.logoUrl}" class="team-logo left-col">
<div class="tm-preview">
    <h2>${data.name}</h2>
    <p>${data.description}</p>
    <span class="details">5000 Members</span>
    <div><a href=${`/details/${data._id}`} class="action">See details</a></div>
</div>
</article>
`

export async function browsePage(ctx){
    const userId = sessionStorage.getItem("userId");
    const data = await getTeams();
    ctx.render(browseTemplate(data, userId != null))
}
