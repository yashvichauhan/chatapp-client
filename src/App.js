import React from "react";
import {Route, Switch,BrowserRouter} from 'react-router-dom';

import Login from "./Components/Login/Login";
import ForgotPassword from "./Components/ForgotPassword/ForgotPassword";
import SignUp from "./Components/Signup/signup";
import Header from "./Layout/Header/header"
import ResetPassword from "./Components/ForgotPassword/ResetPassword/ResetPassword";

function App() {
    return (
        <div className="App">
          <BrowserRouter>
          <Header/>
          <Switch>
                <Route exact path='/' component={Login}/>
                <Route path={'/signup'} component={SignUp}/>
                <Route path={'/forgotPassword'} exact component={ForgotPassword}/>
                <Route path={'/forgotPassword/:token'} component={ResetPassword} />
          </Switch>
          </BrowserRouter>
        </div>
    );
}

export default App;
