import React from 'react';
import renderer from 'react-test-renderer';

import Bet from './Bet';

describe('Containers/Match/Bet', () => {
  const props = {
    team: {
      code: 'ru',
      name: 'Russie',
    },
    betValue: 1,
  };

  it('renders correctly', () => {
    const tree = renderer.create(
      <Bet {...props} />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
