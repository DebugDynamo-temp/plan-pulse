import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions"; 
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Editor from "./Editor";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Slider from "@mui/material/Slider";
import { status, statusToReadable } from "../services/utils";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";

function CreateTaskDialog({ open, close, addTask }){
	const init = {
		title: 'New Task',
		description: '',
		assignee: '',
		priority: 3,
		status: "TO_DO",
		deadline: ''
	}
	const [statusCollection, setStatus] = useState(status)
	const [isOpen, setIsOpen] = useState(open);
	const [newTask, setNewTask] = useState(init);

	function handleClose(){
		setIsOpen(false);
		setNewTask(init);
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
					addTask(newTask);
					handleClose();
				}
			}}
			maxWidth="md"
			fullWidth
		>
			<DialogTitle>{ newTask.title }</DialogTitle>	
			<DialogContent className="createTask">
				<div>
					<h4>Task Title</h4>
					<TextField
						id="taskTitle"
						type="text"
						value={newTask.title}
						variant="outlined"
						onChange={(e) => setNewTask({...newTask, title: e.target.value})}
						onFocus={(e) => e.target.select()}
						fullWidth
						autoFocus
					/>
				</div>

				<div>
					<h4>Description</h4>
					<Editor onChange={(desc) => setNewTask({...newTask, description: desc})} />
				</div>

				<div>
					<h4>Status</h4>
					<FormControl fullWidth>
						<Select 
							value={newTask.status}
							id="status-select"
							onChange={(e) => setNewTask({...newTask, status: e.target.value})}
						>
							{statusCollection.map((s, idx) => {
								return <MenuItem key={`${s}-${idx}`} value={s}>{statusToReadable(s)}</MenuItem>
							})}
						</Select>
					</FormControl>
				</div>

				<div>
					<h4>Priority</h4>
					<Slider
						value={newTask.priority}
						min={1}
						max={10}
						step={1}
						valueLabelDisplay="auto"
						onChange={(e) => setNewTask({...newTask, priority: e.target.value})}
						marks
					/>
				</div>
				<div>
					<h4>Deadline</h4>
					<input 
						type="datetime-local" 
						value={newTask.deadline} 
						onChange={(e) => setNewTask({...newTask, deadline: e.target.value})}
					/>
				</div>
			</DialogContent>
			<DialogActions sx={{ justifyContent: 'space-between', paddingLeft: 4, paddingRight: 4 }}>
				<Button onClick={(e) => handleClose()} variant="contained" color="secondary">Cancel</Button>
				<Button type="submit" variant="contained">Create Task</Button>
			</DialogActions>
		</Dialog>
	)
}

export default CreateTaskDialog;