import * as reducerType from './reducerType'; 

const initialState={
    currentGroup: null,
}

const reducer=(state=initialState,action)=>{
    switch(action.type) {
        case reducerType.CNG_CURRENT_GROUP:
            return{
                ...state,
                currentGroup:action.groupData
            }
        default:
            return state;
    }
}
export default reducer;