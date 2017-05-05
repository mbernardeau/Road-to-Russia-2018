import React from 'react';
import PropTypes from 'prop-types';

const Flag = ({ country, className, style }) => {
  const imgUrl = require(`assets/flags/${country}.svg`); // eslint-disable-line global-require

  return <img src={imgUrl} alt={country} className={className} style={style} />;
};

Flag.propTypes = {
  country: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
};

export default Flag;
