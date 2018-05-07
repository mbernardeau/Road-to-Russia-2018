import React from 'react'
import PropTypes from 'prop-types'

import moment from 'moment'
import Tooltip from 'material-ui/Tooltip'

import StadiumTooltip from './StadiumTooltip'

const containerStyles = {
  marginTop: '10px',
  color: 'darkgray',
  display: 'flex',
  justifyContent: 'space-around',
  fontSize: '0.9em',
  textShadow: '0 1px 0 rgba(0,0,0,.1)',
}

const MatchInfos = ({ match, stadium }) => {
  const dateTime = moment(match.dateTime)

  return (
    <div style={containerStyles}>
      <Tooltip title={dateTime.format('LLL')} disableTriggerTouch>
        <div>{dateTime.fromNow()}</div>
      </Tooltip>
      <div>•</div>
      <Tooltip title={<StadiumTooltip {...stadium} />} disableTriggerTouch>
        <div>{stadium.name}</div>
      </Tooltip>
      <div>•</div>
      <Tooltip title={<StadiumTooltip {...stadium} />} placement="left" disableTriggerTouch>
        <div>{stadium.city}</div>
      </Tooltip>
    </div>
  )
}

MatchInfos.defaultProps = {
  match: {
    dateTime: 0,
  },
  stadium: {},
}

MatchInfos.propTypes = {
  match: PropTypes.shape({
    dateTime: PropTypes.number.isRequired,
  }),
  stadium: PropTypes.shape({
    name: PropTypes.string,
    city: PropTypes.string,
  }),
}

export default MatchInfos
