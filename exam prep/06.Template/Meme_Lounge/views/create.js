import { html } from "../../node_modules/lit-html/lit-html.js";
import {createRecord} from "../src/data.js";
import { notify } from "./notification.js";
// import{notify} from "/notification.js";

//@submit=${onSubmit}
const createTemplate = (onSubmit) => html `
<section id="create-meme">
<form @submit=${onSubmit} id="create-form">
    <div class="container">
        <h1>Create Meme</h1>
        <label for="title">Title</label>
        <input id="title" type="text" placeholder="Enter Title" name="title">
        <label for="description">Description</label>
        <textarea id="description" placeholder="Enter Description" name="description"></textarea>
        <label for="imageUrl">Meme Image</label>
        <input id="imageUrl" type="text" placeholder="Enter meme ImageUrl" name="imageUrl">
        <input type="submit" class="registerbtn button" value="Create Meme">
    </div>
</form>
</section>
`

export async function createPage(ctx){
    ctx.render(createTemplate(onSubmit))

    async function onSubmit(event){
        event.preventDefault()
        const formData = new FormData(event.target)
        const description = formData.get('description').trim();
        const imageUrl = formData.get('imageUrl').trim();
        const title = formData.get('title').trim();

        try{
            if(title == '' ||description ==''||imageUrl ==''){
                throw new Error ('All fields are required')
            }
    
    
            const data = {title, description, imageUrl}
            // const field4 = formData.get('fieldName').trim();
            // const field5 = formData.get('fieldName').trim();
            await createRecord(data);
            
            ctx.page.redirect('/allMemes');

        }catch(err){
            notify(err.message)
        }
    }
}
