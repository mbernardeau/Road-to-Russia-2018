import React from 'react';
import renderer from 'react-test-renderer';
import JoinGroup from './JoinGroup';

describe('containers/JoinGroup', () => {
  it('renders correctly', () => {
    const props = {
      groups: {
        AA: {
          name: 'group not subscribed',
        },
        BB: {
          awaitingMembers: {
            userId: true,
          },
          name: 'group awiting',
        },
        CC: {
          members: {
            userId: true,
          },
          name: 'group subscribed',
        },
      },
      applyInGroup: () => {},
      uid: 'userId',
    };

    const tree = renderer.create(
      <JoinGroup {...props} />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
