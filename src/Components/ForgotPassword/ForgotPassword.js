import React, {useState} from 'react';
import axios from 'axios';

import {LockOutlined} from "@material-ui/icons";
import {Button, Card, TextField, Typography} from '@material-ui/core';

import cssClasses from './ForgotPassword.module.css'
import useStyles from './useStyles'
import AlertBox from "../../Layout/AlertBox/AlertBox";

function ForgotPassword() {
    const classes = useStyles();
    const [email, setEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const onSubmitHandler = (e) => {
        e.preventDefault();
        if (!email) {
            return setErrorMessage('Oopsie, Email is Required! ')
        }
        let regex = /^[A-Za-z0-9.]+@[A-Za-z0-9.]+\.[A-Za-z0-9]+$/;
        if (!regex.test(email)) {
            return setErrorMessage('Incorrect Email Address')
        }
        axios.post('http://localhost:4004/reset-password', {
            email
        }).then(res => {
            console.log(res);
            setSuccessMessage('We have sent you a link to reset your password.')
            setErrorMessage('');
            setEmail('');
        }).catch(err => {
            console.log(err);
            if(err.response.data.error.msg) {
                setErrorMessage(err.response.data.error.msg);
            }
        });
    }
    return (
        <div className={cssClasses.box}>
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
                {successMessage && <AlertBox type={"success"} message={successMessage}/> }
                {errorMessage ? <AlertBox type={"error"} message={errorMessage}/> : ''}
            </div>
        </div>
    );
}

export default ForgotPassword