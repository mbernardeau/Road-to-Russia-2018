import filter from 'lodash/filter'
import keyBy from 'lodash/keyBy'
import { createSelector } from 'reselect'
import moment from 'moment'

import matchesFactory from './matches.reducer'

export const getFutureMatches = createSelector(matchesFactory.get(), matches => {
  const now = moment()
  return keyBy(filter(matches, match => moment(match.dateTime).isAfter(now)), 'id')
})

export const getFinishedMatches = createSelector(matchesFactory.get(), matches => {
  const now = moment()
  return keyBy(filter(matches, match => moment(match.dateTime).isBefore(now)), 'id')
})
