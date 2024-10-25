import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import Paper from "@mui/material/Paper";

function Landing(){
    return (
      <Paper elevation={3} className="landing">
        <h3>Elevate your time management with:</h3>
        <h1>PlanPulse</h1>
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