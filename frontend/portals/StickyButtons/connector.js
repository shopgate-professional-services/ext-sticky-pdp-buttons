import { connect } from 'react-redux';
import { isRelativeProductOnList } from '@shopgate/engage/favorites';

/**
 * @param {Object} state The current application state.
 * @param {Object} props The component props.
 * @return {Object} The extended component props.
 */
const mapStateToProps = (state, props) => ({
  isFavorite: isRelativeProductOnList(state, props),
});

export default connect(mapStateToProps);
