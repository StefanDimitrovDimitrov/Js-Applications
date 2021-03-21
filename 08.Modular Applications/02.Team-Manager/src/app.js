import page from "../node_modules/page/page.mjs";
import { render } from "../node_modules/lit-html/lit-html.js";

import {browsePage} from "./views/browseTeams.js"
import {createPage} from "./views/create.js"
import {editPage} from "./views/edit.js"
import {homePage} from "./views/home.js"
import {loginPage} from "./views/login.js"
import {myPage} from "./views/myTeams.js"
import {registerPage} from "./views/register.js"
import {teamHomePage} from "./views/teamHome.js"

const main = document.querySelector("main");

page("/",decorateContext, homePage);
page("/index.html",decorateContext, homePage);
page("/browseTeams", decorateContext, browsePage);
page("/myTeam/:id", decorateContext, myPage);
page("/create/:id", decorateContext, createPage);
page("/login", decorateContext, loginPage);
page("/register", decorateContext, registerPage);
page("/details/:id", decorateContext, teamHomePage);
page("/edit/:id", decorateContext, editPage);


setUserNav()
page.start();

function decorateContext(ctx, next) {
    ctx.setUserNav = setUserNav;
    ctx.render = (content) => render(content, main);
    
    next();
}

function setUserNav() {
    const userId = sessionStorage.getItem("userId");
    if (userId != null) {
      document.getElementById("user").style.display = "block";
      document.getElementById("guest").style.display = "none";
    } else {
      document.getElementById("user").style.display = "none";
      document.getElementById("guest").style.display = "block";
    }
}

document.getElementById('logoutBtn').addEventListener('click', async()=>{
  await logout();
  setUserNav();
  page.redirect('/')
});