import {
  createSelector,
} from 'reselect';

import {
  populate,
} from 'react-redux-firebase';

import {
  reverse,
} from 'lodash';

import {
  getFirebase,
} from '../firebase';

const populates = [
  { child: 'stadium', root: 'stadiums' },
  { child: 'teamA', root: 'teams' },
  { child: 'teamB', root: 'teams' },
];

export const matchQuery = {
  path: 'matches',
  populates,
  queryParams: ['orderByChild=dateTime'],
};

export const getMatches = createSelector(
  getFirebase,
  (firebase) => reverse(populate(firebase, 'matches', populates)),
);
