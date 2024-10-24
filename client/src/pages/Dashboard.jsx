import { useContext, useState } from "react";
import UserContext from "../components/User";
import AccountCircle from "@mui/icons-material/AccountCircle";
import AppBar from "@mui/material/AppBar";
import Board from "../components/Board";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

function Dashboard({}){
	const { user } = useContext(UserContext);
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
		},
		{
			title: "Job", 
			type: "PRIVATE",
			creatorId: "0",
			collaboratorIds: [1, 2, 3],
		},
	])
	const [currentBoard, setCurrentBoard] = useState(boards[0]);
	
	return (
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
				</aside>
				<section>
					<Board board={currentBoard} />
				</section>
			</main>
		</>
	)
}

export default Dashboard;