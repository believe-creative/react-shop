import { combineReducers } from "redux-immutable";
import { fromJS } from "immutable";
import { LOCATION_CHANGE } from "react-router-redux";
import { connectRouter } from "connected-react-router";

export default function createReducers(history) {
  return combineReducers({ router: connectRouter(history) });
}
