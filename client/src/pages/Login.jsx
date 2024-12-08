import Button from '@mui/material/Button';
import CustomSnackbar from '../components/Snackbar';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import { useContext } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import UserContext from '../components/User';
import { login } from '../services/auth';

function Login() {
    const nav = useNavigate();
    const { setUser } = useContext(UserContext);

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
            identifier: '',
            pswd: '',
        }
    });

    function submit(data){
        login(data.identifier, data.pswd);
        setUser({
            name: 'Jack',
            email: data.email,
            id: 0
        }) 
        nav('/home');
    }

    return ( 
        <form className="authForm" onSubmit={handleSubmit(submit)}>
            <Paper id="paper">
                <h1>Sign In:</h1>
                <Controller
                    name="identifier"
                    control={control}
                    rules={{ required: 'Email or Username is required' }}
                    render={({ field: { onChange, value }}) => (
                        <TextField 
                            className='textField' 
                            value={value}
                            onChange={onChange}
                            id='identifier' 
                            label='Email/Username' 
                            variant='outlined' 
                            error={errors.email ? true : false} 
                            helperText={errors.email?.message}
                            fullWidth required 
                        /> 
                    )}
                />
                <Controller
                    name="pswd"
                    control={control}
                    rules={{ 
                        required: "Password is required",
                    }}
                    render={({ field: { onChange, value }}) => (
                        <TextField 
                            className='textField'
                            value={value}
                            onChange={onChange}
                            type="password"
                            id='pswd'
                            label='Password'
                            variant='outlined'
                            error={errors.pswd ? true : false}
                            helperText={errors.pswd?.message}
                            fullWidth required
                        /> 
                    )}
                />
                <a href='/register'>Don't have an account?</a>
                <a href='/forgot-password'>Forgot your password?</a>
                <footer>
                    <Button variant='outlined' onClick={() => reset()}>Cancel</Button>
                    <Button variant='contained' type='submit' disabled={!isDirty || !isValid} >Login</Button>
                </footer>
            </Paper> 
        </form>
    );
}

export default Login;