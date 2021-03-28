import { html } from '../../node_modules/lit-html/lit-html.js';
import {register} from '../src/data.js';
import { notify } from './notification.js';

//@submit=${onSubmit}
const registerTemplate = (onSubmit) => html`
<section id="register">
<form @submit=${onSubmit} id="register-form">
    <div class="container">
        <h1>Register</h1>
        <label for="username">Username</label>
        <input id="username" type="text" placeholder="Enter Username" name="username">
        <label for="email">Email</label>
        <input id="email" type="text" placeholder="Enter Email" name="email">
        <label for="password">Password</label>
        <input id="password" type="password" placeholder="Enter Password" name="password">
        <label for="repeatPass">Repeat Password</label>
        <input id="repeatPass" type="password" placeholder="Repeat Password" name="repeatPass">
        <div class="gender">
            <input type="radio" name="gender" id="female" value="female">
            <label for="female">Female</label>
            <input type="radio" name="gender" id="male" value="male" checked>
            <label for="male">Male</label>
        </div>
        <input type="submit" class="registerbtn button" value="Register">
        <div class="container signin">
            <p>Already have an account?<a href="/login">Sign in</a>.</p>
        </div>
    </div>
</form>
</section>
`
;



export async function registerPage(ctx){
    ctx.render(registerTemplate(onSubmit))
    
    async function onSubmit(event){
        event.preventDefault()
        const formData = new FormData(event.target)
        const email = formData.get('email').trim();
        const username = formData.get('username').trim();
        const password = formData.get('password').trim();
        const repass = formData.get('repeatPass').trim();
        const gender = formData.get('gender');
    
        try{

            if (email == '' || password == '' ||repass == '' ||gender =="" ||username==''){
                ctx.render(registerTemplate(onSubmit, email == '', password == '', repass == '', username=''))
                return alert('All fields are required')
            }
            if(password != repass){
                ctx.render(registerTemplate(onSubmit, false, true, true))
                return alert('Passwords don\'t match')
            }
        
            await register(email, username, password, gender);
            ctx.setUserNav();
            ctx.page.redirect('/');
        }catch(err){
            notify(err.messege)
        }
    }
}


// ${errorMsg ? html`<div class='form-group'>
// <p>${errorMsg}</p>
// </div>`:''}