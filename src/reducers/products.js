import * as ActionTypes from "../actions";

const intialState = {
  loading: false,
  products: []
};

export default (state = intialState, action) => {
  switch (action.type) {
    case ActionTypes.PRODUCTS.REQUEST:
      console.log("product request action");
      return {
        ...state,
        isLoading: true
      };
    case ActionTypes.PRODUCTS.SUCCESS:
      console.log("product request success", action);
      return {
        ...state,
        isLoading: false,
        products: action.response
      };
    case ActionTypes.PRODUCTS.FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.errors
      };
    case ActionTypes.CATEGORIES.SUCCESS:
      return {
        ...state,
        categories: action.response
      };
    default:
      return state;
  }
};
