import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { map } from 'lodash'
import Tabs, { Tab } from 'material-ui/Tabs'
import AppBar from 'material-ui/AppBar'
import { onlyUpdateForPropTypes } from 'recompose'

import MatchValidation from './MatchValidation'

import './matches.scss'

class Matches extends Component {
  state = { selectedTab: 0 }

  handleTabChange = (event, value) => {
    this.setState({ selectedTab: value })
  }

  render() {
    const { finishedMatches, futureMatches } = this.props
    const { selectedTab } = this.state
    const matches = selectedTab === 0 ? futureMatches : finishedMatches

    return (
      <Fragment>
        <AppBar position="fixed" className="matches-tab-bar">
          <Tabs value={selectedTab} onChange={this.handleTabChange} centered>
            <Tab label="En cours" />
            <Tab label="Terminés" />
          </Tabs>
        </AppBar>
        <div className="matches-container">
          {map(matches, (match, key) => <MatchValidation match={match} key={key} matchId={key} />)}
        </div>
      </Fragment>
    )
  }
}

Matches.propTypes = {
  finishedMatches: PropTypes.objectOf(PropTypes.object),
  futureMatches: PropTypes.objectOf(PropTypes.object),
}

export default onlyUpdateForPropTypes(Matches)
