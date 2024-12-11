import { createContext, useState } from "react";

const UserContext = createContext();

const UserProvider = ({ children }) => {
	const [userFirst, setFirst] = useState('');
	const [userLast, setLast] = useState('');
	const [userId, setId] = useState('');
	const [username, setUname] = useState('');
	const [userEmail, setEmail] = useState('');
	const [isAuthed, setIsAuthed] = useState(false);

	function updateUser(data){
		if(data.first){
			setFirst(data.first);	
		}
		if(data.last){
			setLast(data.last);	
		}
		if(data.id){
			setId(data.id);	
		}
		if(data.email){
			setEmail(data.email);	
		}
		if(data.uname){
			setUname(data.uname);	
		}
	}

	function clearUser(){
		setFirst('');
		setLast('');
		setId('');
		setEmail('');
		setUname('');
	}

	return (
		<UserContext.Provider value={{ userFirst, userLast, userId, userEmail, username, updateUser, clearUser }}>
			{children}
		</UserContext.Provider>
	)
}

export { UserProvider };

export default UserContext;