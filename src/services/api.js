import { API_ROOT } from "./constants";

function callAPI(endpoint, headers, body, schema) {
  const fullURL =
    endpoint.indexOf(API_ROOT) === -1 ? API_ROOT + endpoint : endpoint;
  return fetch(fullURL, { headers, body, method: body ? "POST" : "GET" }).then(
    response =>
      response
        .json()
        .then(json => ({ json, response }))
        .then(({ json, response }) => {
          if (!response.ok) {
            return Promise.reject(json);
          }
          return json;
        })
        .then(
          response => ({ response }),
          error => ({ error: error.message || "Somehing gone wrong" })
        )
  );
}

function getParams(data) {
  return Object.keys(data)
    .map(key => {
      return encodeURIComponent(key) + "=" + encodeURIComponent(data[key]);
    })
    .join("&");
}

export const getProducts = category => callAPI(`products/`);
export const getProduct = productId => callAPI(`product/${productId}`);
export const AddToCart = data =>
  callAPI(
    `add-product-to-cart/`,
    {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json; charset=utf-8"
    },
    getParams({
      inCartId: data.inCartId,
      inProductId: data.inProductId,
      inAttributes: data.inAttributes
    })
  );

  export const removeFromCart = inItemId =>
  callAPI(
    `remove-product-from-cart/`,
    {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json; charset=utf-8"
    },
    getParams({
      inItemId: inItemId
    })
  );

  export const updateProductQuantity = data =>
  callAPI(
    `cart-update/`,
    {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json; charset=utf-8"
    },
    getParams({
      inItemId: data.inItemId,
      inQuantity:data.inQuantity
    })
  );

  export const getCustomerInfo = inEmail =>
  callAPI(
    `get-customer/`,
    {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json; charset=utf-8"
    },
    getParams({
      inEmail: inEmail
    })
  );

export const getCartProducts = inCartId =>
  callAPI(
    `get-shopping-cart-products/`,
    {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json; charset=utf-8"
    },
    getParams({ inCartId: inCartId })
  );

export const getShippingRegions = () =>
  callAPI(`get-customer-shipping-regions/`);

export const checkUser = token =>
  callAPI(`checkuser/`, { Authorization: `Bearer ${token}` });
export const getDepartments = () => callAPI("get-departments/");
export const getSubCategories = departmentId =>
  callAPI(
    "get-department-categories/",
    {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json; charset=utf-8"
    },
    getParams({ inDepartmentId: departmentId })
  );

export const getShippingOptions = inShippingRegionId =>
  callAPI(
    "get-order-shipping-info/",
    {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json; charset=utf-8"
    },
    getParams({ inShippingRegionId: inShippingRegionId })
  );
export const getCategoryProducts = data =>
  callAPI(
    "get-department-products/",
    { "Content-Type": "application/x-www-form-urlencoded" },
    getParams({
      inDepartmentId: data.departmentId,
      inShortProductDescriptionLength: data.descriptionLength,
      inProductsPerPage: 10,
      inStartItem: 0
    })
  );
export const getSearchItems = searchTerm =>
  callAPI(
    `search/`,
    {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json; charset=utf-8"
    },
    getParams({
      inSearchString: searchTerm,
      inAllWords: "on",
      inShortProductDescriptionLength: "100",
      inProductsPerPage: "15",
      inStartItem: "1"
    })
  );
