import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import Button from "@mui/material/Button";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import parse from 'html-react-parser';
import { useNavigate } from "react-router-dom";

function Task({ task, onStatusChange }){
	const nav = useNavigate();

	function openTask(){
		nav('/home/task', { state: task });
	}

	function upgradeStatus(){
		switch(task.status){
			case 'TO_DO':
				task.status = "IN_PROGRESS";
				break;
			case 'IN_PROGRESS':
				task.status = "IN_REVIEW";
				break;
			default:
				task.status = "DONE";
		}
		onStatusChange(task);
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
			</AccordionDetails>
			<AccordionActions>
				{ task.status != "DONE" ? 
					<>
						<Button 
							variant="contained" 
							color="secondary"
							onClick={upgradeStatus}
						>Upgrade Status</Button>
						<Button 
							variant="contained" 
							color="primary"
							onClick={openTask}	
						>Open</Button>
					</>
				: '' }
			</AccordionActions>
		</Accordion>
	)
}

export default Task;