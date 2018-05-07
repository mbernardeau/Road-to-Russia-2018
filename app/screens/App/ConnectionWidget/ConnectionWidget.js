import React, { Component } from 'react'
import { isEmpty } from 'react-redux-firebase'
import PropTypes from 'prop-types'
import Button from 'material-ui/Button'
import Dialog from 'material-ui/Dialog'
import ConnectionModal from '../ConnectionModal'
import User from './User'

class ConnectionWidget extends Component {
  static propTypes = {
    user: PropTypes.object,
  }

  constructor(props) {
    super(props)
    this.state = {
      modalOpened: false,
    }

    this.openConnectionModal = this.openConnectionModal.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user && this.state.modalOpened) {
      this.setState({
        modalOpened: false,
      })
    }
  }

  openConnectionModal() {
    this.setState({
      modalOpened: true,
    })
  }

  render() {
    const { user } = this.props

    return (
      <div style={styles.container}>
        <Dialog title="Connexion" onRequestClose={this.handleClose} open={this.state.modalOpened}>
          <ConnectionModal />
        </Dialog>

        {!isEmpty(user) && <User />}

        {isEmpty(user) && (
          <Button style={styles.connectionLabel} onClick={this.openConnectionModal}>
            Se connecter
          </Button>
        )}
      </div>
    )
  }
}

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    height: '85%',
  },

  connectionLabel: {
    color: 'white',
    fontSize: 16,
  },
}

export default ConnectionWidget
