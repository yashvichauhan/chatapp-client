import React, {useState} from 'react';
import {LockOutlined} from "@material-ui/icons";
import {Button, Card, TextField, Typography} from '@material-ui/core';

import './ForgotPassword.css'
import useStyles from './useStyles'
import AlertBox from "../../Layout/AlertBox/AlertBox";


function ForgotPassword() {
    const classes = useStyles();
    const [email, setEmail] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    const onSubmitHandler = (e) => {
        e.preventDefault();
        if (!email) {
            return setErrorMessage('Oopsie, Email is Required! ')
        }
        let regex = /^[A-Za-z0-9.]+@[A-Za-z0-9.]+\.[A-Za-z0-9]+$/;
        if (!regex.test(email)) {
            return setErrorMessage('Incorrect Email Address')
        }
        setErrorMessage('')
        setEmail('');
    }

    return (
        <div className={"box"}>
            <Card className={classes.root}>
                <form onSubmit={onSubmitHandler} className={classes.form} noValidate>
                    <LockOutlined style={{fontSize: 150}}/>
                    <Typography gutterBottom variant="h5" component="h2">
                        Forgot your Password ?
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        Don't worry ! Just fill in your email and
                        we'll send you a link to Reset your Password
                    </Typography>


                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        label="Email Address*"
                        autoComplete="email"
                        autoFocus
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >Reset Password
                    </Button>
                </form>
            </Card>


            <div className={classes.error}>
                {errorMessage ? <AlertBox type={"error"} message={errorMessage}/> : ''}
            </div>


        </div>
    );
}

export default ForgotPassword