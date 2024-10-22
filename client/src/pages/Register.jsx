import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import { useForm, Controller } from 'react-hook-form';

function Register() {
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
            pswd: '',
            confirmPswd: ''
        }
    });
    const pswd = watch('pswd', '');

    function submit(data, e){
        //send data to server to create user, filtering out the confirmPswd
        delete data.confirmPswd;
        console.log(data);
    }

    return ( 
        <form onSubmit={handleSubmit(submit)}>
            <Paper id="paper">
                <h1>Sign Up:</h1>
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
                            fullWidth required 
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
                            fullWidth required 
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
                            fullWidth required 
                        /> 
                    )}
                />
                <Controller
                    name="pswd"
                    control={control}
                    rules={{ 
                        required: "Password is required",
                        minLength: 8
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
                            error={errors.confirmPswd || value !== pswd? true : false}
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