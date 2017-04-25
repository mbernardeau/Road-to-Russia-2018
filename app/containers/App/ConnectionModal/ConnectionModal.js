import React, {
  Component,
} from 'react';
import { firebaseConnect } from 'react-redux-firebase';
import PropTypes from 'prop-types';

import RaisedButton from 'material-ui/RaisedButton';
import FaGoogle from 'react-icons/lib/fa/google';
import FaFacebook from 'react-icons/lib/fa/facebook';
import styles from './ConnectionModal.scss';

@firebaseConnect()
class ConnectionModal extends Component {
  static propTypes = {
    firebase: PropTypes.shape({
      login: PropTypes.func.isRequired,
    }).isRequired,
  };

  constructor(props) {
    super(props);
    this.authenticateWithGoogle = this.authenticateWithGoogle.bind(this);
    this.authenticateWithFacebook = this.authenticateWithFacebook.bind(this);
  }

  authenticateWithGoogle() {
    this.props.firebase.login({
      provider: 'google',
      type: 'popup',
    });
  }

  authenticateWithFacebook() {
    this.props.firebase.login({
      provider: 'facebook',
      type: 'popup',
    });
  }

  render() {
    return (
      <div className={styles.connectionContainer}>
        <RaisedButton
          label="Connexion avec Google"
          labelPosition="after"
          style={{ marginBottom: 10 }}
          primary
          onClick={this.authenticateWithGoogle}
          icon={<FaGoogle />}
        />
        <RaisedButton
          label="Connexion avec Facebook"
          labelPosition="after"
          secondary
          onClick={this.authenticateWithFacebook}
          icon={<FaFacebook />}
        />
      </div>
    );
  }
}

export default ConnectionModal;
