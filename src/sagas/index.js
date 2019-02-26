import {
  takeLatest,
  takeEvery,
  put,
  call,
  fork,
  select,
  all
} from "redux-saga/effects";
import { api } from "../services";
import * as actions from "../actions";
import { getProduct, getProducts } from "../reducers/selectors";

const {
  product,
  products,
  checkUserLogin,
  getCategories,
  getSubCategories,
  AddToCart,
  getCartProducts,
  getShippingRegions,
  getCategoryProducts
} = actions;

//reusable fetch subroutine.
function* fetchEntity(entity, apiFn, id, url) {
  console.log(id);
  const { response, error } = yield call(apiFn, url || id);
  if (response) {
    yield put(entity.success(id, response));
  } else {
    yield put(entity.failure(id, error));
  }
}

export const fetchProduct = fetchEntity.bind(null, product, api.getProduct);
export const fetchProducts = fetchEntity.bind(null, products, api.getProducts);
export const checkUser = fetchEntity.bind(null, checkUserLogin, api.checkUser);
export const addProductToCart = fetchEntity.bind(
  null,
  AddToCart,
  api.AddToCart
);
export const getProductsfromCart = fetchEntity.bind(
  null,
  getCartProducts,
  api.getCartProducts
);
export const getAllShippingRegions = fetchEntity.bind(
  null,
  getShippingRegions,
  api.getShippingRegions
);
export const fetchCategories = fetchEntity.bind(
  null,
  getCategories,
  api.getDepartments
);
export const fetchSubCategories = fetchEntity.bind(
  null,
  getSubCategories,
  api.getSubCategories
);
export const fetchCategoryProducts = fetchEntity.bind(
  null,
  getCategoryProducts,
  api.getCategoryProducts
);

function* loadUpadtedCart(action) {
  yield call(addProductToCart, action.data);
}

function* loadProductsfromCart(action) {
  yield call(getProductsfromCart, action.inCartId);
}

function* loadgetAllShippingRegions(action) {
  yield call(getAllShippingRegions);
}

function* loadProducts(action) {
  console.log("load products", action.category);

  yield call(fetchProducts, action.category);
}

function* loadUser(action) {
  console.log("check user login");
  yield call(checkUser, action.token);
}

function* loadCategories(action) {
  console.log("loading categories");
  yield call(fetchCategories);
}

function* loadSubCategories(action) {
  yield call(fetchSubCategories, action.departmentId);
}

function* loadCategoryProducts(action) {
  yield call(fetchCategoryProducts, action.data);
}

//+++++++++++++++++//

function* watchLoadProducts() {
  yield takeLatest(actions.PRODUCTS.REQUEST, loadProducts);
}

function* watchLoadUser() {
  yield takeLatest(actions.CHECKUSERLOGIN.REQUEST, loadUser);
}

function* watchLoadCategories() {
  yield takeLatest(actions.CATEGORIES.REQUEST, loadCategories);
}

function* watchLoadSubCategories() {
  yield takeLatest(actions.SUBCATEGORIES.REQUEST, loadSubCategories);
}

function* watchLoadCategoryProducts() {
  yield takeEvery(actions.CATEGORYPRODUCTS.REQUEST, loadCategoryProducts);
}

function* watchloadUpadtedCart() {
  yield takeLatest(actions.ADDPRODUCTTOCART.REQUEST, loadUpadtedCart);
}
function* watchloadProductsfromCart() {
  yield takeLatest(actions.GETCARTPRODUCTS.REQUEST, loadProductsfromCart);
}

function* watchloadgetAllShippingRegions() {
  yield takeLatest(
    actions.GETSHIPPINGREGIONS.REQUEST,
    loadgetAllShippingRegions
  );
}

export default function*() {
  yield fork(watchLoadProducts);
  yield fork(watchLoadUser);
  yield fork(watchLoadCategories);
  yield fork(watchLoadSubCategories);
  yield fork(watchLoadCategoryProducts);
  yield fork(watchloadUpadtedCart);
  yield fork(watchloadProductsfromCart);
  yield fork(watchloadgetAllShippingRegions);
}
