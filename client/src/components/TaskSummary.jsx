import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Button from "@mui/material/Button";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TaskDialog from './TaskDialog';
import parse from 'html-react-parser';
import { useState } from 'react';

function TaskSummary({ task }){
	const [open, setOpen] = useState(false);
	
	return (
		<>
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
						onClick={(e) => setOpen(true)}
					>Open</Button>
				</AccordionActions>
			</Accordion>
			<TaskDialog task={task} open={open} setOpen={setOpen} />
		</>
	)
}

export default TaskSummary;