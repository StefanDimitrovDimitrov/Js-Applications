// import { html } from "../../node_modules/lit-html/lit-html.js";
// import { getAllSearchItems } from "../../src/data.js";

// const allPagesTemplate = (data, page, pages) => html`
//   <section id="car-listings">
//     <h1>Car Listings</h1>
//     <div class="listings">
//       <div>Page ${page} / ${pages} 
//       ${page > 1 ? html`<a class="button-list" href="/all-listing?page=${page-1}">&lt; Prev</a>` : ''}
//       ${page < pages ? html`<a class="button-list" href="/all-listing?page=${page+1}">Next &gt;</a>` : ''}
      
//       </div>
//       ${data.length == 0
//         ? html`<p class="no-cars">No cars in database.</p>`
//         : data.map(pageTemplate)}
//     </div>
//   </section>`
// const pageTemplate = (data) => html`
//   <div class="listing">
//     <div class="preview">
//       <img src=${data.imageUrl} />
//     </div>
//     <h2>${data.brand} ${data.model}</h2>
//     <div class="info">
//       <div class="data-info">
//         <h3>Year: ${data.year}</h3>
//         <h3>Price: ${data.price} $</h3>
//       </div>
//       <div class="data-buttons">
//         <a href=${`/details/${data._id}`} class="button-carDetails">Details</a>
//       </div>
//     </div>
//   </div>
// `;

// export async function allPages(ctx) {
//   const page = Number(ctx.querystring.split("=")[1]) || 1;
//   const count = await getCollectionSize();
//   const pages = Math.ceil(count / 3);
//   const data = await getAllSearchItems(page);

//   ctx.render(allPagesTemplate(data,page,pages));

// }



