import React from 'react';

import Flag from 'components/Flag';

import PropTypes from 'prop-types';
import _ from 'lodash';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import styles from './Bet.scss';

/**
 * Render menu items once (from 0 to 10 goals)
 */
const menuItems = _.map(_.range(11), (n) => <MenuItem value={n} key={n} primaryText={`${n}`} />);

const selectValueStyle = {
  textAlign: 'center',
  width: '100%',
  fontSize: 'bold',
};

/**
 * Pure mini-component to render inner value of the select field choices
 * @param {number} value Value to render
 *
 * @return {React.ReactElement}
 */
const renderValue = (value) => (<div style={selectValueStyle}>{ value }</div>);

const flagStyles = {
  height: '1.3em',
};

const Bet = ({ team, betValue, onBetValueUpdated }) => (
  <div className={styles.bet}>
    <div style={{ display: 'flex' }}>
      <Flag country={team.code} style={flagStyles} />
      <div className={styles.teamName}>{team.name}</div>
    </div>
    <div className={styles.selectContainer}>
      <SelectField
        style={{ width: 60 }}
        value={betValue}
        selectionRenderer={renderValue}
        onChange={onBetValueUpdated}
        menuItemStyle={{ textAlign: 'center', width: 60 }}
      >
        {menuItems}
      </SelectField>
    </div>
  </div>
);


Bet.propTypes = {
  team: PropTypes.shape({
    name: PropTypes.string.isRequired,
    code: PropTypes.string.isRequired,
  }),
  onBetValueUpdated: PropTypes.func,
  betValue: PropTypes.number,
};

export default Bet;
