import { html } from "../../node_modules/lit-html/lit-html.js";
import { getItemById, deleteRecord } from "../src/data.js";


const detailsTemplate = (item,isOwner,onDelete) =>html`
<section id="details-page" class="content details">
            <h1>${item.title}</h1>

            <div class="details-content">
                <strong>Published in category ${item.category}</strong>
                <p>${item.content}</p>
            
            ${isOwner ? 
              html`
                  <div class="buttons">
                    <a @click="${onDelete}" href="#" class="btn delete">Delete</a>
                    <a href=${`/edit/${item._id}`} class="btn edit">Edit</a>
                  </div>` : 
              html`
                <div class="buttons">
                    <a href="/home" class="btn edit">Back</a>
                </div>`}
            </div>
        </section>
`;

export async function detailsPage(ctx) {
  const id = ctx.params.id;
  const item = await getItemById(id);
  const userId = sessionStorage.getItem('userId')
  ctx.render(detailsTemplate(item,item._ownerId == userId,onDelete));

  // ctx.render(detailsTemplate(item));



  // // const userId = sessionStorage.getItem('userId')
  // // ctx.render(detailsTemplate(item,item._ownerId == userId,onDelete));

  async function onDelete(id) {
    const confirmed = confirm("Are you sure you want to delete this item?");
    if (confirmed) {
      await deleteRecord(item._id);
      ctx.page.redirect('/allData');
    }
  }
}
