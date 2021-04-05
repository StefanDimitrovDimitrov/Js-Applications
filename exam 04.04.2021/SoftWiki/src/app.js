import { render } from "../node_modules/lit-html/lit-html.js";
import page from "../node_modules/page/page.mjs";

import { homePage } from "../views/home.js";
import { detailsPage } from "../views/details.js";
import { allDataPage } from "../views/allData.js";
import { createPage } from "../views/create.js";
import { editPage } from "../views/edit.js";
import { registerPage } from "../views/register.js";
import { loginPage } from "../views/login.js";
import { logout } from "./api.js"
import { searchPage } from "../views/search.js"


const main = document.querySelector("main");

page("/", decorateContext, homePage);
page("/home", decorateContext, homePage);
page("/allData", decorateContext, allDataPage);
page("/details/:id", decorateContext, detailsPage);
page("/create", decorateContext, createPage);
page("/edit/:id", decorateContext, editPage);
page("/register", decorateContext, registerPage);
page("/login", decorateContext, loginPage);
page("/search", decorateContext, searchPage);


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
    document.getElementById("user").style.display = "inline-block";
    document.getElementById("guest").style.display = "none";
  } else {
    document.getElementById("user").style.display = "none";
    document.getElementById("guest").style.display = "inline-block";
  }
}

document.getElementById('logoutBtn').addEventListener('click', async()=>{
    await logout();
    setUserNav();
    page.redirect('/home')
});


//SERVER - npm run  start
//TEST - npm run test

// "javascript:void(0)"
//<script src="/src/app.js" type="module"></script>