import * as Actions from "../actions";

const intialState = {
  loading: false,
  orders: [],
  address: {}
};

export default (state = intialState, action) => {
  console.log(action);
  switch (action.type) {
    case Actions.SETADDRESS:
      console.log("action.payload order", action.payload);
      return {
        ...state,
        isLoading: false,
        address: action.payload
      };
    default:
      return state;
  }
};
