import React from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';

import CheckIcon from 'material-ui-icons/Check';
import ClearIcon from 'material-ui-icons/Clear';

const iconStyles = {
  position: 'absolute',
  top: 5,
  left: 5,
  opacity: 0.8,
};

const ValidIcon = ({ valid }) => (
  <div>
    {valid ?
      <CheckIcon style={iconStyles} color="green" data-tip="Paris enregistré !" data-type="success" data-for="tt-valid" /> :
      <ClearIcon style={iconStyles} color="red" data-tip="Paris invalide !" data-type="error" data-for="tt-valid" />
    }
    <ReactTooltip id="tt-valid" effect="solid" />
  </div>
);

ValidIcon.propTypes = {
  valid: PropTypes.bool.isRequired,
};

export default ValidIcon;
