import React from 'react';

import { imgUrl } from 'components/Flag';
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

const selectValueStyle = {
  textAlign: 'center',
  width: '100%',
  color: 'white',
  fontSize: 'bold',
};

/**
 * Pure mini-component to render inner value of the select field choices
 * @param {number} value Value to render
 *
 * @return {React.ReactElement}
 */
const renderValue = (value) => (<div style={selectValueStyle}>{ value }</div>);

const flagStyles = (country) => ({
  backgroundImage: `linear-gradient(
                      rgba(0, 0, 0, 0.5),
                      rgba(0, 0, 0, 0.5)
                    ),
                    url(${imgUrl(country)})`,
  backgroundSize: 'cover',
});

const Bet = ({ team, betValue, onBetValueUpdated, direction }) => (
  <div style={flagStyles(team.code)}>
    <Reversible direction={direction} className={styles.bet}>
      <h2 className={styles.teamName}>{team.name}</h2>
      <div className={styles.selectContainer}>
        <SelectField
          style={{ width: 60, color: 'white' }}
          value={betValue}
          selectionRenderer={renderValue}
          onChange={onBetValueUpdated}
          menuItemStyle={{ textAlign: 'center', width: 60 }}
        >
          {menuItems}
        </SelectField>
      </div>
    </Reversible>
  </div>
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
