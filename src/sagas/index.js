import { takeLatest, put, call, fork, select, all } from "redux-saga/effects";
import { api } from "../services";
import * as actions from "../actions";
import { getProduct, getProducts } from "../reducers/selectors";

const {
  product,
  products,
  checkUserLogin,
  getCategories,
  getSubCategories,
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
  yield takeLatest(actions.CATEGORYPRODUCTS.REQUEST, loadCategoryProducts);
}

export default function*() {
  yield fork(watchLoadProducts);
  yield fork(watchLoadUser);
  yield fork(watchLoadCategories);
  yield fork(watchLoadSubCategories);
  yield fork(watchLoadCategoryProducts);
}
