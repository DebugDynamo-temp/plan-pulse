import Button from "@mui/material/Button";
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent';
import Header from "../components/Header";
import parse from 'html-react-parser';
import { getDayOfWeek, getMonth, statusToReadable } from "../services/utils";
import Timer from "../components/Timer";
import Typography from "@mui/material/Typography";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { pink } from "@mui/material/colors";

function TaskDetailed(){
	const nav = useNavigate();
	const task = useLocation().state;

	useEffect(() => {
		if(!task){
			nav('/dashboard');
		}
	}, [task]);	

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

			<Card variant="elevation" id="status" className={`p-${task.priority}`}>
				<CardContent>
					<h4>Status</h4>
					<p>{statusToReadable(task.status)}</p>
				</CardContent>
			</Card>

			<Card variant="elevation" id="deadline" sx={{ bgcolor: pink['50'] }}>
				<CardContent>
					<h4>Total Time Spent</h4>
					{task.timeSpent}
				</CardContent>
			</Card>

			<Timer timeSpent={task.timeSpent} />
		</section>
	)
}

export default TaskDetailed;