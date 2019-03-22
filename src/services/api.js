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

export const getProducts = function(data) {
  return callAPI(
    `products/`,
    { Authorization: `Bearer ${data.token}` },
    getParams({ category: data.category })
  );
};

export const getProduct = function(data) {
  return callAPI(
    `product/`,
    {
      Authorization: `Bearer ${data.token}`,
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json; charset=utf-8"
    },
    getParams({ inProductId: data.inProductId })
  );
};

export const AddToCart = function(data) {
  return callAPI(
    `add-product-to-cart/`,
    {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json; charset=utf-8",
      Authorization: `Bearer ${data.token}`
    },
    getParams({
      inCartId: data.inCartId,
      inProductId: data.inProductId,
      inAttributes: data.inAttributes
    })
  );
};

export const removeFromCart = function(data) {
  return callAPI(
    `remove-product-from-cart/`,
    {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json; charset=utf-8",
      Authorization: `Bearer ${data.token}`
    },
    getParams({
      inItemId: data.inItemId
    })
  );
};

export const updateProductQuantity = function(data) {
  return callAPI(
    `cart-update/`,
    {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json; charset=utf-8",
      Authorization: `Bearer ${data.token}`
    },
    getParams({
      inItemId: data.inItemId,
      inQuantity: data.inQuantity
    })
  );
};

export const getCustomerInfo = function(data) {
  return callAPI(
    `get-customer/`,
    {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json; charset=utf-8",
      Authorization: `Bearer ${data.token}`
    },
    getParams({
      inEmail: data.inEmail
    })
  );
};

export const getCartProducts = function(data) {
  return callAPI(
    `get-shopping-cart-products/`,
    {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json; charset=utf-8",
      Authorization: `Bearer ${data.token}`
    },
    getParams({ inCartId: data.inCartId })
  );
};

export const getShippingRegions = function(data) {
  return callAPI(`get-customer-shipping-regions/`, {
    "Content-Type": "application/x-www-form-urlencoded",
    Accept: "application/json; charset=utf-8",
    Authorization: `Bearer ${data.token}`
  });
};

export const checkUser = token =>
  callAPI(`checkuser/`, { Authorization: `Bearer ${token}` });

export const getDepartments = function(data) {
  return callAPI("get-departments/", {
    Authorization: `Bearer ${data.token}`
  });
};

export const getToken = function() {
  return callAPI(`get_token/`);
};

export const getSubCategories = function(data) {
  return callAPI(
    `get-department-categories/`,
    {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json; charset=utf-8",
      Authorization: `Bearer ${data.token}`
    },
    getParams({ inDepartmentId: data.inDepartmentId })
  );
};

export const getShippingOptions = function(data) {
  return callAPI(
    `get-order-shipping-info/`,
    {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json; charset=utf-8",
      Authorization: `Bearer ${data.token}`
    },
    getParams({ inShippingRegionId: data.inShippingRegionId })
  );
};

export const getCategoryProducts = function(data) {
  return callAPI(
    `get-department-products/`,
    {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json; charset=utf-8",
      Authorization: `Bearer ${data.token}`
    },
    getParams({
      inDepartmentId: data.departmentId,
      inShortProductDescriptionLength: data.descriptionLength,
      inProductsPerPage: data.inProductsPerPage | 10,
      inStartItem: data.inStartItem | 0
    })
  );
};

export const getSubCategoryProducts = function(data) {
  return callAPI(
    `get-category-products/`,
    {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json; charset=utf-8",
      Authorization: `Bearer ${data.token}`
    },
    getParams({
      inCategoryId: data.categoryId,
      inShortProductDescriptionLength: data.descriptionLength,
      inProductsPerPage: data.inProductsPerPage | 10,
      inStartItem: data.inStartItem | 0
    })
  );
};

export const getSearchItems = function(data) {
  return callAPI(
    `search/`,
    {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json; charset=utf-8",
      Authorization: `Bearer ${data.token}`
    },
    getParams({
      inSearchString: data.searchTerm,
      inAllWords: "on",
      inShortProductDescriptionLength: "100",
      inProductsPerPage: "15",
      inStartItem: "1"
    })
  );
};

export const getProductRecommendations = function(data) {
  return callAPI(
    `get-product-recommendations/`,
    {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json; charset=utf-8",
      Authorization: `Bearer ${data.token}`
    },
    getParams({
      inProductId: data.inProductId,
      inShortProductDescriptionLength: "100"
    })
  );
};
export const getProductLocations = function(data) {
  return callAPI(
    `get-product-locations/`,
    {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json; charset=utf-8",
      Authorization: `Bearer ${data.token}`
    },
    getParams({
      inProductId: data.inProductId
    })
  );
};

export const addAddress = function(data) {
  return callAPI(
    `add-address/`,
    {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json; charset=utf-8",
      Authorization: `Bearer ${data.token}`
    },
    getParams({
      inEmail: data.inEmail,
      inAddressName: data.inAddressName,
      inAddress1: data.inAddress1,
      inAddress2: data.inAddress2,
      inCity: data.inCity,
      inPostalCode: data.inPostalCode,
      inCountry: data.inCountry,
      inDayPhone: data.inDayPhone,
      inEvePhone: data.inEvePhone,
      inMobPhone: data.inMobPhone
    })
  );
};

export const getAddress = function(data) {
  return callAPI(
    `get-address/`,
    {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json; charset=utf-8",
      Authorization: `Bearer ${data.token}`
    },
    getParams({
      inEmail: data.inEmail
    })
  );
};
