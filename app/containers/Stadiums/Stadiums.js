import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import styles from './Stadiums.scss';

import Stadium from './Stadium';

const Stadiums = ({ stadiums }) => (
  <div className={styles.container}>
    {_.map(stadiums, (stadium, key) => <Stadium stadium={stadium} key={key} />) }
  </div>
);

Stadiums.propTypes = {
  stadiums: PropTypes.object,
};

export default Stadiums;
