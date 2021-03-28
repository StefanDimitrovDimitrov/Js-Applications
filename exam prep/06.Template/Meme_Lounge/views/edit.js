import { html } from "../../node_modules/lit-html/lit-html.js";
import { getItemById, editRecord } from "../src/data.js";
import { notify } from "./notification.js";

//@submit=${onSubmit}
const editTemplate = (item, onSubmit) => html `
<section id="edit-meme">
<form @submit=${onSubmit} id="edit-form">
    <h1>Edit Meme</h1>
    <div class="container">
        <label for="title">Title</label>
        <input id="title" type="text" placeholder="Enter Title" name="title" .value=${item.title}>
        <label for="description">Description</label>
        <textarea id="description" placeholder="Enter Description" name="description" .value=${item.description}>
        </textarea>
        <label for="imageUrl">Image Url</label>
        <input id="imageUrl" type="text" placeholder="Enter Meme ImageUrl" name="imageUrl" .value=${item.imageUrl}>
        <input type="submit" class="registerbtn button" value="Edit Meme">
    </div>
</form>
</section>
`


export async function editPage(ctx){
    const id = ctx.params.id;
    const item = await getItemById(id)
    return ctx.render(editTemplate(item, onSubmit))

    // const id = ctx.params.id
    // const item = await getItemById(id)

    // ctx.render(editTemplate(item, onSubmit))

    async function onSubmit(event){
        event.preventDefault()
        const formData = new FormData(event.target)
        const description = formData.get('description').trim();
        const imageUrl = formData.get('imageUrl').trim();
        const title = formData.get('title').trim();
        try{

            if(title == '' ||description ==''||imageUrl ==''){
               throw new Erroor('All fields are required')
            }
    
            const data = {title, description, imageUrl}
            
             await editRecord(id, data);
            ctx.page.redirect('/details/' + id);
        }catch(err){
            notify(err.message)
        }

    }
}