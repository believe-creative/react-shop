const REQUEST = "REQUEST";
const SUCCESS = "SUCCESS";
const FAILURE = "FAILURE";

function createRequestTypes(base) {
  return [REQUEST, SUCCESS, FAILURE].reduce((acc, type) => {
    acc[type] = `${base}_${type}`;
    return acc;
  }, {});
}

export const PRODUCTS = createRequestTypes("PRODUCTS");
export const PRODUCT = createRequestTypes("PRODUCT");
export const CHECKUSERLOGIN = createRequestTypes("CHECKUSERLOGIN");
export const SETUSER = "SETUSER";


export function setUser(payload) {
  return { type: "SETUSER", payload };
}

function action(type, payload = {}) {
  return { type, ...payload };
}

export const product = {
  request: productId => action(PRODUCT[REQUEST], { productId }),
  success: (productId, response) =>
    action(PRODUCT[SUCCESS], { productId, response }),
  failure: (productId, error) => action(PRODUCT[FAILURE], { productId, error })
};

export const products = {
  request: category => action(PRODUCTS[REQUEST], { category }),
  success: (category, response) =>
    action(PRODUCTS[SUCCESS], { category, response }),
  failure: (category, error) => action(PRODUCTS[FAILURE], { category, error })
};

export const checkUserLogin = {
  request: token => action(CHECKUSERLOGIN[REQUEST], { token }),
  success: (token,response) =>
    action(CHECKUSERLOGIN[SUCCESS], {response}),
  failure: (token,error) => action(CHECKUSERLOGIN[FAILURE], { error })
};
