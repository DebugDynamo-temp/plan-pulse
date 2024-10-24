import { formatStatus } from "../services/utils";
import { useState } from "react";
import Task from "./Task";

function Board({ board }){
	const [status, setStatus] = useState(["TO_DO", "IN_PROGRESS", "IN_REVIEW", "DONE"]);
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
			description: "This is task 2",
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

	return (
		<>
			<h1>{board.title}</h1>
			<div className="kanban">
				{status.map((s) => {
					return (
						<div className={s.toLowerCase()} key={`${s}-container`}>
							<h3>{ formatStatus(s) }</h3>
							{tasks.filter((t) => {
								return t.status === s;
							}).map((t) => {
								return <Task task={t} key={t.title} />
							})}
						</div>
					)
				})}
			</div>
		</>	
	)
}

export default Board;