import { connect } from 'react-redux';
import { toggleMenu } from 'redux/actions';

import App from './App';

export default connect(
  ({ firebase: { profile }, route: { location } }) => ({
    user: profile,
    location,
  }),
  (dispatch) => ({
    toggleMenu: () => dispatch(toggleMenu()),
  })
)(App);

