import { combineReducers } from "redux-immutable";
// import { fromJS } from "immutable";
// import { LOCATION_CHANGE } from "react-router-redux";

import productReducer from "./products";
import userReducer from "./user";
import orderReducer from "./order";
import shippingReducer from "./shipping";
import SubCategoryReducer from "./nav";

export default function createReducers(history) {
  return combineReducers({
    products: productReducer,
    user: userReducer,
    shipping: shippingReducer,
    showSubCategory: SubCategoryReducer,
    order: orderReducer
  });
}
