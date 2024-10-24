import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

function Task({ task }){
	return (
		<Accordion sx={{ width: 1 }}>
			<AccordionSummary
				expandIcon={<ExpandMoreIcon className={`priority-${task.priority}`} />}
			>
				{task.title}
			</AccordionSummary>
			<AccordionDetails>
				{task.description}
			</AccordionDetails>
		</Accordion>
	)
}

export default Task;