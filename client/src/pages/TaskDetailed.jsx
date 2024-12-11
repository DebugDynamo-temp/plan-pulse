import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent';
import parse from 'html-react-parser';
import { getDayOfWeek, getMonth, statusToReadable } from "../services/utils";
import Slider from '@mui/material/Slider';
import Timer from "../components/Timer";
import Typography from "@mui/material/Typography";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getTaskById } from '../services/task';
import GaugeComponent from 'react-gauge-component';

function TaskDetailed(){
	const params = useParams();
	const [task, setTask] = useState({
		deadline: new Date(2000, 0, 1),
		description: '<p>Task not found</p>',
		title: 'Task not found',
		priority: 1,
		timeSpent: 0
	});
	
	const subArcs = [
		{
			limit: 1,
			color: '#00FF00',
		},
		{
			limit: 2,
			color: '#33FF00',
		},
		{
			limit: 3,
			color: '#66FF00',
		},
		{
			limit: 4,
			color: '#99FF00',
		},
		{
			limit: 5,
			color: '#CCFF00',
		},
		{
			limit: 6,
			color: '#FFCC00',
		},
		{
			limit: 7,
			color: '#FF9900',
		},
		{
			limit: 8,
			color: '#FF6600',
		},
		{
			limit: 9,
			color: '#FF3300',
		},
		{
			limit: 10,
			color: '#FF0000',
		}
	]
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
			setTask({...res.task, deadline: new Date(res.task.deadline)});
		}

		loadTask();
	}, []);	

	return (
		<section className="taskDetailed">
			<Card variant="elevation" id="desc">
				<CardContent>
					<Typography variant='h2'>
						{task.title}
					</Typography>
					{parse(task.description)}
				</CardContent>
			</Card>

			<Card variant="elevation" id="deadline">
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

			<Card variant="elevation" sx={{ padding: '10px' }} id="status">
				<CardContent>
					<Typography variant='h5'>
						Status	
					</Typography>
					<Slider
						marks={marks}
						min={0}
						max={3}
						sx={{ pointerEvents: "none", width: '80%' }}
						value={["TO_DO", "IN_PROGRESS", "IN_REVIEW", "DONE"].indexOf(task.status)}
					/>
				</CardContent>
			</Card>

			<Card variant="elevation">
				<CardContent>
					<Typography variant='h5'>
						Priority	
					</Typography>
					<GaugeComponent 
						type='semicircle'
						minValue={0}
						maxValue={10} 
						value={task.priority}
						arc={{
							subArcs: subArcs,
							gradient: true,
							padding: 0
						}}
						labels={{
							valueLabel: {
								matchColorWithArc: true,
							} 
						}}
					/>
				</CardContent>
			</Card>

			<Card variant="elevation">
				<CardContent>
					<Typography variant='h5'>Total Minutes Spent</Typography>
					<Typography variant='h2'>{task.timeSpent}</Typography>
				</CardContent>
			</Card>

			<Timer timeSpent={task.timeSpent} taskId={task.id} updateTimeSpent={updateTimeSpent} />
		</section>
	)
}

export default TaskDetailed;