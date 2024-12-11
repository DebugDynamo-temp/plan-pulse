import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions"; 
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Editor from "./Editor";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Slider from "@mui/material/Slider";
import { status, statusToReadable } from "../services/utils";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import { useContext } from "react";
import UserContext from "../contexts/User";
import { Typography } from "@mui/material";

function CreateTaskDialog({ open, close, addTask, creatorName, collaborators, showCollaborators }){
	const init = {
		title: 'New Task',
		assignee: '',
		priority: 3,
		status: "TO_DO",
		deadline: ''
	}
	const { userId, username } = useContext(UserContext);
	const [statusCollection, setStatus] = useState(status)
	const [isOpen, setIsOpen] = useState(open);
	const [newTask, setNewTask] = useState(init);
	const [desc, setDesc] = useState('');

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
					newTask.description = desc;
					addTask(newTask);
					handleClose();
				}
			}}
			maxWidth="md"
			fullWidth
		>
			<DialogTitle variant="h3">
				{ newTask.title }
			</DialogTitle>	
			<DialogContent className="createTask">
				<div>
					<Typography variant="h6">Task Title</Typography>
					<TextField
						id="taskTitle"
						type="text"
						value={newTask.title}
						variant="outlined"
						onChange={(e) => setNewTask({...newTask, title: e.target.value})}
						fullWidth
						autoFocus
					/>
				</div>

				<div>
					<Typography variant="h6">Description</Typography>
					<Editor onChange={(desc) => setDesc(desc)} />
				</div>

				<div className="statusPriority">
					<section>
						<Typography variant="h6">Status</Typography>
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
					</section>
					<section>
						<Typography variant="h6">Priority</Typography>
						<Slider
							value={newTask.priority}
							min={1}
							max={10}
							step={1}
							valueLabelDisplay="auto"
							onChange={(e) => setNewTask({...newTask, priority: e.target.value})}
							marks
						/>

					</section>
				</div>

				<div>
					<Typography variant="h6">Deadline</Typography>
					<input 
						type="datetime-local" 
						value={newTask.deadline} 
						onChange={(e) => setNewTask({...newTask, deadline: e.target.value})}
					/>
				</div>

				{
					showCollaborators ? 
					<div>
						<Typography variant="h6">Assign To</Typography>
						<FormControl fullWidth>
							<Select 
								value={newTask.assignee}
								id="assignee-select"
								onChange={(e) => setNewTask({...newTask, assignee: e.target.value})}
							>
								{collaborators.map((c, idx) => {
									return <MenuItem key={`c-${idx}`} value={c}>{c}</MenuItem>
								})}
								<MenuItem value={userId}>{username}</MenuItem>
							</Select>
						</FormControl>
					</div> : ''
				}
			</DialogContent>
			<DialogActions sx={{ justifyContent: 'space-between', paddingLeft: 4, paddingRight: 4 }}>
				<Button onClick={(e) => handleClose()} variant="contained" color="secondary">Cancel</Button>
				<Button type="submit" variant="contained">Create Task</Button>
			</DialogActions>
		</Dialog>
	)
}

export default CreateTaskDialog;