import React from "react";
import {Route, Switch, withRouter} from 'react-router-dom';
import { connect } from 'react-redux';

import NotFound from './NotFound';
import Login from "./Components/Login/Login";
import ForgotPassword from "./Components/ForgotPassword/ForgotPassword";
import SignUp from "./Components/Signup/signup";
import ChatHome from './Components/ChatHome/ChatHomePage'
import ResetPassword from "./Components/ForgotPassword/ResetPassword/ResetPassword";

function App(props) {
  console.log("CHAT APP RENDERED.")
    // const { onAuth, history, onLogout } = props;

    // useEffect(() => {
    //     if(localStorage.getItem('token') && localStorage.getItem('currentUser')) {
    //         axios.post('user/autosignin').then(res => {
    //             console.log(res);
    //             onAuth(res.data.jwt, res.data.user);
    //             //history.replace('/chathome');
    //         }).catch(e => {
    //             console.log(e);
    //             localStorage.removeItem('currentUser');
    //             localStorage.removeItem('token');
    //             onLogout();
    //             history.replace('/');
    //         });
    //     }else {
    //         localStorage.removeItem('currentUser');
    //         localStorage.removeItem('token');
    //         onLogout();
    //         console.log(props.location);
    //         if(props.location.pathname !== '/forgotPassword' && !props.location.pathname.startsWith('/forgotPassword') && props.location.pathname !== '/' && props.location.pathname !== '/signup'){
    //             history.replace('/');
    //         }
    //     }
    // }, [ onAuth, history, onLogout ]);

    // const [ token, setToken ] = useState(null);
    // useEffect(() => {
    //     if (localStorage.getItem('token')) {
    //        setToken(localStorage.getItem('token'));
    //     }
    // });

    return (
        <div className={"App"}>
            <Switch>
                <Route exact path='/' component={Login}/>
                <Route path={'/signup'} component={SignUp}/>
                { props.authState ? <Route path={'/chathome'} component={ChatHome}/> : null }
                <Route path={'/forgotPassword'} exact component={ForgotPassword}/>
                <Route path={'/forgotPassword/:token'} component={ResetPassword} />
                <Route component={NotFound} />
            </Switch>
        </div>
    );
}

const mapStateToProps = state => {
  return {
    authState: state.user.authState
  };
};

export default connect(mapStateToProps)(withRouter(App));
