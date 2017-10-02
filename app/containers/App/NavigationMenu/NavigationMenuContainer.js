import { connect } from 'react-redux';
import { compose } from 'redux';

import {
  closeMenu,
} from 'redux/actions';

import { withRouter } from 'react-router';

import NavigationMenu from './NavigationMenu';

export default compose(
  connect(
    ({ nav }) => ({
      ...nav,
    }),
    (dispatch) => ({
      closeMenu: () => dispatch(closeMenu()),
    })
  ),
  withRouter
)(NavigationMenu);
