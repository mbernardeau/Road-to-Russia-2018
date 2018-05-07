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

import React, { Fragment } from 'react'

import PropTypes from 'prop-types'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import IconButton from 'material-ui/IconButton'
import MenuIcon from 'material-ui-icons/Menu'
import Radium from 'radium'

import HomePage from 'screens/HomePage/Loadable'
import StadiumsPage from 'screens/Stadiums/Loadable'
import GroupsPage from 'screens/Groups/Loadable'
import RankingPage from 'screens/Ranking/Loadable'
import CreateGroupPage from 'screens/CreateGroup/Loadable'
import MatchesPage from 'screens/Matches/Loadable'
import MatchesValidationPage from 'screens/MatchesValidation/Loadable'
import NotFoundPage from 'screens/NotFoundPage'

import { isEmpty } from 'react-redux-firebase'

import { Switch, Route } from 'react-router-dom'
import NavigationMenu from './NavigationMenu'
import ConnectionWidget from './ConnectionWidget'

// eslint-disable-next-line react/prefer-stateless-function
class App extends React.Component {
  static propTypes = {
    user: PropTypes.object,
    toggleMenu: PropTypes.func.isRequired,
  }

  render() {
    const { user, toggleMenu } = this.props

    return (
      <Fragment>
        <AppBar>
          <Toolbar style={styles.toolbar}>
            <IconButton color="inherit" aria-label="Menu" onClick={toggleMenu}>
              <MenuIcon />
            </IconButton>
            <div style={styles.appbarTitle}>
              <Typography variant="title" color="inherit">
                Road to Russia 2018
              </Typography>
            </div>
            <ConnectionWidget />
          </Toolbar>
        </AppBar>

        <NavigationMenu />

        <div style={styles.content}>
          {!isEmpty(user) && (
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route path="/stadiums" component={StadiumsPage} />
              <Route path="/matches" component={MatchesPage} />
              <Route path="/matchesvalidation" component={MatchesValidationPage} />
              <Route path="/ranking" component={RankingPage} />
              <Route path="/groups" component={GroupsPage} />
              <Route path="/creategroup" component={CreateGroupPage} />
              <Route component={NotFoundPage} />
            </Switch>
          )}
        </div>
      </Fragment>
    )
  }
}

const styles = {
  toolbar: {
    justifyContent: 'space-between',
  },

  content: {
    paddingTop: 70,
  },

  appbarTitle: {
    '@media screen and (max-width: 390px)': {
      display: 'none',
    },
  },
}

export default Radium(App)
