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

export const getProducts = function(category) {
  return callAPI(`get_token`).then(function(response){
      return callAPI(`products/`,{ Authorization: `Bearer ${response.response.token}` },{category:category})
  },function(error){
      return error
  })
};

export const getProduct = function(productId) {
  return callAPI(`get_token`).then(function(response){
      return callAPI(`product/`,{ Authorization: `Bearer ${response.response.token}` },{productId:productId})
  },function(error){
      return error
  })
};

export const AddToCart = function(data) {
  return callAPI(`get_token`).then(function(response){
      return callAPI(`add-product-to-cart/`,{
        "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json; charset=utf-8", Authorization: `Bearer ${response.response.token}` 
    },getParams({
      inCartId: data.inCartId,
      inProductId: data.inProductId,
      inAttributes: data.inAttributes
    }))
  },function(error){
      return error
  })
};

export const removeFromCart = function(inItemId) {
  return callAPI(`get_token`).then(function(response){
      return callAPI(`remove-product-from-cart/`,{
        "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json; charset=utf-8", Authorization: `Bearer ${response.response.token}` 
    },
    getParams({
      inItemId: inItemId
    }))
  },function(error){
      return error
  })
};

export const updateProductQuantity = function(data) {
  return callAPI(`get_token`).then(function(response){
      return callAPI(`cart-update/`,{
        "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json; charset=utf-8", Authorization: `Bearer ${response.response.token}` 
    },
    getParams({
      inItemId: data.inItemId,
      inQuantity: data.inQuantity
    }))
  },function(error){
      return error
  })
};


export const getCustomerInfo = function(inEmail) {
  return callAPI(`get_token`).then(function(response){
      return callAPI(`get-customer/`,{
        "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json; charset=utf-8", Authorization: `Bearer ${response.response.token}` 
    },
    getParams({
      inEmail: inEmail
    }))
  },function(error){
      return error
  })
};

export const getCartProducts = function(inCartId) {
  return callAPI(`get_token`).then(function(response){
      return callAPI(`get-shopping-cart-products/`,{
        "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json; charset=utf-8", Authorization: `Bearer ${response.response.token}` 
    },
    getParams({ inCartId: inCartId }))
  },function(error){
      return error
  })
};

export const getShippingRegions = function() {
  return callAPI(`get_token`).then(function(response){
      return callAPI(`get-customer-shipping-regions/`,{
        "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json; charset=utf-8", Authorization: `Bearer ${response.response.token}` 
    })
  },function(error){
      return error
  })
};



export const checkUser = token =>
  callAPI(`checkuser/`, { Authorization: `Bearer ${token}` });


  

export const getDepartments=function(){
  return callAPI(`get_token`).then(function(response){
        return callAPI("get-departments/",{ Authorization: `Bearer ${response.response.token}` });
  },function(error){
    return error
  })
}

export const getSubCategories = function(departmentId) {
  return callAPI(`get_token`).then(function(response){
      return callAPI(`get-department-categories/`,{
        "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json; charset=utf-8", Authorization: `Bearer ${response.response.token}` 
    },
    getParams({ inDepartmentId: departmentId }))
  },function(error){
      return error
  })
};

export const getShippingOptions = function(inShippingRegionId) {
  return callAPI(`get_token`).then(function(response){
      return callAPI(`get-order-shipping-info/`,{
        "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json; charset=utf-8", Authorization: `Bearer ${response.response.token}` 
    },
    getParams({ inShippingRegionId: inShippingRegionId }))
  },function(error){
      return error
  })
};

export const getCategoryProducts = function(data) {
  return callAPI(`get_token`).then(function(response){
      return callAPI(`get-department-products/`,{
        "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json; charset=utf-8", Authorization: `Bearer ${response.response.token}` 
    },
    getParams({
      inDepartmentId: data.departmentId,
      inShortProductDescriptionLength: data.descriptionLength,
      inProductsPerPage: 10,
      inStartItem: 0
    }))
  },function(error){
      return error
  })
};

export const getSubCategoryProducts = function(data) {
  return callAPI(`get_token`).then(function(response){
      return callAPI(`get-category-products/`,{
        "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json; charset=utf-8", Authorization: `Bearer ${response.response.token}` 
    },
    getParams({
      inCategoryId: data.categoryId,
      inShortProductDescriptionLength: data.descriptionLength,
      inProductsPerPage: 10,
      inStartItem: 0
    }))
  },function(error){
      return error
  })
};

export const getSearchItems = function(searchTerm) {
  return callAPI(`get_token`).then(function(response){
      return callAPI(`search/`,{
        "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json; charset=utf-8", Authorization: `Bearer ${response.response.token}` 
    },
    getParams({
      inSearchString: searchTerm,
      inAllWords: "on",
      inShortProductDescriptionLength: "100",
      inProductsPerPage: "15",
      inStartItem: "1"
    }))
  },function(error){
      return error
  })
};


