import { AccordionActions } from '@material-ui/core';
import * as reducerType from './reducerType'; 

const initialState={
    currentGroup: null,
    groups:null,
    showconnection:false,
    conversations:[]
}

const reducer=(state=initialState,action)=>{
    switch(action.type) {
        case reducerType.CNG_CURRENT_GROUP:
            return{
                ...state,
                currentGroup:action.groupData
            }
        case reducerType.ON_CREATE_CONNECTION:
            return{
                ...state,     
            }
        case reducerType.TOGGLE_CONNECTION:
            return{
                ...state,
                showconnection: !state.showconnection
            }
        case reducerType.GROUP_UPDATE:
            return{
                ...state,
                groups:[...action.totalgroups]
            }
        case reducerType.CHAT_CONNECTION:
            return{
                ...state,
                connectionUsers:[...state.connectionUsers,...action.users]
            }
        case reducerType.AUTH_LOGOUT:
            return {
                ...initialState
            }
        case reducerType.NEWCHAT_ADDED:
            return{
                ...state
            }
        case reducerType.GET_REALTIME_CONVERSATIONS_SUC:
            return{
                ...state,
                conversations: [...action.convo]
            }
        case reducerType.GET_REALTIME_CONVERSATIONS_SUC:
            return{
                ...state
            }
        default:
            return state;
    }
}
export default reducer;