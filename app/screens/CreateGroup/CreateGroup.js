import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Button from 'material-ui/Button'
import Card from 'material-ui/Card'
import CardActions from 'material-ui/Card/CardActions'
import CardContent from 'material-ui/Card/CardContent'
import { FormControl, FormHelperText } from 'material-ui/Form'
import TextField from 'material-ui/TextField'
import Typography from 'material-ui/Typography'

import NumberFormatCustom from './NumberFormatCustom'

import GroupApplyOkSnackBar from './CreateGroupApplyOkSnackBar'

import './CreateGroup.scss'

class CreateGroup extends Component {
  state = {}

  getNameErrorMessage = name => {
    if (!name || name.length < 5) {
      return 'Obligatoire'
    }
    return undefined
  }

  getPriceErrorMessage = price => {
    if (price && price < 5) {
      return '5€ minimum'
    }
    return undefined
  }

  createGroup = () => {
    const { name, price } = this.state
    this.props.createGroup({ name, price: Number(price) })
    this.setState({ sent: true })
  }

  handleRequestClose = () => {
    this.setState({
      sent: false,
    })
  }

  isFormValid = () =>
    !this.getPriceErrorMessage(this.state.price) && !this.getNameErrorMessage(this.state.name)

  handleNameChange = e => {
    this.setState({
      name: e.target.value,
      errorName: this.getNameErrorMessage(e.target.value),
    })
  }

  handlePriceChange = e => {
    this.setState({
      price: e.target.value,
      errorPrice: this.getPriceErrorMessage(e.target.value),
    })
  }

  render() {
    const { price, name, errorPrice, errorName } = this.state

    return (
      <div style={styles.container}>
        <Card>
          <Typography gutterBottom variant="title">
            Créez un groupe
          </Typography>
          <br />
          <Typography gutterBottom type="subheading">
            Créez un groupe pour vous confrontez à vos amis, collègues, familles...
          </Typography>

          <CardContent className="create-group-content">
            <FormControl className="create-group-field" error={errorName}>
              <TextField label="Nom de la tribu" value={name} onChange={this.handleNameChange} />
              {errorName && <FormHelperText>{errorName}</FormHelperText>}
            </FormControl>

            <FormControl
              className="create-group-field"
              error={errorPrice}
              aria-describedby="price-error-text"
            >
              <TextField
                label="Prix à payer par personne"
                value={price}
                onChange={this.handlePriceChange}
                InputProps={{
                  inputComponent: NumberFormatCustom,
                }}
              />
              {errorPrice && <FormHelperText id="price-error-text">{errorPrice}</FormHelperText>}
            </FormControl>
          </CardContent>

          <CardActions>
            <Button
              disabled={!this.isFormValid()}
              onClick={this.createGroup}
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
      </div>
    )
  }
}

CreateGroup.propTypes = {
  createGroup: PropTypes.func.isRequired,
}

const styles = {
  container: {
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}

export default CreateGroup
