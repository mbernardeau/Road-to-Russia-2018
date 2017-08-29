import React, { Component } from 'react';
import { isEmpty } from 'react-redux-firebase';
import PropTypes from 'prop-types';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import ConnectionModal from '../ConnectionModal';
import User from './User';

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
      <div className={styles.container}>
        <Dialog
          title="Connexion"
          modal={false}
          onRequestClose={this.handleClose}
          open={this.state.modalOpened}
        >
          <ConnectionModal />
        </Dialog>

        {!isEmpty(user) &&
          <User />
        }

        {isEmpty(user) &&
          <FlatButton
            label="Se connecter"
            labelStyle={{ color: 'white', fontSize: 16 }}
            onClick={this.openConnectionModal}
          />
        }
      </div>
    );
  }
}

export default ConnectionWidget;
