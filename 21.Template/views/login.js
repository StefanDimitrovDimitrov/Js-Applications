import { html } from '../../node_modules/lit-html/lit-html.js';
// import {login} from '../src/data.js';
// import { notify } from "./add functions/notification.js"

// @submit=${onSubmit}
const loginTemplate = (onSubmit) =>html`

`

export async function loginPage(ctx){
    ctx.render(loginTemplate(onSubmit));

    async function onSubmit(event){
        event.preventDefault();
        const formData = new FormData(event.target);
        const userData = {
            email: formData.get('email').trim(),
            password: formData.get('password').trim(),

        }

        if (Object.values(userData).some(x=> !x)){
            return alert("All fields are required")
        }

        await login(userData);
        ctx.setUserNav();
        ctx.page.redirect('/');

    }
}