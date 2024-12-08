import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import { useContext, useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import UserContext from '../components/User';
import CustomSnackbar from '../components/Snackbar';
import Typography from '@mui/material/Typography';

function UserProfile(){
    const nav = useNavigate();
    const { user, setUser } = useContext(UserContext);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMsg, setSnackbarMsg] = useState('Email changed!');

    const { 
        control, 
        handleSubmit, 
        formState: { 
            errors,
            isDirty,
            isValid
        },
        reset
    } = useForm({
        mode: 'onChange',
        defaultValues: {
            email: user.email,
        }
    });

    function submit(data, e){
        setSnackbarMsg('Email changed!');
        setOpenSnackbar(true);
    }

    function resetPassword(){
        //call to server to email link
        setSnackbarMsg('Password reset email sent.');
        setOpenSnackbar(true);
    }

    function closeSnackbar(){
        setOpenSnackbar(false);
        console.log("closing");
    }

    return (
        <section>
            <form className="profile" onSubmit={handleSubmit(submit)}>
                <Paper id="paper">
                    <Typography variant="h3">{user.name}</Typography>
                    <Controller
                        name="email"
                        control={control}
                        render={({ field: { onChange, value }}) => (
                            <TextField 
                                className='textField' 
                                value={value}
                                onChange={onChange}
                                id='email' 
                                label='Email' 
                                variant='outlined' 
                                error={errors.email ? true : false} 
                                helperText={errors.email?.message}
                                fullWidth 
                            /> 
                        )}
                    />
                    <span onClick={resetPassword}>Forgot Password?</span>
                    <footer>
                        <Button variant='outlined' onClick={() => reset()}>Cancel</Button>
                        <Button variant='contained' type='submit'>Update Email</Button>
                    </footer>
                </Paper> 
            </form>
            <CustomSnackbar open={openSnackbar} close={closeSnackbar} msg={snackbarMsg} />
        </section>
    )
}

export default UserProfile;