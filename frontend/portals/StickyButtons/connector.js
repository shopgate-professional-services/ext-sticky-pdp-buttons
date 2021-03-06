import { connect } from 'react-redux';
import { isCurrentProductOnFavoriteList } from '@shopgate/engage/favorites';

/**
 * @param {Object} state The current application state.
 * @param {Object} props The component props.
 * @return {Object} The extended component props.
 */
const mapStateToProps = (state, props) => ({
  isFavorite: isCurrentProductOnFavoriteList(state, props),
});

export default connect(mapStateToProps);
