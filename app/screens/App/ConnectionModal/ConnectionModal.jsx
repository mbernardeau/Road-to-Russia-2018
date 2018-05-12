import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

import Button from 'material-ui/Button'
import FaGoogle from 'react-icons/lib/fa/google'
import FaFacebook from 'react-icons/lib/fa/facebook'
import { DialogContent, DialogTitle } from 'material-ui/Dialog'

import './ConnectionModal.scss'

class ConnectionModal extends Component {
  authenticateWithGoogle = () => {
    this.props.firebase.login({
      provider: 'google',
      type: 'popup',
    })
  }

  authenticateWithFacebook = () => {
    this.props.firebase.login({
      provider: 'facebook',
      type: 'popup',
    })
  }

  render() {
    return (
      <Fragment>
        <DialogTitle>Connexion</DialogTitle>
        <DialogContent className="auth-btns-container">
          <Button color="primary" onClick={this.authenticateWithGoogle} variant="raised">
            <FaGoogle />&nbsp; Connexion avec Google
          </Button>

          <Button color="secondary" onClick={this.authenticateWithFacebook} variant="raised">
            <FaFacebook />&nbsp; Connexion avec Facebook
          </Button>
        </DialogContent>
      </Fragment>
    )
  }
}

ConnectionModal.propTypes = {
  firebase: PropTypes.shape({
    login: PropTypes.func.isRequired,
  }).isRequired,
}

export default ConnectionModal
