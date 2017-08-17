import React from 'react';
import PropTypes from 'prop-types';

export const imgUrl = (country) => require(`assets/flags/${country}.svg`); // eslint-disable-line global-require

const Flag = ({ country, className, style }) => (
  <img src={imgUrl(country)} alt={country} className={className} style={style} />
);

Flag.propTypes = {
  country: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
};

export default Flag;
