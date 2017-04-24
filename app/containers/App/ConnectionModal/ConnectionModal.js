import React, {
  Component,
} from 'react';
import PropTypes from 'prop-types';

import RaisedButton from 'material-ui/RaisedButton';
import FaGoogle from 'react-icons/lib/fa/google';

import styles from './ConnectionModal.scss';

class ConnectionModal extends Component {
  static propTypes = {
    authenticate: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.authenticateWithGoogle = this.authenticateWithGoogle.bind(this);
    this.authenticateWithFacebook = this.authenticateWithFacebook.bind(this);
  }

  authenticateWithGoogle() {
    this.props.authenticate('google');
  }

  authenticateWithFacebook() {
    this.props.authenticate('facebook');
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
