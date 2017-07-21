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

import { connect } from 'react-redux';
import { pathToJS } from 'react-redux-firebase';

import PropTypes from 'prop-types';
import AppBar from 'material-ui/AppBar';

import { toggleMenu } from 'redux/actions';

import NavigationMenu from './NavigationMenu';
import ConnectionWidget from './ConnectionWidget';

@connect(
  // Map state to props
  (state) => ({
    user: pathToJS(state.get('firebase'), 'profile'),
  }),
  (dispatch) => ({
    toggleMenu: () => dispatch(toggleMenu()),
  })
)
export default class App extends Component {
  static propTypes = {
    children: PropTypes.node,
    user: PropTypes.object,
    toggleMenu: PropTypes.func.isRequired,
  };

  render() {
    const { children, user } = this.props;

    return (
      <div>
        <AppBar
          title="Road to Russia 2018"
          onLeftIconButtonTouchTap={this.props.toggleMenu}
          iconElementRight={<ConnectionWidget />}
        />
        <NavigationMenu />
        <div>
          {!!user && React.Children.toArray(children)}
        </div>
      </div>
    );
  }
}
