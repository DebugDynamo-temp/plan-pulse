import { useContext, useEffect, useState } from "react";
import UserContext from "../components/User";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { getBoards } from "../services/board";

function Dashboard(){
	const { user, setUser } = useContext(UserContext);
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

		async function getBoardsByUser(){
			const boards = await getBoards(user.id);
			console.log(boards);
			setBoards(boards);
		}
		getBoardsByUser();		

		return () => {

		}
	}, [])
	
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
					<p>+</p>
				</aside>
				<Outlet context={currentBoard} />
			</main> 
		</>
	)
}

export default Dashboard;