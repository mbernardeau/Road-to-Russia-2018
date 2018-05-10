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
          Cette page référence les questions fréquentes que vous pourrez vous posez sur l&apos;utilisation du site
        </p>
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className="faq-question">Comment fait-on pour changer de compte Facebook ou Google ?</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography className="faq-response">
              Il faut changer de compte Google ou Facebook avec le navigateur ou le smartphone avant de se connecter sur le
              site internet ou l&apos;application. 
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    )
  }
}
