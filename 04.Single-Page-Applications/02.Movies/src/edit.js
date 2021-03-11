import { showDetails } from './details.js';

async function getMovieById(id) {
    const response = await fetch("http://localhost:3030/data/movies/" + id);
    const data = await response.json();
  
    return data;
  }

  async function onSubmit(e){
    e.preventDefault();
    const formData = new FormData(e.target);
    const movie = {
        title: formData.get('title'),
        description: formData.get('description'),
        img: formData.get('imageUrl')
    }

    if (movie.title == '' || movie.description == '' ||movie.img == ''){
        return alert('All fields are required!')
    }



    const response = await fetch('http://localhost:3030/data/movies/'+ movieId,{
        method: 'put',
        headers:{
            'Content-Type': 'application/json',
            'X-Authorization': sessionStorage.getItem('authToken')
        },
        body: JSON.stringify(movie)
    })

    if(response.ok){
        const movie = await response.json();
        showDetails(movieId)
    }else{
        const error = await response.json();
        alert(error.message);
    }
  }
let main;
let section;
let movieId;

export function setupEdit(mainTarget, sectionTarget){
    main = mainTarget;
    section = sectionTarget;
    const form = section.querySelector('form');
    form.addEventListener('submit',onSubmit)
    
}

export async function showEdit(id){
    main.innerHTML = '';
    main.appendChild(section);
    movieId = id;

    const movie = await getMovieById(movieId);


    section.querySelector('[name="title"]').value = movie.name;
    section.querySelector('[name="description"]').value = movie.description;
    section.querySelector('[name="imageUrl"]').value = movie.img;

}

// __________________________________________________//
// import { showDetails } from './details.js';


// async function getRecipeById(id) {
//     const response = await fetch('http://localhost:3030/data/recipes/' + id);
//     const recipe = await response.json();

//     return recipe;
// }

// let main;
// let section;
// let setActiveNav;
// let recipeId;

// export function setupEdit(targetMain, targetSection, onActiveNav) {
//     main = targetMain;
//     section = targetSection;
//     setActiveNav = onActiveNav;
//     const form = targetSection.querySelector('form');

//     form.addEventListener('submit', (ev => {
//         ev.preventDefault();
//         const formData = new FormData(ev.target);
//         onSubmit([...formData.entries()].reduce((p, [k, v]) => Object.assign(p, { [k]: v }), {}));
//     }));

//     async function onSubmit(data) {
//         const body = JSON.stringify({
//             name: data.name,
//             img: data.img,
//             ingredients: data.ingredients.split('\n').map(l => l.trim()).filter(l => l != ''),
//             steps: data.steps.split('\n').map(l => l.trim()).filter(l => l != '')
//         });

//         const token = sessionStorage.getItem('authToken');
//         if (token == null) {
//             return alert('You\'re not logged in!');
//         }

//         try {
//             const response = await fetch('http://localhost:3030/data/recipes/' + recipeId, {
//                 method: 'put',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'X-Authorization': token
//                 },
//                 body
//             });

//             if (response.status == 200) {
//                 showDetails(recipeId);
//             } else {
//                 const error = await response.json();
//                 throw new Error(error.message);
//             }
//         } catch (err) {
//             alert(err.message);
//             console.error(err.message);
//         }
//     }
// }


// export async function showEdit(id) {
//     setActiveNav();
//     main.innerHTML = '';
//     main.appendChild(section);

//     recipeId = id;
//     const recipe = await getRecipeById(recipeId);

//     section.querySelector('[name="name"]').value = recipe.name;
//     section.querySelector('[name="img"]').value = recipe.img;
//     section.querySelector('[name="ingredients"]').value = recipe.ingredients.join('\n');
//     section.querySelector('[name="steps"]').value = recipe.steps.join('\n');
// } */}