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

import EventAvailableIcon from '@material-ui/icons/EventAvailable'
import PollIcon from '@material-ui/icons/Poll'
import ListIcon from '@material-ui/icons/List'

import myImage from '../../assets/visuels/bandeauEvenement2.jpg'

import './HomePage.scss'

// eslint-disable-next-line react/prefer-stateless-function
export default class HomePage extends React.PureComponent {
  render() {
    return (
      <div className="home-page-div">
        <p className="home-speech">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam egestas porttitor
          sagittis. Cras quis nisl sit amet lorem volutpat condimentum. Nam ut augue vel nisi
          pharetra sagittis vel sed erat. Nunc id quam at justo vulputate ultricies. Ut a augue
          ante. Praesent sem libero, tincidunt sit amet sapien id, fermentum bibendum dolor.
          Curabitur varius elementum ultricies. Nunc ultrices eros sit amet nunc mattis, in cursus
          nisl commodo. Proin vitae rhoncus orci. Duis id risus pretium, gravida tortor in, maximus
          arcu. Etiam ac finibus tellus.
        </p>

        <div className="home-buttons-div">
          <div className="home-button-panel">
            <p>Lisez les règles du jeu :</p>
            <Button className="home-button" href="/rules" color="primary">
              <ListIcon className="icon-left" />
              Règles
            </Button>
          </div>
          <div className="home-button-panel">
            <p>Placez tous vos paris : </p>
            <Button className="home-button" href="/matches" color="primary">
              <EventAvailableIcon className="icon-left" />
              Parier
            </Button>
          </div>
          <div className="home-button-panel">
            <p>Découvrez votre classement et celui de vos potos : </p>
            <Button className="home-button" href="/ranking" color="primary">
              <PollIcon className="icon-left" />
              Classement
            </Button>
          </div>
        </div>
        <img alt="Home image" src={myImage} />

        <p>Créé par la team du mardi 8</p>
      </div>
    )
  }
}
