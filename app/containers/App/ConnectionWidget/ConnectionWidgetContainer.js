import { connect } from 'react-redux';

import ConnectionWidget from './ConnectionWidget';

export default connect(
  ({ firebase: { authError, auth, profile } }) => ({
    authError,
    auth,
    user: profile,
  })
)(ConnectionWidget);
