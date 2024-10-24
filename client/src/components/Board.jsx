import Button from "@mui/material/Button";
import CreateTaskDialog from "./CreateTaskDialog";
import { status, statusToReadable } from "../services/utils";
import { useState } from "react";
import Task from "./Task";

function Board({ board }){
	const [statusCollection, setStatus] = useState(status);
	const [openCreateTask, setOpenCreateTask] = useState(true);
	const [tasks, setTasks] = useState([
		{
			title: "One",
			description: "This is task 1",
			reporterId: 0,
			assigneeId: 0,
			priority: 10,
			timeSpent: 0,
			startTime: new Date(),
			endTime: new Date(),
			deadline: new Date(),
			status: "TO_DO"
		},
		{
			title: "Two",
			description: "<ol><li data-list=\"bullet\"><span class=\"ql-ui\" contenteditable=\"false\"></span><strong style=\"color: rgb(153, 51, 255);\">list of things</strong></li><li data-list=\"bullet\"><span class=\"ql-ui\" contenteditable=\"false\"></span><strong style=\"color: rgb(0, 138, 0);\">list of things</strong></li><li data-list=\"bullet\"><span class=\"ql-ui\" contenteditable=\"false\"></span><strong style=\"color: rgb(230, 0, 0);\">list of things</strong></li></ol>",
			reporterId: 0,
			assigneeId: 0,
			priority: 1,
			timeSpent: 0,
			startTime: new Date(),
			endTime: new Date(),
			deadline: new Date(),
			status: "IN_PROGRESS"
		},
		{
			title: "Three",
			description: "This is task 3",
			reporterId: 0,
			assigneeId: 0,
			priority: 5,
			timeSpent: 0,
			startTime: new Date(),
			endTime: new Date(),
			deadline: new Date(),
			status: "TO_DO"
		},
		{
			title: "Four",
			description: "This is task 4",
			reporterId: 0,
			assigneeId: 0,
			priority: 7,
			timeSpent: 0,
			startTime: new Date(),
			endTime: new Date(),
			deadline: new Date(),
			status: "DONE"
		}
	])

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
		setTasks([...tasks, newTask]);
	}

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
							{tasks.filter((t) => {
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