import {
  populate,
  firebaseConnect,
} from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';

import Matches from './Matches';

const populates = [
  { child: 'stadium', root: 'stadiums' },
  { child: 'teamA', root: 'teams' },
  { child: 'teamB', root: 'teams' },
];

export default compose(
  firebaseConnect([
    { path: 'matches', populates, queryParams: ['orderByChild=dateTime'] },
  ]),
  connect(
    ({ firebase }) => ({
      matches: populate(firebase, 'matches', populates),
    })
  ),
)(Matches);
