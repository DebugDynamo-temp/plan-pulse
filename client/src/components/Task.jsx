import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import Button from "@mui/material/Button";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import parse from 'html-react-parser';
import { useState } from "react";
import { useStopwatch, TimerRenderer } from 'react-use-precision-timer';

function Task({ task }){
	const [startTime] = useState(task.timeSpent);
	const timer = useStopwatch();

	function toggleTimer(){
		console.log(timer);
		if(timer.isRunning()){
			timer.pause();
		} else if(timer.isPaused()){
			timer.resume();
		} else {
			timer.start(startTime);
		}
	}
	return (
		<Accordion sx={{ width: 1 }}>
			<AccordionSummary
				expandIcon={<ExpandMoreIcon className={`priority-${task.priority}`} />}
			>
				{task.title}
			</AccordionSummary>
			<AccordionDetails>
				{parse(task.description)} 
				<div>
					<h2>Time Spent</h2>
					
				</div>
				<div>
					<TimerRenderer 
						timer={timer}
						render={ (t) => <p id={`${task.name}-timer`}>{ t.getElapsedRunningTime() / 1000 }</p>}
						renderRate={100}
					/>
				</div>
			</AccordionDetails>
			<AccordionActions>
				<Button 
					variant="contained" 
					color="primary"
					onClick={toggleTimer}	
				>{ timer.isRunning() ? "Stop Timer" : "Start Timer"}</Button>
			</AccordionActions>
		</Accordion>
	)
}

export default Task;