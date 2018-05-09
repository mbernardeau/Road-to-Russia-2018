import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Button from 'material-ui/Button'
import Card from 'material-ui/Card'
import CardActions from 'material-ui/Card/CardActions'
import CardContent from 'material-ui/Card/CardContent'
import TextField from 'material-ui/TextField'
import FormControl from 'material-ui/Form/FormControl'
import Typography from 'material-ui/Typography'

import GroupApplyStatus from './GroupApplyStatus'

import './JoinGroup.scss'

class JoinGroup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      code: '',
    }
  }

  handleSelection = event => {
    this.setState({
      code: event.target.value,
    })
  }

  applyInGroup = () => {
    if (this.state.code) {
      this.props.applyInGroup(this.state.code)
      this.setState({ code: '' })
    }
  }

  render() {
    const { code } = this.state

    return (
      <Card className="join-group-card">
        <Typography gutterBottom variant="headline">
          Rejoindre une tribu
        </Typography>
        <br />
        <Typography gutterBottom variant="subheading">
          Rejoignez une tribu pour vous confrontez à vos amis, collègues, familles...
        </Typography>

        <CardContent>
          <Typography gutterBottom variant="caption">
            Entrez le code qui vous a été fourni par l&apos;administrateur de la tribu
          </Typography>
          <FormControl>
            <TextField
              required
              id="join-group-code"
              label="Code"
              value={code}
              margin="normal"
              onChange={this.handleSelection}
            />
          </FormControl>
        </CardContent>

        <CardActions>
          <Button
            disabled={!this.state.code}
            onClick={this.applyInGroup}
            color="primary"
            variant="raised"
          >
            Envoyer la demande
          </Button>
        </CardActions>

        <GroupApplyStatus />
      </Card>
    )
  }
}

JoinGroup.propTypes = {
  applyInGroup: PropTypes.func.isRequired,
}

export default JoinGroup
