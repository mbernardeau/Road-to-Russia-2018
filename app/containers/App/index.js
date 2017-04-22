/**
 *
 * App.react.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React, {
  Component,
} from 'react';
import AppBar from 'material-ui/AppBar';
import Dialog from 'material-ui/Dialog';
import firebase from 'firebase';
import ConnectionModal from './ConnectionModal';

export default class App extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    children: React.PropTypes.node,
  };

  constructor(props) {
    super(props);
    this.state = {
      connected: false,
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => this.setState({
      connected: !!user,
      user,
    }));
  }

  render() {
    return (
      <div>
        <AppBar
          title="Road to Russia 2018"
        />
        <Dialog
          title="Connexion"
          modal={false}
          open={!this.state.connected}
          onRequestClose={this.handleClose}
        >
          <ConnectionModal />
        </Dialog>
        <div>
          <pre>{JSON.stringify(this.state.user)}</pre>
          {React.Children.toArray(this.props.children)}
        </div>
      </div>
    );
  }
}
