import React, {
  Component,
} from 'react';
import PropTypes from 'prop-types';

import Button from 'material-ui/Button';
import FaGoogle from 'react-icons/lib/fa/google';
import FaFacebook from 'react-icons/lib/fa/facebook';

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
      <div style={styles.container}>
        <Button
          style={styles.button}
          primary
          onClick={this.authenticateWithGoogle}
          raised
        >
          <FaGoogle />&nbsp;
          Connexion avec Google
        </Button>

        <Button
          style={styles.button}
          secondary
          onClick={this.authenticateWithFacebook}
          raised
        >
          <FaFacebook />&nbsp;
          Connexion avec Facebook
        </Button>
      </div>
    );
  }
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },

  button: {
    marginBottom: 10,
  },
};

export default ConnectionModal;
