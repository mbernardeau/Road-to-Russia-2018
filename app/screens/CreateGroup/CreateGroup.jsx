import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import FormHelperText from '@material-ui/core/FormHelperText'
import FormControl from '@material-ui/core/FormControl'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'

import CurrencyFormat from './CurrencyFormat'

import GroupCreateStatus from './GroupCreateStatus'

import './CreateGroup.scss'

class CreateGroup extends Component {
  state = {
    price: '',
    name: '',
  }

  getNameErrorMessage = name => {
    if ((name.length > 0) && (name.length < 5)) {
      return '5 caractères minimum'
    }
    return undefined
  }

  createGroup = () => {
    const { name, price } = this.state
    this.props.createGroup({ name, price: Number(price) })
    this.setState({ name: '', price: '' })
  }

  isFormValid = () =>
    this.state.name && !this.getNameErrorMessage(this.state.name)

  handleNameChange = e => {
    this.setState({
      name: e.target.value,
      errorName: this.getNameErrorMessage(e.target.value),
    })
  }

  handlePriceChange = e => {
    this.setState({
      price: e.target.value,
    })
  }

  render() {
    const { price, name, errorName } = this.state

    return (
      <div className="create-group-container">
        <Card className="create-group-card">
          <Typography gutterBottom variant="title">
            Créez une tribu
          </Typography>
          <br />
          <Typography gutterBottom type="subheading">
            Créez une tribu pour vous confrontez à vos amis, collègues, familles...
          </Typography>
          <br />
          <Typography gutterBottom type="body1">
            Il est possible de créer des tribus gratuites. Pour les tributs payantes, le prix
            est libre.
          </Typography>

          <CardContent className="create-group-content">
            <FormControl className="create-group-field" error={!!errorName}>
              <TextField
                required
                label="Nom de la tribu"
                value={name}
                onChange={this.handleNameChange}
              />
              {errorName && <FormHelperText>{errorName}</FormHelperText>}
            </FormControl>

            <FormControl className="create-group-field">
              <TextField
                label="Prix à payer par personne"
                value={price}
                onChange={this.handlePriceChange}
                InputProps={{
                  inputComponent: CurrencyFormat,
                }}
              />
            </FormControl>
          </CardContent>

          <CardActions className="create-group-card-action">
            <Button
              disabled={!this.isFormValid()}
              onClick={this.createGroup}
              color="primary"
              variant="raised"
            >
              Envoyer la demande
            </Button>
          </CardActions>

          <GroupCreateStatus />
        </Card>
      </div>
    )
  }
}

CreateGroup.propTypes = {
  createGroup: PropTypes.func.isRequired,
}

export default CreateGroup
