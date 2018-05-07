import React, { Component } from 'react'

import PropTypes from 'prop-types'

import Drawer from 'material-ui/Drawer'
import Divider from 'material-ui/Divider'
import List, { ListItem, ListItemText } from 'material-ui/List'

import WorldCupImg from 'assets/2018_FIFA_WC.svg'

const styles = {
  image: {
    width: '100%',
    marginBottom: 3,
  },
}

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
  }

  goTo = to => () => {
    if (this.props.history.location.pathname !== to) {
      this.props.history.push(to)
    }
    this.props.closeMenu()
  }

  render() {
    return (
      <Drawer open={this.props.open} onClose={() => this.props.closeMenu()}>
        <List>
          <ListItem button onClick={this.goTo('/')}>
            <img src={WorldCupImg} style={styles.image} alt="Accueil" />
          </ListItem>
          <Divider />
          <ListItem button onClick={this.goTo('/matches')}>
            <ListItemText primary="Paris" />
          </ListItem>
          <ListItem button onClick={this.goTo('/ranking')}>
            <ListItemText primary="Classement" />
          </ListItem>
          <ListItem button onClick={this.goTo('/matchesvalidation')}>
            <ListItemText primary="Validation des matchs" />
          </ListItem>
          <ListItem button onClick={this.goTo('/groups')}>
            <ListItemText primary="Groupes" />
          </ListItem>
          <ListItem button onClick={this.goTo('/stadiums')}>
            <ListItemText primary="Stades" />
          </ListItem>
          <ListItem button onClick={this.goTo('/creategroup')}>
            <ListItemText primary="Creation groupe" />
          </ListItem>
        </List>
      </Drawer>
    )
  }
}
