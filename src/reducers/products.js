import * as ActionTypes from "../actions";

const intialState = {
  loading: false,
  products: []
};

function getCategoryName(categories, id) {
  return categories.filter(category => category.department_id === id)[0].name;
}

export default (state = intialState, action) => {
  let cart = null;
  switch (action.type) {
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
    case ActionTypes.CATEGORIES.SUCCESS:
      return {
        ...state,
        categories: action.response
      };
    case ActionTypes.ADDPRODUCTTOCART.SUCCESS:
      cart = localStorage.getItem("react-shop-cart");
      if (cart) {
        cart = JSON.parse(cart);
      } else {
        cart = { inCartId: null, count: 0 };
      }
      cart.inCartId = action.response.inCartId;
      cart.count = cart.count + 1;
      localStorage.setItem("react-shop-cart", JSON.stringify(cart));
      return {
        ...state,
        isLoading: false,
        cart: cart
      };
    case ActionTypes.GETCARTPRODUCTS.SUCCESS:
      cart = localStorage.getItem("react-shop-cart");
      if (cart) {
        cart = JSON.parse(cart);
      } else {
        cart = { inCartId: null, count: 0, products: [] };
      }

      let count = 0;
      for (var i = 0; i < action.response.length; i++) {
        count = count + action.response[i].quantity;
      }
      cart.count = count;
      cart.products = action.response;
      localStorage.setItem("react-shop-cart", JSON.stringify(cart));
      return {
        ...state,
        isLoading: false,
        cart: cart
      };
    case ActionTypes.SUBCATEGORIES.SUCCESS:
      let categoryName = getCategoryName(state.categories, action.departmentId);
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
    case ActionTypes.SEARCH.SUCCESS:
      return {
        ...state,
        searchItem: action.response
      };
    default:
      return state;
  }
};
