// 1. Copy the html file
// 2. COMAND  - npm install
// 3. start surver
// 4. in the main html file: <script src="/src/app.js" type="module"></script>
// 5. set the navigation
// 6. put  -  "javascript:void(0)" to all buttons that you dont use
// 7. test the vie of the HTML to be sure that all imports are correct and the nav is working

// 8. fix the homePage, login, register, logout. Test Again
// 10. fix allDataPage, create, details, edit, userProfile. Test

// 11. run the command - npm run start
// 12. run the command - npm run test in the test folder 

// 13. create the bonus and test again 







import { render } from "../node_modules/lit-html/lit-html.js";
import page from "../node_modules/page/page.mjs";

import { homePage } from "../views/home.js";
import { detailsPage } from "../views/details.js";
import { allDataPage } from "../views/allData.js";
import { createPage } from "../views/create.js";
import { editPage } from "../views/edit.js";
import { registerPage } from "../views/register.js";
import { loginPage } from "../views/login.js";
import { userProfilePage } from "../views/userProfile.js";
// import { logout } from "./api.js";

//const main = document.querySelector(".container");
const main = document.querySelector("main");

page("/", decorateContext, homePage);
page("/home", decorateContext, homePage);
page("/allData", decorateContext, allDataPage);
page("/userProfile", decorateContext, userProfilePage);
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
    // document.querySelector("div.profile > span ").textContent = `Welcome, ${email}`
    document.querySelector(".user").style.display = "block";
    document.querySelector(".guest").style.display = "none";
  } else {
    document.querySelector(".user").style.display = "none";
    document.querySelector(".guest").style.display = "block";
  }
}

// document.getElementById('logoutBtn').addEventListener('click', async()=>{
//     await logout();
//     setUserNav();
//     page.redirect('/')
// });
