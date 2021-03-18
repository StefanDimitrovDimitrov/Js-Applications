import { html } from "../../node_modules/lit-html/lit-html.js";
import {createRecord} from "../api/data.js";

const createTemplate = (onSubmit,minY,maxY) => html `
<div class="row space-top">
    <div class="col-md-12">
        <h1>Create New Furniture</h1>
        <p>Please fill all fields.</p>
    </div>
</div>
<form @submit=${onSubmit}>
    <div class="row space-top">
        <div class="col-md-4">
            <div class="form-group">
                <label class="form-control-label" for="new-make">Make</label>
                <input class="form-control valid" id="new-make" type="text" name="make">
            </div>
            <div class="form-group has-success">
                <label class="form-control-label" for="new-model">Model</label>
                <input class="form-control" id="new-model" type="text" name="model">
            </div>
            <div class="form-group has-danger">
                <label class="form-control-label" for="new-year">Year(${minY}-${maxY})</label>
                <input class="form-control" id="new-year" type="number" name="year" min=${String(minY)} max=${String(maxY)}>
            </div>
            <div class="form-group">
                <label class="form-control-label" for="new-description">Description</label>
                <input class="form-control" id="new-description" type="text" name="description">
            </div>
        </div>
        <div class="col-md-4">
            <div class="form-group">
                <label class="form-control-label" for="new-price">Price</label>
                <input class="form-control" id="new-price" type="number" name="price"min="0">
            </div>
            <div class="form-group">
                <label class="form-control-label" for="new-image">Image</label>
                <input class="form-control" id="new-image" type="text" name="img">
            </div>
            <div class="form-group">
                <label class="form-control-label" for="new-material">Material (optional)</label>
                <input class="form-control" id="new-material" type="text" name="material">
            </div>
            <input type="submit" class="btn btn-primary" value="Create" />
        </div>
    </div>
</form>
`



export async function createPage(ctx){
    const currentYear = new Date().getFullYear()
    let minY = currentYear - 71
    let maxY = currentYear + 29
    ctx.render(createTemplate(onSubmit,minY,maxY))


    async function onSubmit(event){
        event.preventDefault()
        const formData = new FormData(event.target)
        const data = [...formData.entries()].reduce((a, [k, v]) => Object.assign(a, {[k]: v}), {});

        if (Object.entries(data).filter(([k,v])=> k != 'material').some(([k,v])=> v == '')){
            return alert('Please fill in all the required fields.');
        }

        

        data.year = Number(data.year);
        
        data.price = Number(data.price)
        if (data.model.make < 4){
            return alert('The name of the item should be at least 4 symbols')
        }
        if (data.model.length < 4){
            return alert('The name of the model should be at least 4 symbols')
        }
        if (data.year > 1950 && data.year < 2050){
            return alert('Year must be between 1950 and 2050')
        }
        if (data.description.length <= 10){
            return alert('Description must be more than 10 symbols')
        }
        if (data.price < 0){
            return alert('Price must be a positive number')
        }

        await createRecord(data);

        ctx.page.redirect('/');
    }
}
