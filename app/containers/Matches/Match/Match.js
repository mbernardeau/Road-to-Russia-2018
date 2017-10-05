import React, {
  Component,
} from 'react';

import PropTypes from 'prop-types';
import _ from 'lodash';

import Card, {
  CardContent,
} from 'material-ui/Card';

import Divider from 'material-ui/Divider';

import Bet from './Bet';
import ValidIcon from './ValidIcon';
import MatchInfos from './MatchInfos';

const empty = {};

class Match extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bet: empty,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (!this.state.bet || this.state.bet === empty) {
      this.setState({
        bet: nextProps.bet || empty,
      });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state.bet.teamA !== nextState.bet.teamA || this.state.bet.teamB !== nextState.bet.teamB;
  }

  isBetValid = () => {
    const scoreValidator = (score) => _.isNumber(score) && score >= 0;

    return _.conformsTo(this.state.bet, {
      teamA: scoreValidator,
      teamB: scoreValidator,
    });
  }

  handleChange = (team) => ({ target: { value } }) => {
    this.setState({
      bet: {
        ...this.state.bet,
        [`team${team}`]: value,
      },
    }, this.saveBetIfValid);
  };

  saveBetIfValid = () => {
    if (this.isBetValid()) {
      this.props.saveBet(this.state.bet);
    }
  }

  handleTeamAChange = this.handleChange('A');
  handleTeamBChange = this.handleChange('B');

  render() {
    const { match, matchId } = this.props;
    const { bet } = this.state;

    return (
      <Card style={styles.card}>
        <CardContent style={styles.cardContainer}>
          <div style={styles.match}>
            <Bet team={match.teamA} betValue={bet.teamA} onBetValueUpdated={this.handleTeamAChange} />
            <Bet team={match.teamB} betValue={bet.teamB} onBetValueUpdated={this.handleTeamBChange} />
          </div>
          <Divider />
          <MatchInfos match={match} matchId={matchId} />
          <ValidIcon valid={this.isBetValid()} />
        </CardContent>
      </Card>
    );
  }
}

const styles = {
  match: {
    display: 'grid',
    gridTemplateColumns: '50% 50%',
    marginBottom: 10,
  },

  card: {
    marginTop: 7,
    marginBottom: 7,
    width: '100%',
  },

  cardContainer: {
    position: 'relative',
  },
};

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
  matchId: PropTypes.string,
};

Match.defaultProps = {
  bet: empty,
};


export default Match;
