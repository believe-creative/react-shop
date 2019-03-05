import { takeLatest, takeEvery, put, call, fork } from "redux-saga/effects";
import { api } from "../services";
import * as actions from "../actions";

const {
  product,
  products,
  checkUserLogin,
  getCategories,
  getSubCategories,
  AddToCart,
  getCartProducts,
  getShippingOptions,
  getShippingRegions,
  getCategoryProducts,
  getSubCategoryProducts,
  removeFromCart,
  getCustomerInfo,
  updateProductQuantity,
  getSearchItems,
  getProductRecommendations,
  productLocations
} = actions;

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
export const getRegionShippingOption = fetchEntity.bind(
  null,
  getShippingOptions,
  api.getShippingOptions
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
export const fetchSubCategoryProducts = fetchEntity.bind(
  null,
  getSubCategoryProducts,
  api.getSubCategoryProducts
);
export const fetchSearchItems = fetchEntity.bind(
  null,
  getSearchItems,
  api.getSearchItems
);

export const updateQuantity = fetchEntity.bind(
  null,
  updateProductQuantity,
  api.updateProductQuantity
);

export const removeProduct = fetchEntity.bind(
  null,
  removeFromCart,
  api.removeFromCart
);

export const getCustomer = fetchEntity.bind(
  null,
  getCustomerInfo,
  api.getCustomerInfo
);

export const fetchProductRecommendations = fetchEntity.bind(
  null,
  getProductRecommendations,
  api.getProductRecommendations
);
export const fetchProductLocations = fetchEntity.bind(
  null,
  productLocations,
  api.getProductLocations
);

function* loadUpadtedCart(action) {
  yield call(addProductToCart, action.data);
}

function* loadremoveProduct(action) {
  yield call(removeProduct, action.inItemId);
}

function* loadgetCustomerInfo(action) {
  yield call(getCustomer, action.inEmail);
}

function* loadProductsfromCart(action) {
  yield call(getProductsfromCart, action.inCartId);
}

function* loadupdateQuantity(action) {
  yield call(updateQuantity, action.data);
}

function* loadgetAllShippingRegions(action) {
  yield call(getAllShippingRegions);
}

function* loadgetRegionShippingOption(action) {
  yield call(getRegionShippingOption, action.inShippingRegionId);
}

function* loadProducts(action) {
  yield call(fetchProducts, action.category);
}

function* loadProduct(action) {
  yield call(fetchProduct, action.productId);
}

function* loadUser(action) {
  yield call(checkUser, action.token);
}

function* loadCategories(action) {
  yield call(fetchCategories);
}

function* loadSubCategories(action) {
  yield call(fetchSubCategories, action.departmentId);
}

function* loadCategoryProducts(action) {
  yield call(fetchCategoryProducts, action.data);
}
function* loadSubCategoryProducts(action) {
  yield call(fetchSubCategoryProducts, action.data);
}
function* loadSearchItems(action) {
  yield call(fetchSearchItems, action.data);
}

function* loadProductRecommendations(action) {
  yield call(fetchProductRecommendations, action.data);
}

function* loadProductLocations(action) {
  yield call(fetchProductLocations, action.productId);
}

//+++++++++++++++++//

function* watchLoadProducts() {
  yield takeLatest(actions.PRODUCTS.REQUEST, loadProducts);
}

function* watchLoadProduct() {
  yield takeLatest(actions.PRODUCT.REQUEST, loadProduct);
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
function* watchLoadSubCategoryProducts() {
  yield takeEvery(actions.SUBCATEGORYPRODUCTS.REQUEST, loadSubCategoryProducts);
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

function* watchloadgetRegionShippingOption() {
  yield takeLatest(
    actions.GETSHIPPINGOPTIONS.REQUEST,
    loadgetRegionShippingOption
  );
}

function* watchloadSearchItems() {
  yield takeLatest(actions.SEARCH.REQUEST, loadSearchItems);
}

function* watchloadremoveProduct() {
  yield takeLatest(actions.REMOVEFROMCART.REQUEST, loadremoveProduct);
}

function* watchloadupdateQuantity() {
  yield takeLatest(actions.UPDATEQUANTITY.REQUEST, loadupdateQuantity);
}

function* watchloadgetCustomerInfo() {
  yield takeLatest(actions.CUSTOMERINFO.REQUEST, loadgetCustomerInfo);
}
function* watchloadProductRecommendations() {
  yield takeLatest(
    actions.PRODUCTRECOMMENDATIONS.REQUEST,
    loadProductRecommendations
  );
}

function* watchloadProductLocations() {
  yield takeLatest(actions.PRODUCTLOCATIONS.REQUEST, loadProductLocations);
}

export default function*() {
  yield fork(watchLoadProducts);
  yield fork(watchLoadProduct);
  yield fork(watchLoadUser);
  yield fork(watchLoadCategories);
  yield fork(watchLoadSubCategories);
  yield fork(watchLoadCategoryProducts);
  yield fork(watchLoadSubCategoryProducts);
  yield fork(watchloadUpadtedCart);
  yield fork(watchloadProductsfromCart);
  yield fork(watchloadgetAllShippingRegions);
  yield fork(watchloadgetRegionShippingOption);
  yield fork(watchloadSearchItems);
  yield fork(watchloadremoveProduct);
  yield fork(watchloadupdateQuantity);
  yield fork(watchloadgetCustomerInfo);
  yield fork(watchloadProductRecommendations);
  yield fork(watchloadProductLocations);
}
