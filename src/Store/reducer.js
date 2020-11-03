import * as reducerType from './reducerType'; 
const initialState={
    currentuser:null,
    authState:false,
    loading:false
}

const reducer=(state=initialState,action)=>{
    switch(action.type){
        case(reducerType.INIT_AUTHSTATE):
            return{
                ...state,
                authState:true
            }
        case(reducerType.AUTH_LOGOUT):
            return{
                ...state,
                authState:false
            }
        default:
            return state
    }
}
export default reducer;