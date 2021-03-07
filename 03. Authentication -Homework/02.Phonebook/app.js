function attachEvents() {
    document.getElementById("btnLoad").addEventListener('click', getData)
    document.getElementById("phonebook").addEventListener('click',deleteElement)
    document.getElementById('btnCreate').addEventListener('click',createElement)
}

attachEvents();

async function getData(){

    const ul = document.getElementById("phonebook")
    ul.innerHTML = ''
    const response = await fetch(`http://localhost:3030/jsonstore/phonebook`);
    const data = await response.json();

    Object.values(data).map(x => {
        const li = document.createElement('li')
        const btnDel = document.createElement('button')
        
        li.textContent = `${x.person}:${x.phone}`
        btnDel.textContent = 'Delete'
        btnDel["id"] = x._id
        
        li.appendChild(btnDel)        
        ul.appendChild(li)
    })

}

async function createElement(e){
    e.preventDefault();
    const name = document.getElementById('person').value
    const phone = document.getElementById('phone').value

    if (name == '' || phone == ''){
        alert("You should enter name and phone number")
        return
    }
    const record = {
        person: name,
        phone: phone
    }

    await fetch(`http://localhost:3030/jsonstore/phonebook`,{
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(record)
    });

    document.getElementById('person').value = '';
    document.getElementById('phone').value = '';
    getData();
    
}

async function deleteElement(e){

    if(e.target.tagName != 'BUTTON'){
        return
    }
    const key = e.target.parentNode.firstElementChild.id

    const confirmed = confirm('Are you sure you want to delete this record?')

    if(confirmed){
        const response = await fetch('http://localhost:3030/jsonstore/phonebook/' + key,{  
            method: 'delete'

        });
    }
         
    getData()

}
