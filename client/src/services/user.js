import Cookies from 'js-cookie';

const headers = new Headers();

async function getUser(){
    if(!Cookies.get('JWT-TOKEN')){
        return {
            success: false,
            msg: 'No Token'
        } 
    }

    try {
        let response = await fetch('http://localhost:8080/users/profile', {
            method: "GET",
            credentials: 'include',
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        })

        if(response.status >= 400 && response.status < 500){
            throw new Exception("Authentication error");
        } else if(response.status < 600 && response.status >= 500){
            throw new Exception("Server error");
        }

        response = await response.json();
        console.log(response);
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