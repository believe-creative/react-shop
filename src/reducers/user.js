import * as Actions from "../actions";

const initialState={
    isLoading:false,
    user:{}
}

export default function(state=initialState,action){
    console.log(action  );
    switch(action.type){
        case Actions.CHECKUSERLOGIN.REQUEST:
            return{
                ...state,
                isLoading:true
            }
        case Actions.CHECKUSERLOGIN.SUCCESS:
            return{
                ...state,
                isLoading:false,
                ...action.response.user
            }
        case Actions.CHECKUSERLOGIN.FAILURE:
            return{
                ...state,
                isLoading:false,
                error:action.error
            }
        case Actions.SETUSER:
            return{
                ...state,
                isLoading:false,
                ...action.payload
            }
        default:
            return state;
    }
}