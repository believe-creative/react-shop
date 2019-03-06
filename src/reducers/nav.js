import * as Actions from "../actions";

const initialState = {
  isLoading: false,
  showSubCategory: false
};

export default function(state = initialState, action) {
  console.log("action", action);
  switch (action.type) {
    case Actions.SETSUBCATEGORY:
      console.log("action.payload", action.payload);
      return {
        ...state,
        isLoading: true,
        showSubCategory: action.payload
      };
    default:
      return state;
  }
}
