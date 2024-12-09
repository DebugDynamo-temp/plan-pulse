import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import { useContext, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import UserContext from '../contexts/User';
import CustomSnackbar from '../components/Snackbar';
import Typography from '@mui/material/Typography';

function UserProfile(){
    const nav = useNavigate();
    const { user, setUser } = useContext(UserContext);
    const [openSnackbar, setOpenSnackbar] = useState(false);

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
        setOpenSnackbar(true);
    }

    function closeSnackbar(){
        setOpenSnackbar(false);
    }

    return (
        <section>
            <form className="profile" onSubmit={handleSubmit(submit)}>
                <Paper id="paper">
                    <Typography variant="h3">{user.name}</Typography>
                    <Controller
                        name="email"
                        control={control}
                        rules={{ 
                            required: 'Email is required',
                            pattern: {
                                value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                message: 'Please enter a valid email'
                            }
                        }}
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
                    <a href={`/forgot-password?email=${user.email}`}>Change password?</a>
                    <footer>
                        <Button variant='outlined' onClick={() => reset()}>Cancel</Button>
                        <Button variant='contained' type='submit'>Update Email</Button>
                    </footer>
                </Paper> 
            </form>
            <CustomSnackbar open={openSnackbar} close={closeSnackbar} msg={"Email changed!"} />
        </section>
    )
}

export default UserProfile;