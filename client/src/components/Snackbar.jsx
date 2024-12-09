import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";

function CustomSnackbar({ msg, open, close }){
    const action = (
        <Button onClick={close} variant="contained" color="secondary">
            Confirm
        </Button>
    )

    return (
        <Snackbar
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            open={open}
            autoHideDuration={3000}
            onClose={close} 
            message={msg}
            action={action}
        />
    )
}

export default CustomSnackbar;