import React from 'react'
import renderer from 'react-test-renderer'
import moment from 'moment'

import MatchInfos from './MatchInfos'

describe('screens/Match/StadiumTooltip', () => {
  // Mock date to ensure consistancy between tests
  Date.now = jest.fn(() => 1482363367071)

  moment.locale('fr')

  // Mock toLocaleString because of inconsistant behaviour in node (it works correctly in browsers)
  // eslint-disable-next-line
  Number.prototype.toLocaleString = function() {
    return `${this}`
  }

  const props = {
    match: {
      dateTime: 1529002800000,
    },
    stadium: {
      capacity: 69500,
      city: 'Saint-Pétersbourg',
      name: 'Stade Krestovski',
    },
    matchId: 'matchid1',
  }

  it('renders correctly', () => {
    const tree = renderer.create(<MatchInfos {...props} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
