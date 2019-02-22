import { takeLatest, put, call, fork, select, all } from "redux-saga/effects";
import { api } from "../services";
import * as actions from "../actions";
import { getProduct, getProducts } from "../reducers/selectors";

const { product, products, checkUserLogin } = actions;

//reusable fetch subroutine.
function* fetchEntity(entity, apiFn, id, url) {
  const { response, error } = yield call(apiFn, url || id);
  if (response) {
    yield put(entity.success(id, response));
  } else {
    yield put(entity.failure(id, error));
  }
}

export const fetchProduct = fetchEntity.bind(null, product, api.getProduct);
export const fetchProducts = fetchEntity.bind(null, products, api.getProducts);
export const checkUser = fetchEntity.bind(null,checkUserLogin,api.checkUser)

function* loadProducts(action) {
  console.log("load products", action.category);

  yield call(fetchProducts, action.category);
}

function* loadUser(action){
  console.log("check user login")
  yield call(checkUser,action.token);
}

//+++++++++++++++++//

function* watchLoadProducts() {
  yield takeLatest(actions.PRODUCTS.REQUEST, loadProducts);
}

function* watchLoadUser(){
  yield takeLatest(actions.CHECKUSERLOGIN.REQUEST,loadUser);
}

export default function*() {
  yield fork(watchLoadProducts);
  yield fork(watchLoadUser);
}
