export const getProduct = (state, productId) => state.products[productId];

export const getProducts = (state, category) => {
  return state.products[category];
};
