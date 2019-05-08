import * as ActionTypes from "../actions";
//import { store } from "../index";

import SyncStorage from 'sync-storage';

const intialState = {
  loading: false,
  products: [],
  product: [],
  productrecommendations: [],
  productLocations: [],
  addAddress: [],
  getAddress: [],
  address: {}
};

function getCategoryName(categories, id) {
  let categoriesdata = categories.filter(
    category => category.department_id === id
  );
  return categoriesdata[0] ? categoriesdata[0].name : "";
}
function getSubCategoryName(subcategories, id) {
  return subcategories.filter(category => category.category_id === id)[0].name;
}
export default (state = intialState, action) => {
  let cart = null;
  switch (action.type) {
    case ActionTypes.PRODUCT.REQUEST:
      // console.log(action);
      return {
        ...state,
        isLoading: true
      };
    case ActionTypes.PRODUCT.SUCCESS:
      return {
        ...state,
        isLoading: false,
        product: action.response
      };
    case ActionTypes.PRODUCT.FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.errors
      };

    case ActionTypes.PRODUCTS.REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case ActionTypes.PRODUCTS.SUCCESS:
      return {
        ...state,
        isLoading: false,
        products: action.response
      };
    case ActionTypes.PRODUCTS.FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.errors
      };

    case ActionTypes.PRODUCTRECOMMENDATIONS.REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case ActionTypes.PRODUCTRECOMMENDATIONS.SUCCESS:
      return {
        ...state,
        isLoading: false,
        productrecommendations: action.response
      };
    case ActionTypes.PRODUCTRECOMMENDATIONS.FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.errors
      };

    case ActionTypes.PRODUCTLOCATIONS.REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case ActionTypes.PRODUCTLOCATIONS.SUCCESS:
      return {
        ...state,
        isLoading: false,
        productLocations: action.response
      };
    case ActionTypes.PRODUCTLOCATIONS.FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.errors
      };
    case ActionTypes.CATEGORIES.SUCCESS:
      return {
        ...state,
        categories: action.response
      };

    case ActionTypes.REMOVEFROMCART.SUCCESS:
      cart = localStorage.getItem("react-shop-cart");
      if (cart) {
        cart = JSON.parse(cart);
      } else {
        cart = { inCartId: null, count: 0 };
      }
      cart.count = cart.count - 1;
      localStorage.setItem("react-shop-cart", JSON.stringify(cart));
      return {
        ...state,
        isLoading: false,
        cart: cart
      };

    case ActionTypes.UPDATEQUANTITY.SUCCESS:
      cart = localStorage.getItem("react-shop-cart");
      if (cart) {
        cart = JSON.parse(cart);
      } else {
        cart = { inCartId: null, count: 0 };
      }
      cart.count = cart.count - 1;
      localStorage.setItem("react-shop-cart", JSON.stringify(cart));
      return {
        ...state,
        isLoading: false,
        cart: cart
      };
    case ActionTypes.ADDPRODUCTTOCART.SUCCESS:
      cart = SyncStorage.get("react-shop-cart");
      if (cart) {
        if(cart.count){

        }
        else{
          cart = JSON.parse(cart);
        }
        //cart = JSON.parse(cart);
      } else {
        cart = { inCartId: null, count: 0 };
      }
      cart.inCartId = action.response.inCartId;
      cart.count = cart.count + 1;
      SyncStorage.set("react-shop-cart", cart);
      return {
        ...state,
        isLoading: false,
        cart: cart
      };
    case ActionTypes.GETCARTPRODUCTS.SUCCESS:
      cart = SyncStorage.get("react-shop-cart");
      if (cart) {
        if(cart.count){

        }
        else{
          cart = JSON.parse(cart);
        }
      } else {
        cart = { inCartId: null, count: 0, products: [] };
      }

      let count = 0;
      for (var i = 0; i < action.response.length; i++) {
        count = count + action.response[i].quantity;
      }
      cart.count = count;
      cart.products = action.response;      
      SyncStorage.set("react-shop-cart", cart);
      return {
        ...state,
        isLoading: false,
        cart: cart
      };
    case ActionTypes.SUBCATEGORIES.SUCCESS:
      let categoryName = getCategoryName(
        state.categories,
        action.data.inDepartmentId
      );
      let subCategories = state.subCategories
        ? Object.assign({}, state.subCategories)
        : [];
      subCategories[categoryName.toLowerCase()] = action.response;
      return {
        ...state,
        subCategories
      };

    case ActionTypes.SETREGION:
      cart = localStorage.getItem("react-shop-cart");
      if (cart) {
        cart = JSON.parse(cart);
      } else {
        cart = { inCartId: null, count: 0, products: [], region: null };
      }

      cart.region = action.payload;
      localStorage.setItem("react-shop-cart", JSON.stringify(cart));
      return {
        ...state,
        isLoading: false,
        cart: cart
      };

    case ActionTypes.CLEARCART:
      return {
        ...state,
        isLoading: false,
        cart: { inCartId: null, count: 0, products: [], region: null }
      };

    case ActionTypes.SETSHIPPINGOPTION:
      cart = localStorage.getItem("react-shop-cart");
      if (cart) {
        cart = JSON.parse(cart);
      } else {
        cart = {
          inCartId: null,
          count: 0,
          products: [],
          region: null,
          shippingoption: null
        };
      }

      cart.shippingoption = action.payload;
      localStorage.setItem("react-shop-cart", JSON.stringify(cart));
      return {
        ...state,
        isLoading: false,
        cart: cart
      };
    case ActionTypes.CATEGORYPRODUCTS.SUCCESS:
      categoryName = getCategoryName(
        state.categories,
        action.data.departmentId
      );

      let categoryProducts = state.categoryProducts
        ? Object.assign({}, state.categoryProducts)
        : [];
      categoryProducts[categoryName.toLowerCase()] = action.response;
      return {
        ...state,
        categoryProducts
      };
    case ActionTypes.SUBCATEGORYPRODUCTS.SUCCESS:
      var allSubCategories = [];
      Object.values(state.subCategories).map(subCategory => {
        allSubCategories = [...allSubCategories, ...subCategory];
        return subCategory;
      });
      let subCategoryName = getSubCategoryName(
        allSubCategories,
        action.data.categoryId
      );
      let subCategoryProducts = state.subCategoryProducts
        ? Object.assign({}, state.subCategoryProducts)
        : [];
      subCategoryProducts[subCategoryName.toLowerCase()] = action.response;
      return {
        ...state,
        subCategoryProducts
      };
    case ActionTypes.SEARCH.SUCCESS:
      return {
        ...state,
        searchItem: action.response
      };
    case ActionTypes.ADDADDRESS.REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case ActionTypes.ADDADDRESS.SUCCESS:
      return {
        ...state,
        isLoading: false,
        addAddress: action.response
      };
    case ActionTypes.ADDADDRESS.FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.errors
      };

    case ActionTypes.UPDATEADDRESS.REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case ActionTypes.UPDATEADDRESS.SUCCESS:
      return {
        ...state,
        isLoading: false,
        updateAddress: action.response
      };
    case ActionTypes.UPDATEADDRESS.FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.errors
      };
    case ActionTypes.GETADDRESS.REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case ActionTypes.GETADDRESS.SUCCESS:
      return {
        ...state,
        isLoading: false,
        getAddress: action.response
      };
    case ActionTypes.GETADDRESS.FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.errors
      };
    case ActionTypes.DELETEADDRESS.REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case ActionTypes.DELETEADDRESS.SUCCESS:
      return {
        ...state,
        isLoading: false,
        deleteAddress: action.response
      };
    case ActionTypes.DELETEADDRESS.FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.errors
      };

    default:
      return state;
  }
};
