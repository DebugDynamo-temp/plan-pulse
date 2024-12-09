import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions"; 
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import EditIcon from '@mui/icons-material/Edit';
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";

function TaskDialog({ open, setOpen, task }){
	const [editing, setEditing] = useState(false);
	const [isOpen, setIsOpen] = useState(open);

	function handleClose(){
		setIsOpen(false);
		setOpen(false);
	}

	useEffect(() => {
		setIsOpen(open);
	}, [open])

	return (
		<Dialog
			open={isOpen}
			onClose={handleClose}
			maxWidth="sm"
			fullWidth
			disableRestoreFocus
			className="task"
		>
			<DialogTitle>
				{ !editing 
					? task.title
					: <TextField
						id="taskTitle"
						type="text"
						value={task.title}
						variant="outlined"
						onChange={(e) => console.log(e.target.value)}
						onFocus={(e) => e.target.select()}
						fullWidth
					/>
				}

				<IconButton onClick={(e) => setEditing(!editing)} color="secondary">
					<EditIcon />
				</IconButton>
			</DialogTitle>	

			<DialogContent>
				<p>{task.description}</p>
			</DialogContent>

			<DialogActions sx={{ justifyContent: 'space-between', paddingLeft: 4, paddingRight: 4 }}>
				<Button onClick={handleClose} variant="contained" color="secondary">Cancel</Button>
				{ editing
					? <Button type="submit" variant="contained">Save Changes</Button>
					: ''
				}
			</DialogActions>
		</Dialog>
	)
}

export default TaskDialog; 