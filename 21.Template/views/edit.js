import { html } from "../../node_modules/lit-html/lit-html.js";
// import { getItemById, editRecord } from "../src/data.js";
// import { notify } from "./add functions/notification.js";

//(`/details/${id}`)
// @submit=${onSubmit}
// .value=${item.title}
const editTemplate = (item, onSubmit) =>html`

`


export async function editPage(ctx){
    const id = ctx.params.id
    const item = await getItemById(id)
    ctx.render(editTemplate(item, onSubmit))




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
    
        await editRecord(item._id, data);
        ctx.page.redirect(`/details/${id}`);

    }
}