import React from "react";
import {Route, Switch,BrowserRouter} from 'react-router-dom';

import Login from "./Components/Login/Login";
import ForgotPassword from "./Components/ForgotPassword/ForgotPassword";
import SignUp from "./Components/Signup/signup";
import Header from "./Layout/Header/header"

function App() {
    return (
        <div className="App">
          <BrowserRouter>
          <Header/>
          <Switch>
                <Route exact path='/' component={Login}/>
                <Route path={'/signup'} component={SignUp}/>
                <Route path={'/forgotPassword'} component={ForgotPassword}/>
          </Switch>
          </BrowserRouter>
        </div>
    );
}

export default App;
