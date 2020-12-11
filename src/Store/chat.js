import * as reducerType from './reducerType'; 

const initialState={
    currentGroup: null,
    currentGroupData:null,
    groups:null,
    showconnection:false,
    conversations:{},
    chatList:null,
    userList:null,
    userGroupList:{},
    currentMsg:null,
}

const reducer=(state=initialState,action)=>{
    switch(action.type) {
        case reducerType.AUTH_START:
            return{
                currentGroup: null,
                currentGroupData:null,
                groups:null,
                showconnection:false,
                conversations:{},
                chatList:null,
                userList:null,
                userGroupList:{},
                currentMsg:null,
            }
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
        case reducerType.REALTIME_GROUP_UPDATE:
            return{
                ...state,
                groups:[...action.grpList]
            }
        case reducerType.AUTH_LOGOUT:
            return {
                ...initialState
            }
        case reducerType.NEWCHAT_ADDED:
            return{
                ...state
            }
        case reducerType.NEWCHAT_ADD_FAIL:
            return{
                ...state
            }
        case reducerType.GET_REALTIME_CONVERSATIONS_SUC:
            return{
                ...state,
                conversations:{
                    ...state.conversations,
                    ...action.convo
                }
            }
        case reducerType.GET_REALTIME_CONVERSATIONS_FAIL:
            return{
                ...state
            }
        case reducerType.GET_REALTIME_CHAT_SUC:
            return{
                ...state,
                chatList:[...action.chatList]
            }
        case reducerType.GET_REALTIME_CHAT_FAIL:
            return{
                ...state
            }
        case reducerType.GET_REALTIME_USER_SUC:
            return{
                ...state,
                userList:[...action.userList]
            }
        case reducerType.GET_REALTIME_USER_FAIL:
            return{
                ...state
            }
        case reducerType.REALTIME_USER_GROUP:
            return{
                ...state,
                userGroupList:{
                 ...state.userGroupList,
                 ...action.userGroup   
                }
            }
        case reducerType.FORWARD_MESSAGE_ADDED:
            return{
                ...state
            }
        case reducerType.FORWARD_MESSAGE_ADD_FAIL:
            return{
                ...state
            }
        case reducerType.CHANGE_CURRENT_MSG:
            return{
                ...state,
                currentMsg:action.currentMsg
            }
        case reducerType.DELETED_MSG:
            return{
                ...state
            }
        case reducerType.GET_CURRENT_GROUPDATA:
            return{
                ...state,
                currentGroupData: action.currentGrpData
            }
        case reducerType.ON_BLOCK_USER:
            return {
                ...state
            }
        case reducerType.ON_UNBLOCK_USER:
            return{
                ...state
            }
        default:
            return state;
    }
}
export default reducer;