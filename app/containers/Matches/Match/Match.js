import React, {
  Component,
} from 'react';

import PropTypes from 'prop-types';
import moment from 'moment';
import _ from 'lodash';

import {
  Card,
  CardHeader,
} from 'material-ui/Card';

import {
  pathToJS,
  dataToJS,
  isLoaded,
  firebaseConnect,
} from 'react-redux-firebase';

import { connect } from 'react-redux';
import { compose } from 'redux';

import placeholder from 'components/Placeholder';

import Bet from './Bet';

import styles from './Match.scss';

const empty = {};

class Match extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bet: props.bet,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      bet: nextProps.bet || empty,
    });
  }

  isBetValid = () => {
    const scoreValidator = (score) => _.isNumber(score) && score >= 0;

    return _.conformsTo(this.state.bet, {
      teamA: scoreValidator,
      teamB: scoreValidator,
    });
  }

  handleChange = (team) => (event, index, value) => {
    this.setState({
      bet: {
        ...this.state.bet,
        [`team${team}`]: value,
      },
    }, this.saveBet);
  };

  saveBet = () => {
    if (this.isBetValid()) {
      this.props.saveBet(this.state.bet);
    }
  }

  handleTeamAChange = this.handleChange('A');
  handleTeamBChange = this.handleChange('B');

  render() {
    const { match } = this.props;
    const { bet } = this.state;

    return (
      <Card style={{ marginTop: 7, marginBottom: 7 }}>
        <CardHeader
          title={moment.unix(match.dateTime).format('LLLL')}
        />
        <div className={styles.match}>
          <Bet team={match.teamA} betValue={bet.teamA} onBetValueUpdated={this.handleTeamAChange} />
          <Bet team={match.teamB} betValue={bet.teamB} onBetValueUpdated={this.handleTeamBChange} direction="rtl" />
        </div>
      </Card>
    );
  }
}

Match.propTypes = {
  match: PropTypes.shape({
    teamA: PropTypes.shape({
      code: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }),
    teamB: PropTypes.shape({
      code: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }),
  }),
  bet: PropTypes.shape({
    teamA: PropTypes.number,
    teamB: PropTypes.number,
  }),
  saveBet: PropTypes.func.isRequired,
};

Match.defaultProps = {
  bet: empty,
};

export default compose(
  connect((state) => ({
    userId: pathToJS(state.get('firebase'), 'auth').uid,
  })),
  firebaseConnect(
    ({ matchId, userId }) => ({ path: `bets/${matchId}/users/${userId}` })
  ),
  connect((state, { matchId, userId, firebase }) => {
    const path = `bets/${matchId}/users/${userId}`;
    const bet = dataToJS(state.get('firebase'), path);

    return {
      bet,
      saveBet: (newBet) => firebase.set(path, newBet),
    };
  }),
  placeholder({
    isLoaded: ({ match }) => isLoaded(match),
  })
)(Match);
