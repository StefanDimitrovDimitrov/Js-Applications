import { html } from '../../node_modules/lit-html/lit-html.js';
import {getMyMemes} from '../src/data.js';


const userProfileTemplate = (data, gender, username, email, len) =>html`
<section id="user-profile-page" class="user-profile">
            <article class="user-info">
                <img id="user-avatar-url" alt="user-profile" src="/images/${gender}.png">
                <div class="user-content">
                    <p>Username: ${username}</p>
                    <p>Email: ${email}</p>
                    <p>My memes count: ${len}</p>
                </div>
            </article>
            <h1 id="user-listings-title">User Memes</h1>
            <div class="user-meme-listings">
            
                ${len == 0? html`
                <!-- Display : If user doesn't have own memes  --> 
                <p class="no-memes">No memes in database.</p>`:
                data.map(memeTemplate)}
            </div>
        </section>`

const memeTemplate =(data)=> html`
    <div class="user-meme">
        <p class="user-meme-title">${data.title}</p>
        <img class="userProfileImage" alt="meme-img" src=${data.imageUrl}>
        <a class="button" href=${`/details/${data._id}`}>Details</a>
    </div>`


export async function userProfile(ctx){
    const userId = sessionStorage.getItem('userId')
    const gender = sessionStorage.getItem('gender')
    const username = sessionStorage.getItem('username')
    const email = sessionStorage.getItem('email')
    const data = await getMyMemes(userId);
    const len = data.length
    ctx.render(userProfileTemplate(data, gender, username, email, len ))
}