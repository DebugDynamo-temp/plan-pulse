import { useContext, useEffect, useState } from "react";
import UserContext from "../contexts/User";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { createBoard, getBoards } from "../services/board";
import { getUser } from "../services/user";
import CreateBoardDialog from "../components/CreateBoardDialog";

function Dashboard(){
	const { user, setUser } = useContext(UserContext);
	const [authorized, setAuthorized] = useState(false);
	const [openCreateBoard, setOpenCreateBoard] = useState(false);
	const nav = useNavigate();
	const [boards, setBoards] = useState([]);
	const [currentBoard, setCurrentBoard] = useState(boards[0]);

	async function addBoard(newBoard){
		newBoard.creatorId = user.id;
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
			let user = await getUser();
			setUser({
				id: user.id,
				email: user.email,
				uname: user.uname
			})

			let res = await getBoards(user.id);
			if(res.success){
				setBoards(res.boards);
				setCurrentBoard(res.boards[0]);
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
					{boards.map((b) => {
						return (
							<p 
								key={`${b.title}`}
								className={b === currentBoard ? 'selected' : ''}	
								onClick={(e) => {
									setCurrentBoard(b);
									nav('/home');
								}}
							>{ b.title }</p>
						)
					})}
					<p onClick={() => {setOpenCreateBoard(true)}}>+</p>
				</aside>
				<Outlet context={currentBoard} />
				<CreateBoardDialog open={openCreateBoard} close={() => setOpenCreateBoard(false)} addBoard={addBoard}/>
			</main> 
		</>
	)
}

export default Dashboard;