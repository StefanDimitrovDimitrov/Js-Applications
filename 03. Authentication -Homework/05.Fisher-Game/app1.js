function attachEvents() {
    document.querySelectorAll('form')[0].addEventListener('submit',register)
    document.querySelectorAll('form')[1].addEventListener('submit',login)
}

attachEvents();

async function register(e){
    e.preventDefault()

    const formData =  new FormData(e.target)

    const email = formData.get('email');
    const password = formData.get('password')
    const rePassword = formData.get('rePass')

    if(email == '' || password == ''){
        return alert('All fields are required!');
    }else if(password != rePassword){
        return alert(`Passwords don't match!`)
    }

    const response = await fetch(`http://localhost:3030/users/register`,{
        method: 'post',
        headers:{'Content-Type': 'application/json'},
        body: JSON.stringify({email, password})
    })

    if(response.ok == false){
        const error = await response.json();
        return alert(error.message)
    }

    const data = await response.json();
    console.log(data);
    sessionStorage.setItem('userToken', data.accessToken);
    sessionStorage.setItem('userId', data._id )
    window.location.pathname = '05.Fisher-Game/index.html'
}



async function login(e){
        e.preventDefault()
    
        const formData =  new FormData(e.target)
    
        const email = formData.get('email');
        const password = formData.get('password')

        const response = await fetch(`http://localhost:3030/users/login`,{
            method: 'post',
            headers:{'Content-Type': 'application/json'},
            body: JSON.stringify({email, password})
        })
    
        if(response.ok == false){
            const error = await response.json();
            return alert(error.message)
        }
    
        const data = await response.json();
        console.log(data);
        sessionStorage.setItem('userToken', data.accessToken);
        sessionStorage.setItem('userId', data._id )
        window.location.pathname = '05.Fisher-Game/index.html'
    
    }
    