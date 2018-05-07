import React from 'react'
import renderer from 'react-test-renderer'

import JoinGroup from './JoinGroup'

jest.mock('material-ui/Button', () => 'Button')
jest.mock('material-ui/Card', () => 'Card')
jest.mock('material-ui/Card/CardActions', () => 'CardActions')
jest.mock('material-ui/Card/CardContent', () => 'CardContent')
jest.mock('material-ui/Menu/MenuItem', () => 'MenuItem')
jest.mock('material-ui/Select', () => 'Select')
jest.mock('material-ui/Form', () => ({
  FormControl: 'FormControl',
  FormHelperText: 'FormHelperText',
}))
jest.mock('material-ui/Typography', () => 'Typography')

describe('screens/JoinGroup', () => {
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
  }

  it('renders correctly', () => {
    const tree = renderer.create(<JoinGroup {...props} />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('renders correctly when disabled', () => {
    const tree = renderer.create(<JoinGroup {...props} disabled />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
