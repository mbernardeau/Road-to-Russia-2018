import React from 'react'
import renderer from 'react-test-renderer'
import Radium from 'radium'
import User from './User'

jest.mock('material-ui/Avatar', () => 'Avatar')
jest.mock('material-ui/IconButton', () => 'IconButton')
jest.mock('material-ui/Menu', () => 'Menu')
jest.mock('material-ui/Menu/MenuItem', () => 'MenuItem')
jest.mock('@material-ui/icons/MoreVert', () => 'MoreVert')

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
