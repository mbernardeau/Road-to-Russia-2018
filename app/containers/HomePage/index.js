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

import React from 'react';

import {
  Link,
} from 'react-router-dom';

export default class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <p>Ceci sera la page d&lsquo;accueil.</p>
        <div>Disponibles:
          <ul>
            <li><Link to="/stadiums">Stades</Link></li>
            <li><Link to="/matches">Matches</Link></li>
          </ul>
        </div>
      </div>
    );
  }
}
