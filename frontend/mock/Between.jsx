import React, { useRef, useState, useEffect } from 'react';
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
const Between = ({ children, productId }) => {
  return (

    <div className={styles.wrapper}>
      Between
    </div>
  );
};

Between.propTypes = {
};

Between.defaultProps = {
};

export default Between;
