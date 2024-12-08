import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import { useContext } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import UserContext from '../components/User';
import { Typography } from '@mui/material';

function UserProfile(){
    const nav = useNavigate();
    const { user, setUser } = useContext(UserContext);

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
            pswd: '',
            newPswd: '',
        }
    });

    function submit(data, e){
        console.log(data);
    }

    return (
        <section>
            <form className="profile" onSubmit={handleSubmit(submit)}>
                <Paper id="paper">
                    <Typography variant="h2">{user.name}</Typography>
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
                    <Controller
                        name="pswd"
                        control={control}
                        render={({ field: { onChange, value }}) => (
                            <TextField 
                                className='textField'
                                value={value}
                                onChange={onChange}
                                type="password"
                                id='pswd'
                                label='Current Password'
                                variant='outlined'
                                fullWidth
                            /> 
                        )}
                    />
                    <Controller
                        name="newPswd"
                        control={control}
                        render={({ field: { onChange, value }}) => (
                            <TextField 
                                className='textField'
                                value={value}
                                onChange={onChange}
                                type="password"
                                id='newPswd'
                                label='New Password'
                                variant='outlined'
                                error={errors.pswd ? true : false}
                                helperText={errors.pswd?.message}
                                autoComplete='new-password'
                                fullWidth
                            /> 
                        )}
                    />
                    <footer>
                        <Button variant='outlined' onClick={() => reset()}>Cancel</Button>
                        <Button variant='contained' type='submit'>Update</Button>
                    </footer>
                </Paper> 
            </form>
        </section>
    )
}

export default UserProfile;