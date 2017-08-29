import {
  firebaseConnect,
} from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Stadiums from './Stadiums';

export default compose(
  firebaseConnect([
    'stadiums',
  ]),
  connect(
    ({ firebase: { data: { stadiums } } }) => ({
      stadiums,
    })
  )
)(Stadiums);
