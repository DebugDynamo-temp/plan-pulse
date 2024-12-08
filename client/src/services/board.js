const headers = new Headers({
    'Content-type': 'application/json'
})

async function getBoards(userID){
    try {
        let response = await fetch(`http://localhost:8080/boards/creator/${userID}`, {
            method: 'GET',
            headers: headers,
        })

        if(response.status >= 400 && response.status < 500){
            throw new Exception("Authentication error");
        } else if(response.status < 600 && response.status >= 500){
            throw new Exception("Server error");
        }

        response = await response.json();

        console.log(response);
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
            headers: headers,
        })

        if(response.status >= 400 && response.status < 500){
            throw new Exception("Authentication error");
        } else if(response.status < 600 && response.status >= 500){
            throw new Exception("Server error");
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

async function addCollaborator(boardID, userID){
    try {
        let response = await fetch(`http://localhost:8080/boards/${boardID}/collaborators`, {
            method: 'POST',
            body: userID
        })

        if(response.status >= 400 && response.status < 500){
            throw new Exception("Authentication error");
        } else if(response.status < 600 && response.status >= 500){
            throw new Exception("Server error");
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
    addCollaborator,
    getBoardByID,
    getBoards
}