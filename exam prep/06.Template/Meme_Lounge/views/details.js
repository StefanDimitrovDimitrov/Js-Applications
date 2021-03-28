import { html } from "../../node_modules/lit-html/lit-html.js";
import { getItemById, deleteRecord } from "../src/data.js";

// ${isOwner ? html`
// <div>
//   <a href=${`/edit/${item._id}`} class="btn btn-info">Edit</a>
//   <a @click=${onDelete}" class="btn btn-red">Delete</a>
// </div>` : ''}

// ${isOwner ? html`
//       <a class="button warning" href=${`/edit/${item._id}`}>Edit</a>
//       <button @click="${onDelete}" class="button danger">Delete</button>
//       `: ''}
const detailsTemplate = (item, isOwner, onDelete ) => html`
<section id="meme-details">
<h1>Meme Title: ${item.title}

</h1>
<div class="meme-details">
    <div class="meme-img">
        <img alt="meme-alt" src=${item.imageUrl}>
    </div>
    <div class="meme-description">
        <h2>Meme Description</h2>
        <p>
        ${item.description}
        </p>

        <!-- Buttons Edit/Delete should be displayed only for creator of this meme  -->
      ${isOwner ? html`
      <a class="button warning" href=${`/edit/${item._id}`}>Edit</a>
      <button @click="${onDelete}" class="button danger">Delete</button>
      `: ''}

        
    </div>
</div>
</section>
`;

export async function detailsPage(ctx) {
    const id = ctx.params.id;
    const item = await getItemById(id);

    ctx.render(detailsTemplate(item));

//   const id = ctx.params.id;
//   const item = await getItemById(id);

  const userId = sessionStorage.getItem('userId')
  ctx.render(detailsTemplate(item,item._ownerId == userId,onDelete));

  async function onDelete(id) {
    const confirmed = confirm("Are you sure you want to delete this item?");
    if (confirmed) {
      await deleteRecord(item._id);
      ctx.page.redirect('/');
    }
  }
}
