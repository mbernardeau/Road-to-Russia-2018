import React from 'react'
import Typography from 'material-ui/Typography'

import FaqEntry from './FaqEntry'

import './FAQ.scss'

// eslint-disable-next-line react/prefer-stateless-function
export default class FAQPage extends React.PureComponent {
  render() {
    return (
      <div className="faq-page-div">
        <p className="faq-speech">
          <Typography>
            Cette page référence les questions fréquentes que vous pourrez vous posez sur
            l&apos;utilisation du site
          </Typography>
        </p>
        <FaqEntry
          question="Qu’est-ce que c’est ?"
          answer="Un site qui vous permet de jouer avec les pronostics du Mondial, les trois premiers de chaque tribu se verra attribuer une récompense à la fin de la Coupe du Monde."
        />
        <FaqEntry
          question="Comment participer ?"
          answer="Créer votre tribu via l&apos;onglet correspondant, entrez votre nom d’équipe, invitez
          vos proches, et vous voilà prêts à pronostiquer sur l&apos;issue des matchs."
        />
        <FaqEntry
          question="Paiement Obligatoire ?"
          answer="Dans l&apos;absolu, non. Vous pouvez jouer sans miser, cependant vous ne participerez
          pas à l&apos;élection de la tribu gagnante pour remporter le prix. Chaque Tribu fixe
          son prix d’entrée, et le chef de tribu choisi comment les gains seront redistribués
          aux membres de son équipe."
        />
        <FaqEntry
          question="Que remporte le tribu gagnant ?"
          answer="Déduction faite des dons à l’association PAM, le tribu gagnant se verra congratulé de
          la moitié des gains misés par la totalité des autres participants."
        />
        <FaqEntry
          question="Comment créer une Tribu ?"
          answer="Via page page dédiée à cet effet. Entrez votre nom d&apos;équipe, le montant que vous
          souhaitez miser par personne, et bienvenue dans l&apos;aventure."
        />
        <FaqEntry
          question="Comment rejoindre une Tribu ?"
          answer="Le chef de tribu recevra une notification sur votre demande. Une fois accepté, vous
          recevrez un code afin de vous acquitter du montant demandé pour rejoindre le groupe."
        />
        <FaqEntry
          question="Comment fait-on pour changer de compte Facebook ou Google ?"
          answer="Il faut changer de compte Google ou Facebook avec le navigateur ou le smartphone avant
          de se connecter sur le site internet ou l&apos;application."
        />
      </div>
    )
  }
}
