import * as reducerType from '../../Store/reducerType'

const logoutHandler=()=>{
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    dispatchEvent({type: reducerType.AUTH_LOGOUT})
}
export default logoutHandler;
