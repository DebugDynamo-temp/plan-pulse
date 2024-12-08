const headers = new Headers({
    'Content-type': 'application/json'
})

async function getBoards(userID){
    let response = await fetch(`http://localhost:8080/boards/creator/${userID}`, {
        method: 'GET',
        headers: headers
    })

    console.log(response);
}

async function getBoardByID(boardID){
    let response = await fetch(`http://localhost:8080/boards/${boardID}`, {
        method: 'GET',
        headers: headers
    })

    console.log(response);
}

async function addCollaborator(boardID, userID){
    let response = await fetch(`http://localhost:8080/boards/${boardID}/collaborators`, {
        method: 'POST',
        headers: headers,
        body: userID
    })

    console.log(response);

}

export {
    addCollaborator,
    getBoardByID,
    getBoards
}