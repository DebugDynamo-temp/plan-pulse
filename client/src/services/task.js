const headers = new Headers({
    'Content-type': 'application/json'
})

async function createTask(task){
    try {
        let result = await fetch('http://localhost:8080/tasks', {
            method: 'POST',
            credentials: 'include',
            headers: headers,
            body: JSON.stringify(task)
        })

        if(result.status >= 400 && result.status < 500){
            throw "Authentication error";
        } else if(result.status < 600 && result.status >= 500){
            throw "Server error";
        }

        result = await result.json();
        return {
            success: true,
            result: result
        }
    } catch(e){
        return {
            success: false,
            err: e
        }
    }
}

async function getTaskById(taskID){
    try {
        let result = await fetch(`http://localhost:8080/tasks/${taskID}`, {
            method: 'GET',
            credentials: 'include',
            headers: headers,
        })

        if(result.status >= 400 && result.status < 500){
            throw "Authentication error";
        } else if(result.status < 600 && result.status >= 500){
            throw "Server error";
        }

        result = await result.json();
        console.log(result);
        return {
            success: true,
            task: result
        };

    } catch(e){
        return {
            success: false,
            err: e
        }
    }
}

async function getTasksByBoard(boardID){
    try {
        let result = await fetch(`http://localhost:8080/tasks/board/${boardID}`, {
            method: 'GET',
            credentials: 'include',
            headers: headers,
        })

        if(result.status >= 400 && result.status < 500){
            throw "Authentication error";
        } else if(result.status < 600 && result.status >= 500){
            throw "Server error";
        }

        result = await result.json();
        return {
            success: true,
            tasks: result
        };

    } catch(e){
        return {
            success: false,
            err: e
        }
    }
}

async function updateTaskTime(taskID, time){
    try {
        let result = await fetch(`http://localhost:8080/tasks/${taskID}/time`, {
            method: 'POST',
            credentials: 'include',
            headers: headers,
            body: time 
        })

        if(result.status >= 400 && result.status < 500){
            throw "Authentication error";
        } else if(result.status < 600 && result.status >= 500){
            throw "Server error";
        }

        return {
            success: true,
        }

    } catch(e){
        return {
            success: false,
            err: e
        }
    }
}

async function updateTaskStatus(taskID, status){
    try {
        let result = await fetch(`http://localhost:8080/tasks/${taskID}/status`, {
            method: 'POST',
            credentials: 'include',
            headers: headers,
            body: status
        })

        if(result.status >= 400 && result.status < 500){
            throw "Authentication error";
        } else if(result.status < 600 && result.status >= 500){
            throw "Server error";
        }

        return {
            success: true,
        }

    } catch(e){
        return {
            success: false,
            err: e
        }
    }
}

export {
    createTask,
    getTaskById,
    getTasksByBoard,
    updateTaskTime,
    updateTaskStatus
}