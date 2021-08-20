import { html } from '../../node_modules/lit-html/lit-html.js';
// import {register} from '../src/data.js';
// import { notify } from "./add functions/notification.js"

//@submit=${onSubmit}
const registerTemplate = (onSubmit) =>html`

`;



export async function registerPage(ctx){
    ctx.render(registerTemplate(onSubmit))
    
    async function onSubmit(event){
        event.preventDefault()
        const formData = new FormData(event.target)
        
        const userData = {
            email: formData.get('email').trim(),
            username: formData.get('username').trim(),
            password: formData.get('password').trim(),
            repass: formData.get('repeatPass').trim(),
            gender: formData.get('gender'),
        }

        if (Object.values(userData).some(x=> !x)){
            return alert("All fields are required")
        }

        if(userData.password != userData.repass){
            return alert('Passwords don\'t match')
        }
    
        await register(userData);
        ctx.setUserNav();
        ctx.page.redirect('/allData');

    }    
}
