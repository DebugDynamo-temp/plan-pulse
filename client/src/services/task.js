function getHeader(){
    return  new Headers({
        'Content-type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem("JWT-TOKEN")}`
    })
}

const url = import.meta.env.VITE_BACKEND_URL;

async function createTask(task, boardID){
    try {
        let result = await fetch(`${url}/boards/add-task/${boardID}`, {
            method: 'POST',
            credentials: 'include',
            headers: getHeader(),
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
            task: result
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
        let result = await fetch(`${url}/tasks/${taskID}`, {
            method: 'GET',
            credentials: 'include',
            headers: getHeader(),
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
        let result = await fetch(`${url}/tasks/board/${boardID}`, {
            method: 'GET',
            credentials: 'include',
            headers: getHeader(),
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
        let result = await fetch(`${url}/tasks/${taskID}/time`, {
            method: 'POST',
            credentials: 'include',
            headers: getHeader(),
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
    console.log(taskID);
    try {
        let result = await fetch(`${url}/tasks/${taskID}/status`, {
            method: 'PUT',
            credentials: 'include',
            headers: getHeader(),
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