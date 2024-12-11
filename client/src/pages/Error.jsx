import { Paper, Typography } from "@mui/material";

function Error({ msg }){
    return (
        <div className='authForm'>
            <Paper id="paper">
                <Typography variant="h2">{msg}</Typography>
                <a href="/" style={{ textAlign: 'center' }}>Homepage</a>
            </Paper> 
        </div>
    )
}

export default Error;