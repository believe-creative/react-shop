import * as Actions from "../actions";

const initialState = {
  isLoading: false,
  user: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case Actions.CHECKUSERLOGIN.REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case Actions.CHECKUSERLOGIN.SUCCESS:
      return {
        ...state,
        isLoading: false,
        ...action.response.user
      };
    case Actions.CHECKUSERLOGIN.FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error
      };
    case Actions.SETUSER:
      return {
        ...state,
        isLoading: false,
        ...action.payload
      };
    case Actions.SETTOKEN:
      return {
        ...state,
        isLoading: false,
        token:action.payload
      };
    case Actions.GETTOKEN.SUCCESS:
      console.log(action.response);
      return {
        ...state,
        isLoading: false,
        token:action.response.token
      };
    case Actions.CUSTOMERINFO.SUCCESS:
      return {
        ...state,
        isLoading: false,
        customer:action.response[0]
      };
    default:
      return state;
  }
}
