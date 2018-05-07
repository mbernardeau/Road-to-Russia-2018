import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Button from 'material-ui/Button'
import FaGoogle from 'react-icons/lib/fa/google'
import FaFacebook from 'react-icons/lib/fa/facebook'
import { DialogContent, DialogTitle } from 'material-ui/Dialog'

class ConnectionModal extends Component {
  static propTypes = {
    firebase: PropTypes.shape({
      login: PropTypes.func.isRequired,
    }).isRequired,
  }

  constructor(props) {
    super(props)
    this.authenticateWithGoogle = this.authenticateWithGoogle.bind(this)
    this.authenticateWithFacebook = this.authenticateWithFacebook.bind(this)
  }

  authenticateWithGoogle() {
    this.props.firebase.login({
      provider: 'google',
      type: 'popup',
    })
  }

  authenticateWithFacebook() {
    this.props.firebase.login({
      provider: 'facebook',
      type: 'popup',
    })
  }

  render() {
    return [
      <DialogTitle key="title">Connexion</DialogTitle>,
      <DialogContent key="content" style={styles.container}>
        <Button style={styles.button} color="primary" onClick={this.authenticateWithGoogle} raised>
          <FaGoogle />&nbsp; Connexion avec Google
        </Button>

        <Button style={styles.button} color="accent" onClick={this.authenticateWithFacebook} raised>
          <FaFacebook />&nbsp; Connexion avec Facebook
        </Button>
      </DialogContent>,
    ]
  }
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 15,
  },

  button: {
    marginBottom: 10,
  },
}

export default ConnectionModal
