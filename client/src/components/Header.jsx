import { useContext, useEffect, useState } from "react";
import UserContext from "../contexts/User";
import AccountCircle from "@mui/icons-material/AccountCircle";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Avatar, Menu, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { logout } from "../services/auth";
import { getProfileImg } from "../services/user";

function Header(){
    const nav = useNavigate();
	const { username, profileImg,  clearUser } = useContext(UserContext);
	const [anchorEl, setAnchorEl] = useState(null);
    const [img, setImg] = useState('');

    async function signOut(){
        let res = await logout();
        clearUser()
        if(res.success){
            nav('/');
        } else {
            alert('Error logging out');
        }
    }

    useEffect(() => {
        async function loadImage(){
            let loadedImg = await getProfileImg();
            if(loadedImg.success){
                let res = URL.createObjectURL(loadedImg.img);
                setImg(res);
            }
        }

        loadImage();
    }, []);
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
                    PlanPulse	
                </Typography>
                <Typography variant="h6" component="div">
                    { username }
                </Typography>
                <IconButton
                    onClick={(e) => setAnchorEl(e.currentTarget)}
                    size="large"
                    edge="end"
                    color="inherit"
                    data-testid="icon-button"
                >
                    {
                        profileImg && profileImg.length > 0 
                        ? <Avatar src={img} alt={username} /> 
                        : <AccountCircle />
                    }
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
                    <MenuItem onClick={(e) => nav('/home/user')}>Profile</MenuItem>
                    <MenuItem onClick={(e) => signOut()}>Logout</MenuItem>
                </Menu>
            </Toolbar>
        </AppBar>
    )
}

export default Header;