function attachEvents() {
    const token = sessionStorage.getItem('userToken');
    document.getElementById('guest').style.display = 'inline-block'
    document.getElementById('user').style.display = 'none'
    if(token != null){
      document.getElementById('user').style.display = 'inline-block'
      document.getElementById('guest').style.display = 'none'
      const addBtn =document.getElementsByClassName('add')[0]
      addBtn.disabled = false
      document.getElementById('logoutBtn').addEventListener('click',logout);
    }

    document.getElementById('addForm1').addEventListener("submit", createCatch)
    const load = document.getElementsByClassName('load')[0].addEventListener('click', getAllData)
    document.getElementsByClassName('update')[0].addEventListener("click", updateRecored)
    //document.getElementsByClassName("catch")[0].addEventListener("submit", editOrDeleteCatch);
    document.getElementById("catches").addEventListener("click", editOrDeleteRecord);
    getAllData()
}

attachEvents();


async function request(url, option) {
  const response = await fetch(url, option);
  if (response.ok != true) {
    const error = await response.json();
    alert(error.message);
    throw new Error(error.message);
  }
  const data = await response.json();
  return data;
};

async function getAllData() {

    const data = await request("http://localhost:3030/data/catches");

    const rows = data.map(x => createRow(x)).join('');

    document.getElementById("catches").innerHTML = rows
  
    function createRow(data) {
      const result = 
          `<div class="catch" data-id=${data._id}>
            <form id="${data._ownerId}" data-id="${data._ownerId}">
                <label>Angler</label>
                <input type="text" name='angler' required="required" class="angler" value=${data.angler} />
                <hr>
                <label>Weight</label>
                <input type="number" name='weight' required="required" class="weight" value=${data.weight} />
                <hr>
                <label>Species</label>
                <input type="text" name='species' required="required" class="species" value=${data.species} />
                <hr>
                <label>Location</label>
                <input type="text" name='location' required="required" class="location" value=${data.location} />
                <hr>
                <label>Bait</label>
                <input type="text" name='bait' required="required" class="bait" value=${data.bait} />
                <hr>
                <label>Capture Time</label>
                <input type="number" name='captureTime' required="required" class="captureTime" value=${data.captureTime} />
                <hr>
                <button disabled class="update">Update</button>
                <button disabled class="delete">Delete</button>
            </form>
          </div>`
      return result;
    }
    checkForActiveSession()
};

async function checkForActiveSession(){

  if(sessionStorage.getItem('userToken') !=null){
    const token = sessionStorage.getItem('userToken')
    const userId = sessionStorage.getItem("userId")
    const options = {
      method: "get",
      headers: { "Content-Type": "application/json", "X-Authorization": token}
    }
    let catches =  await request("http://localhost:3030/data/catches", options)

    let allforms = [...document.querySelectorAll('form')]
    let currentForms = allforms.filter(x =>x.id == userId)
    currentForms.forEach(y =>{
      y.getElementsByTagName('button')[0].disabled = false
      y.getElementsByTagName('button')[1].disabled = false
    })
    console.log(catches)
  }else{
    document.getElementsByClassName('add')[0].disabled = true
    Array.from(document.querySelectorAll('button')).forEach(button => button.disabled= true)
    document.getElementsByClassName('load')[0].disabled = false
  }
}
async function createCatch(event) {
    event.preventDefault();
    console.log(event.target);
    const formData = new FormData(event.target);
 
    const newCatch = {
        "angler":formData.get('angler'),
        "weight":formData.get('weight'),
        "species":formData.get('species'),
        "location":formData.get('location'),
        "bait":formData.get('bait'),
        "captureTime":formData.get('captureTime'),
    };

    const token = sessionStorage.getItem('userToken')

    const response = await fetch("http://localhost:3030/data/catches",{
      method: "post",
      headers: { "Content-Type": "application/json", "X-Authorization": token},
      body: JSON.stringify(newCatch),
    });
    if (response.ok != true) {
      const error = await response.json();
      alert(error.message);
      throw new Error(error.message);
    }
    const data = await response.json();

    event.target.reset();
    getAllData();
};
  
async function updateRecored(event){
  console.log('ok');

}
//event.target.className == "update"
function editOrDeleteRecord(event) {
    if (event.target.tagName == "BUTTON" && event.target.className == "update") {
      const recordid = event.target.parentNode.parentNode.dataset.id;
      const currentForm = event.target.parentNode
      const formid = event.target.parentNode.dataset.id;

      currentForm.addEventListener('submit', e =>{
        loadCatchForEditing(e, recordid)})

    } else if (event.target.tagName == "BUTTON" && event.target.className == "delete") {
      const confirmed = confirm("Are you sure you want to delete this record?");
      if (confirmed) {
        const recordid = event.target.parentNode.parentNode.dataset.id
        deleteRecord(recordid);
      }
    }
};

async function loadCatchForEditing(event, id) {
  event.preventDefault()
  const token = sessionStorage.getItem('userToken')
  const formData = new FormData(event.target);
  //const id = formData.get("id");
  const newCatch = {
    "angler":formData.get('angler'),
    "weight":formData.get('weight'),
    "species":formData.get('species'),
    "location":formData.get('location'),
    "bait":formData.get('bait'),
    "captureTime":formData.get('captureTime'),
    };


  await fetch("http://localhost:3030/data/catches/" + id, {
    method: "put",
    headers: { "Content-Type": "application/json","X-Authorization": token},
    body: JSON.stringify(newCatch),
  });
  event.target.reset();
  const data = await request("http://localhost:3030/data/catches")
  getAllData()
}  
  
async function deleteRecord(recordid) {
  console.log("ok");
  const token = sessionStorage.getItem('userToken')
  const response = await fetch("http://localhost:3030/data/catches/"+ recordid ,{
    method: "delete",
    headers: {"Content-Type": "application/json", "X-Authorization": token},
  });
  if (response.ok != true) {
    const error = await response.json();
    alert(error.message);
    throw new Error(error.message);
  }
  const data = await response.json();
 
  getAllData();
};

async function logout() {
  const token = sessionStorage.getItem('userToken');

  const response = await fetch('http://localhost:3030/users/logout', {
    method: 'get',
    headers: {'X-Authorization': token}
  });

  if (response.ok != true) {
    const error = await response.json();
    return alert(error.message);
  }
  document.getElementById('guest').style.display = 'inline-block'
  document.getElementById('user').style.display = 'none'
  sessionStorage.clear()
  checkForActiveSession()
  window.location.pathname = '05.Fisher-Game/index.html'

}

function e(type, attributes, ...content) {
  const result = document.createElement(type);

  for (let [attr, value] of Object.entries(attributes || {})) {
      if (attr.substring(0, 2) == 'on') {
          result.addEventListener(attr.substring(2).toLocaleLowerCase(), value);
      } else {
          result[attr] = value;
      }
  }

  content = content.reduce((a, c) => a.concat(Array.isArray(c) ? c : [c]), []);

  content.forEach(e => {
      if (typeof e == 'string' || typeof e == 'number') {
          const node = document.createTextNode(e);
          result.appendChild(node);
      } else {
          result.appendChild(e);
      }
  });

  return result;
}