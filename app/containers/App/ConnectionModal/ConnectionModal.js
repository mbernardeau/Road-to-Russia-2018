import React, {
    Component,
} from 'react';

import firebase from 'firebase';
import RaisedButton from 'material-ui/RaisedButton';
import FaGoogle from 'react-icons/lib/fa/google';

import styles from './ConnectionModal.scss';

class ConnectionModal extends Component {
  firebaseAuthPopup() {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
  }

  render() {
    return (
      <div className={styles.connectionContainer}>
        <RaisedButton
          label="Connexion avec Google"
          labelPosition="after"
          primary
          onClick={this.firebaseAuthPopup}
          icon={<FaGoogle />}
        />
      </div>
    );
  }
}

export default ConnectionModal;
