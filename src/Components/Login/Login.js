import React, {useState} from 'react';
import {Link} from 'react-router-dom'
import {Button, Container, CssBaseline, Grid, TextField, Typography} from '@material-ui/core';

import useStyles from "./useStyles"
import AlertBox from "../../Layout/AlertBox/AlertBox";

function Login() {
    const classes = useStyles();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    const onSubmitHandler = (e) => {
        e.preventDefault();
        if (!email || !password) {
            return setErrorMessage('All Fields are Required! ')
        }
        let regex = /^[A-Za-z0-9.]+@[A-Za-z0-9.]+\.[A-Za-z0-9]+$/;
        if (!regex.test(email)) {
            return setErrorMessage('Incorrect Email Address')
        }
        setErrorMessage('')
        setEmail('');
        setPassword('')
        //props.history.replace('/landing')
    }
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>

            <div className={classes.paper}>
                <Typography component="h1" variant="h3" color={"primary"}>
                    Login
                </Typography>
                <form onSubmit={onSubmitHandler} className={classes.form} noValidate>
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
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        label="Password*"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >Login
                    </Button>

                    <Grid container>
                        <Grid item xs>
                            <Link to="/forgotPassword">
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link to="/signup">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <br/><br/>
            {errorMessage ? <AlertBox type={"error"} message={errorMessage}/> : ''}
        </Container>

    );
}

export default Login;