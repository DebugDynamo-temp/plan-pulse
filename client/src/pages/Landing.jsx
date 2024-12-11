import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";

function Landing(){
    return (
      <Paper elevation={3} className="landing">
        <Typography variant="h5">Elevate your time management with:</Typography>
        <Typography variant="h1" sx={{ fontSize: '3em', marginTop: '10%' }}>PlanPulse</Typography>
        <footer>
          <Button component={Link} to="/register" variant="contained" color="secondary">
            Sign Up
          </Button>
          <Button component={Link} to="/login" variant="contained" color="secondary">
            Sign In
          </Button>
        </footer>
      </Paper>
    )
}

export default Landing;