import { useContext, useEffect, useState } from "react";
import UserContext from "../components/User";
import { useNavigate } from "react-router-dom";
import AccountCircle from "@mui/icons-material/AccountCircle";
import AppBar from "@mui/material/AppBar";
import Board from "../components/Board";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { TaskProvider } from "../components/TaskContext";
import { Menu, MenuItem } from "@mui/material";

function Dashboard({}){
	const { user, setUser } = useContext(UserContext);
	const [authorized, setAuthorized] = useState(false);
	const nav = useNavigate();
	const [anchorEl, setAnchorEl] = useState(null);
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

	useEffect(() => {
		if(user.name.length < 1 || user.email.length < 1 || user.id.length < 1){
			setAuthorized(false);
			return;
		}

		setAuthorized(true);
	}, [])
	
	return (
		<>
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
						<p>+</p>
					</aside>
					<section>
						<TaskProvider>
							<Board board={currentBoard} />
						</TaskProvider>
					</section>
				</main> 
			</>
		</>
	)
}

export default Dashboard;