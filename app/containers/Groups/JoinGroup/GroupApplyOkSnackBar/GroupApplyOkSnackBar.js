import React from 'react'
import PropTypes from 'prop-types'

import Snackbar from 'material-ui/Snackbar'
import IconButton from 'material-ui/IconButton'
import CloseIcon from 'material-ui-icons/Close'

const GroupApplyOkSnackbar = ({ open, handleRequestClose }) => (
  <Snackbar
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'left',
    }}
    open={open}
    autoHideDuration={6000}
    onRequestClose={handleRequestClose}
    SnackbarContentProps={{
      'aria-describedby': 'message-id',
    }}
    message={<span id="message-id">Demande envoyée</span>}
    action={[
      <IconButton key="close" aria-label="Close" color="inherit" onClick={handleRequestClose}>
        <CloseIcon />
      </IconButton>,
    ]}
  />
)

GroupApplyOkSnackbar.propTypes = {
  open: PropTypes.bool,
  handleRequestClose: PropTypes.func.isRequired,
}

export default GroupApplyOkSnackbar
