import * as ActionTypes from "../actions";

const intialState = {
  loading: false,
  products: []
};

function getCategoryName(categories, id) {
  return categories.filter(category => category.department_id === id)[0].name;
}

export default (state = intialState, action) => {
  switch (action.type) {
    case ActionTypes.PRODUCTS.REQUEST:
      console.log("product request action");
      return {
        ...state,
        isLoading: true
      };
    case ActionTypes.PRODUCTS.SUCCESS:
      console.log("product request success", action);
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
    case ActionTypes.SUBCATEGORIES.SUCCESS:
      let categoryName = getCategoryName(state.categories, action.departmentId);
      console.log(state.subCategories, "state sub category");
      let subCategories = state.subCategories
        ? Object.assign({}, state.subCategories)
        : [];
      subCategories[categoryName.toLowerCase()] = action.response;
      console.log("subCategories REDUCERS", subCategories);
      return {
        ...state,
        subCategories
      };
    case ActionTypes.CATEGORYPRODUCTS.SUCCESS:
      console.log("CATEGORYPRODUCTS", action);
      categoryName = getCategoryName(
        state.categories,
        action.data.departmentId
      );

      let categoryProducts = state.categoryProducts
        ? Object.assign({}, state.categoryProducts)
        : [];
      console.log("CATEGORYPRODUCTS", categoryName, categoryProducts);
      categoryProducts[categoryName.toLowerCase()] = action.response;
      console.log(categoryProducts, "cate products");
      return {
        ...state,
        categoryProducts
      };
    default:
      return state;
  }
};
