import React from 'react'
import renderer from 'react-test-renderer'

import MyGroups from './MyGroups'

jest.mock('@material-ui/core/Card', () => 'Card')
jest.mock('@material-ui/core/CardContent', () => 'CardContent')
jest.mock('@material-ui/core/Table', () => 'Table')
jest.mock('@material-ui/core/TableBody', () => 'TableBody')
jest.mock('@material-ui/core/TableCell', () => 'TableCell')
jest.mock('@material-ui/core/TableRow', () => 'TableRow')
jest.mock('@material-ui/core/TableHead', () => 'TableHead')
jest.mock('@material-ui/core/Typography', () => 'Typography')
jest.mock('./DisplayPrice', () => 'DisplayPrice')
jest.mock('./GroupRow', () => 'GroupRow')

describe('Groups/MyGroups', () => {
  it('renders correctly when no group joined', () => {
    const props = {
      groups: {},
      userId: 'myid',
    }

    const tree = renderer.create(<MyGroups {...props} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
  it('renders correctly when a group is joined', () => {
    const props = {
      groups: {
        idGroup1: { name: 'supergroupe' },
      },
      userId: 'myid',
    }

    const tree = renderer.create(<MyGroups {...props} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
