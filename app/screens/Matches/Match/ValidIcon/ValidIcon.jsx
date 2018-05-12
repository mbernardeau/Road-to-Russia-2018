import React from 'react'
import PropTypes from 'prop-types'
import { onlyUpdateForPropTypes } from 'recompose'

import Tooltip from 'material-ui/Tooltip'

import CheckIcon from '@material-ui/icons/Check'
import ClearIcon from '@material-ui/icons/Clear'

import './ValidIcon.scss'

const ValidIcon = ({ valid }) => (
  <Tooltip title={valid ? 'Paris enregistré' : 'Paris invalide'} placement="right">
    <div className="tooltip-svg-container">
      {valid ? <CheckIcon className="valid-icon" /> : <ClearIcon className="invalid-icon" />}
    </div>
  </Tooltip>
)

ValidIcon.propTypes = {
  valid: PropTypes.bool.isRequired,
}

export default onlyUpdateForPropTypes(ValidIcon)
