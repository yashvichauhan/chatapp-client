import React from "react";
import {Link} from 'react-router-dom';

function header(){
    return(
        <div>
            <ul>
            <li>
                <Link to="/">Login </Link>
            </li>
            <li>
                <Link to="/signup">Sign Up</Link>
            </li>
            <li>
                <Link to="/forgotPassword">Forgot Password</Link>
            </li>
        </ul>
        </div>
    )
}
export default header;