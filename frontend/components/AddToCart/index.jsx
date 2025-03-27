import React, {
  useContext,
} from 'react';
import PropTypes from 'prop-types';
import { css } from 'glamor';
import { AddToCartButton } from '@shopgate/engage/components';
import { broadcastLiveMessage } from '@shopgate/engage/a11y';
import { ThemeContext, withCurrentProduct, i18n } from '@shopgate/engage/core';
import 'intersection-observer';
import connect from './connector';

const styles = {
  button: css({
    marginTop: 6,
    marginRight: 12,
  }).toString(),
};

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
  const handleClick = async () => {
    const fulfilled = await conditioner.check();

    if (!fulfilled) {
      return false;
    }

    broadcastLiveMessage('product.adding_item', {
      params: { count: quantity },
    });

    return addToCart({
      productId: variantId || productId,
      options,
      quantity,
    });
  };

  return (
    <AddToCartButton
      aria-label={i18n.text('product.add_to_cart')}
      className={styles.button}
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

export default withCurrentProduct(connect(AddToCart));
