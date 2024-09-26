import * as Actions from "../actions";

const initialState = {
  isLoading: false,
  showSubCategory: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case Actions.SETSUBCATEGORY:
      return {
        ...state,
        isLoading: true,
        showSubCategory: action.payload
      };
    default:
      return state;
  }
}
