import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { css } from 'glamor';
import { FavoritesButton, Portal } from '@shopgate/engage/components';
import { withCurrentProduct } from '@shopgate/engage/core';
import 'intersection-observer';
import connect from './connector';
import AddToCart from '../../components/AddToCart';

const styles = {
  wrapper: css({
    position: 'sticky',
    top: -1,
    zIndex: 999,
    pointerEvents: 'none',
    ' .click-catcher': {
      display: 'none',
      height: 75,
      position: 'absolute',
      width: 50,
      zIndex: 5,
      bottom: 58,
      right: 15,
    },
    '&.stuck': {
      '> div > *:not(:last-child):not(.click-catcher)': {
        marginTop: '-40px !important',
      },
      ' .click-catcher': {
        display: 'block',
      },
    },
  }),
  inner: css({
    display: 'flex',
    flexDirection: 'column',
    height: 'calc(325px + var(--safe-area-inset-top))',
    marginTop: 'calc(-300px - var(--safe-area-inset-top))',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    ' > *': {
      transition: 'margin 500ms',
      pointerEvents: 'auto',
      zIndex: 1,
    },
  }),
  favButton: css({
    zIndex: 1,
    fontSize: 29,
    marginBottom: 3,
    marginRight: 15,
  }).toString(),
  ripple: css({
    padding: 8,
  }).toString(),
};

/**
* @param {Object} props Props
* @return {JSX}
*/
const StickyButtons = ({ productId, isFavorite }) => {
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => e.target.classList.toggle('stuck', e.intersectionRatio < 1),
      { threshold: [1] }
    );

    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  });

  /**
   * expand by scrolling box into view again
   */
  const expand = () => {
    ref.current.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
    });
  };

  return (
    <div className={styles.wrapper} ref={ref}>
      <div className={styles.inner}>
        <Portal name="product.sticky-buttons.before" />
        <FavoritesButton
          className={styles.favButton}
          rippleClassName={styles.ripple}
          active={isFavorite}
          productId={productId}
        />
        <Portal name="product.sticky-buttons.between" />
        <div className="click-catcher" onClick={expand} />
        <AddToCart />
      </div>
    </div>
  );
};

StickyButtons.propTypes = {
  isFavorite: PropTypes.bool.isRequired,
  productId: PropTypes.string.isRequired,
};

export default withCurrentProduct(connect(StickyButtons));
