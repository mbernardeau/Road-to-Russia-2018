import React from 'react';
import renderer from 'react-test-renderer';

import MatchInfos from './MatchInfos';

describe('Containers/Match/StadiumTooltip', () => {
  // Mock date to ensure consistancy between tests
  Date.now = jest.fn(() => 1482363367071);

  const props = {
    match: {
      dateTime: 1482463367,
      stadium: {
        capacity: 69500,
        city: 'Saint-Pétersbourg',
        name: 'Stade Krestovski',
      },
    },
    matchId: 'matchid1',
  };


  it('renders correctly', () => {
    const tree = renderer.create(
      <MatchInfos {...props} />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
