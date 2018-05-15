import React from 'react'
import PropTypes from 'prop-types'
import ExpansionPanel, {
  ExpansionPanelSummary,
  ExpansionPanelDetails,
} from 'material-ui/ExpansionPanel'
import Typography from 'material-ui/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

import './FaqEntry.scss'

const FaqEntry = ({ question, answer }) => (
  <ExpansionPanel>
    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
      <Typography className="faqentry-question">{question}</Typography>
    </ExpansionPanelSummary>
    <ExpansionPanelDetails>
      <Typography className="faqentry-answer">{answer}</Typography>
    </ExpansionPanelDetails>
  </ExpansionPanel>
)

FaqEntry.propTypes = {
  question: PropTypes.string.isRequired,
  answer: PropTypes.string.isRequired,
}

export default FaqEntry
