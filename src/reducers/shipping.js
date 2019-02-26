import * as ActionTypes from "../actions";

const intialState = {
  loading: false,
  shipping: []
};


export default (state = intialState, action) => {
    console.log(action,"state hhhhh");
  switch (action.type) {
    case ActionTypes.GETSHIPPINGREGIONS.SUCCESS:
    return {
      ...state,
      isLoading: false,
      regions: action.response
    };
    default:
      return state;
  }
};