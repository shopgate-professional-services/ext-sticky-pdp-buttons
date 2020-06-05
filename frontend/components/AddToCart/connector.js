import { connect } from 'react-redux';
import { isRelativeProductOnList } from '@shopgate/pwa-common-commerce/favorites/selectors';
import {
  hasProductVariants,
  isProductOrderable,
} from '@shopgate/pwa-common-commerce/product/selectors/product';
import { isProductPageLoading } from '@shopgate/pwa-common-commerce/product/selectors/page';
import { addProductToCart } from './actions';

/**
 * @param {Object} state The current application state.
 * @param {Object} props The component props.
 * @return {Object} The extended component props.
 */
const mapStateToProps = (state, props) => ({
  isFavorite: isRelativeProductOnList(state, props),
  disabled: !isProductOrderable(state, props) && !hasProductVariants(state, props),
  loading: isProductPageLoading(state, props),
});

/**
 * @param {Function} dispatch The redux dispatch function.
 * @param {Function} props The component props.
 * @return {Object} The extended component props.
 */
const mapDispatchToProps = dispatch => ({
  addToCart: (product) => {
    dispatch(addProductToCart(product));
  },
});

export default connect(mapStateToProps, mapDispatchToProps);
