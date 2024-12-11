import { useContext, useEffect, useState } from "react";
import UserContext from "../contexts/User";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { createBoard, getBoards } from "../services/board";
import { getUser } from "../services/user";
import CreateBoardDialog from "../components/CreateBoardDialog";
import { Button, ButtonGroup, Divider } from "@mui/material";

function Dashboard(){
	const { userId, updateUser } = useContext(UserContext);
	const [openCreateBoard, setOpenCreateBoard] = useState(false);
	const nav = useNavigate();
	const [boards, setBoards] = useState([]);
	const [currentBoard, setCurrentBoard] = useState(boards[0]);

	async function addBoard(newBoard){
		newBoard.creatorId = userId;
		newBoard.collaboratorIds = [userId];
		newBoard.type = newBoard.type.toUpperCase();
		let res = await createBoard(newBoard);
		if(res.success){
			setBoards([...boards, res.board]);
			setCurrentBoard(res.board);
		} else {
			alert("Error creating Board");
		}
	}

	useEffect(() => {
		async function loadUser(){
			let loadedUser = await getUser();
			if(!loadedUser.success){
				nav('/not-authed');
				return;
			}
			await updateUser(loadedUser);

			let res = await getBoards();
			if(res.success){
				if(res.boards.length > 0){
					setBoards(res.boards);
					setCurrentBoard(res.boards[0]);
				}
			} else {
				alert("Error loading boards");
			}
		}

		loadUser();
	}, []);

	return (
		<>
			<Header />
			<main>
				<aside>
					<div className="buttonGroup">
						<ButtonGroup orientation="vertical" variant="contained" size="large" disableElevation sx={{ width: '90%' }} >
							{boards.map((b) => {
								return (
									<Button
										key={`${b.title}`}
										color={b === currentBoard ? 'secondary' : 'primary'}
										className={currentBoard === b ? 'selected' : ''}
										sx={{ textTransform: 'none', fontSize: 'large' }}
										onClick={(e) => {
											setCurrentBoard(b);
											nav('/home');
										}}
										fullWidth
									>{ b.title }</Button>
								)
							})}
							<Button onClick={() => {setOpenCreateBoard(true)}} color='info' value={''} fullWidth>+</Button>
						</ButtonGroup>
						<Divider orientation="vertical" flexItem sx={{ maxheight: '80%', marginTop: '10%', marginLeft: '10%' }} />
					</div>
				</aside>
				<Outlet context={currentBoard} />
				<CreateBoardDialog open={openCreateBoard} close={() => setOpenCreateBoard(false)} addBoard={addBoard}/>
			</main> 
		</>
	)
}

export default Dashboard;