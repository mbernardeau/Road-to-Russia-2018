import React from 'react'
import PropTypes from 'prop-types'

import { map } from 'lodash'

import Typography from '@material-ui/core/Typography'

const DisplayPrice = ({ groups, userId }) => {
  let somme = 0
  let texte

  map(groups, group =>
    map(group.awaitingMembers, (test, index) => index === userId && (somme += group.price)),
  )

  if (somme !== 0)
    texte = (
      /* Erreur si rajout du saut de ligne */  
      //<br />
      
      <Typography gutterBottom variant="subheading">
        Vous encore devez <b>{somme}€ </b> sur le site de la{' '}
        <a title="Site cagnotte" href="https://www.paypal.com/pools/c/84gsKV8QG8" target="_blank">
          cagnotte
        </a>{' '}
        pour règler votre(vos) inscription(s).
      </Typography>
    )
  else texte = null

  return texte
}

DisplayPrice.propTypes = {
  groups: PropTypes.objectOf(PropTypes.shape({})),
  userId: PropTypes.string.isRequired,
}

export default DisplayPrice
