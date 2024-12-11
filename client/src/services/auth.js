const url = import.meta.env.VITE_BACKEND_URL;

const jsonContentType = new Headers({
    'Content-Type': 'application/json'
})

async function login(identifier, pswd){
    try {
        let response = await fetch(`${url}/auth/login`, {
            method: "POST",
            body: JSON.stringify({
                identifier: identifier,
                password: pswd 
            }),
            headers: jsonContentType 
        })

        if(response.status >= 400 && response.status < 500){
            throw new Error("Authentication error");
        } else if(response.status < 600 && response.status >= 500){
            throw new Error("Server error");
        }

        response = await response.json();
        localStorage.setItem('JWT-TOKEN', response.token.substring(7));
        return { 
            success: true,
        }
    } catch(e) {
        console.log(e);
        return {
            success: false,
            err: e
        }
    }
}

async function register(first, last, email, uname, pswd, confirmPswd){
    let formData = new FormData();
    formData.append('firstname', first)
    formData.append('lastname', last)
    formData.append('email', email)
    formData.append('username', uname);
    formData.append('confirmPassword', pswd)
    formData.append('password', confirmPswd)
    formData.append('profileImage', '');

    try {
        let response = await fetch(`${url}/auth/register`, {
            method: "POST",
            body: formData 
        })

        if(response.status >= 400 && response.status < 500){
            throw new Error("Authentication error");
        } else if(response.status < 600 && response.status >= 500){
            throw new Error("Server error");
        }

        response = await response.json();
        console.log(response.token.substring(7));

        localStorage.setItem('JWT-TOKEN', response.token.substring(7));
        return {
            success: true,
            user: response
        }
    } catch(e) {
        return {
            success: false,
            err: e
        }
    } 
}

async function logout(){
    try {
        let response = await fetch(`${url}/auth/logout`, {
            method: 'POST',
            credentials: 'include'
        }) 

        response = await response.json();
        localStorage.clear('JWT-TOKEN');

        return {
            success: true
        }

    } catch(e) {
        return {
            err: e,
            success: false
        }
    }
}

async function forgotPassword(email){
    try {
        let response = await fetch(`${url}/auth/logout`, {
            method: 'POST',
            body: JSON.stringify({
                email: email
            }),
            headers: jsonContentType
        }) 

        response = await response.json();

        return {
            success: true
        }

    } catch(e) {
        return {
            err: e,
            success: false
        }
    }
}

export {
    forgotPassword,
    login,
    logout,
    register
}