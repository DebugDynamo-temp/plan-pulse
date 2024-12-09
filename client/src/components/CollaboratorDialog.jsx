import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions"; 
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";

function CollaboratorDialog({ open, close, addCollaborator }){
	const [isOpen, setIsOpen] = useState(open);
	const [collaborator, setCollaborator] = useState('');

	function handleClose(){
		setIsOpen(false);
		close();
	}

	function handleSubmit(){
		setIsOpen(false);
        addCollaborator(collaborator);
		close();
        setCollaborator('');
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
				}
			}}	
			maxWidth="sm"
			fullWidth
		>
			<DialogTitle>Add Collaborator</DialogTitle>	
			<DialogContent className="content">
				<div>
					<h4>Collaborator Username or Email</h4>
					<TextField
						id="boardTitle"
						type="text"
						value={collaborator}
						variant="outlined"
						onChange={(e) => setCollaborator(e.target.value)}
						onFocus={(e) => e.target.select()}
						fullWidth
						autoFocus
					/>
				</div>

			</DialogContent>
			<DialogActions sx={{ justifyContent: 'space-between', paddingLeft: 4, paddingRight: 4 }}>
				<Button onClick={(e) => handleClose()} variant="contained" color="secondary">Cancel</Button>
				<Button type="submit" variant="contained" onClick={(e) => handleSubmit()}>Add Collaborator</Button>
			</DialogActions>
		</Dialog>
	)
}

export default CollaboratorDialog; 