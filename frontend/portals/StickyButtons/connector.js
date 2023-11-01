import { connect } from 'react-redux';
import { isCurrentProductOnFavoriteList } from '@shopgate/engage/favorites';
import { getDeviceInformation } from '@shopgate/pwa-common/selectors/client';

/**
 * @param {Object} state The current application state.
 * @param {Object} props The component props.
 * @return {Object} The extended component props.
 */
const mapStateToProps = (state, props) => ({
  isFavorite: isCurrentProductOnFavoriteList(state, props),
  getDeviceInformation: getDeviceInformation(state),
});

export default connect(mapStateToProps);
