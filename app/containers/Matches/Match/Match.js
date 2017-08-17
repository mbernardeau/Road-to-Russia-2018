import React, {
  Component,
} from 'react';

import PropTypes from 'prop-types';
import _ from 'lodash';

import {
  Card,
} from 'material-ui/Card';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import CheckIcon from 'material-ui/svg-icons/navigation/check';
import ClearIcon from 'material-ui/svg-icons/content/clear';

import Bet from './Bet';

import styles from './Match.scss';

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

  handleChange = (team) => (event, index, value) => {
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
    const { match } = this.props;
    const { bet } = this.state;

    return (
      <Card style={{ marginTop: 7, marginBottom: 7, width: 1000 }} containerStyle={{ height: 250, position: 'relative' }}>
        <div className={styles.match}>
          <Bet team={match.teamA} betValue={bet.teamA} onBetValueUpdated={this.handleTeamAChange} />
          <Bet team={match.teamB} betValue={bet.teamB} onBetValueUpdated={this.handleTeamBChange} direction="rtl" />
        </div>
        <FloatingActionButton style={{ position: 'absolute', bottom: 5, left: 5, opacity: 0.8 }} mini backgroundColor={this.isBetValid() ? 'green' : 'red'} zDepth={0}>
          {this.isBetValid() ? <CheckIcon /> : <ClearIcon />}
        </FloatingActionButton>
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


export default Match;
