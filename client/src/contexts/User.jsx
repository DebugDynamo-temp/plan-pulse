import { createContext, useState } from "react";

const UserContext = createContext();

const UserProvider = ({ children }) => {
	const [userFirst, setFirst] = useState('');
	const [userLast, setLast] = useState('');
	const [userId, setId] = useState('');
	const [username, setUname] = useState('');
	const [userEmail, setEmail] = useState('');
	const [profileImg, setProfileImg] = useState('');

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
		if(data.img){
			setProfileImg(data.img);
		}
	}

	function clearUser(){
		setFirst('');
		setLast('');
		setId('');
		setEmail('');
		setUname('');
		setProfileImg('');
	}

	return (
		<UserContext.Provider value={{ userFirst, userLast, userId, userEmail, username, profileImg, updateUser, clearUser }}>
			{children}
		</UserContext.Provider>
	)
}

export { UserProvider };

export default UserContext;