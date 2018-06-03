import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Snackbar from '@material-ui/core/Snackbar'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'

import './GroupCreateStatus.scss'

const GroupCreateStatus = ({ status, group: { name, joinKey }, reason, handleClose }) => (
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
        {status === 'failed' ? (
          reason
        ) : (
          <Fragment>
            Tribu {name} créée avec la clé <b>{joinKey}</b> &nbsp;<Link
              className="group-create-link"
              to="/admingroups"
            >
              En voir plus
            </Link>
          </Fragment>
        )}
      </span>
    }
    action={[
      <IconButton key="close" aria-label="Close" color="inherit" onClick={handleClose}>
        <CloseIcon />
      </IconButton>,
    ]}
  />
)

GroupCreateStatus.defaultProps = {
  group: {},
}

GroupCreateStatus.propTypes = {
  status: PropTypes.string,
  group: PropTypes.shape({
    name: PropTypes.string,
    joinKey: PropTypes.string,
  }),
  reason: PropTypes.string,
  handleClose: PropTypes.func.isRequired,
}

export default GroupCreateStatus
