import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import { updateUserProfile } from '../services/user';
import { useContext, useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import UserContext from '../contexts/User';
import CustomSnackbar from '../components/Snackbar';
import Typography from '@mui/material/Typography';


function UserProfile(){
    const { userFirst, userLast, userEmail, username, updateUser } = useContext(UserContext);
    const [img, setImg] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);

    const { 
        control, 
        handleSubmit, 
        formState: { 
            errors,
        },
        reset 
    } = useForm({
        mode: 'onChange',
        defaultValues: {
            first: userFirst,
            last: userLast,
            uname: username,
            email: userEmail,
            img: ''
        }
    });

    async function submit(data, e){
        data.img = img;
        let res = await updateUserProfile(data);
        if(res.success){
            updateUser(res);
            setOpenSnackbar(true);
        } else {
            alert("Error updating profile");
        }
    }

    function closeSnackbar(){
        setOpenSnackbar(false);
    }

    return (
        <section>
            <form className="profile" onSubmit={handleSubmit(submit)}>
                <Paper id="paper">
                    <Typography variant="h3">{username}</Typography>
                    <Controller
                        name="email"
                        control={control}
                        rules={{ 
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
                                placeholder={userEmail}
                                fullWidth 
                            /> 
                        )}
                    />
                    <Controller
                        name="first"
                        control={control}
                        render={({ field: { onChange, value }}) => (
                            <TextField 
                                className='textField' 
                                value={value}
                                onChange={onChange}
                                id='first' 
                                label='First' 
                                variant='outlined' 
                                placeholder={userFirst}
                                sx={{ width: '48%', marginRight: '2%' }}
                            /> 
                        )}
                    />
                    <Controller
                        name="Last"
                        control={control}
                        render={({ field: { onChange, value }}) => (
                            <TextField 
                                className='textField' 
                                value={value}
                                onChange={onChange}
                                id='last' 
                                label='Last' 
                                variant='outlined' 
                                placeholder={userLast}
                                sx={{ width: '50%' }}
                            /> 
                        )}
                    />
                    <Controller
                        name="uname"
                        control={control}
                        render={({ field: { onChange, value }}) => (
                            <TextField 
                                className='textField' 
                                value={value}
                                onChange={onChange}
                                id='unaem' 
                                label='Username' 
                                variant='outlined' 
                                placeholder={username}
                                fullWidth 
                            /> 
                        )}
                    />
                    <input 
                        type='file' 
                        onChange={(e) => {setImg(e.target.files[0])}}
                        id='img' 
                        accept='img/png img/jpeg img/pjg' 
                    /> 
                    <a href={`/forgot-password?email=${userEmail}`}>Change password?</a>
                    <footer>
                        <Button variant='outlined' onClick={() => reset()}>Cancel</Button>
                        <Button variant='contained' type='submit'>Update Profile</Button>
                    </footer>
                </Paper> 
            </form>
            <CustomSnackbar open={openSnackbar} close={closeSnackbar} msg={"Profile changed!"} />
        </section>
    )
}

export default UserProfile;