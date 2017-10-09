import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { map } from 'lodash';

import Button from 'material-ui/Button';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import { MenuItem } from 'material-ui/Menu';
import Select from 'material-ui/Select';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Typography from 'material-ui/Typography';

import GroupApplyOkSnackBar from './GroupApplyOkSnackBar';

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
    const { groups, disabled } = this.props;

    return (
      <Card style={styles.fields}>

        <Typography gutterBottom type="headline">Rejoindre un groupe</Typography>
        <br />
        <Typography gutterBottom type="subheading">
          Rejoignez un groupe pour vous confrontez à vos amis, collègues, familles...
        </Typography>

        <CardContent style={styles.content}>
          <FormControl disabled={disabled} fullWidth>
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
          <FormHelperText>
            {disabled ?
              'Aucun groupe à rejoindre' :
              'Rechercher un groupe'
            }
          </FormHelperText>
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

        <GroupApplyOkSnackBar
          open={this.state.sent}
          handleRequestClose={this.handleRequestClose}
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
    marginBottom: 15,
    padding: 15,
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
  disabled: PropTypes.bool,
  applyInGroup: PropTypes.func.isRequired,
  uid: PropTypes.string.isRequired,
};

export default JoinGroup;
