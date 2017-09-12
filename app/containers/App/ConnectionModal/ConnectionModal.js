import React, {
  Component,
} from 'react';
import PropTypes from 'prop-types';

import RaisedButton from 'material-ui/RaisedButton';
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
        <RaisedButton
          label="Connexion avec Google"
          labelPosition="after"
          style={styles.button}
          primary
          onClick={this.authenticateWithGoogle}
          icon={<FaGoogle />}
        />
        <RaisedButton
          label="Connexion avec Facebook"
          labelPosition="after"
          style={styles.button}
          secondary
          onClick={this.authenticateWithFacebook}
          icon={<FaFacebook />}
        />
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
