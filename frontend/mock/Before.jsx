import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { css } from 'glamor';

const styles = {
  wrapper: css({
    height: 45,
    width: 45,
  }),
};

/**
* @param {Object} props Props
* @return {JSX}
*/
const Before = ({ children, productId }) => {
  return (

    <div className={styles.wrapper}>
      Before
    </div>
  );
};

Before.propTypes = {
};

Before.defaultProps = {
};

export default Before;
