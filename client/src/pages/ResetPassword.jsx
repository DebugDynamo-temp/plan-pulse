import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import { useForm, Controller } from 'react-hook-form';
import { useContext, useEffect } from 'react';
import User from '../contexts/User';
import { useNavigate, useSearchParams } from 'react-router-dom';

function ResetPassword(){
    const nav = useNavigate();
    const [urlParams, setUrlParams] = useSearchParams();
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
            pswd: '',
            confirmPswd: ''
        }
    });
    const pswd = watch('pswd', '');
    const { setUser } = useContext(User);

    function submit(data, e){
        nav('/login');
    }

    useEffect(() => {
        console.log(urlParams.get("token"));
    }, [])

    return (
        <form className="authForm" onSubmit={handleSubmit(submit)}>
            <Paper id="paper">
                <Controller
                    name="pswd"
                    control={control}
                    rules={{ 
                        required: "Password is required and must be 8 characters long",
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
                            error={errors.confirmPswd || errors.pswd || value !== pswd? true : false}
                            fullWidth required
                        /> 
                    )}
                />
                <footer>
                    <Button variant='outlined' onClick={() => reset()}>Cancel</Button>
                    <Button variant='contained' type='submit' disabled={!isDirty || !isValid} >Update</Button>
                </footer>
            </Paper>
        </form>
    )
}

export default ResetPassword;