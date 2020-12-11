import * as reducerType from './reducerType'; 

const initialState={
    currentUser: null,
    token: null,
    authState:false,
    loading:false,
    error:null
}

const reducer=(state=initialState,action)=>{
    switch(action.type) {
        case reducerType.AUTH_START:
            return{
                currentUser: null,
                token: null,
                authState:false,
                loading:false,
                error:null
            }
        case reducerType.INIT_AUTHSTATE:
            return{
                ...state,
                authState:true,
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
                currentUser:{
                    ...state.currentUser,
                    name:action.user.name,
                    avatar:action.user.avatar,
                    email:action.user.email,
                    aboutme:action.user.aboutme
                }
            }
        case (reducerType.AUTH_SUCCESS):
            return{
                ...state,
                currentUser:action.userData,
                error:null
            }
        case (reducerType.AUTH_FAIL):
            return{
                ...state,
                error:action.errorMsg
        }
        case (reducerType.LOGOUT_FAIL):
            return{
                ...state,
                error:action.error
            }
        default:
            return state;
    }
}
export default reducer;