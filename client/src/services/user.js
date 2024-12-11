import Cookies from 'js-cookie';

const url = import.meta.env.VITE_BACKEND_URL;

async function getUser(){
    if(!Cookies.get('JWT-TOKEN')){
        return {
            success: false,
            msg: 'No Token'
        } 
    }

    try {
        let response = await fetch(`${url}/users/profile`, {
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
            email: response.user.email,
            uname: response.user.username,
            first: response.user.firstname,
            last: response.user.lastname,
            id: response.user.id
        } 
    } catch(e) {
        return {
            success: false,
            err: e
        }
    }
}

async function updateUserProfile(data){
    let formData = new FormData();
    
    if(data.email){
        formData.append('email', data.email);
    }

    if(data.img){
        formData.append('profileImage', data.img);
    }

    formData.forEach((d) => {
        console.log(d);
    })

    try {
        let response = await fetch(`${url}/users/profile`, {
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

async function getProfileImg(){
    try {
        let response = await fetch(`${url}/users/profile`, {
            method: "GET",
            credentials: 'include',
            headers: new Headers({
                'Content-Type': 'image/*'
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
            img: response
        } 
    } catch(e) {
        return {
            success: false,
            err: e
        }
    }
}

async function resetPassword(email, currPswd, newPswd, confrimNewPswd){
    let resetForm = new FormData()
    resetForm.append('email', email);
    resetForm.append('currentPassword', currPswd);
    resetForm.append('newPassword', newPswd);
    resetForm.append('confirmPassword', confrimNewPswd);
    try {
        let response = await fetch(`${url}/users/reset-password`, {
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
    resetPassword,
    updateUserProfile
}