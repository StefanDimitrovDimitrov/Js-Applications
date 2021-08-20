import { html } from "../../node_modules/lit-html/lit-html.js";
// import {createRecord} from "../src/data.js";
// import { notify } from "./notification.js";


// @submit=${onSubmit}
const createTemplate = (onSubmit) =>html `

`

export async function createPage(ctx){
    ctx.render(createTemplate(onSubmit))

    async function onSubmit(event){
        event.preventDefault()
        const formData = new FormData(event.target)
        const data = {
            title: formData.get('title').trim(),
            description: formData.get('description').trim(),
            imageUrl: formData.get('imageUrl').trim(),
        }

        if (Object.values(data).some(x=> !x)){
            return alert("All fields are required")
        }
        
        await createRecord(data);
        ctx.page.redirect('/allData');

    }
}
