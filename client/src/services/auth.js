const headers = new Headers({
    'Content-type': 'application/json'
})

async function login(email, pswd){
    let response = await fetch('http://localhost:8080/auth/login', {
        method: "POST",
        body: JSON.stringify({
            identifier: email,
            password: pswd 
        }),
        headers: headers
    })

    console.log(response);
}

async function register(first, last, email, pswd, confirmPswd){
    let response = await fetch('http://localhost:8080/auth/register', {
        method: "POST",
        body: JSON.stringify({
            firstname: first,
            lastname: last,
            email: email,
            password: pswd,
            confirmPswd: confirmPswd
        }),
        headers: headers
    })

    console.log(response);
}

async function logout(token){
    let response = await fetch('http://localhsot:8080/auth/logout', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(token)
    })

    console.log(response);
}

export {
    login,
    logout,
    register
}