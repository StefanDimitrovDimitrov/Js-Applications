import { html } from '../../node_modules/lit-html/lit-html.js';
import {register} from '../src/data.js';



const registerTemplate = (onSubmit) => html`
<section id="register-page" class="content auth">
            <h1>Register</h1>

            <form @submit=${onSubmit} id="register" action="#" method="">
                <fieldset>
                    <blockquote>Knowledge is not simply another commodity. On the contrary. Knowledge is never used up.
                        It
                        increases by diffusion and grows by dispersion.</blockquote>
                    <p class="field email">
                        <label for="register-email">Email:</label>
                        <input type="email" id="register-email" name="email" placeholder="maria@email.com">
                    </p>
                    <p class="field password">
                        <label for="register-pass">Password:</label>
                        <input type="password" name="password" id="register-pass">
                    </p>
                    <p class="field password">
                        <label for="register-rep-pass">Repeat password:</label>
                        <input type="password" name="rep-pass" id="register-rep-pass">
                    </p>
                    <p class="field submit">
                        <input class="btn submit" type="submit" value="Register">
                    </p>
                    <p class="field">
                        <span>If you already have profile click <a href="/login">here</a></span>
                    </p>
                </fieldset>
            </form>
        </section>
`
;



export async function registerPage(ctx){
    ctx.render(registerTemplate(onSubmit))
    
    async function onSubmit(event){
        event.preventDefault()
        const formData = new FormData(event.target)
        
        const userData = {
            
            email: formData.get('email').trim(),
            password: formData.get('password').trim(),
            repass: formData.get('rep-pass').trim(),
            
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
