import React,{useState} from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import {Alert} from "@material-ui/lab";

import useStyles from './useStyles'

function Signup(props){
    const [fname,setFname] = useState('')
    const [lname,setLname] = useState('')
    const [password,setPassword]=useState('')
    const [email,setEmail]= useState('')
    const [errorMessage, setErrorMessage] = useState([])

    const classes = useStyles();
    const requireValidation=(val,field)=>{
        if(val.trim()===''){
            if(!errorMessage.find((e)=>e.id==="require")){
                return setErrorMessage([...errorMessage,{
                    id:"require"+field,
                    value:"Please fill the "+field+" input"
                }])
            }
        }else{
            return setErrorMessage(errorMessage.filter((e)=>(e.id !== "require"+field)))
        }
    }
    const validateInp=(e)=>{
        const val=e.target.value
        console.log(e.target)
        let regex = /^[A-Za-z0-9.]+@[A-Za-z0-9.]+\.[A-Za-z0-9]+$/;
        if(e.target.id==="email"){
            if (!regex.test(val)) {
                if(!errorMessage.find((e)=>e.id==="email")){
                    return setErrorMessage([...errorMessage,{
                        id:"email",
                        value:"Enter a valid email address"
                    }])
                }
            }else{
                setEmail(val)
                return setErrorMessage(errorMessage.filter((e)=>(e.id !== "email")))
            }
            requireValidation(val,e.target.id)
            console.log(e.target.id)
        }
        if(e.target.id==="lastName"){
            requireValidation(val,e.target.name)
            setLname(val)
        }
        if(e.target.id==="password"){
            requireValidation(val,e.target.name)
            setPassword(val)
        }
        if(e.target.id==="firstName"){
            requireValidation(val,e.target.name)
            setFname(val)
        }
    }
    const onSubmitHandler=(e)=>{
        e.preventDefault();
        //database
    }
    let errorBox=errorMessage.map(error=>{
        return (
            <Alert severity="error" variant={"outlined"}>
                <strong> {error.value} </strong>
            </Alert>
        )
    })
    return (
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Typography component="h1" variant="h4">
              Sign up
            </Typography>
            <form className={classes.form} noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="fname"
                    name="First Name"
                    variant="outlined"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    onChange={(e) => validateInp(e)}
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="Last Name"
                    autoComplete="lname"
                    onChange={(e) => validateInp(e)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="Email Address"
                    autoComplete="email"
                    onChange={(e) => validateInp(e)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="Password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    onChange={(e) => validateInp(e)}
                  />
                </Grid>
                { errorMessage? <div className={classes.alertBox}>{errorBox}</div>: ''} 
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={onSubmitHandler}
              >Sign Up </Button>
              <Grid container justify="flex-end">
                <Grid item>
                  <Link href="/" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
        </Container>
      );
}

export default Signup;