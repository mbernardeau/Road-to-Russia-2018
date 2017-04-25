import React, {
  Component,
} from 'react';
import { firebaseConnect } from 'react-redux-firebase';
import PropTypes from 'prop-types';

import RaisedButton from 'material-ui/RaisedButton';
import FaGoogle from 'react-icons/lib/fa/google';

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
    // this.props.authenticate('facebook');
  }

  render() {
    return (
      <div className={styles.connectionContainer}>
        <RaisedButton
          label="Connexion avec Google"
          labelPosition="after"
          primary
          onClick={this.authenticateWithGoogle}
          icon={<FaGoogle />}
        />
      </div>
    );
  }
}

export default ConnectionModal;
