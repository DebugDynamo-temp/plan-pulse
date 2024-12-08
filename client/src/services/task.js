const headers = new Headers({
    'Content-type': 'application/json'
})

async function createTask(task){
    let result = await fetch('http://localhost:8080/tasks', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(task)
    })

    return result;
}

async function getTasksByBoard(boardID){
    let result = await fetch(`http://localhost:8080/tasks/board/${boardID}`, {
        method: 'GET',
        headers: headers,
    })

    return result;
}

async function updateTaskTime(taskID, time){
    let result = await fetch(`http://localhost:8080/tasks/${taskID}/time`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(time)
    })

    return result;
}

async function updateTaskStatus(taskID, status){
    let result = await fetch(`http://localhost:8080/tasks/${taskID}/status`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(status)
    })

    return result;
}

export {
    createTask,
    getTasksByBoard,
    updateTaskTime,
    updateTaskStatus
}