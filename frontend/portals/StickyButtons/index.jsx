import React, { useRef, useEffect, Fragment } from 'react';
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
        marginBottom: '0px !important',
        boxShadow: '0px -3px 2px rgba(0, 0, 0, 0.2)',
      },
      ' .click-catcher': {
        display: 'block',
      },
    },
  }),
  inner: css({
    display: 'flex',
    flexDirection: 'column',
    height: 'calc(415px + var(--safe-area-inset-top))',
    marginTop: 'calc(-390px - var(--safe-area-inset-top))',
    marginBottom: -25,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    ' > *': {
      transition: 'margin 500ms',
      pointerEvents: 'auto',
      zIndex: 1,
      marginBottom: '20px',
      '@media(max-width: 375px)': {
        marginBottom: '15px',
      },
      '@media(max-width: 320px)': {
        marginBottom: '10px',
      },
    },
    ' > *:last-child': {
      marginBottom: 0,
    },
  }),
  favButton: css({
    zIndex: 1,
    fontSize: 29,
    marginRight: 15,
  }).toString(),
  ripple: css({
    padding: 8,
  }).toString(),
  scrollTo: css({
    position: 'absolute',
    top: -1000,
  }).toString(),
};

/**
* @param {Object} props Props
* @return {JSX}
*/
const StickyButtons = ({
  productId, variantId, isFavorite, getDeviceInformation,
}) => {
  const isTablet = getDeviceInformation.type === 'tablet';

  const wrapperRef = useRef(null);
  const scrollToRef = useRef(null);

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (!isTablet) {
      const observer = new IntersectionObserver(
        ([e]) => e.target.classList.toggle('stuck', e.intersectionRatio < 1),
        { threshold: [1] }
      );

      observer.observe(wrapperRef.current);

      return () => {
        observer.disconnect();
      };
    }
  }, [isTablet]);

  /**
   * expand by scrolling box into view again
   */
  const expand = () => {
    scrollToRef.current.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
    });
  };

  if (isTablet) {
    return null;
  }
  /* eslint-disable jsx-a11y/click-events-have-key-events,
    jsx-a11y/no-static-element-interactions */
  return (
    <Fragment>
      <div className={styles.wrapper} ref={wrapperRef}>
        <div className={styles.inner}>
          <Portal name="product.sticky-buttons.before" />
          <FavoritesButton
            className={styles.favButton}
            rippleClassName={styles.ripple}
            active={isFavorite}
            productId={variantId || productId}
          />
          <Portal name="product.sticky-buttons.between" />
          <div className="click-catcher" onClick={expand} />
          <AddToCart />
        </div>
      </div>
      <div className={styles.scrollTo} ref={scrollToRef} />
    </Fragment>
  );
  /* eslint-enable jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */
};

StickyButtons.propTypes = {
  getDeviceInformation: PropTypes.shape({
    type: PropTypes.string.isRequired,
  }).isRequired,
  isFavorite: PropTypes.bool.isRequired,
  productId: PropTypes.string.isRequired,
  variantId: PropTypes.string,
};

StickyButtons.defaultProps = {
  variantId: null,
};

export default withCurrentProduct(connect(StickyButtons));
