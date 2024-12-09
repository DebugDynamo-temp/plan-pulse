import Cookies from 'js-cookie';

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
            throw "Authentication error";
        } else if(response.status < 600 && response.status >= 500){
            throw "Server error";
        }

        response = await response.json();
        return {
            success: true,
            email: response.email,
            uname: response.username,
            id: response.id
        } 
    } catch(e) {
        return {
            success: false,
            err: e
        }
    }
}

async function updateUser(data){
    let formData = new FormData();
    
    if(data.email){
        formData.append('email', data.email);
    }

    if(data.img){
        formData.append('profileImage', data.img);
    }

    try {
        let response = await fetch('http://localhost:8080/users/profile', {
            method: "PUT",
            credentials: 'include',
            body: formData 
        })

        if(response.status >= 400 && response.status < 500){
            throw "Authentication error";
        } else if(response.status < 600 && response.status >= 500){
            throw "Server error";
        }

        response = await response.json();
        console.log(response);
        return {
            success: true,
        } 
    } catch(e) {
        return {
            success: false,
            err: e
        }
    }
}

export {
    getUser,
    updateUser
}