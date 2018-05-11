import React from 'react'
import renderer from 'react-test-renderer'
import User from './User'

jest.mock('material-ui/Avatar', () => 'Avatar')
jest.mock('material-ui/IconButton', () => 'IconButton')
jest.mock('material-ui/Menu', () => 'Menu')
jest.mock('material-ui/Menu/MenuItem', () => 'MenuItem')
jest.mock('@material-ui/icons/MoreVert', () => 'MoreVert')

describe('screens/ConnectionWidget/User', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <User
          user={{ avatarUrl: 'http://avatar.url', displayName: 'Georges Lucas' }}
          logout={jest.fn()}
        />,
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
