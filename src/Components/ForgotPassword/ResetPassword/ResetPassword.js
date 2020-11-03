import React, { useState } from 'react'
import {Link as RLink, useParams} from 'react-router-dom';

import AlertBox from "../../../Layout/AlertBox/AlertBox";
import useStyles from "./useStyles";
import {Button, Container, CssBaseline, Grid, TextField, Typography, Link} from '@material-ui/core';
import axios from 'axios';

const ResetPassword = (props) => {
  const classes = useStyles();

  const { token } = useParams();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return setErrorMessage('Password did not match.');
    }
    axios.post(`http://localhost:4004/reset-password/${token}`, {
      password
    }).then(res => {
      setErrorMessage('');
      props.history.replace('/');
    }).catch(err => {
      console.log(err);
      if (err.response.data.error.msg) {
        setErrorMessage(err.response.data.error.msg);
      }
    })
  };

  return (
    <Container component="main" maxWidth="xs">
            <CssBaseline/>

            <div className={classes.paper}>
                <Typography component="h1" variant="h3" color={"primary"}>
                    Reset Password
                </Typography>
                <form onSubmit={onSubmitHandler} className={classes.form} noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        label="Password*"
                        type="password"
                        autoFocus
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        label="Confirm Password*"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >Submit
                    </Button>

                    <Grid container>
                        <Grid item xs>
                            <Link to="/" component={RLink}>
                                Continue to signin
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <br/><br/>
            {errorMessage ? <AlertBox type={"error"} message={errorMessage}/> : ''}
        </Container>
  );
};

export default ResetPassword;