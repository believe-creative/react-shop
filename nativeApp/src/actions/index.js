const REQUEST = "REQUEST";
const SUCCESS = "SUCCESS";
const FAILURE = "FAILURE";

function createRequestTypes(base) {
  return [REQUEST, SUCCESS, FAILURE].reduce((acc, type) => {
    acc[type] = `${base}_${type}`;
    return acc;
  }, {});
}

//Action Types
export const PRODUCTS = createRequestTypes("PRODUCTS");
export const PRODUCT = createRequestTypes("PRODUCT");
export const ADDPRODUCTTOCART = createRequestTypes("ADDPRODUCTTOCART");
export const REMOVEFROMCART = createRequestTypes("REMOVEFROMCART");
export const UPDATEQUANTITY = createRequestTypes("UPDATEQUANTITY");
export const CUSTOMERINFO = createRequestTypes("CUSTOMERINFO");
export const GETCARTPRODUCTS = createRequestTypes("GETCARTPRODUCTS");
export const GETSHIPPINGREGIONS = createRequestTypes("GETSHIPPINGREGIONS");
export const GETSHIPPINGOPTIONS = createRequestTypes("GETSHIPPINGOPTIONS");
export const CHECKUSERLOGIN = createRequestTypes("CHECKUSERLOGIN");
export const SETUSER = "SETUSER";
export const SETREGION = "SETREGION";
export const SETSUBCATEGORY = "SETSUBCATEGORY";
export const CLEARCART = "CLEARCART";
export const SETTOKEN = "SETTOKEN";
export const GETTOKEN = createRequestTypes("GETTOKEN");
export const SETSHIPPINGOPTION = "SETSHIPPINGOPTION";
export const CATEGORIES = createRequestTypes("CATEGORIES");
export const SUBCATEGORIES = createRequestTypes("SUBCATEGORIES");
export const CATEGORYPRODUCTS = createRequestTypes("CATEGORYPRODUCTS");
export const SUBCATEGORYPRODUCTS = createRequestTypes("SUBCATEGORYPRODUCTS");
export const SEARCH = createRequestTypes("SEARCH");
export const PRODUCTRECOMMENDATIONS = createRequestTypes(
  "PRODUCTRECOMMENDATIONS"
);
export const PRODUCTLOCATIONS = createRequestTypes("PRODUCTLOCATIONS");
export const ADDADDRESS = createRequestTypes("ADDADDRESS");
export const UPDATEADDRESS = createRequestTypes("UPDATEADDRESS");
export const GETADDRESS = createRequestTypes("GETADDRESS");
export const DELETEADDRESS = createRequestTypes("DELETEADDRESS");
export const SETADDRESS = "SETADDRESS";
export function setUser(payload) {
  return { type: "SETUSER", payload };
}
export function setAddress(payload) {
  return { type: "SETADDRESS", payload };
}
export function setSubCategory(payload) {
  return { type: "SETSUBCATEGORY", payload };
}

export function setRegion(payload) {
  return { type: "SETREGION", payload };
}

export function clearCart() {
  return { type: "CLEARCART" };
}

export function setToken(payload) {
  return { type: "SETTOKEN", payload };
}

export function setShippingOption(payload) {
  return { type: "SETSHIPPINGOPTION", payload };
}

function action(type, payload = {}) {
  return { type, ...payload };
}

export const product = {
  request: data => action(PRODUCT[REQUEST], { data }),
  success: (data, response) => action(PRODUCT[SUCCESS], { data, response }),
  failure: (data, error) => action(PRODUCT[FAILURE], { data, error })
};

export const getToken = {
  request: () => {console.log("dgdgfdgfdgdfgfdghjgh"); return action(GETTOKEN[REQUEST], {})},
  success: (status, response) => action(GETTOKEN[SUCCESS], { response }),
  failure: error => action(GETTOKEN[FAILURE], { error })
};

export const products = {
  request: data => action(PRODUCTS[REQUEST], { data }),
  success: (data, response) => action(PRODUCTS[SUCCESS], { data, response }),
  failure: (data, error) => action(PRODUCTS[FAILURE], { data, error })
};

export const productLocations = {
  request: data => action(PRODUCTLOCATIONS[REQUEST], { data }),
  success: (data, response) =>
    action(PRODUCTLOCATIONS[SUCCESS], { data, response }),
  failure: (data, error) => action(PRODUCTLOCATIONS[FAILURE], { data, error })
};

export const AddToCart = {
  request: data => action(ADDPRODUCTTOCART[REQUEST], { data }),
  success: (data, response) =>
    action(ADDPRODUCTTOCART[SUCCESS], { data, response }),
  failure: (data, error) => action(ADDPRODUCTTOCART[FAILURE], { data, error })
};

export const removeFromCart = {
  request: data => {
    return action(REMOVEFROMCART[REQUEST], { data });
  },
  success: (data, response) => {
    return action(REMOVEFROMCART[SUCCESS], { data, response });
  },
  failure: (data, error) => action(REMOVEFROMCART[FAILURE], { data, error })
};

export const updateProductQuantity = {
  request: data => action(UPDATEQUANTITY[REQUEST], { data }),
  success: (data, response) =>
    action(UPDATEQUANTITY[SUCCESS], { data, response }),
  failure: (data, error) => action(UPDATEQUANTITY[FAILURE], { data, error })
};

export const getCustomerInfo = {
  request: data => action(CUSTOMERINFO[REQUEST], { data }),
  success: (data, response) =>
    action(CUSTOMERINFO[SUCCESS], { data, response }),
  failure: (data, error) => action(CUSTOMERINFO[FAILURE], { data, error })
};

export const getCartProducts = {
  request: data => action(GETCARTPRODUCTS[REQUEST], { data }),
  success: (data, response) =>
    action(GETCARTPRODUCTS[SUCCESS], { data, response }),
  failure: (data, error) => action(GETCARTPRODUCTS[FAILURE], { data, error })
};

export const getShippingRegions = {
  request: data => action(GETSHIPPINGREGIONS[REQUEST], { data }),
  success: (data, response) => {
    return action(GETSHIPPINGREGIONS[SUCCESS], { data, response });
  },
  failure: (data, error) => action(GETSHIPPINGREGIONS[FAILURE], { data, error })
};

export const getShippingOptions = {
  request: data => action(GETSHIPPINGOPTIONS[REQUEST], { data }),
  success: (data, response) => {
    return action(GETSHIPPINGOPTIONS[SUCCESS], {
      data,
      response
    });
  },
  failure: (data, error) => action(GETSHIPPINGOPTIONS[FAILURE], { data, error })
};

export const checkUserLogin = {
  request: token => action(CHECKUSERLOGIN[REQUEST], { token }),
  success: (token, response) => action(CHECKUSERLOGIN[SUCCESS], { response }),
  failure: (token, error) => action(CHECKUSERLOGIN[FAILURE], { error })
};

export const getCategories = {
  request: data => action(CATEGORIES[REQUEST], { data }),
  success: (data, response) => action(CATEGORIES[SUCCESS], { data, response }),
  failure: (data, error) => action(CATEGORIES[FAILURE], { data, error })
};

export const getSubCategories = {
  request: data => action(SUBCATEGORIES[REQUEST], { data }),
  success: (data, response) =>
    action(SUBCATEGORIES[SUCCESS], { data, response }),
  failure: (data, error) => action(SUBCATEGORIES[FAILURE], { data, error })
};

export const getCategoryProducts = {
  request: data => action(CATEGORYPRODUCTS[REQUEST], { data }),
  success: (data, response) =>
    action(CATEGORYPRODUCTS[SUCCESS], { data, response }),
  failure: (data, error) => action(CATEGORYPRODUCTS[FAILURE], { data, error })
};

export const getSubCategoryProducts = {
  request: data => action(SUBCATEGORYPRODUCTS[REQUEST], { data }),
  success: (data, response) =>
    action(SUBCATEGORYPRODUCTS[SUCCESS], { data, response }),
  failure: (data, error) =>
    action(SUBCATEGORYPRODUCTS[FAILURE], { data, error })
};
export const getSearchItems = {
  request: data => action(SEARCH[REQUEST], { data }),
  success: (data, response) => action(SEARCH[SUCCESS], { data, response }),
  failure: (data, error) => action(SEARCH[FAILURE], { data, error })
};
export const getProductRecommendations = {
  request: data => action(PRODUCTRECOMMENDATIONS[REQUEST], { data }),
  success: (data, response) =>
    action(PRODUCTRECOMMENDATIONS[SUCCESS], { data, response }),
  failure: (data, error) =>
    action(PRODUCTRECOMMENDATIONS[FAILURE], { data, error })
};

export const addAddress = {
  request: data => action(ADDADDRESS[REQUEST], { data }),
  success: (data, response) => action(ADDADDRESS[SUCCESS], { data, response }),
  failure: (data, error) => action(ADDADDRESS[FAILURE], { data, error })
};

export const updateAddress = {
  request: data => action(UPDATEADDRESS[REQUEST], { data }),
  success: (data, response) =>
    action(UPDATEADDRESS[SUCCESS], { data, response }),
  failure: (data, error) => action(UPDATEADDRESS[FAILURE], { data, error })
};

export const getAddress = {
  request: data => action(GETADDRESS[REQUEST], { data }),
  success: (data, response) => action(GETADDRESS[SUCCESS], { data, response }),
  failure: (data, error) => action(GETADDRESS[FAILURE], { data, error })
};

export const deleteAddress = {
  request: data => action(DELETEADDRESS[REQUEST], { data }),
  success: (data, response) =>
    action(DELETEADDRESS[SUCCESS], { data, response }),
  failure: (data, error) => action(DELETEADDRESS[FAILURE], { data, error })
};
