import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router-dom';
import CustomSnackbar from '../components/Snackbar';
import Typography from '@mui/material/Typography';

function ForgotPassword(){
    const nav = useNavigate();
    const [urlParams, setParams] = useSearchParams();
    const [openSnackbar, setOpenSnackbar] = useState(false);

    const { 
        control, 
        handleSubmit, 
        formState: { 
            errors,
            isDirty,
            isValid
        },
        reset,
        setValue
    } = useForm({
        mode: 'onChange',
        defaultValues: {
            email: '',
        }
    });

    function submit(data, e){

        setOpenSnackbar(true);
    }

    function closeSnackbar(){
        setOpenSnackbar(false);
    }

    useEffect(() => {
        if(urlParams.get('email')){
            setValue('email', urlParams.get('email'));
        }
    }, [])

    return (
        <section>
            <form className="profile" onSubmit={handleSubmit(submit)}>
                <Paper id="paper">
                    <Typography variant="h3">Email</Typography>
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
                    <footer>
                        <Button variant='outlined' onClick={() => reset()}>Cancel</Button>
                        <Button variant='contained' type='submit' disabled={!isDirty || !isValid}>Send Password Reset</Button>
                    </footer>
                </Paper> 
            </form>
            <CustomSnackbar open={openSnackbar} close={closeSnackbar} msg="Password reset email sent!" />
        </section>
    )
}

export default ForgotPassword;