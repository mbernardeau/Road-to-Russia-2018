import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import { compose } from 'redux';

import {
  getProfile,
} from 'redux/user';

import User from './User';

export default compose(
  firebaseConnect(),
  connect(
    (state) => ({
      user: getProfile(state),
    })
  )
)(User);

