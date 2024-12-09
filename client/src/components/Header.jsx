import { useContext, useEffect, useState } from "react";
import UserContext from "../contexts/User";
import AccountCircle from "@mui/icons-material/AccountCircle";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Menu, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { logout } from "../services/auth";

function Header(){
    const nav = useNavigate();
	const { user, setUser } = useContext(UserContext);
	const [anchorEl, setAnchorEl] = useState(null);

    async function signOut(){
        let res = await logout();
        setUser(null);
        if(res.success){
            nav('/');
        } else {
            alert('Error logging out');
        }
    }

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
                    PlanPulse	
                </Typography>
                <Typography variant="h6" component="div">
                    { user.uname }
                </Typography>
                <IconButton
                    onClick={(e) => setAnchorEl(e.currentTarget)}
                    size="large"
                    edge="end"
                    color="inherit"
                    data-testid="icon-button"
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
                    <MenuItem onClick={(e) => nav('/home/user')}>Profile</MenuItem>
                    <MenuItem onClick={(e) => signOut()}>Logout</MenuItem>
                </Menu>
            </Toolbar>
        </AppBar>
    )
}

export default Header;