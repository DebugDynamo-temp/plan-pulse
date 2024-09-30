import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import { useState } from 'react';

function Register() {
    const [form, setForm] = useState({
        fname: '',
        lname: '',
        email: '',
        pswd: ''
    })

    function changeField(e){
        setForm(...form, { [e.target.id]: e.target.value });
        console.log(form);
    }

    return ( 
        <form>
            <Paper id="paper">
                <h1>Sign Up:</h1>
                <TextField className='textField' onChange={changeField} id='fname' label='First' variant='outlined' fullWidth />
                <TextField className='textField' onChange={changeField} id='lname' label='Last' variant='outlined' fullWidth />
                <TextField className='textField' onChange={changeField} id='email' label='Email' variant='outlined' fullWidth />
                <TextField className='textField' onChange={changeField} id='pswd' label='Password' type="password" autoComplete='none' variant='outlined' fullWidth />
                <footer>
                    <Button variant='contained'>Register</Button>

                </footer>
            </Paper> 
        </form>
    );
}

export default Register;