import React, { Component } from 'react'
import NumberFormat from 'react-number-format'
import PropTypes from 'prop-types'

import Button from 'material-ui/Button'
import Card from 'material-ui/Card'
import CardActions from 'material-ui/Card/CardActions'
import CardContent from 'material-ui/Card/CardContent'
import { FormControl, FormHelperText } from 'material-ui/Form'
import TextField from 'material-ui/TextField'
import Typography from 'material-ui/Typography'

import GroupApplyOkSnackBar from './CreateGroupApplyOkSnackBar'

import './CreateGroupComp.scss'

function NumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props

  return (
    <NumberFormat
      {...other}
      ref={inputRef}
      onValueChange={values => {
        onChange({
          target: {
            value: values.value,
          },
        })
      }}
      prefix="€"
    />
  )
}

NumberFormatCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
}

class CreateGroupComp extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: '',
      error: false,
      numberformat: '',
    }
  }

  handleSelection = event => {
    this.setState({
      selected: event.target.value,
    })
  }

  handleRequestClose = () => {
    this.setState({
      sent: false,
    })
  }

  applyInGroup = () => {
    if (this.state.selected) {
      this.props.applyInGroup(this.props.uid, this.state.selected)
      this.setState({ selected: '', sent: true })
    }
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    })
  }

  testPriceError = () => {
    this.setState({
      error: true,
    })
  }

  render() {
    const { numberformat } = this.state

    return (
      <Card>
        <Typography gutterBottom variant="title">
          Créez un groupe
        </Typography>
        <br />
        <Typography gutterBottom type="subheading">
          Créez un groupe pour vous confrontez à vos amis, collègues, familles...
        </Typography>

        <CardContent className="create-group-content">
          <FormControl className="create-group-field" error>
            <TextField label="Nom de la tribu" />
            <FormHelperText>Tribu déjà choisie</FormHelperText>
          </FormControl>

          <FormControl
            className="create-group-field"
            error={this.state.error}
            onChange={this.testPriceError}
            aria-describedby="price-error-text"
          >
            <TextField
              label="Prix à payer par personne"
              value={numberformat}
              onChange={this.handleChange('numberformat')}
              InputProps={{
                inputComponent: NumberFormatCustom,
              }}
            />
            <FormHelperText id="price-error-text">5€ minimum</FormHelperText>
          </FormControl>

          <FormControl className="create-group-field" error aria-describedby="mdp-error-text">
            <TextField label="Mot de passe" />
            <FormHelperText id="mdp-error-text">Mot de passe trop court</FormHelperText>
          </FormControl>
        </CardContent>

        <CardActions>
          <Button
            disabled={!this.state.selected}
            onClick={this.applyInGroup}
            color="primary"
            raised
          >
            Envoyer la demande
          </Button>
        </CardActions>

        <GroupApplyOkSnackBar open={this.state.sent} handleRequestClose={this.handleRequestClose} />
      </Card>
    )
  }
}

CreateGroupComp.propTypes = {
  applyInGroup: PropTypes.func.isRequired,
  uid: PropTypes.string.isRequired,
}

export default CreateGroupComp
