import React from 'react'
import renderer from 'react-test-renderer'

import JoinGroup from './JoinGroup'

jest.mock('@material-ui/core/Button', () => 'Button')
jest.mock('@material-ui/core/Card', () => 'Card')
jest.mock('@material-ui/core/CardActions', () => 'CardActions')
jest.mock('@material-ui/core/CardContent', () => 'CardContent')
jest.mock('@material-ui/core/MenuItem', () => 'MenuItem')
jest.mock('@material-ui/core/TextField', () => 'TextField')
jest.mock('@material-ui/core/FormControl', () => 'FormControl')
jest.mock('@material-ui/core/FormHelperText', () => 'FormHelperText')
jest.mock('@material-ui/core/Typography', () => 'Typography')
jest.mock('./GroupApplyStatus', () => 'GroupApplyStatus')

describe('screens/JoinGroup', () => {
  const props = {
    applyInGroup: jest.fn(),
  }

  it('renders correctly', () => {
    const tree = renderer.create(<JoinGroup {...props} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
