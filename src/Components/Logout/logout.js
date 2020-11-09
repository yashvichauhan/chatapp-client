import React, { Component } from 'react'
import {connect } from 'react-redux';
import {Link} from 'react-router-dom'

import * as reducerType from '../../Store/reducerType'

class logout extends Component {
    logoutHandler=()=>{
        localStorage.removeItem('token');
        localStorage.removeItem('currentUser');
        this.props.onLogout();
    }
    render() {
        return (
            <>
                <button onClick={this.logoutHandler}>
                    <Link to="/">Logout</Link>
                </button>
            </>
        )
    }
}

const mapDispatchToProps=(dispatch)=>{
    return{
        onLogout : ()=>dispatch({type: reducerType.AUTH_LOGOUT}),
    }
}

export default connect(null,mapDispatchToProps)(logout);
