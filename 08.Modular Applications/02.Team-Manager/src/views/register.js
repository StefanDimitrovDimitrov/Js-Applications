import { html } from '../../node_modules/lit-html/lit-html.js';
import {register} from '../api/data.js';

const registerTemplate = (onSubmit, errMsg) => html`
<section id="register">
    <article class="narrow">
        <header class="pad-med">
            <h1>Register</h1>
        </header>
        <form @submit=${onSubmit}id="register-form" class="main-form pad-large">
            ${errMsg ? html`<div class=${errMsg}>Error message.</div>`: ''}
            <label>E-mail: <input type="text" name="email"></label>
            <label>Username: <input type="text" name="username"></label>
            <label>Password: <input type="password" name="password"></label>
            <label>Repeat: <input type="password" name="repass"></label>
            <input class="action cta" type="submit" value="Create Account">
        </form>
        <footer class="pad-small">Already have an account? <a href="/login" class="invert">Sign in here</a>
        </footer>
    </article>
</section>
`

export async function registerPage(ctx){
    ctx.render(registerTemplate(onSubmit, errMsg));

    async function onSubmit(event){
        event.preventDefault();
        const formData = new FormData(event.target);
        const email = formData.get('email').trim();
        const username = formData.get('username').trim();
        const password = formData.get('password').trim();
        const repass = formData.get('repass').trim();

    try{
        if(email == '' || username== '' || password == ''){
            throw new Error('All fields are required!')
        }
        if (password != repass){
            throw new Error('Passwords don\'t match!');
        }

        await register(email, username, password);
        ctx.setUserNav();
        ctx.page.redirect('/my-teams');
    }catch{
        ctx.render(registerTemplate(onSubmit,err.message));
    }
        

    }
}
