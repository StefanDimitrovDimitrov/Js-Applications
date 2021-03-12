import { showDetails } from "./details.js";

async function getMovieById(id) {
  const response = await fetch("http://localhost:3030/data/movies/" + id);
  const data = await response.json();

  return data;
}

async function onSubmit(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const movie = {
    title: formData.get("title"),
    description: formData.get("description"),
    img: formData.get("imageUrl"),
  };

  if (movie.title == "" || movie.description == "" || movie.img == "") {
    return alert("All fields are required!");
  }

  const response = await fetch("http://localhost:3030/data/movies/" + movieId, {
    method: "put",
    headers: {
      "Content-Type": "application/json",
      "X-Authorization": sessionStorage.getItem("authToken"),
    },
    body: JSON.stringify(movie),
  });

  if (response.ok) {
    const movie = await response.json();
    showDetails(movieId);
  } else {
    const error = await response.json();
    alert(error.message);
  }
}
let main;
let section;
let movieId;

export function setupEdit(mainTarget, sectionTarget) {
  main = mainTarget;
  section = sectionTarget;
  const form = section.querySelector("form");
  form.addEventListener("submit", onSubmit);
}

export async function showEdit(id) {
  main.innerHTML = "";
  main.appendChild(section);
  movieId = id;

  const movie = await getMovieById(movieId);

  section.querySelector('[name="title"]').value = movie.name;
  section.querySelector('[name="description"]').value = movie.description;
  section.querySelector('[name="imageUrl"]').value = movie.img;
}
