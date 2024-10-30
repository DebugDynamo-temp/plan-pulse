import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions"; 
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";

function CreateBoardDialog({ open, close, addBoard }){
	const init = {
		title: 'New Board',
		type: 'PRIVATE',
		collaboratorIds: []
	}

	const [isOpen, setIsOpen] = useState(open);
	const [newBoard, setNewBoard] = useState(init);

	function handleClose(){
		setIsOpen(false);
		setNewBoard(init);
		close();
	}

	useEffect(() => {
		setIsOpen(open);
	}, [open]);

	return (
		<Dialog
			open={isOpen}
			onClose={handleClose}
			disableRestoreFocus
			PaperProps={{
				component: 'form',
				onSubmit: (e) => {
					e.preventDefault();
					addBoard(newBoard);
					handleClose();
				}
			}}	
			maxWidth="sm"
			fullWidth
		>
			<DialogTitle>{ newBoard.title }</DialogTitle>	
			<DialogContent className="content">
				<div>
					<h4>Board Title</h4>
					<TextField
						id="boardTitle"
						type="text"
						value={newBoard.title}
						variant="outlined"
						onChange={(e) => setNewBoard({...newBoard, title: e.target.value})}
						onFocus={(e) => e.target.select()}
						fullWidth
						autoFocus
					/>
				</div>

				<div>
					<h4>Type</h4>
					<FormControl fullWidth>
						<Select 
							value={newBoard.type}
							id="status-select"
							onChange={(e) => setNewTask({...newTask, status: e.target.value})}
						>
							<MenuItem value="PRIVATE">Private</MenuItem>
							<MenuItem value="Public">Public</MenuItem>
						</Select>
					</FormControl>
				</div>

			</DialogContent>
			<DialogActions sx={{ justifyContent: 'space-between', paddingLeft: 4, paddingRight: 4 }}>
				<Button onClick={(e) => handleClose()} variant="contained" color="secondary">Cancel</Button>
				<Button type="submit" variant="contained">Create Board</Button>
			</DialogActions>
		</Dialog>
	)
}

export default CreateBoardDialog; 