import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import { compose } from 'redux';

import User from './User';

export default compose(
  firebaseConnect(),
  connect(
    ({ firebase: { profile } }) => ({
      user: profile,
    })
  )
)(User);

