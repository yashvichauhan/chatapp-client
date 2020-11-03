import React, {useState} from 'react';
import Link from '@material-ui/core/Link';
import {Link as RLink} from 'react-router-dom'
import {Button, Container, CssBaseline, Grid, TextField, Typography} from '@material-ui/core';
import axios from 'axios';
import {connect} from 'react-redux';

import useStyles from "./useStyles";
import AlertBox from "../../Layout/AlertBox/AlertBox";
import config from '../../db/config'
import * as reducerType from '../../Store/reducerType'

function Login(props) {
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
        const loginData=JSON.stringify({
            email:email,
            password:password
        })
        axios.post(config.baseurl+"user/signin",loginData,config)
        .then((res)=>{
            setErrorMessage('')
            localStorage.setItem('currentUser',res.data.user)
            localStorage.setItem('token', res.data.jwt)
            props.onAuth()
            props.history.replace('/chathome')
        })
        .catch((err)=>{
            if(err.response.data.error.msg) {
                setErrorMessage((err.response.data.error.msg)?err.response.data.error.msg : "Some error occurred.");
            }
        })
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
                     {errorMessage ? <AlertBox type={"error"} message={errorMessage}/> : ''}
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
                            <Link to="/signup" component={RLink} variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <br/><br/>
        </Container>
    );
}
const mapStateToProps=(state)=>{
    return{
        authState: state.authState,
    }
}

const mapDispatchToProps=(dispatch)=>{
    return{
        onAuth : ()=>dispatch({type: reducerType.INIT_AUTHSTATE}),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Login);