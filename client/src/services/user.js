import Cookies from 'js-cookie';

async function getUser(){
    if(!Cookies.get('token')){
        return {
            success: false,
            msg: 'No Token'
        } 
    }

    try {
        let response = await fetch('http://localhost:8080/users/profile', {
            method: "GET",
            headers: new Headers({
                'Set-Cookie': `JWT-TOKEN=${Cookies.get('token')}`
            }),
        })

        if(response.status >= 400 && response.status < 500){
            throw new Exception("Authentication error");
        } else if(response.status < 600 && response.status >= 500){
            throw new Exception("Server error");
        }

        response = await response.json();
    } catch(e) {
        return {
            success: false,
            err: e
        }
    }
}

export {
    getUser
}