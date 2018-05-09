import React from 'react'
import Typography from 'material-ui/Typography'
import Section from '../component/section'

const Subscription = () => (
  <Section>
    <Typography variant="display2">Droits d’inscription et mode de qualification</Typography>
    <Typography variant="display1">Mode de qualification</Typography>
    <p>
      Il n’y pas d’élimination, tout le monde participe aux pronostics de tous les matchs. Chacun
      des participants garde son nombre de points acquis durant toute la compétition.
    </p>
    <Typography variant="display1">Droits d’inscription</Typography>
    <p>
      Le prix est fixé pour chaque TRIBU déclarée. Il faut saffranchir du droit d’inscription pour
      activer son compte sur le site. 50 % du prix est reversé à l’association à but humanitaire
      PAM, et les 50 % restants pour la TRIBU choisie.
    </p>
    <Typography variant="display1">Date de validation des Pronostiques</Typography>
    <p>
      <b>
        Les pronostics pour chaque match doivent être remplis sur le site avant le début de ceux-ci.
      </b>
      En ce qui concerne, les pronostics sur le vainqueur de la compétition, ceux-ci doivent être
      réalisés avant le premier match de la compétition,
      <b> le Jeudi 14 Juin 2018 à 18h.</b>
      <br />
      <br />
      <b>
        <u>En cas de retard ou de non-réponse</u>
      </b>
      sur un match ou pour le bonus,
      <b>
        <u>
          le joueur aura 0 point mais ne sera pas éliminé et pourra donc participer aux autres
          matchs.
        </u>
      </b>
    </p>
  </Section>
)

export default Subscription
