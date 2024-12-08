const headers = new Headers({
    'Content-Type': 'application/json'
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

async function register(first, last, email, uname, pswd, confirmPswd){
    let formData = new FormData();
    formData.append('firstname', first)
    formData.append('lastname', last)
    formData.append('email', email)
    formData.append('username', uname);
    formData.append('confirmPassword', pswd)
    formData.append('password', confirmPswd)
    formData.append('profile_image', '');

    let response = await fetch('http://localhost:8080/auth/register', {
        method: "POST",
        body: formData 
    })

    response = await response.json();
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