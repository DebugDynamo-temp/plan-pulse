import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent';
import parse from 'html-react-parser';
import { getDayOfWeek, getMonth, statusToReadable } from "../services/utils";
import Slider from '@mui/material/Slider';
import Timer from "../components/Timer";
import Typography from "@mui/material/Typography";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { pink } from "@mui/material/colors";
import { getTaskById } from '../services/task';

function TaskDetailed(){
	const params = useParams();
	const [task, setTask] = useState({
		deadline: new Date(2000, 0, 1),
		description: '<p>Task not found</p>',
		title: 'Task not found',
		priority: 1,
		timeSpent: 0
	});
	const marks = [
		{
			value: 0,
			label: 'To Do',
		},
		{
			value: 1,
			label: 'In Progress',
		},
		{
			value: 2,
			label: 'In Review',
		},
		{
			value: 3,
			label: 'Done',
		},
	]

	function updateTimeSpent(timeSpent){
		setTask({...task, timeSpent: timeSpent + task.timeSpent })		
	}

	useEffect(() => {
		async function loadTask(){
			let res = await getTaskById(params.id);
			console.log(res.task.deadline, new Date(res.task.deadline));
			setTask({...res.task, deadline: new Date(res.task.deadline)});
		}

		loadTask();
	}, []);	

	return (
		<section className="taskDetailed">
			<Card variant="elevation" id="desc" sx={{ bgcolor: pink['50'] }}>
				<CardContent>
					<Typography variant='h2'>
						{task.title}
					</Typography>
					{parse(task.description)}
				</CardContent>
			</Card>

			<Card variant="elevation" id="deadline" sx={{ bgcolor: pink['50'] }}>
				<CardContent>
					<Typography variant='h3'>
						Deadline	
					</Typography>
					<Typography variant='h5' sx={{ marginTop: '4px', marginBottom: '4px' }}>
						{getDayOfWeek(task.deadline.getDay())},
					</Typography>	
					<Typography variant='h4'>
						{getMonth(task.deadline.getMonth()) + " "}
						{task.deadline.getDate()}
					</Typography>
				</CardContent>
			</Card>

			<Card variant="elevation" sx={{ padding: '10px' }} id="status" className={`p-${task.priority}`}>
				<CardContent>
					<Typography variant='h3'>
						Status	
					</Typography>
					<Slider
						marks={marks}
						min={0}
						max={3}
						sx={{ pointerEvents: "none" }}
						value={["TO_DO", "IN_PROGRESS", "IN_REVIEW", "DONE"].indexOf(task.status)}
					/>
					<p>Assigned To: {task.assigneeId}</p>
				</CardContent>
			</Card>

			<Card variant="elevation" id="deadline" sx={{ bgcolor: pink['50'] }}>
				<CardContent>
					<Typography variant='h4'>Total Minutes Spent</Typography>
					<Typography variant='h2'>{task.timeSpent}</Typography>
				</CardContent>
			</Card>

			<Timer timeSpent={task.timeSpent} taskId={task.id} updateTimeSpent={updateTimeSpent} />
		</section>
	)
}

export default TaskDetailed;