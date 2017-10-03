import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  map,
  pickBy,
  keys,
  includes,
  size,
} from 'lodash';

import Button from 'material-ui/Button';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import { MenuItem } from 'material-ui/Menu';
import Select from 'material-ui/Select';
import Snackbar from 'material-ui/Snackbar';
import IconButton from 'material-ui/IconButton';
import CloseIcon from 'material-ui-icons/Close';
import { FormControl, FormHelperText } from 'material-ui/Form';

class JoinGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: '',
    };
  }

  handleSelection = (event) => {
    this.setState({
      selected: event.target.value,
    });
  }

  handleRequestClose = () => {
    this.setState({
      sent: false,
    });
  }

  applyInGroup = () => {
    if (this.state.selected) {
      this.props.applyInGroup(this.props.uid, this.state.selected);
      this.setState({ selected: '', sent: true });
    }
  }

  render() {
    const groups = pickBy(this.props.groups, (g) => !includes(keys(g.awaitingMembers), this.props.uid));

    return (
      <Card style={styles.fields}>
        <h2>Rejoindre un groupe</h2>
        <CardContent style={styles.content}>
          <FormControl disabled={!size(groups)} fullWidth>
            <Select
              value={this.state.selected}
              onChange={this.handleSelection}
              fullWidth
            >
              {map(groups, (value, key) =>
                <MenuItem key={key} value={key}>{value.name}</MenuItem>
              )}
            </Select>
          </FormControl>
          <FormHelperText>Rechercher un groupe</FormHelperText>
        </CardContent>

        <CardActions>
          <Button
            style={styles.button}
            disabled={!this.state.selected}
            onClick={this.applyInGroup}
            color="primary"
            raised
          >
            Envoyer la demande
          </Button>
        </CardActions>

        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={this.state.sent}
          autoHideDuration={6000}
          onRequestClose={this.handleRequestClose}
          SnackbarContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">Demande envoyée</span>}
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              onClick={this.handleRequestClose}
            >
              <CloseIcon />
            </IconButton>,
          ]}
        />
      </Card>
    );
  }
}

const styles = {
  fields: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '90%',
  },

  content: {
    width: '90%',
  },
};

JoinGroup.propTypes = {
  groups: PropTypes.objectOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
    })
  ),
  applyInGroup: PropTypes.func.isRequired,
  uid: PropTypes.string.isRequired,
};

export default JoinGroup;
