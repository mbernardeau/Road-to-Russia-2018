import React from 'react'
import PropTypes from 'prop-types'

import Tooltip from 'material-ui/Tooltip'

import CheckIcon from '@material-ui/icons/Check'
import ClearIcon from '@material-ui/icons/Clear'

const iconStyles = {
  position: 'absolute',
  top: 5,
  left: 5,
  opacity: 0.8,
}

const getTooltipText = valid => (valid ? 'Paris enregistré' : 'Paris invalide')

const ValidIcon = ({ valid }) => (
  <Tooltip title={getTooltipText(valid)} placement="right">
    {valid ? (
      <CheckIcon style={iconStyles} color="action" />
    ) : (
      <ClearIcon style={iconStyles} color="error" />
    )}
  </Tooltip>
)

ValidIcon.propTypes = {
  valid: PropTypes.bool.isRequired,
}

export default ValidIcon
