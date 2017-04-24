import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import ConnectionModal from '../ConnectionModal';

import styles from './ConnectionWidget.scss';

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

        {user && 'Connected'}
        {!user && <FlatButton label="Se connecter" className={styles.text} onClick={this.openConnectionModal} />}
      </div>
    );
  }
}

export default ConnectionWidget;
