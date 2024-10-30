import { useContext, useEffect, useState } from "react";
import UserContext from "../contexts/User";
import { useNavigate } from "react-router-dom";
import AccountCircle from "@mui/icons-material/AccountCircle";
import AppBar from "@mui/material/AppBar";
import Board from "../components/Board";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import TaskContext, { TaskProvider } from "../contexts/TaskContext";
import { Menu, MenuItem } from "@mui/material";
import CreateBoardDialog from "../components/CreateBoardDialog";

function Dashboard({}){
	const [anchorEl, setAnchorEl] = useState(null);
	const [authorized, setAuthorized] = useState(true);
	const { tasks, setTasks } = useContext(TaskContext);
	const nav = useNavigate();
	const [openCreateBoard, setOpenCreateBoard] = useState(false);
	const { user, setUser } = useContext(UserContext);
	const [boards, setBoards] = useState([
		{
			title: "Main", 
			type: "PRIVATE",
			creatorId: "0",
			collaboratorIds: [],
		},
		{
			title: "Group 1", 
			type: "PUBLIC",
			creatorId: "0",
			collaboratorIds: [1, 2, 3],
		},
		{
			title: "Group 2", 
			type: "PUBLIC",
			creatorId: "0",
			collaboratorIds: [1, 2, 3],
		}
	])
	const [currentBoard, setCurrentBoard] = useState(boards[0]);

	function addBoard(newBoard){
		newBoard.creatorId = 0;
		setBoards([...boards, newBoard]);
		setTasks({...tasks, [newBoard.title]: []});
		setCurrentBoard(newBoard.title);
	}

	/*useEffect(() => {
		if(user.name.length < 1 || user.email.length < 1 || user.id.length < 1){
			setAuthorized(false);
			return;
		}

		setAuthorized(true);
	}, [])*/
	
	return (
		<>
			{ authorized ? 
			<>
				<header>
					<AppBar position="static">
						<Toolbar>
							<Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
								PlanPulse	
							</Typography>
							<Typography variant="h6" component="div">
								{ user.email }
							</Typography>
							<IconButton
								onClick={(e) => setAnchorEl(e.currentTarget)}
								size="large"
								edge="end"
								color="inherit"
							>
								<AccountCircle />
							</IconButton>
							<Menu
								anchorEl={anchorEl}
								anchorOrigin={{
									vertical: 'top',
									horizontal: 'right'
								}}
								transformOrigin={{
									vertical: 'top',
									horizontal: 'right'
								}}
								open={Boolean(anchorEl)}
								onClose={(e) => setAnchorEl(null)}
								keepMounted
							>
								<MenuItem onClick={(e) => {setUser(null); nav('/');}}>Logout</MenuItem>
							</Menu>
						</Toolbar>
					</AppBar>
				</header>

				<main>
					<aside>
						{boards.map((b) => {
							return (
								<p 
									key={`${b.title}`}
									className={b === currentBoard ? 'selected' : ''}	
									onClick={(e) => setCurrentBoard(b)}
								>{ b.title }</p>
							)
						})}
						<p onClick={(e) => setOpenCreateBoard(true)}>+</p>
					</aside>
					<section>
						<Board board={currentBoard} />
					</section>
				</main> 
				<CreateBoardDialog open={openCreateBoard} close={() => setOpenCreateBoard(false)} addBoard={addBoard} />
			</> : 
			<p>You are not Authorized to view this page. Go <a href="/login">here</a> to login.</p>
				}
		</>
	)
}

export default Dashboard;