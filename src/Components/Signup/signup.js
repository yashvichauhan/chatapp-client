import React,{useState} from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import {Alert} from "@material-ui/lab";
import axios from 'axios'
import {Link as RLink} from 'react-router-dom';
import {connect} from 'react-redux';

import config from '../../db/config'
import useStyles from './useStyles'
import * as reducerType from '../../Store/reducerType'

function Signup(props){
    const [fname,setFname] = useState('')
    const [lname,setLname] = useState('')
    const [password,setPassword]=useState('')
    const [email,setEmail]= useState('')
    const [errorMessage, setErrorMessage] = useState([])

    const classes = useStyles();
    const requireValidation=()=>{
        if(!email || !fname || !lname || !password){
            if(!errorMessage.find((e)=>e.id==="require")){
              console.log("Adding the required error message..")
                setErrorMessage([...errorMessage,{
                    id:"require",
                    value:"Please all fill the required fields"
                }])
                return false
            }
        }
        if(errorMessage.find((e)=>e.id==="require")){
          setErrorMessage(errorMessage.filter((e)=>(e.id !== "require")))
        }
        return true
    }
    const validateInp=(e)=>{
        const val=e.target.value
        let regex = /^[A-Za-z0-9.]+@[A-Za-z0-9.]+\.[A-Za-z0-9]+$/;
        if(e.target.id==="email"){
            if (!regex.test(val)) {
                if(!errorMessage.find((e)=>e.id==="email")){
                    return setErrorMessage([...errorMessage,{
                        id:"email",
                        value:"Enter a valid email address"
                    }])
                }
                setEmail('')
            }else{
                setEmail(val)
                return setErrorMessage(errorMessage.filter((e)=>(e.id !== "email")))
            }
            console.log(e.target.id)
        }
        if(e.target.id==="lastName"){
            setLname(val)
        }
        if(e.target.id==="password"){
            setPassword(val)
        }
        if(e.target.id==="firstName"){
            setFname(val)
        }
    }
    const onSubmitHandler=(e)=>{
        e.preventDefault();
        console.log(errorMessage)
        if(!requireValidation()){
          return
        }
        const signupData= JSON.stringify({
          name:fname,
          email:email,
          password:password,
        });
        axios.post(config.baseurl+"user/signup",signupData,config)
        .then((res)=>{
          props.onAuth()
          localStorage.setItem('currentUser',JSON.stringify(res.data.user))
          //localStorage.setItem('token', res.data.jwt)
          if(errorMessage.find((e)=>e.id==="server")){
            setErrorMessage(errorMessage.filter((e)=>(e.id !== "server")))
          }
          props.history.replace('/chathome')
        })
        .catch((err)=>{
          if(!errorMessage.find((e)=>e.id==="server")){
            setErrorMessage([...errorMessage,{
                id:"server",
                value:(err.response.data.error.msg)?err.response.data.error.msg : "Some error occurred."
            }])
          }
          console.log(err)
        })
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
            <Typography component="h1" variant="h3" color={"primary"}>
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
                  <Link to="/" component={RLink} variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
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
      onAuth : ()=>dispatch({type: reducerType.AUTH_LOGOUT}),
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Signup);