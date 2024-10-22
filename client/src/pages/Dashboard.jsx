import { useContext, useState } from "react";
import UserContext from "../components/User";
import AccountCircle from "@mui/icons-material/AccountCircle";
import AppBar from "@mui/material/AppBar";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu"
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import zIndex from "@mui/material/styles/zIndex";

function Dashboard({}){
	const { user } = useContext(UserContext);
	const [boards, setBoards] = useState(["Main", "Group 1", "Group 2", "Job"]);
	const [currentBoard, setCurrentBoard] = useState(boards[0]);
	
	return (
		<>
			<AppBar position="relative" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
				<Toolbar>
					<IconButton
						size="large"
						edge="start"
						color="inherit"
					>
						<MenuIcon />
					</IconButton>
					<Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
						{ user.name }	
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
			<Drawer variant="permanent" anchor="left">
				{boards.map((b, idx) => {
					return (
						<p 
							key={`${b}`}
							className={b === currentBoard ? 'selected' : ''}	
							onClick={(e) => setCurrentBoard(b)}
						>{ b }</p>
					)
				})}
			</Drawer>
		</>
	)
}

export default Dashboard;