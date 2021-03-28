const box = document.getElementById('errorBox');

export function notify(message){
    box.innerHTML = `<span>${message}</span>`;
    box.style.display='block';

    setTimeout(()=>{
        box.style.display='none';
    },3000);
}











// import { html, render } from '../../node_modules/lit-html/lit-html.js';

// const notificationTemplate = (message) => html`
// <section id="notification" @click=${clelar}>
//     ${message}
//     <span style="margin-left: 32px;">\u2716</span>>
// </section>
// `

// const container = document.createElement('div');
// document.body.appendChild(container);

// export function nitify(message){
//     render(notificationTemplate(message), container)
// }

// export function clear(){
//     render('', container);
// }

// Css StyleMedia

// #notification{
//     display: inline=block;
//     background-color: red;
//     padding:16px 32px;
//     cplor: black;
//     position: fixed;
//     top: 50 px;
//     right:300;
//     cursor: PointerEvent;
// }