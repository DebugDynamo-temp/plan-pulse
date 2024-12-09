const headers = new Headers({
    'Content-type': 'application/json'
})

async function getBoards(){
    try {
        let response = await fetch('http://localhost:8080/boards/all', {
            method: 'GET',
            headers: headers,
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
        let response = await fetch(`http://localhost:8080/boards/${boardID}`, {
            method: 'GET',
            credentials: 'include',
            headers: headers,
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
        let response = await fetch(`http://localhost:8080/boards`, {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify(board),
            headers: headers
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
        let response = await fetch(`http://localhost:8080/boards/add-user/${boardID}`, {
            method: 'POST',
            body: JSON.stringify(identifier),
            credentials: 'include',
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

export {
    addCollaborator,
    createBoard,
    getBoardByID,
    getBoards
}