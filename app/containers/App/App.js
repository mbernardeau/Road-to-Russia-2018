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

import React from 'react';

import PropTypes from 'prop-types';
import AppBar from 'material-ui/AppBar';

import HomePage from 'containers/HomePage/Loadable';
import StadiumsPage from 'containers/Stadiums/Loadable';
import MatchesPage from 'containers/Matches/Loadable';
import NotFoundPage from 'containers/NotFoundPage';

import { isEmpty } from 'react-redux-firebase';

import { Switch, Route } from 'react-router-dom';
import NavigationMenu from './NavigationMenu';
import ConnectionWidget from './ConnectionWidget';

class App extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    user: PropTypes.object,
    toggleMenu: PropTypes.func.isRequired,
  };

  render() {
    const { user, toggleMenu } = this.props;

    return (
      <div>
        <AppBar
          title="Road to Russia 2018"
          onLeftIconButtonTouchTap={toggleMenu}
          iconElementRight={<ConnectionWidget />}
          style={{ position: 'fixed' }}
        />

        <NavigationMenu />

        <div style={{ paddingTop: 70 }}>
          {!isEmpty(user) &&
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route path="/stadiums" component={StadiumsPage} />
              <Route path="/matches" component={MatchesPage} />
              <Route component={NotFoundPage} />
            </Switch>
          }
        </div>
      </div>
    );
  }
}

export default App;
