import * as reducerType from './reducerType'; 

const initialState={
    currentUser: null,
    token: null,
    authState:false,
    loading:false,
}

const reducer=(state=initialState,action)=>{
    switch(action.type) {
        case reducerType.INIT_AUTHSTATE:
            return{
                ...state,
                authState:true,
                token: action.token,
                currentUser: action.user
            }
        case reducerType.AUTH_LOGOUT:
            return{
                ...state,
                authState:false,
                token: null,
                currentUser: null
            }
        case reducerType.ON_EDIT_USER:
            return {
                ...state,
                currentUser: {
                    ...action.user
                }
            }
        default:
            return state;
    }
}
export default reducer;