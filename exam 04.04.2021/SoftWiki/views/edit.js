import { html } from "../../node_modules/lit-html/lit-html.js";
import { getItemById, editRecord } from "../src/data.js";


const editTemplate = (item, onSubmit) => html `
<section id="edit-page" class="content">
            <h1>Edit Article</h1>

            <form @submit=${onSubmit} id="edit" action="#" method="">
                <fieldset>
                    <p class="field title">
                        <label for="title">Title:</label>
                        <input type="text" name="title" id="title" placeholder="Enter article title" .value=${item.title}>
                    </p>

                    <p class="field category">
                        <label for="category">Category:</label>
                        <input type="text" name="category" id="category" placeholder="Enter article category" .value=${item.category}>
                    </p>
                    <p class="field">
                        <label for="content">Content:</label>
                        <textarea name="content" id="content" .value=${item.content}></textarea>
                    </p>

                    <p class="field submit">
                        <input class="btn submit" type="submit" value="Save Changes">
                    </p>

                </fieldset>
            </form>
</section>
`
//.value=${item.content}
export async function editPage(ctx){
    const id = ctx.params.id
    const item = await getItemById(id)
    ctx.render(editTemplate(item, onSubmit))

    async function onSubmit(event){
        event.preventDefault()
        const formData = new FormData(event.target)
        const data = {
            title: formData.get('title').trim(),
            category: formData.get('category').trim(),
            content: formData.get('content').trim(),
        }
      

            if (Object.values(data).some(x=> !x)){
                return alert("All fields are required")
            }
            if (data.category !="JavaScript" && data.category != "Java" && data.category != "Python"&& data.category != "C#"){
                return alert('The category must be one of "JavaScript", "C#", "Java", or "Python".')
            }
          
            await editRecord(item._id, data);
            ctx.page.redirect('/allData');
    
    }
}