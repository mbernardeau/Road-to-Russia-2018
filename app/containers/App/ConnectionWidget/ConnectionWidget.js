import React, { Component } from 'react';
import { connect } from 'react-redux';
import { pathToJS } from 'react-redux-firebase';
import PropTypes from 'prop-types';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import ConnectionModal from '../ConnectionModal';
import User from './User';

import styles from './ConnectionWidget.scss';

@connect(
  // Map state to props
  (state) => ({
    authError: pathToJS(state.get('firebase'), 'authError'),
    auth: pathToJS(state.get('firebase'), 'auth'),
    user: pathToJS(state.get('firebase'), 'profile'),
  })
)
class ConnectionWidget extends Component {
  static propTypes = {
    user: PropTypes.object,
  }

  constructor(props) {
    super(props);
    this.state = {
      modalOpened: false,
    };

    this.openConnectionModal = this.openConnectionModal.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user && this.state.modalOpened) {
      this.setState({
        modalOpened: false,
      });
    }
  }

  openConnectionModal() {
    this.setState({
      modalOpened: true,
    });
  }

  render() {
    const { user } = this.props;

    return (
      <div className={styles.text}>
        <Dialog
          title="Connexion"
          modal={false}
          onRequestClose={this.handleClose}
          open={this.state.modalOpened}
        >
          <ConnectionModal />
        </Dialog>

        {user && <User />}
        {!user && <FlatButton label="Se connecter" className={styles.text} onClick={this.openConnectionModal} />}
      </div>
    );
  }
}

export default ConnectionWidget;
