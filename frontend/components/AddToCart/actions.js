import { getAddToCartOptions, addProductsToCart } from '@shopgate/engage/cart';

/**
 * Adds a product to the cart.
 * @param {Object} data The pieces for the product to be added.
 * @return {Function} A redux thunk.
 */
export const addProductToCart = data => (dispatch, getState) => {
  const state = getState();

  // Transform the options to the required format for the pipeline request.
  const options = getAddToCartOptions(state, data);
  const { productId, quantity } = data;

  dispatch(addProductsToCart([{
    productId,
    quantity,
    ...(options) && { options },
  }]));
};
