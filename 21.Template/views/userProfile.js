import { html } from '../../node_modules/lit-html/lit-html.js';
// import {getMyData} from '../src/data.js';

//href=${`/details/${data._id}`}
const userProfileTemplate = (data, username, email, gender) => html`

`
const singleItemTemplate = (data) =>html`

`


export async function userProfilePage(ctx){
    const userId = sessionStorage.getItem('userId')
    const email = sessionStorage.getItem('email')
    const username = sessionStorage.getItem('username')
    const gender = sessionStorage.getItem('gender')
    const data = await getMyData(userId);
    ctx.render(userProfileTemplate(data, username, email, gender))
}