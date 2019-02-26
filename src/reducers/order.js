import * as ActionTypes from "../actions";

const intialState = {
  loading: false,
  orders: []
};


export default (state = intialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
