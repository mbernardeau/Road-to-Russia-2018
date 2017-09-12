import React from 'react';
import PropTypes from 'prop-types';

import moment from 'moment';
import ReactTooltip from 'react-tooltip';

import StadiumTooltip from './StadiumTooltip';

const containerStyles = {
  marginTop: '10px',
  color: 'darkgray',
  display: 'flex',
  justifyContent: 'space-around',
  fontSize: '0.9em',
  textShadow: '0 1px 0 rgba(0,0,0,.1)',
};

const dateTimeId = (matchId) => `tt-dateTime${matchId}`;
const stadiumId = (matchId) => `tt-stadium${matchId}`;

const MatchInfos = ({ match, matchId }) => {
  const dateTime = moment.unix(match.dateTime);

  return (
    <div style={containerStyles}>
      <div data-tip data-for={dateTimeId(matchId)}>{ dateTime.fromNow() }</div>
      <ReactTooltip id={dateTimeId(matchId)} effect="solid" type="info" getContent={() => dateTime.format('LLL')} />
      <div>•</div>
      <div data-tip data-for={stadiumId(matchId)}>
        { match.stadium.name }
      </div>
      <div>•</div>
      <div data-tip data-for={stadiumId(matchId)} data-place="left">
        { match.stadium.city }
      </div>
      <ReactTooltip id={stadiumId(matchId)} effect="solid" type="info" getContent={() => <StadiumTooltip stadium={match.stadium} />} />
    </div>
  );
};

MatchInfos.propTypes = {
  match: PropTypes.shape({
    dateTime: PropTypes.number.isRequired,
    stadium: PropTypes.shape({
      name: PropTypes.string.isRequired,
      city: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  matchId: PropTypes.string.isRequired,
};

export default MatchInfos;
