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
import {
  browserHistory,
} from 'react-router';

@connect(
  // Map state to props
  (state) => ({
    ...state.get('nav'),
  }),
  (dispatch) => ({
    closeMenu: () => dispatch(closeMenu()),
    setMenuStatus: (open) => dispatch(setMenuStatus(open)),
  })
)
export default class NavigationMenu extends Component {
  static propTypes = {
    open: PropTypes.bool.isRequired,
    closeMenu: PropTypes.func.isRequired,
    setMenuStatus: PropTypes.func.isRequired,
  };

  goTo = (to) => () => {
    if (browserHistory.getCurrentLocation().pathname !== to) {
      browserHistory.push(to);
    }
    this.props.closeMenu();
  }

  render() {
    return (
      <Drawer open={this.props.open} docked={false} onRequestChange={(open) => this.props.setMenuStatus(open)}>
        <MenuItem onClick={this.goTo('/')}>
          <strong>Accueil</strong>
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
