import React from 'react';

import Flag from 'components/Flag';
import Reversible from 'components/Reversible';

import PropTypes from 'prop-types';
import _ from 'lodash';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import styles from './Bet.scss';

/**
 * Render menu items once (from 0 to 10 goals)
 */
const menuItems = _.map(_.range(11), (n) => <MenuItem value={n} key={n} primaryText={`${n}`} />);

/**
 * Pure mini-component to render inner value of the select field choices
 * @param {number} value Value to render
 *
 * @return {React.ReactElement}
 */
const renderValue = (value) => (<div style={{ textAlign: 'center', width: '100%' }}>{ value }</div>);

const Bet = ({ team, betValue, onBetValueUpdated, direction }) => (
  <Reversible direction={direction} className={styles.bet}>
    <div className={styles.countryFlag}>
      {team.name}
      <Flag country={team.code} style={{ width: 70, height: 40 }} />
    </div>
    <SelectField
      style={{ width: 60 }}
      value={betValue}
      selectionRenderer={renderValue}
      onChange={onBetValueUpdated}
      menuItemStyle={{ textAlign: 'center', width: 60 }}
    >
      {menuItems}
    </SelectField>
  </Reversible>
);


Bet.propTypes = {
  direction: PropTypes.oneOf(['rtl', 'ltr']),
  team: PropTypes.shape({
    name: PropTypes.string.isRequired,
    code: PropTypes.string.isRequired,
  }),
  onBetValueUpdated: PropTypes.func,
  betValue: PropTypes.number,
};

export default Bet;
