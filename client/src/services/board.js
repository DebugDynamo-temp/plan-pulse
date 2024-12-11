function getHeaders(){
    return new Headers({
        'Content-type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem("JWT-TOKEN")}`
    })
}

const url = import.meta.env.VITE_BACKEND_URL;

async function getBoards(){
    try {
        let response = await fetch(`${url}/boards/all`, {
            method: 'GET',
            headers: getHeaders(),
            credentials: 'include'
        })

        if(response.status >= 400 && response.status < 500){
            throw "Authentication error";
        } else if(response.status < 600 && response.status >= 500){
            throw "Server error";
        }

        response = await response.json();

        return {
            success: true,
            boards: response
        }
    } catch(e) {
        return {
            success: false,
            err: e
        }
    }
}

async function getBoardByID(boardID){
    try {
        let response = await fetch(`${url}/boards/${boardID}`, {
            method: 'GET',
            credentials: 'include',
            headers: getHeaders(),
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
            board: response
        }
    } catch(e) {
        return {
            success: false,
            err: e
        }
    }
}

async function createBoard(board){
    try {
        let response = await fetch(`${url}/boards/create-board`, {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify(board),
            headers: getHeaders() 
        })

        if(response.status >= 400 && response.status < 500){
            throw "Authentication error";
        } else if(response.status < 600 && response.status >= 500){
            throw "Server error";
        }

        response = await response.json();

        return {
            success: true,
            board: response
        }
    } catch(e) {
        return {
            success: false,
            err: e
        }
    }
}

async function addCollaborator(boardID, identifier){
    try {
        let response = await fetch(`${url}/boards/add-user/${boardID}/${identifier}`, {
            method: 'POST',
            credentials: 'include',
            body: '',
            headers: getHeaders() 
        })

        if(response.status >= 400 && response.status < 500){
            throw "Authentication error";
        } else if(response.status < 600 && response.status >= 500){
            throw "Server error";
        }

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

async function getCollaboratorNames(boardID){
    try {
        let response = await fetch(`${url}/boards/collaborators/${boardID}`, {
            method: 'GET',
            credentials: 'include',
            headers: getHeaders() 
        })

        if(response.status >= 400 && response.status < 500){
            throw "Authentication error";
        } else if(response.status < 600 && response.status >= 500){
            throw "Server error";
        }

        response = await response.json();

        return {
            success: true,
            collaborators: response
        }
    } catch(e) {
        return {
            success: false,
            err: e
        }
    }
}

export {
    addCollaborator,
    createBoard,
    getCollaboratorNames,
    getBoardByID,
    getBoards
}