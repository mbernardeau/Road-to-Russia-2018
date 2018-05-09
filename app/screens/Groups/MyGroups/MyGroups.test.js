import React from 'react'
import renderer from 'react-test-renderer'

import MyGroups from './MyGroups'

jest.mock('material-ui/Card', () => 'Card')
jest.mock('material-ui/Table', () => 'Table')
jest.mock('material-ui/Table/TableBody', () => 'TableBody')
jest.mock('material-ui/Table/TableCell', () => 'TableCell')
jest.mock('material-ui/Table/TableRow', () => 'TableRow')
jest.mock('material-ui/Table/TableHead', () => 'TableHead')
jest.mock('material-ui/Typography', () => 'Typography')

jest.mock('./GroupRow', () => 'GroupRow')

describe('Groups/MyGroups', () => {
  it('renders correctly when no group joined', () => {
    const props = {
      groups: {},
    }

    const tree = renderer.create(<MyGroups {...props} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
  it('renders correctly when a group is joined', () => {
    const props = {
      groups: {
        idGroup1: { name: 'supergroupe' },
      },
    }

    const tree = renderer.create(<MyGroups {...props} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
