import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import Button from "@mui/material/Button";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import parse from 'html-react-parser';
import { useNavigate } from "react-router-dom";

function Task({ task }){
	const nav = useNavigate();

	function openTask(){
		nav('/home/task', { state: task });
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
				<Button 
					variant="contained" 
					color="primary"
				>Edit</Button>
				<Button 
					variant="contained" 
					color="primary"
					onClick={openTask}	
				>Open</Button>
			</AccordionActions>
		</Accordion>
	)
}

export default Task;