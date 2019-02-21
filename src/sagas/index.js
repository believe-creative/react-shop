import { takeLatest, put, call, fork, select, all } from "redux-saga/effects";
import { api } from "../services";
import * as actions from "../actions";
import { getProduct, getProducts } from "../reducers/selectors";

const { product, products } = actions;

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

function* loadProducts(action) {
  console.log("load products", action.category);

  yield call(fetchProducts, action.category);
}

//+++++++++++++++++//

function* watchLoadProducts() {
  yield takeLatest(actions.PRODUCTS.REQUEST, loadProducts);
}

export default function*() {
  yield fork(watchLoadProducts);
}
