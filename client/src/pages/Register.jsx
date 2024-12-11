import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import { useForm, Controller } from 'react-hook-form';
import { useContext } from 'react';
import User from '../contexts/User';
import { useNavigate } from 'react-router-dom';
import { register } from '../services/auth';
import { Typography } from '@mui/material';

function Register() {
    const nav = useNavigate();
    const { 
        control, 
        handleSubmit, 
        formState: { 
            errors,
            isDirty,
            isValid
        },
        reset,
        watch
    } = useForm({
        mode: 'onChange',
        defaultValues: {
            fname: '',
            lname: '',
            email: '',
            uname: '',
            pswd: '',
            confirmPswd: ''
        }
    });
    const pswd = watch('pswd', '');
    const { user, setUser } = useContext(User);

    async function submit(data, e){
        let res = await register(data.fname, data.lname, data.email, data.uname, data.pswd, data.confirmPswd);
        if(res.success){
            setUser(res.user.userId);
            nav('/home');
        } else {
            alert('Registration failed');
        }
    }

    return ( 
        <form className="authForm" onSubmit={handleSubmit(submit)}>
            <Paper id="paper">
                <Typography variant='h2'>Sign Up</Typography>
                <Controller
                    name="fname"
                    control={control}
                    rules={{ required: "First name is required." }}
                    render={({ field: { onChange, value }}) => (
                        <TextField 
                            className='textField' 
                            value={value}
                            onChange={onChange}
                            id='fname' 
                            label='First' 
                            variant='outlined' 
                            error={errors.fname ? true : false} 
                            helperText={errors.fname?.message}
                            sx={{ width: '49%', marginRight: '2%' }}
                            required 
                        /> 
                    )}
                />
                <Controller
                    name="lname"
                    control={control}
                    rules={{ required: "Last name is required." }}
                    render={({ field: { onChange, value }}) => (
                        <TextField 
                            className='textField' 
                            value={value}
                            onChange={onChange}
                            id='lname' 
                            label='Last' 
                            variant='outlined' 
                            error={errors.lname ? true : false} 
                            helperText={errors.lname?.message}
                            sx={{ width: '49%' }}
                            required 
                        /> 
                    )}
                />
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
                            autoComplete='new-password'
                            fullWidth required 
                        /> 
                    )}
                />
                <Controller
                    name="uname"
                    control={control}
                    rules={{ required: "Username is required." }}
                    render={({ field: { onChange, value }}) => (
                        <TextField 
                            className='textField' 
                            value={value}
                            onChange={onChange}
                            id='uname' 
                            label='Username' 
                            variant='outlined' 
                            error={errors.fname ? true : false} 
                            helperText={errors.fname?.message}
                            autoComplete='username'
                            fullWidth required 
                        /> 
                    )}
                />
                <Controller
                    name="pswd"
                    control={control}
                    rules={{ 
                        maxLength: 30,
                        pattern: {
                            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                            message: "Password must contain 8 characters, including one lower and uppercase letter, one number, and one special character"
                        }
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
                            autoComplete='new-password'
                            fullWidth required
                        /> 
                    )}
                />
                <Controller
                    name="confirmPswd"
                    control={control}
                    rules={{ 
                        required: "Passwords must match",
                        validate: (value, formValues) => value === pswd
                    }}
                    render={({ field: { onChange, value }}) => (
                        <TextField 
                            className='textField'
                            value={value}
                            onChange={onChange}
                            type="password"
                            id='confirmPswd'
                            label='Confirm Password'
                            variant='outlined'
                            autoComplete='new-password'
                            error={errors.confirmPswd || errors.pswd || value !== pswd? true : false}
                            fullWidth required
                        /> 
                    )}
                />
                <a href='/login'>Already have an account?</a>
                <footer>
                    <Button variant='outlined' onClick={() => reset()}>Cancel</Button>
                    <Button variant='contained' type='submit' disabled={!isDirty || !isValid} >Register</Button>
                </footer>
            </Paper> 
        </form>
    );
}

export default Register;