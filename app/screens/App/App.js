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
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'

import HomePage from 'screens/HomePage/Loadable'
import StadiumsPage from 'screens/Stadiums/Loadable'
import GroupsPage from 'screens/Groups/Loadable'
import RankingPage from 'screens/Ranking/Loadable'
import CreateGroupPage from 'screens/CreateGroup/Loadable'
import MatchesPage from 'screens/Matches/Loadable'
import RulesPage from 'screens/Rules/Loadable'
import FAQPage from 'screens/FAQ/Loadable'
import MatchesValidationPage from 'screens/MatchesValidation/Loadable'
import AdminGroupsPage from 'screens/AdminGroups/Loadable'
import ValidInscriptionPage from 'screens/ValidInscription/Loadable'
import NotFoundPage from 'screens/NotFoundPage'

import { isEmpty } from 'react-redux-firebase'

import { Switch, Route } from 'react-router-dom'
import NavigationMenu from './NavigationMenu'
import ConnectionWidget from './ConnectionWidget'

import './App.scss'

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
          <Toolbar className="app-toolbar">
            <IconButton color="inherit" aria-label="Menu" onClick={toggleMenu}>
              <MenuIcon />
            </IconButton>
            <div className="app-toolbar-title">
              <Typography variant="headline" color="inherit">
                Road to Russia 2018
              </Typography>
            </div>
            <ConnectionWidget />
          </Toolbar>
        </AppBar>

        <NavigationMenu />

        <div className="app-content">
          {!isEmpty(user) && (
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route path="/stadiums" component={StadiumsPage} />
              <Route path="/matches" component={MatchesPage} />
              <Route path="/matchesvalidation" component={MatchesValidationPage} />
              <Route path="/ranking" component={RankingPage} />
              <Route path="/groups" component={GroupsPage} />
              <Route path="/rules" component={RulesPage} />
              <Route path="/faq" component={FAQPage} />
              <Route path="/creategroup" component={CreateGroupPage} />
              <Route path="/admingroups" component={AdminGroupsPage} />
              <Route path="/validinscription" component={ValidInscriptionPage} />
              <Route component={NotFoundPage} />
            </Switch>
          )}
        </div>
      </Fragment>
    )
  }
}

export default App
