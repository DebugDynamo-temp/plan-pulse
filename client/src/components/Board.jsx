import Button from "@mui/material/Button";
import CreateTaskDialog from "./CreateTaskDialog";
import { status, statusToReadable } from "../services/utils";
import UserContext from "../contexts/User";
import { useContext, useEffect, useState } from "react";
import Task from "./Task";
import { createTask, getTasksByBoard } from "../services/task";
import CollaboratorDialog from "./CollaboratorDialog";
import { addCollaborator, getCollaboratorNames } from "../services/board";
import { Typography } from "@mui/material";

function Board({ board }){
	const { id } = useContext(UserContext);
	const [openCreateTask, setOpenCreateTask] = useState(false);
	const [openCollaborator, setOpenCollaborator] = useState(false);
	const [displayTasks, setTasks] = useState([]);

	function setTaskClosed(){
		setOpenCreateTask(false);
	}

	function setCollaboratorClosed(){
		setOpenCollaborator(false);
	}

	async function addCollab(identifier){
		let res = await addCollaborator(board.id, identifier);
		console.log(res);
		if(!res.success){
			alert("Failed to add collaborator");
		}
	}

	async function addTask(newTask){
		newTask.boardId = board.id;
		newTask.startTime = new Date();
		newTask.endTime = new Date();
		newTask.startTime = new Date();
		newTask.reporterId = id;
		newTask.timeSpent = 0;
		if(board.type === 'PRIVATE'){
			newTask.assignee = id;
		}

		let res = await createTask(newTask, board.id);
		if(res.success){
			console.log(res.task)
			newTask.id = res.task.id;
			setTasks([...displayTasks, newTask]);
		} else {
			alert("Error Creating Task");
		}
	}
	
	function changeStatus(task, idx){
		console.log(displayTasks);
		let tasksCopy = displayTasks.toSpliced(idx, 1);
		tasksCopy.push(task);
		setTasks(tasksCopy)
		console.log(displayTasks);
	}

	useEffect(() => {
		async function loadTasks() {
			if(board.id){
				let tasks = await getTasksByBoard(board.id);
				setTasks(tasks.tasks);
			}
		}

		async function loadCollaborators(){
			getCollaboratorNames(board.id);	
		}

		loadCollaborators();
		loadTasks();
	}, [board])

	return (
		<>
			<header>
				<Typography variant="h2">{board.title}</Typography>
				{ board.type === 'PUBLIC' ?
				<Button
					variant="contained"
					color="secondary"
					onClick={(e) => setOpenCollaborator((prev) => !prev)}
				>
					Add Collaborator 
				</Button>: ''}
				<Button
					data-testid="create-task"
					variant="contained"
					color="secondary"
					onClick={(e) => setOpenCreateTask((prev) => !prev)}
				>
					Add Task
				</Button>
			</header>
			<div className="kanban">
				{status.map((s) => {
					return (
						<div className={s.toLowerCase()} key={`${s}-container`}>
							<Typography variant='h5'>{ statusToReadable(s) }</Typography>
							{displayTasks ? displayTasks.filter((t) => {
								return t.status === s;
							}).map((t, idx) => {
								return <Task task={t} key={`${t.title}-${idx}` } idx={idx} onStatusChange={() => { changeStatus(t) }} />
							}) : ''}
						</div>
					)
				})}
			</div>
			<CreateTaskDialog data-testid="task-dialog" open={openCreateTask} close={setTaskClosed} addTask={addTask} collaborators={board.collaboratorIds} showCollaborators={board.type === 'PUBLIC'} />
			<CollaboratorDialog open={openCollaborator} close={setCollaboratorClosed} addCollaborator={addCollab} />
		</>	
	)
}

export default Board;