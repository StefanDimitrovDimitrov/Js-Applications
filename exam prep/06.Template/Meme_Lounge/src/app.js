import { render } from "../node_modules/lit-html/lit-html.js";
import page from "../node_modules/page/page.mjs";


import { homePage } from "../views/home.js";
import { detailsPage } from "../views/details.js";
import { allMemesPage } from "../views/allMemes.js";
import { createPage } from "../views/create.js";
import { editPage } from "../views/edit.js";
import { registerPage } from "../views/register.js";
import { loginPage } from "../views/login.js";
import { userProfile } from "../views/userProfile.js";
import { logout } from "./api.js";

//const main = document.querySelector(".container");
const main = document.querySelector("main");

page("/", decorateContext, homePage);
page("/home", decorateContext, homePage);
page("/userProfile", decorateContext, userProfile);
page("/allMemes", decorateContext, allMemesPage);
page("/details/:id", decorateContext, detailsPage);
page("/create", decorateContext, createPage);
page("/edit/:id", decorateContext, editPage);
page("/register", decorateContext, registerPage);
page("/login", decorateContext, loginPage);


setUserNav();

//start application
page.start();

function decorateContext(ctx, next) {
  ctx.render = (content) => render(content, main);
  ctx.setUserNav = setUserNav;
  next();
}

function setUserNav() {
  const email = sessionStorage.getItem("email");
  if (email != null) {
    document.querySelector('div.profile > span').textContent = `Welcome ${email}`
    document.querySelector(".user").style.display = "block";
    document.querySelector(".guest").style.display = "none";
  } else {
    document.querySelector(".user").style.display = "none";
    document.querySelector(".guest").style.display = "block";
  }
}

document.getElementById('logoutBtn').addEventListener('click', async()=>{
    await logout();
    setUserNav();
    page.redirect('/')
});


//SERVER - npm run  start
//TEST - npm run test

// "javascript:void(0)"
//<script src="/src/app.js" type="module"></script>