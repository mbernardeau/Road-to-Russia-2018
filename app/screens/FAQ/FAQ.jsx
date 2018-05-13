import React from 'react'
import ExpansionPanel, {
  ExpansionPanelSummary,
  ExpansionPanelDetails,
} from 'material-ui/ExpansionPanel'
import Typography from 'material-ui/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

import './FAQ.scss'

// eslint-disable-next-line react/prefer-stateless-function
export default class FAQPage extends React.PureComponent {
  render() {
    return (
      <div className="faq-page-div">
        <p className="faq-speech">
          Cette page référence les questions fréquentes que vous pourrez vous posez sur
          l&apos;utilisation du site
        </p>
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className="faq-question">Qu’est-ce que c’est ?</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography className="faq-response">
              Un site qui vous permet de jouer avec les pronostics du Mondial, les trois premiers de
              chaque tribu se verra attribuer une récompense à la fin de la Coupe du Monde.
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className="faq-question">Comment participer ?</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography className="faq-response">
              Créer votre tribu via l&apos;onglet correspondant, entrez votre nom d’équipe, invitez
              vos proches, et vous voilà prêts à pronostiquer sur l&apos;issue des matchs
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className="faq-question">Paiement Obligatoire ?</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography className="faq-response">
              Dans l&apos;absolu, non. Vous pouvez jouer sans miser, cependant vous ne participerez
              pas à l&apos;élection de la tribu gagnante pour remporter le prix. Chaque Tribu fixe
              son prix d’entrée, et le chef de tribu choisi comment les gains seront redistribués
              aux membres de son équipe
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className="faq-question">Que remporte le tribu gagnant ?</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography className="faq-response">
              Déduction faite des dons à l’association PAM, le tribu gagnant se verra congratulé de
              la moitié des gains misés par la totalité des autres participants
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className="faq-question">Comment créer une Tribu ?</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography className="faq-response">
              Via page page dédiée à cet effet. Entrez votre nom d&apos;équipe, le montant que vous
              souhaitez miser par personne, et bienvenue dans l&apos;aventure
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className="faq-question">Comment rejoindre une Tribu ?</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography className="faq-response">
              Le chef de tribu recevra une notification sur votre demande. Une fois accepté, vous
              recevrez un code afin de vous acquitter du montant demandé pour rejoindre le groupe
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className="faq-question">
              Comment fait-on pour changer de compte Facebook ou Google ?
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography className="faq-response">
              Il faut changer de compte Google ou Facebook avec le navigateur ou le smartphone avant
              de se connecter sur le site internet ou l&apos;application.
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    )
  }
}
