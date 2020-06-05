import React, {
  useContext,
} from 'react';
import PropTypes from 'prop-types';
import { AddToCartButton } from '@shopgate/engage/components';
import { broadcastLiveMessage } from '@shopgate/engage/a11y';
import { ThemeContext, withCurrentProduct } from '@shopgate/engage/core';
import 'intersection-observer';
import connect from './connector';

/**
* @param {Object} props Props
* @return {JSX}
*/
const AddToCart = ({ addToCart, disabled, loading }) => {
  const { contexts: { ProductContext } } = useContext(ThemeContext);
  const {
    conditioner,
    options,
    productId,
    variantId,
    quantity,
  } = useContext(ProductContext);

  /**
   * add to cart
   */
  const handleClick = () => {
    conditioner.check().then((fulfilled) => {
      if (!fulfilled) {
        // TODO: highlight something
        return;
      }

      addToCart({
        productId: variantId || productId,
        options,
        quantity,
      });

      broadcastLiveMessage('product.adding_item', {
        params: { count: quantity },
      });
    });
  };

  return (
    <AddToCartButton
      onClick={handleClick}
      isDisabled={disabled}
      isLoading={loading}
      iconSize={22}
      buttonSize={50}
    />
  );
};

AddToCart.propTypes = {
  addToCart: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
};

AddToCart.defaultProps = {
};

export default withCurrentProduct(connect(AddToCart));
