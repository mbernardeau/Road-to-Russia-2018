import React from 'react';
import PropTypes from 'prop-types';
import {
  dataToJS,
  firebaseConnect,
} from 'react-redux-firebase';
import { connect } from 'react-redux';
import _ from 'lodash';

import styles from './Stadiums.scss';

import Stadium from './Stadium';

@firebaseConnect([
  'stadiums',
])
@connect(
  (state) => ({
    stadiums: dataToJS(state.get('firebase'), 'stadiums'),
  })
)
export default class Stadiums extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    stadiums: PropTypes.object,
  }

  render() {
    return (
      <div className={styles.container}>
        {_.map(this.props.stadiums, (stadium, key) => <Stadium stadium={stadium} key={key} />) }
      </div>
    );
  }
}
