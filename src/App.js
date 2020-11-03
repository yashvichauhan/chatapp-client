import React from "react";
import {Route, Switch,BrowserRouter} from 'react-router-dom';

import Login from "./Components/Login/Login";
import ForgotPassword from "./Components/ForgotPassword/ForgotPassword";
import SignUp from "./Components/Signup/signup";
import Header from "./Layout/Header/header"
import ChatHome from './Components/ChatHome/chathome'

function App() {
    return (
        <div className="App">
          <BrowserRouter>
          <Header/>
          <Switch>
                <Route exact path='/' component={Login}/>
                <Route path={'/signup'} component={SignUp}/>
                <Route path={'/forgotPassword'} component={ForgotPassword}/>
                <Route path={'/chathome'} component={ChatHome}/>
          </Switch>
          </BrowserRouter>
        </div>
    );
}

export default App;
