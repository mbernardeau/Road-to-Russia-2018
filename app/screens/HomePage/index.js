/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react'
import Button from 'material-ui/Button'

import AccessAlarmIcon from '@material-ui/icons/AccessAlarm'
import PollIcon from '@material-ui/icons/Poll'
import ListIcon from '@material-ui/icons/List'

import myImage from '../../assets/visuels/bandeauEvenement2.jpg'

import './HomePage.scss'

export default class HomePage extends React.PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div className="home-page-div">
        <p>Bienvenue</p>
        <div className="home-buttons-div">
          <Button href="/rules" color="primary">
            <ListIcon className="icon-left" />
            Règles
          </Button>
          <Button href="/matches" color="primary">
            <AccessAlarmIcon className="icon-left" />
            Parier
          </Button>

          <Button href="/ranking" color="primary">
            <PollIcon className="icon-left" />
            Classement
          </Button>
        </div>

        <img alt="Home image" src={myImage} />
      </div>
    )
  }
}
