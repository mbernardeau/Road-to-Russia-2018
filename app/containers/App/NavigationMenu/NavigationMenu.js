import React, {
  Component,
} from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  closeMenu,
} from 'redux/actions';

import Drawer from 'material-ui/Drawer';
import Divider from 'material-ui/Divider';
import List, { ListItem, ListItemText } from 'material-ui/List';
import { withRouter } from 'react-router';

import WorldCupImg from 'assets/2018_FIFA_WC.svg';

const imgStyle = {
  width: '100%',
  marginBottom: 3,
};

@connect(
  // Map state to props
  ({ nav }) => ({
    ...nav,
  }),
  (dispatch) => ({
    closeMenu: () => dispatch(closeMenu()),
  })
)
@withRouter
export default class NavigationMenu extends Component {
  static propTypes = {
    open: PropTypes.bool.isRequired,
    closeMenu: PropTypes.func.isRequired,
    history: PropTypes.shape({
      location: PropTypes.shape({
        pathname: PropTypes.string.isRequired,
      }).isRequired,
      push: PropTypes.func.isRequired,
    }).isRequired,
  };

  goTo = (to) => () => {
    if (this.props.history.location.pathname !== to) {
      this.props.history.push(to);
    }
    this.props.closeMenu();
  }

  render() {
    return (
      <Drawer open={this.props.open} onRequestClose={() => this.props.closeMenu()}>
        <List>
          <ListItem button onClick={this.goTo('/')}>
            <img src={WorldCupImg} style={imgStyle} alt="Accueil" />
          </ListItem>
          <Divider />
          <ListItem button onClick={this.goTo('/stadiums')}>
            <ListItemText primary="Stades" />
          </ListItem>
          <ListItem button onClick={this.goTo('/matches')}>
            <ListItemText primary="Matches" />
          </ListItem>
        </List>
      </Drawer>
    );
  }
}
