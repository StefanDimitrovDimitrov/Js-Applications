import { html } from "../../node_modules/lit-html/lit-html.js";
import {createRecord } from '../src/data.js'



const createTemplate = (onSubmit) => html `
<section id="create-page" class="content">
            <h1>Create Article</h1>

            <form @submit=${onSubmit} id="create" action="#" method="">
                <fieldset>
                    <p class="field title">
                        <label for="create-title">Title:</label>
                        <input type="text" id="create-title" name="title" placeholder="Enter article title">
                    </p>

                    <p class="field category">
                        <label for="create-category">Category:</label>
                        <input type="text" id="create-category" name="category" placeholder="Enter article category">
                    </p>
                    <p class="field">
                        <label for="create-content">Content:</label>
                        <textarea name="content" id="create-content"></textarea>
                    </p>

                    <p class="field submit">
                        <input class="btn submit" type="submit" value="Create">
                    </p>

                </fieldset>
            </form>
        </section>

`

export async function createPage(ctx){
    ctx.render(createTemplate(onSubmit))

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
            await createRecord(data);
            ctx.page.redirect('/allData');
       
    }
}
