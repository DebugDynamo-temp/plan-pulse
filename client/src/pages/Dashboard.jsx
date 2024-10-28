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

function Dashboard({}){
	const { user } = useContext(UserContext);
	const [authorized, setAuthorized] = useState(false);
	const nav = useNavigate();
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

	useEffect(() => {

	}, [currentBoard]);
	
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
								size="large"
								edge="end"
								color="inherit"
							>
								<AccountCircle />
							</IconButton>
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
			</> : 
			<p>You are not Authorized to view this page. Go <a href="/login">here</a> to login.</p>
				}
		</>
	)
}

export default Dashboard;