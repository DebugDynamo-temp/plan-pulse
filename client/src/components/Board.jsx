import Button from "@mui/material/Button";
import CreateTaskDialog from "./CreateTaskDialog";
import { status, statusToReadable } from "../services/utils";
import { useContext, useEffect, useState } from "react";
import Task from "./Task";
import TaskContext from "../components/TaskContext";

function Board({ board }){
	const { tasks } = useContext(TaskContext);
	const [statusCollection, setStatus] = useState(status);
	const [openCreateTask, setOpenCreateTask] = useState(false);
	const [displayTasks, setTasks] = useState(tasks[board.title]);

	function setClosed(){
		setOpenCreateTask(false);
	}
	
	function addTask(newTask){
		newTask.startTime = new Date();
		newTask.endTime = new Date();
		newTask.startTime = new Date();
		newTask.reporterId = 0;
		newTask.assigneeId = 0;
		newTask.timeSpent = 0;
		console.log(newTask);
		setTasks([...displayTasks, newTask]);
	}

	useEffect(() => {
		console.log(board.title);
		setTasks([...tasks[board.title]]);
	}, [board])

	return (
		<>
			<header>
				<h1>{board.title}</h1>
				<Button
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
							<h3>{ statusToReadable(s) }</h3>
							{displayTasks.filter((t) => {
								return t.status === s;
							}).map((t) => {
								return <Task task={t} key={t.title} />
							})}
						</div>
					)
				})}
			</div>
			<CreateTaskDialog open={openCreateTask} close={setClosed} addTask={addTask}/>
		</>	
	)
}

export default Board;