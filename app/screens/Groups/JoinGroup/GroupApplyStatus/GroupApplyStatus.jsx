import React from 'react'
import PropTypes from 'prop-types'

import Snackbar from 'material-ui/Snackbar'
import IconButton from 'material-ui/IconButton'
import CloseIcon from '@material-ui/icons/Close'

const GroupApplyStatus = ({ status, name, reason, handleClose }) => (
  <Snackbar
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'left',
    }}
    open={!!status}
    autoHideDuration={6000}
    onClose={handleClose}
    SnackbarContentProps={{
      'aria-describedby': 'message-id',
    }}
    message={
      <span id="message-id">
        {status === 'failed' ? reason : `Demande envoyée pour la tribu ${name}`}
      </span>
    }
    action={[
      <IconButton key="close" aria-label="Close" color="inherit" onClick={handleClose}>
        <CloseIcon />
      </IconButton>,
    ]}
  />
)

GroupApplyStatus.propTypes = {
  status: PropTypes.string,
  name: PropTypes.string,
  reason: PropTypes.string,
  handleClose: PropTypes.func.isRequired,
}

export default GroupApplyStatus
