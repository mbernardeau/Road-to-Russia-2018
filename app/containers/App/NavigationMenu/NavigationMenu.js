import React, {
  Component,
} from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  closeMenu,
  setMenuStatus,
} from 'redux/actions';

import Drawer from 'material-ui/Drawer';
import Divider from 'material-ui/Divider';
import MenuItem from 'material-ui/MenuItem';
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
    setMenuStatus: (open) => dispatch(setMenuStatus(open)),
  })
)
@withRouter
export default class NavigationMenu extends Component {
  static propTypes = {
    open: PropTypes.bool.isRequired,
    closeMenu: PropTypes.func.isRequired,
    setMenuStatus: PropTypes.func.isRequired,
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
      <Drawer open={this.props.open} docked={false} onRequestChange={(open) => this.props.setMenuStatus(open)}>
        <MenuItem onClick={this.goTo('/')}>
          <img src={WorldCupImg} style={imgStyle} alt="Accueil" />
        </MenuItem>
        <Divider />
        <MenuItem onClick={this.goTo('/stadiums')}>
          Stades
        </MenuItem>
        <MenuItem onClick={this.goTo('/matches')}>
          Matches
        </MenuItem>
      </Drawer>
    );
  }
}
