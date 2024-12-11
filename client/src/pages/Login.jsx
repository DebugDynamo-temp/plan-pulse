import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import { useContext } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import UserContext from '../contexts/User';
import { login } from '../services/auth';
import { Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

function Login() {
    const nav = useNavigate();
    const palette = useTheme().palette;

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

    async function submit(data){
        let res = await login(data.identifier, data.pswd);
        if(res.success){
            nav('/home');
        } else {
            alert('Login failed');
        }
    }

    return ( 
        <form className="authForm" onSubmit={handleSubmit(submit)}>
            <Paper id="paper">
                <Typography variant='h2'>Sign In</Typography>
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
                            color='secondary'
                            error={errors.email ? true : false} 
                            helperText={errors.email?.message}
                            autoComplete='username'
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
                            autoComplete='current-password'
                            fullWidth required
                        /> 
                    )}
                />
                <a href='/register'>Don't have an account?</a>
                <a href='/forgot-password'>Forgot your password?</a>
                <footer>
                    <Button variant='outlined' onClick={() => reset()}>Cancel</Button>
                    <Button variant='contained' type='submit' disabled={!isDirty || !isValid} data-testid='login-button'>Login</Button>
                </footer>
            </Paper> 
        </form>
    );
}

export default Login;