import React from 'react'
import renderer from 'react-test-renderer'

import JoinGroup from './JoinGroup'

jest.mock('material-ui/Button', () => 'Button')
jest.mock('material-ui/Card', () => 'Card')
jest.mock('material-ui/Card/CardActions', () => 'CardActions')
jest.mock('material-ui/Card/CardContent', () => 'CardContent')
jest.mock('material-ui/Menu/MenuItem', () => 'MenuItem')
jest.mock('material-ui/TextField', () => 'TextField')
jest.mock('material-ui/Form', () => ({
  FormControl: 'FormControl',
  FormHelperText: 'FormHelperText',
}))
jest.mock('material-ui/Typography', () => 'Typography')
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
