import React from 'react'
import renderer from 'react-test-renderer'
import Radium from 'radium'
import User from './User'

describe('screens/ConnectionWidget/User', () => {
  Radium.TestMode.enable()

  it('renders correctly', () => {
    const tree = renderer
      .create(
        <User
          user={{ avatarUrl: 'http://avatar.url', displayName: 'Georges Lucas' }}
          firebase={{ logout: () => {} }}
        />,
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
