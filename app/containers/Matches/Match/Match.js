import React, {
  Component,
} from 'react';

import PropTypes from 'prop-types';
import moment from 'moment';
import _ from 'lodash';
import { lazyload } from 'react-lazyload';

import {
  Card,
  CardHeader,
} from 'material-ui/Card';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import CheckIcon from 'material-ui/svg-icons/navigation/check';
import ClearIcon from 'material-ui/svg-icons/content/clear';

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
      <Card style={{ marginTop: 7, marginBottom: 7 }}>
        <CardHeader
          title={moment.unix(match.dateTime).format('LLLL')}
        />

        <div className={styles.match}>
          <Bet team={match.teamA} betValue={bet.teamA} onBetValueUpdated={this.handleTeamAChange} />
          <Bet team={match.teamB} betValue={bet.teamB} onBetValueUpdated={this.handleTeamBChange} direction="rtl" />
        </div>

        <FloatingActionButton style={{ height: '20' }} mini backgroundColor={this.isBetValid() ? 'green' : 'red'} zDepth={0}>
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

const generateFirebasePath = ({ matchId, userId }) => `bets/${matchId}/users/${userId}`;

export default compose(
  lazyload({
    height: 150,
    once: true,
    offset: 300,
  }),
  connect(({ firebase }) => ({
    userId: pathToJS(firebase, 'auth').uid,
  })),
  firebaseConnect(
    (props) => ({ path: generateFirebasePath(props) })
  ),
  connect(
    ({ firebase }, ownProps) => ({
      bet: dataToJS(firebase, generateFirebasePath(ownProps)),
    }),
    (dispatch, { firebase, ...props }) => ({
      saveBet: (newBet) => firebase.set(generateFirebasePath(props), newBet),
    }),
  ),
  placeholder({
    isLoaded: ({ match }) => isLoaded(match),
  })
)(Match);
