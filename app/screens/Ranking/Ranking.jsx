import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

import Tabs, { Tab } from 'material-ui/Tabs'
import AppBar from 'material-ui/AppBar'

import GroupRanking from './GroupRanking'

import './ranking.scss'

class Ranking extends Component {
  state = { selectedTab: 0 }

  handleTabChange = (event, value) => {
    this.setState({ selectedTab: value })
  }

  render() {
    const { groups } = this.props
    const { selectedTab } = this.state

    return (
      <Fragment>
        <AppBar position="fixed" className="ranking-tab-bar">
          <Tabs value={selectedTab} onChange={this.handleTabChange} centered>
            {groups.map(group => <Tab key={group.id} label={group.name} />)}
          </Tabs>
        </AppBar>
        <div className="ranking-container">
          {groups.map(group => <GroupRanking key={group.id} {...group} />)}
        </div>
      </Fragment>
    )
  }
}

Ranking.defaultProps = {
  groups: [],
}

Ranking.propTypes = {
  groups: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  ),
}

export default Ranking
