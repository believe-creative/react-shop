import * as Actions from "../actions";

const intialState = {
  loading: false,
  orders: [],
  address: {}
};

export default (state = intialState, action) => {
  switch (action.type) {
    case Actions.SETADDRESS:
      return {
        ...state,
        isLoading: false,
        address: action.payload
      };
    default:
      return state;
  }
};
