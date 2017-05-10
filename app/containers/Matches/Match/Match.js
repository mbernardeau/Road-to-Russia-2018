import React, {
  Component,
} from 'react';

import PropTypes from 'prop-types';
import moment from 'moment';
import _ from 'lodash';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import {
  Card,
  CardHeader,
} from 'material-ui/Card';

import {
  pathToJS,
  isLoaded,
  firebaseConnect,
} from 'react-redux-firebase';

import { connect } from 'react-redux';
import { compose } from 'redux';

import Flag from 'components/Flag';
import placeholder from 'components/Placeholder';

import styles from './Match.scss';


const menuItems = _.map(_.range(11), (n) => <MenuItem value={n} key={n} primaryText={`${n}`} />);

class Match extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bet: props.bet || {
        teamA: null,
        teamB: null,
      },
    };
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

    return (
      <Card style={{ marginTop: 7, marginBottom: 7 }}>
        <CardHeader
          title={moment.unix(match.dateTime).format('LLLL')}
        />
        <div className={styles.match}>
          <div className={styles.countryFlag}>
            {match.teamA.name}
            <Flag country={match.teamA.code} style={{ width: 70, height: 40 }} />
          </div>
          <SelectField
            value={this.state.bet.teamA}
            onChange={this.handleTeamAChange}
          >
            {menuItems}
          </SelectField>
          <div>{
            this.isBetValid() ?
              'valide' :
              'invalide'
            }
          </div>
          <SelectField
            value={this.state.bet.teamB}
            onChange={this.handleTeamBChange}
          >
            {menuItems}
          </SelectField>
          <div className={styles.countryFlag}>
            {match.teamB.name}
            <Flag country={match.teamB.code} style={{ width: 70, height: 40 }} />
          </div>
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

export default compose(
  connect((state) => ({
    userId: pathToJS(state.get('firebase'), 'auth').uid,
  })),
  firebaseConnect(
    ({ matchId, userId }) => ({ path: `bets/${matchId}/users/${userId}` })
  ),
  connect((state, { matchId, userId, firebase }) => {
    const path = `bets/${matchId}/users/${userId}`;
    const bet = pathToJS(state.get('firebase'), path);

    return {
      bet,
      saveBet: (newBet) => firebase.set(path, newBet),
    };
  }),
  placeholder({
    isLoaded: ({ match }) => isLoaded(match),
  })
)(Match);
