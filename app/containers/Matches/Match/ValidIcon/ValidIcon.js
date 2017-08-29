import React from 'react';
import PropTypes from 'prop-types';


import CheckIcon from 'material-ui/svg-icons/navigation/check';
import ClearIcon from 'material-ui/svg-icons/content/clear';

const iconStyles = {
  position: 'absolute',
  bottom: 5,
  left: 5,
  opacity: 0.8,
};

const ValidIcon = ({ valid }) => (valid ?
  <CheckIcon style={iconStyles} color="green" /> :
  <ClearIcon style={iconStyles} color="red" />
);

ValidIcon.propTypes = {
  valid: PropTypes.bool.isRequired,
};

export default ValidIcon;
