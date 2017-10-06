import React from 'react';
import renderer from 'react-test-renderer';

import JoinGroup from './JoinGroup';

describe('containers/JoinGroup', () => {
  const props = {
    groups: {
      AA: {
        name: 'group 1',
      },
      BB: {
        name: 'group 2',
      },
      CC: {
        name: 'group 3',
      },
    },
    applyInGroup: () => {},
    uid: 'userId',
  };

  it('renders correctly', () => {
    const tree = renderer.create(
      <JoinGroup {...props} />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly when disabled', () => {
    const tree = renderer.create(
      <JoinGroup {...props} disabled />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
